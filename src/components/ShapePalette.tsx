import React from 'react';
import DraggableShape from './DraggableShape';

const classes = [
  { id: 'red-rifleman', team: 'red', type: 'square' },
  { id: 'red-specialist', team: 'red', type: 'circle' },
  { id: 'red-support', team: 'red', type: 'hexagon' },
  { id: 'red-marksman', team: 'red', type: 'diamond' },
  { id: 'teal-rifleman', team: 'teal', type: 'square' },
  { id: 'teal-specialist', team: 'teal', type: 'circle' },
  { id: 'teal-support', team: 'teal', type: 'hexagon' },
  { id: 'teal-marksman', team: 'teal', type: 'diamond' },
];

export default function ShapePalette() {
  return (
    <div className="w-40 p-2 bg-gray-800 text-white space-y-4 overflow-y-auto">
      {classes.map((shape) => (
        <DraggableShape key={shape.id} {...shape} />
      ))}
    </div>
  );
}
