import { useState } from 'react';

export default function Draggable({ x: initialX, y: initialY, onDrag, bounds, children }) {
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const [dragging, setDragging] = useState(false);

  const handleDown = (e) => {
    e.preventDefault();
    setDragging(true);
    e.target.setPointerCapture(e.pointerId);
  };

  const handleMove = (e) => {
    if (!dragging) return;
    const rect = e.target.ownerSVGElement.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    if (bounds) {
      x = Math.max(bounds.minX, Math.min(x, bounds.maxX));
      y = Math.max(bounds.minY, Math.min(y, bounds.maxY));
    }
    setPos({ x, y });
  };

  const handleUp = (e) => {
    setDragging(false);
    onDrag(pos.x, pos.y);
    e.target.releasePointerCapture(e.pointerId);
  };

  return children(pos, handleDown, handleMove, handleUp);
}

