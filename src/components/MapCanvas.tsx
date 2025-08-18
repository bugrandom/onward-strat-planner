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

    const drawImageCover = () => {
      if (!canvas || !ctx || !img.complete) return;

      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      const canvasRatio = canvas.width / canvas.height;
      const imageRatio = img.width / img.height;

      let srcX = 0, srcY = 0, srcWidth = img.width, srcHeight = img.height;

      if (imageRatio > canvasRatio) {
        // Image is wider — crop sides
        srcWidth = img.height * canvasRatio;
        srcX = (img.width - srcWidth) / 2;
      } else {
        // Image is taller — crop top/bottom
        srcHeight = img.width / canvasRatio;
        srcY = (img.height - srcHeight) / 2;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, srcX, srcY, srcWidth, srcHeight, 0, 0, canvas.width, canvas.height);
    };

    img.onload = drawImageCover;
    window.addEventListener('resize', drawImageCover);

    return () => {
      window.removeEventListener('resize', drawImageCover);
    };
  }, []);

  return (
    <div className="w-full h-full bg-gray-900 flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
