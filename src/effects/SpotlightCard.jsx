/**
 * SpotlightCard — mouse-following spotlight on card.
 * MIT-derived from react-bits by DavidHDev.
 */
import { useRef, useCallback } from 'react';

export default function SpotlightCard({ children, className = '', style = {} }) {
  const ref = useRef(null);

  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--spot-x', `${x}%`);
    el.style.setProperty('--spot-y', `${y}%`);
    el.style.setProperty('--spot-opacity', '0.15');
  }, []);

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--spot-opacity', '0');
  }, []);

  return (
    <div
      ref={ref}
      className={`card ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle 400px at var(--spot-x, 50%) var(--spot-y, 50%), var(--accent), transparent 50%)',
        opacity: 'var(--spot-opacity, 0)',
        pointerEvents: 'none', zIndex: 0,
        transition: 'opacity 0.4s ease',
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}
