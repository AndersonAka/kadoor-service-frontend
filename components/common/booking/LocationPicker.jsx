'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const LocationPicker = ({ 
  value = '', 
  onChange, 
  placeholder = 'Sélectionner un lieu',
  label,
  icon = 'flaticon-placeholder'
}) => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([5.3600, -4.0083]); // Default: Abidjan, Côte d'Ivoire
  const [userLocationLoaded, setUserLocationLoaded] = useState(false);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  // Parse initial value if it contains coordinates
  useEffect(() => {
    if (value && typeof value === 'object' && value.lat && value.lng) {
      setSelectedLocation(value);
      setMapCenter([value.lat, value.lng]);
      setUserLocationLoaded(true);
    }
  }, []);

  // Try to get user's GPS location on mount
  useEffect(() => {
    if (!userLocationLoaded && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter([latitude, longitude]);
          setUserLocationLoaded(true);
        },
        (error) => {
          console.log('Geolocation not available, using default location');
          setUserLocationLoaded(true);
        },
        { timeout: 5000, maximumAge: 300000 }
      );
    }
  }, [userLocationLoaded]);

  // Search for locations using Nominatim (OpenStreetMap)
  const searchLocation = async (query) => {
    if (!query || query.length < 3) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      // Optimize search for Côte d'Ivoire
      const searchQueryWithCountry = query.toLowerCase().includes('ivoire') || query.toLowerCase().includes('abidjan')
        ? query
        : `${query}, Côte d'Ivoire`;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQueryWithCountry)}&countrycodes=ci&limit=8&addressdetails=1`,
        { 
          headers: { 'Accept-Language': 'fr' },
          signal: controller.signal
        }
      );
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const data = await response.json();
      setSearchResults(data || []);
    } catch (error) {
      console.error('Error searching location:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        searchLocation(searchQuery);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Get address from coordinates (reverse geocoding)
  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
        { headers: { 'Accept-Language': 'fr' } }
      );
      const data = await response.json();
      return data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    }
  };

  // Handle location selection from search
  const handleSelectSearchResult = async (result) => {
    const location = {
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
      address: result.display_name
    };
    setSelectedLocation(location);
    setMapCenter([location.lat, location.lng]);
    setSearchResults([]);
    setSearchQuery('');
    onChange(location);
  };

  // Handle map click
  const handleMapClick = async (lat, lng) => {
    const address = await reverseGeocode(lat, lng);
    const location = { lat, lng, address };
    setSelectedLocation(location);
    onChange(location);
  };

  // Get current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const address = await reverseGeocode(latitude, longitude);
          const location = { lat: latitude, lng: longitude, address };
          setSelectedLocation(location);
          setMapCenter([latitude, longitude]);
          onChange(location);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const displayValue = selectedLocation?.address || (typeof value === 'string' ? value : '');

  return (
    <div className="location-picker">
      {label && (
        <label className="form-label fw-semibold d-flex align-items-center">
          <i className={`${icon} me-2 text-thm`} style={{ color: '#b91c1c' }}></i>
          {label}
        </label>
      )}
      
      <div className="input-group">
        <span className="input-group-text bg-light border-end-0">
          <i className={`${icon} text-thm`} style={{ color: '#b91c1c' }}></i>
        </span>
        <input
          type="text"
          className="form-control border-start-0"
          value={displayValue}
          placeholder={placeholder}
          readOnly
          onClick={() => setIsMapOpen(true)}
          style={{ borderLeft: 'none', cursor: 'pointer' }}
        />
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => setIsMapOpen(true)}
          title="Ouvrir la carte"
        >
          <i className="fa fa-map-marker-alt"></i>
        </button>
      </div>

      {/* Map Modal */}
      {isMapOpen && (
        <div
          className="modal fade show d-flex align-items-center justify-content-center"
          style={{ 
            display: 'flex', 
            backgroundColor: 'rgba(0,0,0,0.6)', 
            zIndex: 1060,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
          onClick={() => setIsMapOpen(false)}
        >
          <div
            className="modal-dialog modal-lg m-0"
            onClick={(e) => e.stopPropagation()}
            style={{ 
              maxWidth: '800px', 
              width: '95%',
              margin: 'auto'
            }}
          >
            <div className="modal-content" style={{ borderRadius: '12px', overflow: 'hidden' }}>
              <div 
                className="modal-header border-0"
                style={{
                  background: 'linear-gradient(135deg, #b91c1c 0%, #d4af37 100%)',
                  color: '#fff',
                  padding: '1rem 1.5rem'
                }}
              >
                <h5 className="modal-title mb-0 fw-bold" style={{ color: '#fff' }}>
                  <i className="fa fa-map-marker-alt me-2"></i>
                  Sélectionner un lieu
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setIsMapOpen(false)}
                ></button>
              </div>

              <div className="modal-body p-0">
                {/* Search bar */}
                <div className="p-3 border-bottom">
                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <i className="fa fa-search text-muted"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Rechercher une adresse en Côte d'Ivoire..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn"
                      onClick={getCurrentLocation}
                      title="Ma position actuelle"
                      style={{
                        background: 'linear-gradient(135deg, #b91c1c 0%, #d4af37 100%)',
                        color: '#fff',
                        border: 'none'
                      }}
                    >
                      <i className="fa fa-crosshairs me-1"></i>
                      <span className="d-none d-sm-inline">Ma position</span>
                    </button>
                  </div>

                  {/* Search results */}
                  {searchResults.length > 0 && (
                    <div className="list-group mt-2 shadow-sm" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                      {searchResults.map((result, index) => (
                        <button
                          key={index}
                          type="button"
                          className="list-group-item list-group-item-action d-flex align-items-start"
                          onClick={() => handleSelectSearchResult(result)}
                        >
                          <i className="fa fa-map-marker-alt text-danger me-2 mt-1"></i>
                          <span className="small">{result.display_name}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {isSearching && (
                    <div className="text-center py-2">
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Recherche...
                    </div>
                  )}
                </div>

                {/* Map container */}
                <div style={{ height: '400px', position: 'relative' }}>
                  <MapComponent
                    center={mapCenter}
                    selectedLocation={selectedLocation}
                    onMapClick={handleMapClick}
                  />
                </div>

                {/* Selected location info */}
                {selectedLocation && (
                  <div className="p-3 bg-light border-top">
                    <div className="d-flex align-items-start">
                      <i className="fa fa-map-marker-alt text-danger me-2 mt-1"></i>
                      <div className="flex-grow-1">
                        <small className="text-muted d-block">Lieu sélectionné:</small>
                        <span className="fw-semibold">{selectedLocation.address}</span>
                        <br />
                        <small className="text-muted">
                          GPS: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                        </small>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-footer border-0">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setIsMapOpen(false)}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  className="btn"
                  style={{
                    background: 'linear-gradient(135deg, #b91c1c 0%, #d4af37 100%)',
                    color: '#fff',
                    border: 'none'
                  }}
                  onClick={() => setIsMapOpen(false)}
                  disabled={!selectedLocation}
                >
                  <i className="fa fa-check me-2"></i>
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Leaflet Map Component (loaded dynamically to avoid SSR issues)
const MapComponent = dynamic(
  () => import('./LeafletMap'),
  { 
    ssr: false,
    loading: () => (
      <div className="d-flex align-items-center justify-content-center h-100 bg-light">
        <span className="spinner-border text-primary me-2"></span>
        Chargement de la carte...
      </div>
    )
  }
);

export default LocationPicker;
