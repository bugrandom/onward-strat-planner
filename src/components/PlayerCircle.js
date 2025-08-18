import Draggable from './Draggable';

export default function PlayerCircle({ piece, onDrag, radius = 14 }) {
  const color = piece.id.startsWith('R') ? 'red' : 'blue';
  return (
    <Draggable
      x={piece.x}
      y={piece.y}
      onDrag={(x, y) => onDrag(piece.id, x, y)}
      bounds={{ minX: radius, maxX: 800 - radius, minY: radius, maxY: 600 - radius }}
    >
      {(pos, handleDown, handleMove, handleUp) => (
        <>
          <circle
            cx={pos.x}
            cy={pos.y}
            r={radius}
            fill={color}
            stroke="black"
            strokeWidth={2}
            onPointerDown={handleDown}
            onPointerMove={handleMove}
            onPointerUp={handleUp}
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
      )}
    </Draggable>
  );
}

