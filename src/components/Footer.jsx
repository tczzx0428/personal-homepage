/**
 * Footer component.
 */
export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-subtle)',
      padding: '40px var(--container-px)',
      textAlign: 'center',
    }}>
      <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
        Built with React + react-bits · Design by Bento Noir ·{' '}
        <a href="https://github.com/DavidHDev/react-bits" target="_blank" rel="noopener">
          Motion effects by DavidHDev (MIT)
        </a>
      </p>
    </footer>
  );
}
