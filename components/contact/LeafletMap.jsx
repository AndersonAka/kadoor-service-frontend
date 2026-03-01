'use client';

import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

const OFFICE_LOCATION = { lat: 5.3544877, lng: -4.0952558 };

const LeafletMap = () => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // Only initialize if container exists and map hasn't been created
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Dynamically import Leaflet
    import('leaflet').then((L) => {
      // Double-check the map wasn't created while importing
      if (mapInstanceRef.current) return;

      // Fix for default marker icon in bundled environments
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });

      // Create map instance
      const map = L.map(mapContainerRef.current, {
        center: [OFFICE_LOCATION.lat, OFFICE_LOCATION.lng],
        zoom: 13,
        scrollWheelZoom: false,
      });

      // Store reference
      mapInstanceRef.current = map;

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Add marker
      const marker = L.marker([OFFICE_LOCATION.lat, OFFICE_LOCATION.lng]).addTo(map);
      marker.bindPopup(`
        <div style="text-align: center;">
          <strong style="color: #c8102e;">KADOOR SERVICE</strong>
          <br />
          Abidjan, Côte d'Ivoire
        </div>
      `);
    });

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div 
      ref={mapContainerRef} 
      style={{ height: '100%', width: '100%' }}
    />
  );
};

export default LeafletMap;
