import React, { useState, useRef } from 'react';

const MAP_WIDTH = 800;
const MAP_HEIGHT = 600;

const MAPS = [
  { name: 'Suburbia', image: '/maps/suburbia-clean.png' },
  { name: 'Factory', image: '/maps/factory.png' },
  { name: 'Downtown', image: '/maps/downtown.png' },
];

// Initial pieces with positions for sidebar (not map)
const initialRedPieces = [
  { id: 'R1', label: 'A' },
  { id: 'R2', label: 'B' },
  { id: 'R3', label: 'C' },
  { id: 'R4', label: 'D' },
  { id: 'R5', label: 'E' },
];

const initialBluePieces = [
  { id: 'B1', label: 'A' },
  { id: 'B2', label: 'B' },
  { id: 'B3', label: 'C' },
  { id: 'B4', label: 'D' },
  { id: 'B5', label: 'E' },
];

const markerTypes = {
  FRAG: 'frag',
  FLASH: 'flash',
};

function DraggableCircle({ piece, onLabelChange }) {
  // Since player markers are now on sidebar, no dragging on map needed for them
  return (
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        backgroundColor: piece.id.startsWith('R') ? 'red' : 'blue',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        marginBottom: 8,
        cursor: 'default',
      }}
      title={`${piece.id} - Click letter to edit`}
    >
      <input
        type="text"
        value={piece.label}
        onChange={(e) => onLabelChange(piece.id, e.target.value.toUpperCase())}
        maxLength={1}
        style={{
          width: '20px',
          height: '30px',
          textAlign: 'center',
          fontWeight: 'bold',
          border: 'none',
          background: 'transparent',
          color: 'white',
          userSelect: 'none',
          outline: 'none',
          cursor: 'text',
        }}
      />
    </div>
  );
}

function Marker({ marker, onDrag }) {
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState({ x: marker.x, y: marker.y });
  const svgRef = useRef(null);

  function handlePointerDown(e) {
    e.preventDefault();
    setDragging(true);
    svgRef.current.setPointerCapture(e.pointerId);
  }

  function handlePointerUp(e) {
    e.preventDefault();
    setDragging(false);
    onDrag(marker.id, pos.x, pos.y);
    svgRef.current.releasePointerCapture(e.pointerId);
  }

  function handlePointerMove(e) {
    if (!dragging) return;
    const rect = svgRef.current.getBoundingClientRect();
    let newX = e.clientX - rect.left;
    let newY = e.clientY - rect.top;

    newX = Math.max(12, Math.min(newX, MAP_WIDTH - 12));
    newY = Math.max(12, Math.min(newY, MAP_HEIGHT - 12));
    setPos({ x: newX, y: newY });
  }

  const color = marker.type === markerTypes.FRAG ? 'orange' : 'yellow';

  return (
    <circle
      ref={svgRef}
      cx={pos.x}
      cy={pos.y}
      r={12}
      fill={color}
      stroke="black"
      strokeWidth={2}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      style={{ cursor: 'grab' }}
    />
  );
}

export default function App() {
  const [redPieces, setRedPieces] = useState(initialRedPieces);
  const [bluePieces, setBluePieces] = useState(initialBluePieces);
  const [markers, setMarkers] = useState([]);
  const [placingMarkerType, setPlacingMarkerType] = useState(null);
  const [selectedMap, setSelectedMap] = useState(MAPS[0]);

  function updatePieceLabel(id, newLabel) {
    if (newLabel === '') newLabel = ' '; // prevent empty label
    setRedPieces((reds) =>
      reds.map((p) => (p.id === id ? { ...p, label: newLabel } : p))
    );
    setBluePieces((blues) =>
      blues.map((p) => (p.id === id ? { ...p, label: newLabel } : p))
    );
  }

  function handleMapClick(e) {
    if (!placingMarkerType) return;
    const rect = e.currentTarget.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

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
        gap: 20,
      }}
    >
      {/* Left Sidebar: Markers buttons */}
      <div
        style={{
          width: 160,
          backgroundColor: '#222',
          borderRadius: 8,
          border: '2px solid #444',
          padding: '15px 10px',
          userSelect: 'none',
          flexShrink: 0,
        }}
      >
        <h2 style={{ marginTop: 0, marginBottom: 15, fontSize: 20, textAlign: 'center' }}>
          Markers
        </h2>
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

      {/* Main Map */}
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
            backgroundImage: `url(${selectedMap.image})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            userSelect: 'none',
            display: 'block',
          }}
          onClick={handleMapClick}
        >
          {markers.map((m) => (
            <Marker key={m.id} marker={m} onDrag={updateMarkerPosition} />
          ))}
        </svg>
        <p style={{ textAlign: 'center', marginTop: 8, userSelect: 'none', color: '#888' }}>
          Click map to place selected marker
        </p>
