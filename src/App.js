import React, { useState } from 'react';
import SidebarLeft from './components/SidebarLeft';
import SidebarRight from './components/SidebarRight';
import MapArea from './components/MapArea';

const MAPS = [
  { name: 'Suburbia', image: '/maps/suburbia-clean.png' },
  { name: 'Quarantine', image: '/maps/quarantine.png' },
  { name: 'Downfall', image: '/maps/downfall.png' },
];

const initialPieces = (prefix, y) =>
  Array.from({ length: 5 }, (_, i) => ({
    id: `${prefix}${i + 1}`,
    label: String.fromCharCode(65 + i),
    x: 100 + i * 60,
    y,
  }));

const markerTypes = {
  FRAG: 'frag',
  FLASH: 'flash',
};

export default function App() {
  const [selectedMap, setSelectedMap] = useState(MAPS[0]);
  const [redPieces, setRedPieces] = useState(initialPieces('R', 80));
  const [bluePieces, setBluePieces] = useState(initialPieces('B', 520));
  const [markers, setMarkers] = useState([]);
  const [placingMarkerType, setPlacingMarkerType] = useState(null);

  const updatePiecePosition = (id, x, y) => {
    const updater = (list) =>
      list.map((p) => (p.id === id ? { ...p, x, y } : p));
    setRedPieces((prev) => updater(prev));
    setBluePieces((prev) => updater(prev));
  };

  const updateMarkerPosition = (id, x, y) => {
    setMarkers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, x, y } : m))
    );
  };

  const handleMapClick = (e) => {
    if (!placingMarkerType) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMarkers((prev) => [
      ...prev,
      {
        id: `M${prev.length + 1}`,
        type: placingMarkerType,
        x,
        y,
      },
    ]);
    setPlacingMarkerType(null);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#1a1a1a',
        color: '#eee',
        display: 'flex',
        justifyContent: 'space-between',
        padding: 20,
        fontFamily: 'Segoe UI, sans-serif',
        gap: 20,
      }}
    >
      <SidebarLeft
        markerTypes={markerTypes}
        placingMarkerType={placingMarkerType}
        setPlacingMarkerType={setPlacingMarkerType}
      />

      <MapArea
        selectedMap={selectedMap}
        redPieces={redPieces}
        bluePieces={bluePieces}
        markers={markers}
        updatePiecePosition={updatePiecePosition}
        updateMarkerPosition={updateMarkerPosition}
        handleMapClick={handleMapClick}
      />

      <SidebarRight
        MAPS={MAPS}
        selectedMap={selectedMap}
        setSelectedMap={setSelectedMap}
        redPieces={redPieces}
        setRedPieces={setRedPieces}
        bluePieces={bluePieces}
        setBluePieces={setBluePieces}
      />
    </div>
  );
}
