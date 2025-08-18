import React from 'react';

type Props = {
  id: string;
  team: 'red' | 'teal';
  type: 'square' | 'circle' | 'hexagon' | 'diamond';
};

export default function DraggableShape({ id, team, type }: Props) {
  const color = team === 'red' ? 'bg-red-500' : 'bg-teal-500';

  const shapeStyles = {
    square: 'w-10 h-10',
    circle: 'w-10 h-10 rounded-full',
    diamond: 'w-10 h-10 rotate-45',
    hexagon: 'w-10 h-10 clip-hexagon', // Custom clip path
  };

  return (
    <div
      draggable
      onDragStart={(e) => e.dataTransfer.setData('shape-id', id)}
      className={`cursor-grab ${color} ${shapeStyles[type]} shadow-md`}
      title={id.split('-')[1]}
    />
  );
}
