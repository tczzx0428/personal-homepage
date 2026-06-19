/**
 * GlareHover — light glare sweep on hover.
 * MIT-derived from react-bits by DavidHDev.
 */
import { useRef, useCallback } from 'react';

export default function GlareHover({ children, className = '', style = {} }) {
  const ref = useRef(null);

  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--glare-x', `${x}%`);
    el.style.setProperty('--glare-y', `${y}%`);
  }, []);

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--glare-x', '-50%');
    el.style.setProperty('--glare-y', '-50%');
  }, []);

  return (
    <div
      ref={ref}
      className={className}
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
        background: 'radial-gradient(circle 300px at var(--glare-x, -50%) var(--glare-y, -50%), oklch(100% 0 0 / 4%), transparent 60%)',
        pointerEvents: 'none', zIndex: 1,
        transition: 'opacity 0.3s ease',
      }} />
      {children}
    </div>
  );
}
