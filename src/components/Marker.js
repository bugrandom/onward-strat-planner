import Draggable from './Draggable';

export default function Marker({ marker, onDrag, radius = 12 }) {
  return (
    <Draggable
      x={marker.x}
      y={marker.y}
      onDrag={(x, y) => onDrag(marker.id, x, y)}
      bounds={{ minX: radius, maxX: 800 - radius, minY: radius, maxY: 600 - radius }}
    >
      {(pos, handleDown, handleMove, handleUp) => (
        <circle
          cx={pos.x}
          cy={pos.y}
          r={radius}
          fill={marker.type === 'frag' ? 'orange' : 'yellow'}
          stroke="black"
          strokeWidth={2}
          onPointerDown={handleDown}
          onPointerMove={handleMove}
          onPointerUp={handleUp}
          style={{ cursor: 'grab' }}
        />
      )}
    </Draggable>
  );
}

