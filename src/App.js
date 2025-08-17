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
  const [dragging, setDragging] = React.useState(false);
  const [pos, setPos] = React.useState({ x: piece.x, y: piece.y });

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
    const newX = e.clientX - rect.left;
    const newY = e.clientY - rect.top;
    setPos({
      x: Math.min(Math.max(newX, 0), MAP_WIDTH),
      y: Math.min(Math.max(newY, 0), MAP_HEIGHT),
    });
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
      <foreignObject x={pos.x - 10} y={pos.y - 10} width={20} height={20}>
        <input
          type="text"
          value={piece.label}
          onChange={(e) => onLabelChange(piece.id, e.target.value.toUpperCase())}
          maxLength={1}
          style={{
            width: '20px',
            height: '20px',
            textAlign: 'center',
            fontWeight: 'bold',
            border: 'none',
            background: 'transparent',
            color: 'white',
            userSelect: 'none',
          }}
        />
      </foreignObject>
    </g>
  );
}

function Marker({ marker, onDrag }) {
  const [dragging, setDragging] = React.useState(false);
  const [pos, setPos] = React.useState({ x: marker.x, y: marker.y });

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
    const newX = e.clientX - rect.left;
    const newY = e.clientY - rect.top;
    setPos({
      x: Math.min(Math.max(newX, 0), MAP_WIDTH),
      y: Math.min(Math.max(newY, 0), MAP_HEIGHT),
    });
  }

  const color = marker.type === markerTypes.FRAG ? 'orange' : 'yellow';

  return (
    <circle
      cx={pos.x}
      cy={pos.y}
      r={12}
      fill={color}
      stroke="black"
      strokeWidth="2"
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
    setRedPieces((reds) =>
      reds.map((p) => (p.id === id ? { ...p, x, y } : p))
    );
    setBluePieces((blues) =>
      blues.map((p) => (p.id === id ? { ...p, x, y } : p))
    );
  }

  function updatePieceLabel(id, newLabel) {
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
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
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
    <div style={{ padding: 20 }}>
      <h1>Onward Strat Planner - Suburbia</h1>
      <div style={{ marginBottom: 10 }}>
        <button onClick={() => setPlacingMarkerType(markerTypes.FRAG)}>Place Frag</button>{' '}
        <button onClick={() => setPlacingMarkerType(markerTypes.FLASH)}>Place Flash</button>{' '}
        <button onClick={() => setPlacingMarkerType(null)}>Cancel Placement</button>
      </div>
      <svg
        width={MAP_WIDTH}
        height={MAP_HEIGHT}
        style={{
          border: '2px solid black',
          backgroundImage: "url('/maps/suburbia-clean.png')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          userSelect: 'none',
        }}
        onClick={handleMapClick}
      >
        {redPieces.map((p) => (
         

