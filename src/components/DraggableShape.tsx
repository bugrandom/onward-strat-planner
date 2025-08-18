import React from 'react';

type Props = {
  id: string;
  team: 'red' | 'teal';
  type: 'square' | 'circle' | 'hexagon' | 'diamond';
};

export default function DraggableShape({ id, team, type }: Props) {
  const color = team === 'red' ? 'bg-red-500' : 'bg-teal-500';

  const shapeClass =
    type === 'square' ? ''
    : type === 'circle' ? 'rounded-full'
    : type === 'diamond' ? 'clip-diamond'
    : type === 'hexagon' ? 'clip-hexagon'
    : '';

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('shape-id', id);
        e.dataTransfer.setData('shape-type', type);
        e.dataTransfer.setData('shape-team', team);
      }}
      className={`cursor-grab w-10 h-10 ${color} ${shapeClass} shadow-md`}
      title={id.split('-')[1]}
    />
  );
}
