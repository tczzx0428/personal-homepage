/**
 * Navigation — sticky, scroll-aware, glassmorphism.
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemeSwitcher } from '../context/ThemeContext';

const NAV_ITEMS = [
  { id: 'hero', label: '首页' },
  { id: 'certificates', label: '证书' },
  { id: 'timeline', label: '履历' },
  { id: 'papers', label: '论文' },
  { id: 'competitions', label: '比赛' },
  { id: 'contact', label: '联系' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
      const sections = NAV_ITEMS.map(item => document.getElementById(item.id)).filter(Boolean);
      for (let i = sections.length - 1; i >= 0; i--) {
        const rect = sections[i].getBoundingClientRect();
        if (rect.top <= 120) { setActive(NAV_ITEMS[i].id); break; }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`} style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '14px 0',
      backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      background: scrolled ? 'var(--nav-glass)' : 'var(--nav-glass-init)',
      borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
      transition: 'all 300ms ease',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{
          fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 600,
          color: 'var(--text)', textDecoration: 'none',
        }}>
          Portfolio
        </a>
        <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              style={{
                color: active === item.id ? 'var(--text)' : 'var(--text-tertiary)',
                fontSize: '0.85rem', fontWeight: 500, fontFamily: 'var(--font-body)',
                transition: 'color 200ms ease', cursor: 'pointer',
                border: 'none', background: 'none', padding: '4px 0',
                position: 'relative',
              }}
            >
              {item.label}
              {active === item.id && (
                <span style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: 1.5,
                  background: 'var(--accent)',
                }} />
              )}
            </button>
          ))}
          <ThemeSwitcher compact />
          <Link to="/admin" style={{
            fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-tertiary)',
            textDecoration: 'none', padding: '4px 12px', border: '1px solid var(--border)',
            borderRadius: '8px', transition: 'all 200ms ease',
          }}>
            管理
          </Link>
        </div>
      </div>
    </nav>
  );
}
