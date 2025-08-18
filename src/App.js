import React, { useState } from 'react';

const MAP_WIDTH = 800;
const MAP_HEIGHT = 600;

const MAPS = [
  { name: 'Suburbia', image: '/maps/suburbia-clean.png' },
  { name: 'Factory', image: '/maps/factory.png' },
  { name: 'Downtown', image: '/maps/downtown.png' },
];

const initialRedPieces = [
  { id: 'R1', label: 'A', x: 50, y: 50 },
  { id: 'R2', label: 'B', x: 100, y: 50 },
  { id: 'R3', label: 'C', x: 150, y: 50 },
  { id: 'R4', label: 'D', x: 200, y: 50 },
  { id: 'R5', label: 'E', x: 250, y: 50 },
];

const initialBluePieces = [
  { id: 'B1', label: 'A', x: 50, y: 550 },
  { id: 'B2', label: 'B', x: 100, y: 550 },
  { id: 'B3', label: 'C', x: 150, y: 550 },
  { id: 'B4', label: 'D', x: 200, y: 550 },
  { id: 'B5', label: 'E', x: 250, y: 550 },
];

const markerTypes = {
  FRAG: 'frag',
  FLASH: 'flash',
};

function DraggableCircle({ piece, onDrag, onLabelChange }) {
  const [dragging, setDragging] = React.useState(false);
  const [pos, setPos] = React.useState({ x: piece.x, y: piece.y });

  function handlePointerDown(e) {
    e.preventDefault();
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function handlePointerUp(e) {
    e.preventDefault();
    setDragging(false);
    onDrag(piece.id, pos.x, pos.y);
    e.currentTarget.releasePointerCapture(e.pointerId);
  }
  function handlePointerMove(e) {
    if (!dragging) return;
    const rect = e.currentTarget.ownerSVGElement.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    x = Math.max(12, Math.min(x, MAP_WIDTH - 12));
    y = Math.max(12, Math.min(y, MAP_HEIGHT - 12));
    setPos({ x, y });
  }

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
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        style={{ cursor: 'grab' }}
      />
      <foreignObject x={pos.x - 8} y={pos.y - 11} width={16} height={22}>
        <input
          type="text"
          value={piece.label}
          onChange={(e) => onLabelChange(piece.id, e.target.value.toUpperCase())}
          maxLength={1}
          style={{
            width: '16px',
            height: '20px',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '14px',
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            color: 'white',
            userSelect: 'none',
          }}
        />
      </foreignObject>
    </>
  );
}

function Marker({ marker, onDrag }) {
  const [dragging, setDragging] = React.useState(false);
  const [pos, setPos] = React.useState({ x: marker.x, y: marker.y });

  function handlePointerDown(e) {
    e.preventDefault();
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function handlePointerUp(e) {
    e.preventDefault();
    setDragging(false);
    onDrag(marker.id, pos.x, pos.y);
    e.currentTarget.releasePointerCapture(e.pointerId);
  }
  function handlePointerMove(e) {
    if (!dragging) return;
    const rect = e.currentTarget.ownerSVGElement.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    x = Math.max(12, Math.min(x, MAP_WIDTH - 12));
    y = Math.max(12, Math.min(y, MAP_HEIGHT - 12));
    setPos({ x, y });
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
    if (newLabel === '') newLabel = ' ';
    setRedPieces((reds) =>
      reds.map((p) => (p.id === id ? { ...p, label: newLabel } : p))
    );
    setBluePieces((blues) =>
      blues.map((p) => (p.id === id ? { ...p, label: newLabel } : p))
    );
  }

  function updatePiecePosition(id, x, y) {
    setRedPieces((reds) =>
      reds.map((p) => (p.id === id ? { ...p, x, y } : p))
    );
    setBluePieces((blues) =>
      blues.map((p) => (p.id === id ? { ...p, x, y } : p))
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
        <h2
          style={{
            marginTop: 0,
            marginBottom: 15,
            fontSize: 20,
            textAlign: 'center',
          }}
        >
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
            backgroundColor:
              placingMarkerType === markerTypes.FRAG ? '#ff6f00' : '#444',
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
            backgroundColor:
              placingMarkerType === markerTypes.FLASH ? '#ffd600' : '#444',
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
        <p
          style={{
            textAlign: 'center',
            marginTop: 8,
            userSelect: 'none',
            color: '#888',
          }}
        >
          Click map to place selected marker
        </p>
      </div>
    </div>
  );
}
