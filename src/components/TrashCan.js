// TrashCan.js
import React from 'react';

export default function TrashCan({ x, y, width = 60, height = 60 }) {
  return (
    <g>
      {/* Trash can body */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={8}
        ry={8}
        fill="#444"
        stroke="#222"
        strokeWidth={3}
      />
      {/* Trash can lid */}
      <rect
        x={x - 10}
        y={y - 10}
        width={width + 20}
        height={10}
        rx={4}
        ry={4}
        fill="#666"
        stroke="#222"
        strokeWidth={3}
      />
      {/* Trash icon lines */}
      <line
        x1={x + width / 4}
        y1={y + height / 3}
        x2={x + width / 4}
        y2={y + (2 * height) / 3}
        stroke="#ccc"
        strokeWidth={3}
      />
      <line
        x1={x + width / 2}
        y1={y + height / 3}
        x2={x + width / 2}
        y2={y + (2 * height) / 3}
        stroke="#ccc"
        strokeWidth={3}
      />
      <line
        x1={x + (3 * width) / 4}
        y1={y + height / 3}
        x2={x + (3 * width) / 4}
        y2={y + (2 * height) / 3}
        stroke="#ccc"
        strokeWidth={3}
      />
    </g>
  );
}

