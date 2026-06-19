/**
 * Showcase page — Magazine Editorial style.
 * Typography-driven · asymmetric layout · generous whitespace · grain texture.
 * react-bits: SplitText, ScrollFloat, ScrollReveal (used sparingly).
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loadData } from '../data/store';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import SplitText from '../effects/SplitText';
import ScrollFloat from '../effects/ScrollFloat';
import ScrollReveal from '../effects/ScrollReveal';

/* ── Empty state ── */
function EmptyState() {
  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div>
        <p className="editorial-label" style={{ marginBottom: 24 }}>Portfolio</p>
        <h1 style={{ marginBottom: 16 }}>
          <SplitText>欢迎来到你的主页</SplitText>
        </h1>
        <div className="editorial-rule" style={{ marginBottom: 24 }} />
        <p style={{ maxWidth: 400, margin: '0 auto 32px', color: 'var(--text-secondary)' }}>
          前往管理后台，上传简历、扫描证书，开始构建你的个人展示页。
        </p>
        <Link to="/admin" className="btn btn-primary">进入管理后台 →</Link>
      </div>
    </section>
  );
}

export default function Showcase() {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(loadData());
    const onStorage = () => setData(loadData());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  if (!data) return null;

  const { profile, certificates, timeline, skills, papers, competitions } = data;
  const hasContent = profile.name || certificates.length || timeline.length || papers.length || competitions.length;
  if (!hasContent) return <><Nav /><EmptyState /></>;

  return (
    <div style={{ position: 'relative' }}>
      {/* Grain texture */}
      <div className="editorial-grain" />

      <Nav />

      {/* ═══════════════════════════════════════
           HERO — Magazine cover style
           ═══════════════════════════════════════ */}
      <section id="hero" style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '120px var(--container-px) 80px',
        position: 'relative',
      }}>
        {/* Eyebrow */}
        <ScrollFloat>
          <span className="editorial-label" style={{ marginBottom: 32, display: 'block' }}>
            Personal Portfolio · {new Date().getFullYear()}
          </span>
        </ScrollFloat>

        {/* Giant name */}
        <h1 style={{
          fontSize: 'clamp(4rem, 10vw, 8rem)',
          fontWeight: 600,
          lineHeight: 0.95,
          letterSpacing: '-0.02em',
          marginBottom: 16,
        }}>
          <SplitText delay={200}>{profile.name}</SplitText>
        </h1>

        {/* Title — small caps feel */}
        <ScrollFloat>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
            fontWeight: 400,
            color: 'var(--accent)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: 32,
          }}>
            {profile.title}
          </p>
        </ScrollFloat>

        {/* Thin rule */}
        <div className="editorial-rule" style={{ marginBottom: 32 }} />

        {/* Bio — editorial intro */}
        {profile.bio && (
          <ScrollReveal>
            <p style={{
              maxWidth: 520, margin: '0 auto',
              fontSize: '1.05rem', lineHeight: 1.8,
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-body)',
            }}>
              {profile.bio}
            </p>
          </ScrollReveal>
        )}

        {/* Contact row */}
        {profile.email && (
          <ScrollReveal>
            <div style={{ display: 'flex', gap: 24, marginTop: 32, fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
              <span>{profile.email}</span>
              {profile.github && <a href={profile.github} target="_blank" rel="noopener">GitHub</a>}
              {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noopener">LinkedIn</a>}
            </div>
          </ScrollReveal>
        )}
      </section>

      {/* ═══════════════════════════════════════
           CERTIFICATES — Editorial feature layout
           ═══════════════════════════════════════ */}
      {certificates.length > 0 && (
        <section id="certificates" style={{ padding: '100px var(--container-px)' }}>
          <div className="container">
            {/* Section header — numbered */}
            <ScrollFloat>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 32, alignItems: 'end', marginBottom: 56 }}>
                <span className="editorial-num">01</span>
                <div>
                  <span className="editorial-label">Credentials</span>
                  <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.6rem)', marginTop: 8 }}>证书 & 资质</h2>
                </div>
              </div>
            </ScrollFloat>

            {/* Featured cert (first one, large) */}
            {certificates[0] && (
              <ScrollReveal>
                <div style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48,
                  alignItems: 'center', marginBottom: 64,
                }}>
                  <figure className="editorial-figure">
                    {certificates[0].image ? (
                      <img src={certificates[0].image} alt={certificates[0].title}
                        style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', aspectRatio: '4/3', background: 'var(--surface-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>证书图片</span>
                      </div>
                    )}
                    <figcaption className="editorial-caption">
                      {certificates[0].issuer} · {certificates[0].date}
                    </figcaption>
                  </figure>
                  <div>
                    <span className="tag accent" style={{ marginBottom: 12 }}>{certificates[0].category}</span>
                    <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', fontWeight: 500, marginTop: 8 }}>
                      {certificates[0].title}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', marginTop: 12, lineHeight: 1.7 }}>
                      {certificates[0].description || `由 ${certificates[0].issuer} 颁发`}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Remaining certs — editorial list */}
            {certificates.slice(1).length > 0 && (
              <ScrollReveal>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: 1,
                  borderTop: '1px solid var(--border)',
                  borderBottom: '1px solid var(--border)',
                }}>
                  {certificates.slice(1).map((cert, i) => (
                    <div key={i} className="editorial-card" style={{
                      padding: '24px',
                      borderRight: (i % 2 === 0) ? '1px solid var(--border-subtle)' : 'none',
                    }}>
                      <span className="tag accent" style={{ marginBottom: 8 }}>{cert.category}</span>
                      <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 500, marginTop: 6 }}>
                        {cert.title}
                      </h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginTop: 4 }}>
                        {cert.issuer} · {cert.date}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            )}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
           TIMELINE — Asymmetric with big numbers
           ═══════════════════════════════════════ */}
      {(timeline.length > 0 || skills.length > 0) && (
        <section id="timeline" style={{ padding: '100px var(--container-px)' }}>
          <div className="container">
            <ScrollFloat>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 32, alignItems: 'end', marginBottom: 56 }}>
                <span className="editorial-num">02</span>
                <div>
                  <span className="editorial-label">Experience</span>
                  <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.6rem)', marginTop: 8 }}>履历</h2>
                </div>
              </div>
            </ScrollFloat>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 64 }}>
              {/* Timeline — main column */}
              <div>
                {timeline.map((item, i) => (
                  <ScrollReveal key={i}>
                    <div style={{
                      display: 'grid', gridTemplateColumns: '100px 1fr', gap: 32,
                      padding: '28px 0', borderBottom: '1px solid var(--border-subtle)',
                    }}>
                      <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.8rem', color: 'var(--text-tertiary)',
                        letterSpacing: '0.04em', paddingTop: 2,
                      }}>
                        {item.start}{item.end ? ` – ${item.end}` : ''}
                      </span>
                      <div>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 500 }}>
                          {item.title || item.school || item.company}
                        </h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--accent)', marginTop: 4 }}>
                          {item.subtitle || item.degree || item.role}
                          {item.field ? ` · ${item.field}` : ''}
                        </p>
                        {item.description && (
                          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: 8, lineHeight: 1.6 }}>
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* Skills — sidebar */}
              {skills.length > 0 && (
                <ScrollReveal>
                  <div className="editorial-aside">
                    <span className="editorial-label" style={{ display: 'block', marginBottom: 20 }}>Skills</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {skills.map((skill, i) => (
                        <span key={i} style={{
                          fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                          color: 'var(--text-secondary)', padding: '4px 0',
                          borderBottom: '1px solid var(--border-subtle)',
                        }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
           PAPERS — Journal table of contents
           ═══════════════════════════════════════ */}
      {papers.length > 0 && (
        <section id="papers" style={{ padding: '100px var(--container-px)' }}>
          <div className="container">
            <ScrollFloat>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 32, alignItems: 'end', marginBottom: 56 }}>
                <span className="editorial-num">03</span>
                <div>
                  <span className="editorial-label">Publications</span>
                  <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.6rem)', marginTop: 8 }}>论文 & 研究</h2>
                </div>
              </div>
            </ScrollFloat>

            <ScrollReveal>
              <div style={{ borderTop: '2px solid var(--text)', borderBottom: '1px solid var(--border)' }}>
                {papers.map((paper, i) => (
                  <a
                    key={i}
                    href={paper.link || '#'}
                    target={paper.link ? '_blank' : undefined}
                    rel={paper.link ? 'noopener' : undefined}
                    style={{
                      display: 'grid', gridTemplateColumns: '40px 1fr auto', gap: 24,
                      padding: '20px 0', borderBottom: '1px solid var(--border-subtle)',
                      color: 'inherit', textDecoration: 'none',
                      transition: 'background 200ms ease',
                      alignItems: 'baseline',
                    }}
                    className="editorial-card"
                  >
                    <span style={{
                      fontFamily: 'var(--font-heading)', fontSize: '1.1rem',
                      color: 'var(--text-tertiary)',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 500, lineHeight: 1.3 }}>
                        {paper.title}
                      </h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                        {paper.authors}
                      </p>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>
                      {paper.journal}{paper.date ? ` · ${paper.date}` : ''}
                    </span>
                  </a>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
           COMPETITIONS — Clean editorial listing
           ═══════════════════════════════════════ */}
      {competitions.length > 0 && (
        <section id="competitions" style={{ padding: '100px var(--container-px)' }}>
          <div className="container">
            <ScrollFloat>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 32, alignItems: 'end', marginBottom: 56 }}>
                <span className="editorial-num">04</span>
                <div>
                  <span className="editorial-label">Achievements</span>
                  <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.6rem)', marginTop: 8 }}>比赛 & 成果</h2>
                </div>
              </div>
            </ScrollFloat>

            <ScrollReveal>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 1, background: 'var(--border-subtle)' }}>
                {competitions.map((comp, i) => (
                  <div key={i} style={{ background: 'var(--bg)', padding: '32px 28px' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'var(--text-tertiary)', fontWeight: 400, opacity: 0.15 }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 500, marginTop: 12 }}>
                      {comp.name}
                    </h3>
                    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                      <span className="tag accent">{comp.date}</span>
                      {comp.result && <span className="tag">{comp.result}</span>}
                    </div>
                    {comp.description && (
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: 12, lineHeight: 1.6 }}>
                        {comp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
           CONTACT — Editorial colophon
           ═══════════════════════════════════════ */}
      <section id="contact" style={{ padding: '100px var(--container-px)' }}>
        <div className="container-narrow" style={{ textAlign: 'center' }}>
          <div className="editorial-rule" style={{ marginBottom: 32 }} />
          <ScrollFloat>
            <span className="editorial-label" style={{ display: 'block', marginBottom: 12 }}>Contact</span>
          </ScrollFloat>
          <ScrollReveal>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap', marginTop: 20 }}>
              {profile.email && (
                <a href={`mailto:${profile.email}`} style={{
                  fontFamily: 'var(--font-heading)', fontSize: '1.05rem', color: 'var(--text-secondary)', textDecoration: 'none',
                  borderBottom: '1px solid var(--border)', paddingBottom: 4, transition: 'color 200ms ease, border-color 200ms ease',
                }}>
                  {profile.email}
                </a>
              )}
              {profile.github && (
                <a href={profile.github} target="_blank" rel="noopener" style={{
                  fontFamily: 'var(--font-heading)', fontSize: '1.05rem', color: 'var(--text-secondary)', textDecoration: 'none',
                  borderBottom: '1px solid var(--border)', paddingBottom: 4, transition: 'color 200ms ease, border-color 200ms ease',
                }}>
                  GitHub
                </a>
              )}
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noopener" style={{
                  fontFamily: 'var(--font-heading)', fontSize: '1.05rem', color: 'var(--text-secondary)', textDecoration: 'none',
                  borderBottom: '1px solid var(--border)', paddingBottom: 4, transition: 'color 200ms ease, border-color 200ms ease',
                }}>
                  LinkedIn
                </a>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
