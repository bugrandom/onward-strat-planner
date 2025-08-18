import React, { useState } from 'react';
import Draggable from 'react-draggable';

const MAP_WIDTH = 800;
const MAP_HEIGHT = 600;

const MAPS = [
  { name: 'Quarantine', image: 'https://via.placeholder.com/800x600?text=Quarantine+Map' },
  { name: 'Downfall', image: 'https://via.placeholder.com/800x600?text=Downfall+Map' },
];

function DraggableCircle({ piece, onDrag }) {
  return (
    <Draggable
      position={{ x: piece.x, y: piece.y }}
      onDrag={(e, data) => onDrag(piece.id, data.x, data.y)}
    >
      <circle
        r={15}
        fill={piece.team === 'red' ? 'red' : 'blue'}
        stroke="white"
        strokeWidth={2}
      >
        <title>{piece.label}</title>
      </circle>
    </Draggable>
  );
}

function Marker({ marker, onDrag }) {
  return (
    <Draggable
      position={{ x: marker.x, y: marker.y }}
      onDrag={(e, data) => onDrag(marker.id, data.x, data.y)}
    >
      <rect
        width={20}
        height={20}
        fill="yellow"
        stroke="black"
        strokeWidth={2}
      >
        <title>{marker.label}</title>
      </rect>
    </Draggable>
  );
}

export default function App() {
  const [selectedMap, setSelectedMap] = useState(MAPS[0]);
  const [redPieces, setRedPieces] = useState(
    Array.from({ length: 5 }, (_, i) => ({
      id: `red-${i}`,
      x: 50,
      y: 50 + i * 50,
      label: `R${i + 1}`,
      team: 'red',
    }))
  );
  const [bluePieces, setBluePieces] = useState(
    Array.from({ length: 5 }, (_, i) => ({
      id: `blue-${i}`,
      x: 700,
      y: 50 + i * 50,
      label: `B${i + 1}`,
      team: 'blue',
    }))
  );
  const [markers, setMarkers] = useState([]);

  const updatePiecePosition = (id, x, y) => {
    setRedPieces((prev) =>
      prev.map((p) => (p.id === id ? { ...p, x, y } : p))
    );
    setBluePieces((prev) =>
      prev.map((p) => (p.id === id ? { ...p, x, y } : p))
    );
  };

  const updateMarkerPosition = (id, x, y) => {
    setMarkers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, x, y } : m))
    );
  };

  const handleMapClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMarkers((prev) => [
      ...prev,
      {
        id: `marker-${Date.now()}`,
        x,
        y,
        label: 'Marker',
      },
    ]);
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        backgroundColor: '#1e1e1e',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Left Sidebar */}
      <div
        style={{
          width: 200,
          backgroundColor: '#222',
          padding: 15,
          borderRadius: 8,
          border: '2px solid #444',
        }}
      >
        <h3>Controls</h3>
        <button
          onClick={() => {
            setMarkers([]);
            setRedPieces((prev) =>
              prev.map((p, i) => ({ ...p, x: 50, y: 50 + i * 50 }))
            );
            setBluePieces((prev) =>
              prev.map((p, i) => ({ ...p, x: 700, y: 50 + i * 50 }))
            );
          }}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: 5,
            border: 'none',
            backgroundColor: '#555',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Reset
        </button>
      </div>
      {/* Map Area */}
      <div
        style={{
          flex: 1,
          margin: '0 15px',
          backgroundColor: '#111',
          borderRadius: 8,
          border: '2px solid #444',
          position: 'relative',
        }}
        onClick={handleMapClick}
      >
        <img
          src={selectedMap.image}
          alt={selectedMap.name}
          width={MAP_WIDTH}
          height={MAP_HEIGHT}
          style={{ borderRadius: 8 }}
        />
        <svg
          width={MAP_WIDTH}
          height={MAP_HEIGHT}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          {redPieces.map((piece) => (
            <DraggableCircle
              key={piece.id}
              piece={piece}
              onDrag={updatePiecePosition}
            />
          ))}
          {bluePieces.map((piece) => (
            <DraggableCircle
              key={piece.id}
              piece={piece}
              onDrag={updatePiecePosition}
            />
          ))}
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              marker={marker}
              onDrag={updateMarkerPosition}
            />
          ))}
        </svg>
      </div>

      {/* Right Sidebar */}
      <div
        style={{
          width: 200,
          backgroundColor: '#222',
          padding: 15,
          borderRadius: 8,
          border: '2px solid #444',
          overflowY: 'auto',
        }}
      >
        <h3>Players</h3>
        {[...redPieces, ...bluePieces].map((p) => (
          <div key={p.id} style={{ marginBottom: 8 }}>
            <input
              type="text"
              value={p.label}
              onChange={(e) => {
                if (p.team === 'red') {
                  setRedPieces((prev) =>
                    prev.map((rp) =>
                      rp.id === p.id ? { ...rp, label: e.target.value } : rp
                    )
                  );
                } else {
                  setBluePieces((prev) =>
                    prev.map((bp) =>
                      bp.id === p.id ? { ...bp, label: e.target.value } : bp
                    )
                  );
                }
              }}
              style={{
                width: '100%',
                padding: '5px',
                borderRadius: 4,
                border: '1px solid #555',
                backgroundColor: '#333',
                color: '#fff',
              }}
            />
          </div>
        ))}

        <h3>Maps</h3>
        {MAPS.map((map) => (
          <button
            key={map.name}
            onClick={() => setSelectedMap(map)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: 5,
              border: 'none',
              backgroundColor:
                selectedMap.name === map.name ? '#888' : '#555',
              color: '#fff',
              cursor: 'pointer',
              marginBottom: 5,
            }}
          >
            {map.name}
          </button>
        ))}
      </div>
    </div>
  );
}
