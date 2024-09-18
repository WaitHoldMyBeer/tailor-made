// app/components/Map.js
'use client';

import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { useCallback, useRef } from 'react';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 0,
  lng: 0,
};

export default function Map({ onLocationSelect }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const mapRef = useRef();

  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const onMapClick = useCallback(
    (event) => {
      const coords = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      onLocationSelect(coords);
    },
    [onLocationSelect]
  );

  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={2}
      onLoad={onLoad}
      onClick={onMapClick}
    >
      {/* Additional components can be added here */}
    </GoogleMap>
  );
}
