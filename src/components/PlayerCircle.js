import { useState } from 'react';

const MAP_WIDTH = 800;
const MAP_HEIGHT = 600;
const TRASH_X = MAP_WIDTH - 60;
const TRASH_Y = MAP_HEIGHT - 60;
const TRASH_SIZE = 50;

export default function PlayerCircle({ piece, onDrag, onDelete }) {
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
    e.target.releasePointerCapture(e.pointerId);

    // Check if dropped on trash can
    if (
      pos.x >= TRASH_X &&
      pos.x <= TRASH_X + TRASH_SIZE &&
      pos.y >= TRASH_Y &&
      pos.y <= TRASH_Y + TRASH_SIZE
    ) {
      onDelete(piece.id);
    } else {
      onDrag(piece.id, pos.x, pos.y);
    }
  };

  return (
    <>
      <circle
        cx={pos.x}
        cy={pos.y}
        r={14}
        fill={piece.id.startsWith('R') ? 'red' : 'blue'}
        stroke={dragging ? 'yellow' : 'black'}
        strokeWidth={dragging ? 4 : 2}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{ cursor: 'grab', transition: 'stroke 0.1s, stroke-width 0.1s' }}
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
