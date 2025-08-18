import { useState } from 'react';

const MAP_WIDTH = 800;
const MAP_HEIGHT = 600;

const PlayerCircle = ({ piece, onDrag }) => {
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
        stroke={dragging ? 'yellow' : 'black'} // <- Glow when dragging
        strokeWidth={dragging ? 4 : 2}         // <- Thicker stroke for effect
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{
          cursor: 'grab',
          transition: 'stroke 0.1s, stroke-width 0.1s', // smooth transition
        }}
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
};

export default PlayerCircle;
