/**
 * SplitText — character-by-character stagger entrance.
 * MIT-derived from react-bits by DavidHDev.
 */
import { useEffect, useRef } from 'react';

export default function SplitText({ children, className = '', delay = 0 }) {
  const elRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = elRef.current;
    if (!el || reduced) return;

    const text = el.textContent || '';
    el.textContent = '';
    el.style.opacity = '1';

    const chars = [];
    for (const ch of text) {
      const span = document.createElement('span');
      span.textContent = ch === ' ' ? ' ' : ch;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      span.style.transition = 'opacity 0.4s ease, transform 0.5s ease';
      el.appendChild(span);
      chars.push(span);
    }

    setTimeout(() => {
      chars.forEach((span, i) => {
        setTimeout(() => {
          span.style.opacity = '1';
          span.style.transform = 'translateY(0)';
        }, i * 40);
      });
    }, delay);
  }, [children, delay]);

  return <span ref={elRef} className={className} style={{ opacity: 0 }}>{children}</span>;
}
