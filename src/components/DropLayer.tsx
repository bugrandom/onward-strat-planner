import React, { useState } from 'react';

type DroppedShape = {
  id: string;
  type: 'square' | 'circle' | 'hexagon' | 'diamond';
  team: 'red' | 'teal';
  x: number;
  y: number;
};

export default function DropLayer() {
  const [shapes, setShapes] = useState<DroppedShape[]>([]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('shape-id');
    const type = e.dataTransfer.getData('shape-type') as DroppedShape['type'];
    const team = e.dataTransfer.getData('shape-team') as DroppedShape['team'];

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setShapes((prev) => [...prev, { id, type, team, x, y }]);
  };

  return (
    <div
      className="absolute inset-0 z-10"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {shapes.map((shape, index) => {
        const colorClass = shape.team === 'red' ? 'bg-red-500' : 'bg-teal-500';
        const shapeClass =
          shape.type === 'square' ? ''
          : shape.type === 'circle' ? 'rounded-full'
          : shape.type === 'diamond' ? 'clip-diamond'
          : shape.type === 'hexagon' ? 'clip-hexagon'
          : '';

        return (
          <div
            key={index}
            className="absolute w-6 h-6"
            style={{ left: shape.x, top: shape.y }}
          >
            <div className={`w-full h-full ${colorClass} ${shapeClass}`} />
          </div>
        );
      })}
    </div>
  );
}
