import React, { useState } from 'react';

const MAP_WIDTH = 800;
const MAP_HEIGHT = 600;

const initialRedPieces = [
  { id: 'R1', label: 'A', x: 50, y: 50 },
  { id: 'R2', label: 'B', x: 100, y: 50 },
  { id: 'R3', label: 'C', x: 150, y: 50 },
  { id: 'R4', label: 'D', x: 200, y: 50 },
  { id: 'R5', label: 'E', x: 250, y: 50 },
];

const initialBluePieces = [
  { id: 'B1', label: 'A', x: 50, y: 500 },
  { id: 'B2', label: 'B', x: 100, y: 500 },
  { id: 'B3', label: 'C', x: 150, y: 500 },
  { id: 'B4', label: 'D', x: 200, y: 500 },
  { id: 'B5', label: 'E', x: 250, y: 500 },
];

const markerTypes = {
  FRAG: 'frag',
  FLASH: 'flash',
};

function DraggableCircle({ piece, onDrag, onLabelChange }) {
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState({ x: piece.x, y: piece.y });

  function handleMouseDown(e) {
    e.preventDefault();
    setDragging(true);
  }

  function handleMouseUp(e) {
    e.preventDefault();
    setDragging(false);
    onDrag(piece.id, pos.x, pos.y);
  }

  function handleMouseMove(e) {
    if (!dragging) return;
    const rect = e.currentTarget.parentElement.getBoundingClientRect();
    let newX = e.clientX - rect.left;
    let newY = e.clientY - rect.top;

    // Clamp inside the map
    newX = Math.max(15, Math.min(newX, MAP_WIDTH - 15));
    newY = Math.max(15, Math.min(newY, MAP_HEIGHT - 15));

    setPos({ x: newX, y: newY });
  }

  return (
    <g
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{ cursor: 'pointer' }}
    >
      <circle
        cx={pos.x}
        cy={pos.y}
        r={15}
        fill={piece.id.startsWith('R') ? 'red' : 'blue'}
        stroke="black"
        strokeWidth={2}
      />
      <foreignObject
        x={pos.x - 10}
        y={pos.y - 12}
        width={20}
        height={24}
        style={{ pointerEvents: 'auto' }}
        xmlns="http://www.w3.org/1999/xhtml"
      >
        <input
          type="text"
          value={piece.label}
          onChange={(e) => onLabelChange(piece.id, e.target.value.toUpperCase())}
          maxLength={1}
          style={{
            width: '20px',
            height: '24px',
            fontWeight: 'bold',
            fontSize: '16px',
            textAlign: 'center',
            border: 'none',
            background: 'transparent',
            color: 'white',
            userSelect: 'none',
            outline: 'none',
          }}
        />
      </foreignObject>
    </g>
  );
}

function Marker({ marker, onDrag }) {
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState({ x: marker.x, y: marker.y });

  function handleMouseDown(e) {
    e.preventDefault();
    setDragging(true);
  }

  function handleMouseUp(e) {
    e.preventDefault();
    setDragging(false);
    onDrag(marker.id, pos.x, pos.y);
  }

  function handleMouseMove(e) {
    if (!dragging) return;
    const rect = e.currentTarget.parentElement.getBoundingClientRect();
    let newX = e.clientX - rect.left;
    let newY = e.clientY - rect.top;

    // Clamp inside the map
    newX = Math.max(12, Math.min(newX, MAP_WIDTH - 12));
    newY = Math.max(12, Math.min(newY, MAP_HEIGHT - 12));

    setPos({ x: newX, y: newY });
  }

  const color = marker.type === markerTypes.FRAG ? 'orange' : 'yellow';

  return (
    <circle
      cx={pos.x}
      cy={pos.y}
      r={12}
      fill={color}
      stroke="black"
      strokeWidth={2}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{ cursor: 'move' }}
    />
  );
}

