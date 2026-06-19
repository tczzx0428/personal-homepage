/**
 * Theme context — three themes persisted in localStorage.
 */
import { createContext, useContext, useState, useEffect } from 'react';

const THEMES = [
  { id: 'light', label: '杂志浅色', icon: '📰' },
  { id: 'dark', label: '暗夜黑金', icon: '🌙' },
  { id: 'mineral', label: '矿物灰', icon: '🪨' },
];

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  function cycleTheme() {
    setTheme(prev => {
      const idx = THEMES.findIndex(t => t.id === prev);
      return THEMES[(idx + 1) % THEMES.length].id;
    });
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be inside ThemeProvider');
  return ctx;
}

export function ThemeSwitcher({ compact = false }) {
  const { theme, setTheme, cycleTheme, themes } = useTheme();
  const current = themes.find(t => t.id === theme);

  if (compact) {
    return (
      <button
        onClick={cycleTheme}
        title={current?.label}
        style={{
          border: '1px solid var(--border)', borderRadius: 8,
          padding: '4px 10px', fontSize: '0.85rem',
          background: 'var(--surface)', cursor: 'pointer',
          fontFamily: 'var(--font-body)',
          transition: 'all 150ms ease',
        }}
      >
        {current?.icon}
      </button>
    );
  }

  return (
    <div style={{ display: 'flex', gap: 4, background: 'var(--surface-alt)', borderRadius: 10, padding: 3 }}>
      {themes.map(t => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          title={t.label}
          style={{
            padding: '6px 12px', borderRadius: 8, border: 'none',
            fontSize: '0.9rem', cursor: 'pointer',
            background: theme === t.id ? 'var(--surface)' : 'transparent',
            color: theme === t.id ? 'var(--text)' : 'var(--text-tertiary)',
            fontFamily: 'var(--font-body)',
            fontWeight: theme === t.id ? 500 : 400,
            transition: 'all 150ms ease',
            boxShadow: theme === t.id ? 'var(--shadow-card)' : 'none',
          }}
        >
          {t.icon} {t.label}
        </button>
      ))}
    </div>
  );
}
