import React, { useRef, useEffect } from 'react';

export default function MapCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = new URL('../assets/map.png', import.meta.url).href;

    const drawImageScaled = () => {
      if (!canvas || !ctx || !img.complete) return;

      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      const canvasAspect = canvas.width / canvas.height;
      const imageAspect = img.width / img.height;

      let drawWidth = canvas.width;
      let drawHeight = canvas.height;

      if (imageAspect > canvasAspect) {
        drawHeight = canvas.width / imageAspect;
      } else {
        drawWidth = canvas.height * imageAspect;
      }

      const offsetX = (canvas.width - drawWidth) / 2;
      const offsetY = (canvas.height - drawHeight) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    img.onload = drawImageScaled;
    window.addEventListener('resize', drawImageScaled);

    return () => {
      window.removeEventListener('resize', drawImageScaled);
    };
  }, []);

  return (
    <div className="w-full h-full bg-gray-900 flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
