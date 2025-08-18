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

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const id = e.dataTransfer.getData('shape-id') || crypto.randomUUID();
    const type = e.dataTransfer.getData('shape-type') as DroppedShape['type'];
    const team = e.dataTransfer.getData('shape-team') as DroppedShape['team'];
    const indexStr = e.dataTransfer.getData('shape-index');
    const index = indexStr ? parseInt(indexStr) : null;

    if (index !== null && !isNaN(index)) {
      // Move existing shape
      setShapes((prev) =>
        prev.map((s, i) => (i === index ? { ...s, x, y } : s))
      );
    } else {
      // Spawn new shape
      setShapes((prev) => [...prev, { id, type, team, x, y }]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const getColorClass = (team: DroppedShape['team']) =>
    team === 'red' ? 'bg-red-500' : 'bg-teal-500';

  const getShapeClass = (type: DroppedShape['type']) =>
    type === 'square'
      ? ''
      : type === 'circle'
      ? 'rounded-full'
      : type === 'diamond'
      ? 'clip-diamond'
      : type === 'hexagon'
      ? 'clip-hexagon'
      : '';

  return (
    <div
      className="absolute inset-0 z-10"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {shapes.map((shape, index) => (
        <div
          key={shape.id}
          className="absolute w-6 h-6 cursor-move"
          style={{ left: shape.x, top: shape.y }}
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData('shape-id', shape.id);
            e.dataTransfer.setData('shape-type', shape.type);
            e.dataTransfer.setData('shape-team', shape.team);
            e.dataTransfer.setData('shape-index', index.toString());
          }}
        >
          <div
            className={`w-full h-full ${getColorClass(shape.team)} ${getShapeClass(shape.type)}`}
          />
        </div>
      ))}
    </div>
  );
}
