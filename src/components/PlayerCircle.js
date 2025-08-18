import React from 'react';

export default function PlayerCircle({ piece }) {
  const { x, y, label, role } = piece;

  const shapeProps = {
    fill: 'blue',
    stroke: 'black',
    strokeWidth: 2,
  };

  const renderShape = () => {
    switch (role) {
      case 'Rifleman':
        return <rect x={x - 14} y={y - 14} width="28" height="28" {...shapeProps} />;
      case 'Specialist':
        return <circle cx={x} cy={y} r={14} {...shapeProps} />;
      case 'Support':
        return (
          <polygon
            points={hexPoints(x, y, 14)}
            {...shapeProps}
          />
        );
      case 'Marksman':
        return (
          <polygon
            points={`${x},${y - 14} ${x + 14},${y} ${x},${y + 14} ${x - 14},${y}`}
            {...shapeProps}
          />
        );
      default:
        return <circle cx={x} cy={y} r={14} {...shapeProps} />;
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

  return (
    <>
      {renderShape()}
      <text x={x} y={y + 5} textAnchor="middle" fontSize="14" fill="white">
        {label}
      </text>
    </>
  );
}

