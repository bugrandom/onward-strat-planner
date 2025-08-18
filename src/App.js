import React, { useState } from 'react';

const MAP_WIDTH = 800;
const MAP_HEIGHT = 600;

const MAPS = [
  { name: 'Suburbia', image: '/maps/suburbia-clean.png' },
  { name: 'Factory', image: '/maps/factory.png' },
  { name: 'Downtown', image: '/maps/downtown.png' },
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

function DraggableCircle({ piece, onDrag }) {
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState({ x: piece.x, y: piece.y });

  const handlePointerDown = (e) => {
    e.preventDefault();
    setDragging(true);
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!dragging) return;
    const rect = e.target.ownerSVGElement.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    x = Math.max(12, Math.min(x, MAP_WIDTH - 12));
    y = Math.max(12, Math.min(y, MAP_HEIGHT - 12));
    setPos({ x, y });
  };

  const handlePointerUp = (e) => {
    setDragging(false);
    onDrag(piece.id, pos.x, pos.y);
    e.target.releasePointerCapture(e.pointerId);
  };

  return (
    <>
      <circle
        cx={pos.x}
        cy={pos.y}
        r={14}
        fill={piece.id.startsWith('R') ? 'red' : 'blue'}
        stroke="black"
        strokeWidth={2}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{ cursor: 'grab' }}
      />
      <text
        x={pos.x}
        y={pos.y + 5}
        textAnchor="middle"
        fontSize="14"
        fontWeight="bold"
        fill="white"
      >
        {piece.label}
      </text>
    </>
  );
}

function Marker({ marker, onDrag }) {
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState({ x: marker.x, y: marker.y });

  const handlePointerDown = (e) => {
    setDragging(true);
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!dragging) return;
    const rect = e.target.ownerSVGElement.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    x = Math.max(12, Math.min(x, MAP_WIDTH - 12));
    y = Math.max(12, Math.min(y, MAP_HEIGHT - 12));
    setPos({ x, y });
  };

  const handlePointerUp = (e) => {
    setDragging(false);
    onDrag(marker.id, pos.x, pos.y);
    e.target.releasePointerCapture(e.pointerId);
  };

  return (
    <circle
      cx={pos.x}
      cy={pos.y}
      r={12}
      fill={marker.type === 'frag' ? 'orange' : 'yellow'}
      stroke="black"
      strokeWidth={2}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{ cursor: 'grab' }}
    />
  );
}

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
      <div>
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
            <DraggableCircle
              key={p.id}
              piece={p}
              onDrag={updatePiecePosition}
            />
          ))}
          {bluePieces.map((p) => (
            <DraggableCircle
              key={p.id}
              piece={p}
              onDrag={updatePiecePosition}
            />
          ))}
          {markers.map((m) => (
            <Marker key={m.id} marker={m} onDrag={updateMarkerPosition} />
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
                onChange={(e) =>
                  setRedPieces((prev) =>
                    prev.map((x) =>
                      x.id === p.id ? { ...x, label: e.target.value } : x
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
                }}
              />
            </div>
          ))}
        </div>

        <div>
          <h4 style={{ color: 'blue', marginTop: 10 }}>Blue Team</h4>
          {bluePieces.map((p) => (
            <div key={p.id} style={{ marginBottom: 6 }}>
              <input
                type="text"
                value={p.label}
                onChange={(e) =>
                  setBluePieces((prev) =>
                    prev.map((x) =>
                      x.id === p.id ? { ...x, label: e.target.value } : x
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
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
