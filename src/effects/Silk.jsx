/**
 * Silk — flowing canvas background.
 * MIT-derived from react-bits by DavidHDev.
 */
import { useEffect, useRef } from 'react';

export default function Silk({ color = 'var(--silk-color)' }) {
  const canvasRef = useRef(null);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let w, h, t = 0;

    function resize() {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }

    function draw() {
      t += 0.003;
      ctx.clearRect(0, 0, w, h);

      const rows = 6;
      for (let i = 0; i < rows; i++) {
        ctx.beginPath();
        const yBase = (h / (rows + 1)) * (i + 1);
        for (let x = 0; x <= w; x += 3) {
          const dy = Math.sin(x * 0.002 + t + i * 1.2) * 30
                   + Math.sin(x * 0.005 - t * 0.7 + i) * 20;
          if (x === 0) ctx.moveTo(x, yBase + dy);
          else ctx.lineTo(x, yBase + dy);
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
      animId = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, [color]);

  return <canvas ref={canvasRef} className="silk-canvas" style={{ position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',opacity:0.7 }} />;
}