export default function App() {
  const [redPieces, setRedPieces] = useState(initialRedPieces);
  const [bluePieces, setBluePieces] = useState(initialBluePieces);
  const [markers, setMarkers] = useState([]);
  const [placingMarkerType, setPlacingMarkerType] = useState(null);

  function updatePiecePosition(id, x, y) {
    setRedPieces((reds) => reds.map((p) => (p.id === id ? { ...p, x, y } : p)));
    setBluePieces((blues) => blues.map((p) => (p.id === id ? { ...p, x, y } : p)));
  }

  function updatePieceLabel(id, newLabel) {
    if (newLabel === '') newLabel = ' '; // avoid empty input
    setRedPieces((reds) => reds.map((p) => (p.id === id ? { ...p, label: newLabel } : p)));
    setBluePieces((blues) => blues.map((p) => (p.id === id ? { ...p, label: newLabel } : p)));
  }

  function handleMapClick(e) {
    if (!placingMarkerType) return;
    const rect = e.currentTarget.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    // Clamp inside the map
    x = Math.max(12, Math.min(x, MAP_WIDTH - 12));
    y = Math.max(12, Math.min(y, MAP_HEIGHT - 12));

    const newMarker = {
      id: 'M' + (markers.length + 1),
      type: placingMarkerType,
      x,
      y,
    };
    setMarkers([...markers, newMarker]);
    setPlacingMarkerType(null);
  }

  function updateMarkerPosition(id, x, y) {
    setMarkers((oldMarkers) =>
      oldMarkers.map((m) => (m.id === id ? { ...m, x, y } : m))
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#121212',
        color: '#eee',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 20,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Left Sidebar */}
      <div
        style={{
          width: 160,
          backgroundColor: '#222',
          borderRadius: 8,
          border: '2px solid #444',
          padding: '15px 10px',
          marginRight: 20,
          userSelect: 'none',
        }}
      >
        <h2 style={{ marginTop: 0, marginBottom: 15, fontSize: 20, textAlign: 'center' }}>Markers</h2>
        <button
          style={{
            width: '100%',
            marginBottom: 10,
            padding: '8px',
            fontSize: 16,
            cursor: 'pointer',
            borderRadius: 5,
            border: 'none',
            backgroundColor: placingMarkerType === markerTypes.FRAG ? '#ff6f00' : '#444',
            color: 'white',
          }}
          onClick={() => setPlacingMarkerType(markerTypes.FRAG)}
        >
          Place Frag
        </button>
        <button
          style={{
            width: '100%',
            marginBottom: 10,
            padding: '8px',
            fontSize: 16,
            cursor: 'pointer',
            borderRadius: 5,
            border: 'none',
            backgroundColor: placingMarkerType === markerTypes.FLASH ? '#ffd600' : '#444',
            color: 'black',
          }}
          onClick={() => setPlacingMarkerType(markerTypes.FLASH)}
        >
          Place Flash
        </button>
        <button
          style={{
            width: '100%',
            padding: '8px',
            fontSize: 16,
            cursor: 'pointer',
            borderRadius: 5,
            border: 'none',
            backgroundColor: '#666',
            color: 'white',
          }}
          onClick={() => setPlacingMarkerType(null)}
        >
          Cancel
        </button>
      </div>

      {/* Main Map and Title */}
      <div>
        <h1 style={{ textAlign: 'center', marginBottom: 12, userSelect: 'none' }}>
          Onward Strat Planner
        </h1>
        <svg
          width={MAP_WIDTH}
          height={MAP_HEIGHT}
          style={{
            border: '3px solid #555',
            borderRadius: 10,
            backgroundImage: "url('/maps/suburbia-clean.png')",
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            userSelect: 'none',
            display: 'block',
          }}
          onClick={handleMapClick}
        >
          {redPieces.map((p) => (
            <DraggableCircle
              key={p.id}
              piece={p}
              onDrag={updatePiecePosition}
              onLabelChange={updatePieceLabel}
            />
          ))}
          {bluePieces.map((p) => (
            <DraggableCircle
              key={p.id}
              piece={p}
              onDrag={updatePiecePosition}
              onLabelChange={updatePieceLabel}
            />
          ))}
          {markers.map((m) => (
            <Marker key={m.id} marker={m} onDrag={updateMarkerPosition} />
          ))}
        </svg>
        <p style={{ textAlign: 'center', marginTop: 8, userSelect: 'none', color: '#888' }}>
          Click map to place selected marker
        </p>
      </div>
    </div>
  );
}
