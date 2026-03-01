'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const LeafletMap = ({ center, selectedLocation, onMapClick }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map
    mapRef.current = L.map(mapContainerRef.current).setView(center, 13);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapRef.current);

    // Handle map clicks
    mapRef.current.on('click', (e) => {
      const { lat, lng } = e.latlng;
      onMapClick(lat, lng);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update map center
  useEffect(() => {
    if (mapRef.current && center) {
      mapRef.current.setView(center, 15);
    }
  }, [center]);

  // Update marker
  useEffect(() => {
    if (!mapRef.current) return;

    // Remove existing marker
    if (markerRef.current) {
      markerRef.current.remove();
    }

    // Add new marker if location selected
    if (selectedLocation) {
      markerRef.current = L.marker([selectedLocation.lat, selectedLocation.lng])
        .addTo(mapRef.current)
        .bindPopup(selectedLocation.address || 'Lieu sélectionné')
        .openPopup();
    }
  }, [selectedLocation]);

  return (
    <div 
      ref={mapContainerRef} 
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default LeafletMap;
