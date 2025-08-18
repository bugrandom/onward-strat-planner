import React from 'react';

const mapImage = new URL('../assets/map.png', import.meta.url).href;

export default function MapCanvas() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-900">
      <img
        src={mapImage}
        alt="Strategy Map"
        className="max-w-[800px] max-h-[600px] w-full h-auto rounded shadow-lg"
      />
    </div>
  );
}
