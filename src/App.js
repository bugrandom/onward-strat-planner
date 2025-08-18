import { useState } from 'react';
import MapArea from './components/MapArea';
import { MAPS, initialPieces, markerTypes } from './config';

export default function App() {
  const [selectedMap, setSelectedMap] = useState(MAPS[0]);
  const [redPieces, setRedPieces] = useState(initialPieces('R', 80));
  const [bluePieces, setBluePieces] = useState(initialPieces('B', 520));
  const [markers, setMarkers] = useState([]);
  const [placingMarkerType, setPlacingMarkerType] = useState(null);

  const updatePiecePosition = (id, x, y) => {
    const updater = (list) => list.map((p) => (p.id === id ? { ...p, x, y } : p));
    setRedPieces((prev) => updater(prev));
    setBluePieces((prev) => updater(prev));
  };

  const updateMarkerPosition = (id, x, y) => {
    setMarkers((prev) => prev.map((m) => (m.id === id ? { ...m, x, y } : m)));
  };

  const removePlayer = (id) => {
    setRedPieces((prev) => prev.filter((p) => p.id !== id));
    setBluePieces((prev) => prev.filter((p) => p.id !== id));
  };

  const removeMarker = (id) => {
    setMarkers((prev) => prev.filter((m) => m.id !== id));
  };

  const handleMapClick = (e) => {
    if (!placingMarkerType) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMarkers((prev) => [
      ...prev,
      { id: `M${prev.length + 1}`, type: placingMarkerType, x, y },
    ]);
    setPlacingMarkerType(null);
  };

  return (
    <div style={{ display: 'flex', gap: 20, padding: 20, fontFamily: 'Segoe UI, sans-serif', minHeight: '100vh', backgroundColor: '#1a1a1a', color: '#eee' }}>
      {/* Left Sidebar */}
      <div style={{ width: 160, backgroundColor: '#222', padding: 15, borderRadius: 8, border: '2px solid #444' }}>
        <h3>Markers</h3>
        <button onClick={() => setPlacingMarkerType(markerTypes.FRAG)} style={{ width: '100%', marginBottom: 8, padding: 8, backgroundColor: placingMarkerType === markerTypes.FRAG ? 'orange' : '#444', color: 'white', border: 'none', borderRadius: 5, cursor: 'pointer' }}>Place Frag</button>
        <button onClick={() => setPlacingMarkerType(markerTypes.FLASH)} style={{ width: '100%', marginBottom: 8, padding: 8, backgroundColor: placingMarkerType === markerTypes.FLASH ? 'yellow' : '#444', color: '#000', border: 'none', borderRadius: 5, cursor: 'pointer' }}>Place Flash</button>
        <button onClick={() => setPlacingMarkerType(null)} style={{ width: '100%', marginBottom: 8, padding: 8, backgroundColor: '#666', color: 'white', border: 'none', borderRadius: 5, cursor: 'pointer' }}>Cancel</button>
      </div>

      {/* Map Area */}
      <MapArea
        selectedMap={selectedMap}
        redPieces={redPieces}
        bluePieces={bluePieces}
        markers={markers}
        updatePiecePosition={updatePiecePosition}
        updateMarkerPosition={updateMarkerPosition}
        removePlayer={removePlayer}
        removeMarker={removeMarker}
        placingMarkerType={placingMarkerType}
        handleMapClick={handleMapClick}
      />

      {/* Right Sidebar */}
      <div style={{ width: 200, backgroundColor: '#222', padding: 15, borderRadius: 8, border: '2px solid #444' }}>
        <h3>Map</h3>
        <select value={selectedMap.name} onChange={(e) => setSelectedMap(MAPS.find((m) => m.name === e.target.value))} style={{ width: '100%', padding: 8, borderRadius: 5, border: '1px solid #555', backgroundColor: '#333', color: '#eee' }}>
          {MAPS.map((m) => (<option key={m.name} value={m.name}>{m.name}</option>))}
        </select>

        <h3 style={{ marginTop: 20 }}>Players</h3>
        <button onClick={() => setRedPieces(initialPieces('R', 80))} style={{ width: '100%', marginBottom: 8 }}>Reset Red Team</button>
        <button onClick={() => setBluePieces(initialPieces('B', 520))} style={{ width: '100%', marginBottom: 8 }}>Reset Blue Team</button>
      </div>
    </div>
  );
}
