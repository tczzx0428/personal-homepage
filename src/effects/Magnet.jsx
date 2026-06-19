/**
 * Magnet — magnetic attraction toward mouse cursor.
 * MIT-derived from react-bits by DavidHDev.
 */
import { useRef } from 'react';

export default function Magnet({ children, className = '', strength = 0.3 }) {
  const ref = useRef(null);

  function handleMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  }

  function handleLeave() {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)';
  }

  if (window.matchMedia('(hover: none)').matches) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ display: 'inline-block', transition: 'transform 0.2s ease-out' }}
    >
      {children}
    </span>
  );
}
