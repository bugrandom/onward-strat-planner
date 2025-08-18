import React, { useState } from 'react';

type DroppedShape = {
  id: string;
  x: number;
  y: number;
};

export default function DropLayer() {
  const [shapes, setShapes] = useState<DroppedShape[]>([]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('shape-id');
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setShapes((prev) => [...prev, { id, x, y }]);
  };

  return (
    <div
      className="absolute inset-0"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {shapes.map((shape, index) => (
        <div
          key={index}
          className="absolute w-6 h-6"
          style={{ left: shape.x, top: shape.y }}
        >
          <div
            className={`w-full h-full ${
              shape.id.includes('red') ? 'bg-red-500' : 'bg-teal-500'
            } ${
              shape.id.includes('square')
                ? ''
                : shape.id.includes('circle')
                ? 'rounded-full'
                : shape.id.includes('diamond')
                ? 'clip-diamond'
                : 'clip-hexagon'
            }`}
          />
        </div>
      ))}
    </div>
  );
}
