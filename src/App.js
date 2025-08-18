import React, { useState } from 'react';
import PlayerCircle from './components/PlayerCircle';
import Marker from './components/Marker';
import TrashCan from './components/TrashCan';

const MAP_WIDTH = 800;
const MAP_HEIGHT = 600;

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
  const [draggingId, setDraggingId] = useState(null);

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

  const handleDelete = (id) => {
    setRedPieces((prev) => prev.filter((p) => p.id !== id));
    setBluePieces((prev) => prev.filter((p) => p.id !== id));
    setMarkers((prev) => prev.filter((m) => m.id !== id));
  };

  const handleAddPlayer = (team) => {
    const prefix = team === 'red' ? 'R' : 'B';
    const newPiece = {
      id: `${prefix}${Math.floor(Math.random() * 10000)}`,
      label: 'X',
      x: 100,
      y: team === 'red' ? 80 : 520,
    };
    team === 'red'
      ? setRedPieces((prev) => [...prev, newPiece])
      : setBluePieces((prev) => [...prev, newPiece]);
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
      {/* Left Sidebar */}
      <div
        style={{
          width: 160,
          backgroundColor: '#222',
          padding: 15,
          borderRadius: 8,
          border: '2px solid #444',
        }}
      >
        <h3>Markers</h3>
        <button
          onClick={() => setPlacingMarkerType(markerTypes.FRAG)}
          style={{
            width: '100%',
            marginBottom: 8,
            padding: '8px',
            backgroundColor:
              placingMarkerType === markerTypes.FRAG ? 'orange' : '#444',
            color: 'white',
            border: 'none',
            borderRadius: 5,
            cursor: 'pointer',
          }}
        >
          Place Frag
        </button>
        <button
          onClick={() => setPlacingMarkerType(markerTypes.FLASH)}
          style={{
            width: '100%',
            marginBottom: 8,
            padding: '8px',
            backgroundColor:
              placingMarkerType === markerTypes.FLASH ? 'yellow' : '#444',
            color: '#000',
            border: 'none',
            borderRadius: 5,
            cursor: 'pointer',
          }}
        >
          Place Flash
        </button>
        <button
          onClick={() => setPlacingMarkerType(null)}
          style={{
            width: '100%',
            marginBottom: 8,
            padding: '8px',
            backgroundColor: '#666',
            color: 'white',
            border: 'none',
            borderRadius: 5,
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
      </div>

      {/* Map Area */}
      <div style={{ position: 'relative' }}>
        <h1 style={{ textAlign: 'center' }}>{selectedMap.name} Strat Planner</h1>
        <svg
          width={MAP_WIDTH}
          height={MAP_HEIGHT}
          style={{
            border: '3px solid #555',
            borderRadius: 10,
            backgroundImage: `url(${selectedMap.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'block',
            userSelect: 'none',
          }}
          onClick={handleMapClick}
        >
          {redPieces.map((p) => (
            <PlayerCircle
              key={p.id}
              piece={p}
              onDrag={updatePiecePosition}
              draggingId={draggingId}
              setDraggingId={setDraggingId}
              onDelete={handleDelete}
            />
          ))}
          {bluePieces.map((p) => (
            <PlayerCircle
              key={p.id}
              piece={p}
              onDrag={updatePiecePosition}
              draggingId={draggingId}
              setDraggingId={setDraggingId}
              onDelete={handleDelete}
            />
          ))}
          {markers.map((m) => (
            <Marker key={m.id} marker={m} onDrag={updateMarkerPosition} onDelete={handleDelete} />
          ))}
        </svg>
        <TrashCan />
      </div>

      {/* Right Sidebar */}
      <div
        style={{
          width: 200,
          backgroundColor: '#222',
          padding: 15,
          borderRadius: 8,
          border: '2px solid #444',
        }}
      >
        <h3>Map</h3>
        <select
          value={selectedMap.name}
          onChange={(e) =>
            setSelectedMap(MAPS.find((m) => m.name === e.target.value))
          }
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: 5,
            border: '1px solid #555',
            backgroundColor: '#333',
            color: '#eee',
          }}
        >
          {MAPS.map((m) => (
            <option key={m.name} value={m.name}>
              {m.name}
            </option>
          ))}
        </select>

        <h3 style={{ marginTop: 20 }}>Players</h3>
        <div>
          <h4 style={{ color: 'red' }}>Red Team</h4>
          {redPieces.map((p) => (
            <div key={p.id} style={{ marginBottom: 6 }}>
              <input
                type="text"
                value={p.label}
                maxLength={1}
                onChange={(e) =>
                  setRedPieces((prev) =>
                    prev.map((x) =>
                      x.id === p.id
                        ? { ...x, label: e.target.value.toUpperCase() }
                        : x
                    )
                  )
                }
                style={{
                  width: '100%',
                  padding: '4px',
                  borderRadius: 4,
                  border: '1px solid #555',
                  backgroundColor: '#333',
                  color: '#eee',
                  textAlign: 'center',
                }}
              />
            </div>
          ))}
          <button
            onClick={() => handleAddPlayer('red')}
            style={{
              width: '100%',
              marginTop: 5,
              padding: 6,
              backgroundColor: '#900',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            Add Red Player
          </button>
        </div>

        <div>
          <h4 style={{ color: 'blue', marginTop: 10 }}>Blue Team</h4>
          {bluePieces.map((p) => (
            <div key={p.id} style={{ marginBottom: 6 }}>
              <input
                type="text"
                value={p.label}
                maxLength={1}
                onChange={(e) =>
                  setBluePieces((prev) =>
                    prev.map((x) =>
                      x.id === p.id
                        ? { ...x, label: e.target.value.toUpperCase() }
                        : x
                    )
                  )
                }
                style={{
                  width: '100%',
                  padding: '4px',
                  borderRadius: 4,
                  border: '1px solid #555',
                  backgroundColor: '#333',
                  color: '#eee',
                  textAlign: 'center',
                }}
              />
            </div>
          ))}
          <button
            onClick={() => handleAddPlayer('blue')}
            style={{
              width: '100%',
              marginTop: 5,
              padding: 6,
              backgroundColor: '#009',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            Add Blue Player
          </button>
        </div>
      </div>
    </div>
  );
}
