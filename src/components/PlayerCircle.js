import { useState } from 'react';

const MAP_WIDTH = 800;
const MAP_HEIGHT = 600;
const TRASH_X = MAP_WIDTH - 60;
const TRASH_Y = MAP_HEIGHT - 60;
const TRASH_SIZE = 50;

const roles = ['Rifleman', 'Specialist', 'Support', 'Marksman'];

export default function PlayerCircle({ piece, onDrag, onDelete }) {
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState({ x: piece.x, y: piece.y });
  const [role, setRole] = useState(piece.role || 'Rifleman');

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

  const renderShape = () => {
    const commonProps = {
      fill: piece.id.startsWith('R') ? 'red' : 'blue',
      stroke: dragging ? 'yellow' : 'black',
      strokeWidth: dragging ? 4 : 2,
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      style: { cursor: 'grab', transition: 'stroke 0.1s, stroke-width 0.1s' },
    };

    switch (role) {
      case 'Rifleman':
        return <rect x={pos.x - 14} y={pos.y - 14} width="28" height="28" {...commonProps} />;
      case 'Specialist':
        return <circle cx={pos.x} cy={pos.y} r={14} {...commonProps} />;
      case 'Support':
        return (
          <polygon
            points={hexPoints(pos.x, pos.y, 14)}
            {...commonProps}
          />
        );
      case 'Marksman':
        return (
          <polygon
            points={diamondPoints(pos.x, pos.y, 14)}
            {...commonProps}
          />
        );
      default:
        return <circle cx={pos.x} cy={pos.y} r={14} {...commonProps} />;
    }
  };

  const hexPoints = (cx, cy, r) => {
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      points.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
    }
    return points.join(' ');
  };

  const diamondPoints = (cx, cy, r) => {
    return `${cx},${cy - r} ${cx + r},${cy} ${cx},${cy + r} ${cx - r},${cy}`;
  };

  return (
    <>
      {renderShape()}
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

      {/* Role Selector */}
      <foreignObject x={pos.x + 20} y={pos.y - 20} width="100" height="40">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ fontSize: '12px', padding: '2px', borderRadius: '4px' }}
        >
          {roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </foreignObject>
    </>
  );
}
