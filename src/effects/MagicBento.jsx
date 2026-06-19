/**
 * MagicBento — bento grid with hover glow.
 * MIT-derived from react-bits by DavidHDev.
 */
import { useRef, useCallback } from 'react';

export default function MagicBento({ children, span = '1', className = '', style = {} }) {
  const ref = useRef(null);

  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--bento-x', `${x}%`);
    el.style.setProperty('--bento-y', `${y}%`);
  }, []);

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--bento-x', '-100%');
    el.style.setProperty('--bento-y', '-100%');
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        gridColumn: `span ${span}`,
        position: 'relative', overflow: 'hidden',
        background: 'var(--surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '24px', padding: 'var(--card-padding)',
        transition: 'border-color 300ms ease, box-shadow 300ms ease',
        ...style,
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle 500px at var(--bento-x, -100%) var(--bento-y, -100%), var(--accent-glow), transparent 50%)',
        pointerEvents: 'none', zIndex: 0,
        opacity: 'var(--bento-x, -100%)' === '-100%' ? 0 : 1,
        transition: 'opacity 0.3s ease',
      }} />
      <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>{children}</div>
    </div>
  );
}
