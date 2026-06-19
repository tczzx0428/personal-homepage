/**
 * Admin panel — sidebar + full-width content layout.
 * AI: DeepSeek resume parsing (Word/TXT) + certificate scanning (image).
 */
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { loadData, saveData, exportJSON, importJSON } from '../data/store';
import { getDeepSeekKey, setDeepSeekKey, parseResume, scanCertificate } from '../data/api';
import { ThemeSwitcher } from '../context/ThemeContext';
import mammoth from 'mammoth';

/* ── Helpers ── */
function newCert() { return { title: '', issuer: '', date: '', category: 'certificate', description: '', image: '' }; }
function newTimelineItem() { return { type: 'education', title: '', subtitle: '', description: '', start: '', end: '', school: '', degree: '', field: '', company: '', role: '' }; }
function newPaper() { return { title: '', authors: '', journal: '', date: '', abstract: '', link: '' }; }
function newCompetition() { return { name: '', date: '', result: '', description: '' }; }

const SECTIONS = [
  { id: 'api', label: 'API Key', icon: '🔑' },
  { id: 'profile', label: '个人信息', icon: '👤' },
  { id: 'certificates', label: '证书管理', icon: '📜' },
  { id: 'timeline', label: '履历管理', icon: '📅' },
  { id: 'skills', label: '技能标签', icon: '🏷️' },
  { id: 'papers', label: '论文管理', icon: '📄' },
  { id: 'competitions', label: '比赛成果', icon: '🏆' },
];

export default function Admin() {
  const [data, setData] = useState(() => loadData());
  const [apiKey, setApiKey] = useState(() => getDeepSeekKey());
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState('');
  const [activeSection, setActiveSection] = useState('profile');
  const fileInputRef = useRef(null);
  const certInputRef = useRef(null);

  useEffect(() => { saveData(data); }, [data]);
  useEffect(() => { setDeepSeekKey(apiKey); }, [apiKey]);

  function update(fn) { setData(prev => ({ ...prev, ...fn(prev) })); }
  function showStatus(msg) { setStatus(msg); setTimeout(() => setStatus(''), 3000); }

  /* ── Resume parsing ── */
  async function handleResumeUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setLoading('正在解析简历...');
    try {
      let text;
      if (file.name.endsWith('.docx')) {
        const buf = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer: buf });
        text = result.value;
      } else { text = await file.text(); }
      const parsed = await parseResume(text);
      update(prev => {
        const next = { ...prev };
        next.profile = {
          name: parsed.name || prev.profile.name,
          title: parsed.title || prev.profile.title,
          bio: parsed.bio || prev.profile.bio,
          email: parsed.email || prev.profile.email,
          github: parsed.github || prev.profile.github,
          linkedin: parsed.linkedin || prev.profile.linkedin,
          avatar: prev.profile.avatar,
        };
        if (parsed.education?.length) {
          next.timeline = [
            ...next.timeline.filter(t => t.type !== 'education'),
            ...parsed.education.map(e => ({ type: 'education', ...e })),
          ];
        }
        if (parsed.work?.length) {
          next.timeline = [
            ...next.timeline.filter(t => t.type !== 'work'),
            ...parsed.work.map(w => ({ type: 'work', ...w })),
          ];
        }
        if (parsed.skills?.length) {
          next.skills = [...new Set([...next.skills, ...parsed.skills])];
        }
        return next;
      });
      showStatus('✅ 简历解析完成，信息已自动填入');
    } catch (err) { showStatus(`❌ 解析失败：${err.message}`); }
    finally { setLoading(''); e.target.value = ''; }
  }

  /* ── Certificate scanning ── */
  async function handleCertUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setLoading('正在扫描证书...');
    try {
      const reader = new FileReader();
      reader.onload = async (ev) => {
        const base64 = ev.target.result.split(',')[1];
        const certInfo = await scanCertificate(base64);
        const cert = { ...newCert(), ...certInfo, image: ev.target.result };
        update(prev => ({ certificates: [...prev.certificates, cert] }));
        showStatus('✅ 证书识别完成');
        setLoading('');
      };
      reader.readAsDataURL(file);
    } catch (err) { showStatus(`❌ 扫描失败：${err.message}`); setLoading(''); }
    e.target.value = '';
  }

  /* ── Import/Export ── */
  async function handleImportFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    try { const imported = await importJSON(file); setData(prev => ({ ...prev, ...imported })); showStatus('✅ 导入成功'); }
    catch (err) { showStatus(`❌ ${err.message}`); }
    e.target.value = '';
  }

  /* ── Scroll to section ── */
  function scrollTo(id) {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      {/* ═══════ SIDEBAR ═══════ */}
      <aside style={{
        position: 'fixed', top: 0, left: 0, bottom: 0,
        width: 240, background: 'var(--surface)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex', flexDirection: 'column',
        zIndex: 100, overflowY: 'auto',
      }}>
        {/* Logo */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
          <Link to="/" style={{
            fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 600,
            color: 'var(--text)', textDecoration: 'none',
          }}>
            Portfolio
          </Link>
          <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-tertiary)', marginTop: 4, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Admin Panel
          </span>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 8px' }}>
          {SECTIONS.map(s => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                width: '100%', padding: '10px 16px', borderRadius: 10,
                fontSize: '0.9rem', fontWeight: 500,
                color: activeSection === s.id ? 'var(--text)' : 'var(--text-secondary)',
                background: activeSection === s.id ? 'var(--surface-alt)' : 'transparent',
                border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                transition: 'all 150ms ease',
                textAlign: 'left',
              }}
              onMouseEnter={e => { if (activeSection !== s.id) e.target.style.background = 'var(--surface-hover)'; }}
              onMouseLeave={e => { if (activeSection !== s.id) e.target.style.background = 'transparent'; }}
            >
              <span style={{ fontSize: '1rem' }}>{s.icon}</span>
              {s.label}
            </button>
          ))}
        </nav>

        {/* Theme */}
        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border-subtle)' }}>
          <ThemeSwitcher />
        </div>

        {/* Bottom actions */}
        <div style={{ padding: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <button onClick={() => exportJSON(data)}
            style={{ width: '100%', padding: '8px 12px', borderRadius: 8, fontSize: '0.8rem', fontWeight: 500,
              background: 'var(--surface-alt)', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)',
              cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 150ms ease', }}>
            📥 导出数据
          </button>
          <button onClick={() => fileInputRef.current?.click()}
            style={{ width: '100%', padding: '8px 12px', borderRadius: 8, fontSize: '0.8rem', fontWeight: 500,
              background: 'var(--surface-alt)', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)',
              cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 150ms ease', }}>
            📤 导入数据
          </button>
          <input ref={fileInputRef} type="file" accept=".json" onChange={handleImportFile} style={{ display: 'none' }} />
          <Link to="/" style={{
            display: 'block', textAlign: 'center', padding: '8px', borderRadius: 8,
            fontSize: '0.8rem', color: 'var(--accent)', textDecoration: 'none',
            fontFamily: 'var(--font-body)', fontWeight: 500, marginTop: 4,
          }}>
            查看展示页 →
          </Link>
        </div>
      </aside>

      {/* ═══════ MAIN CONTENT ═══════ */}
      <main style={{ flex: 1, marginLeft: 240, padding: '32px 40px', minWidth: 0 }}>
        {/* Status toast */}
        {status && (
          <div style={{
            position: 'fixed', top: 24, right: 24, zIndex: 200,
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '12px 20px', fontSize: '0.9rem',
            boxShadow: 'var(--shadow-card)',
          }}>{status}</div>
        )}

        {/* Loading overlay */}
        {loading && (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 300,
            background: 'var(--loading-bg)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ background: 'var(--surface)', borderRadius: 16, padding: '36px 48px', textAlign: 'center', boxShadow: '0 8px 32px oklch(0% 0 0 / 10%)' }}>
              <p style={{ fontSize: '1.15rem', fontWeight: 500 }}>🤖 {loading}</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginTop: 6 }}>正在调用 DeepSeek API...</p>
            </div>
          </div>
        )}

        {/* ═══════ API Key ═══════ */}
        <section id="api" style={{ marginBottom: 48, maxWidth: 960 }}>
          <h2 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', marginBottom: 6 }}>🔑 DeepSeek API Key</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginBottom: 16 }}>
            Key 仅保存在浏览器 localStorage 中，用于简历解析和证书扫描。
          </p>
          <input type="password" className="input" value={apiKey}
            onChange={e => setApiKey(e.target.value)} placeholder="sk-..."
            style={{ fontFamily: 'var(--font-mono)', maxWidth: 480 }} />
        </section>

        {/* ═══════ PROFILE ═══════ */}
        <section id="profile" style={{ marginBottom: 48, maxWidth: 960 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <h2 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)' }}>👤 个人信息</h2>
            <label style={{ cursor: 'pointer', fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 500, padding: '6px 14px', border: '1px solid var(--accent-subtle)', borderRadius: 8, background: 'var(--accent-subtle)', transition: 'all 150ms ease', }}>
              📄 上传简历自动填写
              <input type="file" accept=".docx,.txt,.md" onChange={handleResumeUpload} style={{ display: 'none' }} />
            </label>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginBottom: 20 }}>
            上传 Word 或 TXT 文件，AI 自动提取并填入下方字段。
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>姓名</label>
              <input className="input" placeholder="姓名" value={data.profile.name}
                onChange={e => update(() => ({ profile: { ...data.profile, name: e.target.value } }))} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>头衔</label>
              <input className="input" placeholder="如：大模型策略产品经理" value={data.profile.title}
                onChange={e => update(() => ({ profile: { ...data.profile, title: e.target.value } }))} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>个人简介</label>
              <textarea className="input" placeholder="一句话介绍自己" value={data.profile.bio}
                onChange={e => update(() => ({ profile: { ...data.profile, bio: e.target.value } }))}
                rows={3} style={{ resize: 'vertical' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>邮箱</label>
              <input className="input" placeholder="email@example.com" value={data.profile.email}
                onChange={e => update(() => ({ profile: { ...data.profile, email: e.target.value } }))} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>GitHub URL</label>
              <input className="input" placeholder="https://github.com/..." value={data.profile.github}
                onChange={e => update(() => ({ profile: { ...data.profile, github: e.target.value } }))} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>LinkedIn URL</label>
              <input className="input" placeholder="https://linkedin.com/in/..." value={data.profile.linkedin}
                onChange={e => update(() => ({ profile: { ...data.profile, linkedin: e.target.value } }))} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>头像 URL</label>
              <input className="input" placeholder="https://..." value={data.profile.avatar}
                onChange={e => update(() => ({ profile: { ...data.profile, avatar: e.target.value } }))} />
            </div>
          </div>
        </section>

        {/* ═══════ CERTIFICATES ═══════ */}
        <section id="certificates" style={{ marginBottom: 48, maxWidth: 960 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <h2 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)' }}>📜 证书 & 资质</h2>
            <div style={{ display: 'flex', gap: 8 }}>
              <label style={{ cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500, padding: '6px 14px', borderRadius: 8, background: 'var(--accent)', color: 'var(--text-on-accent)', transition: 'all 150ms ease', }}>
                📷 AI 扫描
                <input type="file" accept="image/*" capture="environment" onChange={handleCertUpload} style={{ display: 'none' }} />
              </label>
              <button className="btn btn-ghost" style={{ fontSize: '0.85rem', padding: '6px 14px' }}
                onClick={() => update(prev => ({ certificates: [...prev.certificates, newCert()] }))}>
                + 手动添加
              </button>
            </div>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginBottom: 20 }}>
            上传证书图片，AI 自动识别名称/机构/日期；或手动填写。
          </p>

          {data.certificates.length === 0 && (
            <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.9rem', border: '2px dashed var(--border)', borderRadius: 16 }}>
              暂无证书，点击上方按钮添加
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: 16 }}>
            {data.certificates.map((cert, i) => (
              <div key={i} className="card" style={{ position: 'relative' }}>
                <button onClick={() => update(prev => ({ certificates: prev.certificates.filter((_, j) => j !== i) }))}
                  style={{ position: 'absolute', top: 12, right: 12, color: 'var(--error)', fontSize: '0.8rem', cursor: 'pointer', border: 'none', background: 'none' }}>
                  删除
                </button>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: 4 }}>名称</label>
                    <input className="input" value={cert.title} placeholder="证书名称"
                      onChange={e => update(prev => { const c = [...prev.certificates]; c[i] = { ...c[i], title: e.target.value }; return { certificates: c }; })} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: 4 }}>颁发机构</label>
                    <input className="input" value={cert.issuer} placeholder="机构"
                      onChange={e => update(prev => { const c = [...prev.certificates]; c[i] = { ...c[i], issuer: e.target.value }; return { certificates: c }; })} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: 4 }}>日期</label>
                    <input className="input" value={cert.date} placeholder="YYYY-MM-DD"
                      onChange={e => update(prev => { const c = [...prev.certificates]; c[i] = { ...c[i], date: e.target.value }; return { certificates: c }; })} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: 4 }}>类型</label>
                    <select className="input" value={cert.category}
                      onChange={e => update(prev => { const c = [...prev.certificates]; c[i] = { ...c[i], category: e.target.value }; return { certificates: c }; })}>
                      <option value="certificate">证书</option><option value="award">奖项</option><option value="license">执照</option><option value="other">其他</option>
                    </select>
                  </div>
                </div>
                <div style={{ marginTop: 12 }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: 4 }}>图片 URL</label>
                  <input className="input" value={cert.image || ''} placeholder="https://... 或 data:image/..."
                    onChange={e => update(prev => { const c = [...prev.certificates]; c[i] = { ...c[i], image: e.target.value }; return { certificates: c }; })} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════ TIMELINE ═══════ */}
        <section id="timeline" style={{ marginBottom: 48, maxWidth: 960 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <h2 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)' }}>📅 履历</h2>
            <button className="btn btn-ghost" style={{ fontSize: '0.85rem', padding: '6px 14px' }}
              onClick={() => update(prev => ({ timeline: [...prev.timeline, newTimelineItem()] }))}>
              + 添加
            </button>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginBottom: 20 }}>
            按时间倒序排列。类型：教育 / 工作 / 其他。
          </p>

          {data.timeline.length === 0 && (
            <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.9rem', border: '2px dashed var(--border)', borderRadius: 16 }}>
              暂无履历条目，点击上方按钮添加
            </div>
          )}

          {data.timeline.map((item, i) => (
            <div key={i} className="card" style={{ marginBottom: 16, position: 'relative' }}>
              <button onClick={() => update(prev => ({ timeline: prev.timeline.filter((_, j) => j !== i) }))}
                style={{ position: 'absolute', top: 12, right: 12, color: 'var(--error)', fontSize: '0.8rem', cursor: 'pointer', border: 'none', background: 'none' }}>删除</button>

              {/* Type + Entity row */}
              <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr 1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: 4 }}>类型</label>
                  <select className="input" value={item.type}
                    onChange={e => update(prev => { const t = [...prev.timeline]; t[i] = { ...t[i], type: e.target.value }; return { timeline: t }; })}>
                    <option value="education">🎓 教育</option><option value="work">💼 工作</option><option value="other">📌 其他</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: 4 }}>
                    {item.type === 'education' ? '学校' : item.type === 'work' ? '公司' : '标题'}
                  </label>
                  <input className="input" value={item.school || item.company || item.title || ''}
                    onChange={e => update(prev => { const t = [...prev.timeline]; const val = e.target.value;
                      if (t[i].type === 'education') t[i] = { ...t[i], school: val };
                      else if (t[i].type === 'work') t[i] = { ...t[i], company: val };
                      else t[i] = { ...t[i], title: val };
                      return { timeline: t }; })} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: 4 }}>开始</label>
                  <input className="input" value={item.start} placeholder="2024"
                    onChange={e => update(prev => { const t = [...prev.timeline]; t[i] = { ...t[i], start: e.target.value }; return { timeline: t }; })} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: 4 }}>结束</label>
                  <input className="input" value={item.end} placeholder="至今"
                    onChange={e => update(prev => { const t = [...prev.timeline]; t[i] = { ...t[i], end: e.target.value }; return { timeline: t }; })} />
                </div>
              </div>

              {/* Degree/Role row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: 4 }}>
                    {item.type === 'education' ? '学位' : '职位'}
                  </label>
                  <input className="input" value={item.degree || item.role || item.subtitle || ''}
                    onChange={e => update(prev => { const t = [...prev.timeline]; const val = e.target.value;
                      if (t[i].type === 'education') t[i] = { ...t[i], degree: val };
                      else if (t[i].type === 'work') t[i] = { ...t[i], role: val };
                      else t[i] = { ...t[i], subtitle: val };
                      return { timeline: t }; })} />
                </div>
                {item.type === 'education' && (
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: 4 }}>专业</label>
                    <input className="input" value={item.field || ''} placeholder="专业方向"
                      onChange={e => update(prev => { const t = [...prev.timeline]; t[i] = { ...t[i], field: e.target.value }; return { timeline: t }; })} />
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: 4 }}>描述</label>
                <textarea className="input" value={item.description || ''} rows={3} style={{ resize: 'vertical' }}
                  placeholder="详细描述..."
                  onChange={e => update(prev => { const t = [...prev.timeline]; t[i] = { ...t[i], description: e.target.value }; return { timeline: t }; })} />
              </div>
            </div>
          ))}
        </section>

        {/* ═══════ SKILLS ═══════ */}
        <section id="skills" style={{ marginBottom: 48, maxWidth: 960 }}>
          <h2 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', marginBottom: 6 }}>🏷️ 技能标签</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginBottom: 16 }}>
            点击标签可删除，下方输入框添加新技能。
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16, minHeight: 32 }}>
            {data.skills.map((skill, i) => (
              <span key={i} className="tag accent" style={{ cursor: 'pointer', fontSize: '0.85rem', padding: '8px 18px' }}
                onClick={() => update(prev => ({ skills: prev.skills.filter((_, j) => j !== i) }))}>
                {skill} ✕
              </span>
            ))}
          </div>
          <form onSubmit={e => {
            e.preventDefault();
            const val = e.target.skill.value.trim();
            if (val && !data.skills.includes(val)) update(prev => ({ skills: [...prev.skills, val] }));
            e.target.skill.value = '';
          }}>
            <input name="skill" className="input" placeholder="输入技能名称，回车添加" style={{ maxWidth: 320 }} />
          </form>
        </section>

        {/* ═══════ PAPERS ═══════ */}
        <section id="papers" style={{ marginBottom: 48, maxWidth: 960 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <h2 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)' }}>📄 论文</h2>
            <button className="btn btn-ghost" style={{ fontSize: '0.85rem', padding: '6px 14px' }}
              onClick={() => update(prev => ({ papers: [...prev.papers, newPaper()] }))}>+ 添加</button>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginBottom: 20 }}>第一作者请注明。</p>

          {data.papers.length === 0 && (
            <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.9rem', border: '2px dashed var(--border)', borderRadius: 16 }}>
              暂无论文，点击上方按钮添加
            </div>
          )}

          {data.papers.map((paper, i) => (
            <div key={i} className="card" style={{ marginBottom: 16, position: 'relative' }}>
              <button onClick={() => update(prev => ({ papers: prev.papers.filter((_, j) => j !== i) }))}
                style={{ position: 'absolute', top: 12, right: 12, color: 'var(--error)', fontSize: '0.8rem', cursor: 'pointer', border: 'none', background: 'none' }}>删除</button>

              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: 4 }}>标题</label>
                <input className="input" value={paper.title} placeholder="论文标题"
                  onChange={e => update(prev => { const p = [...prev.papers]; p[i] = { ...p[i], title: e.target.value }; return { papers: p }; })} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: 4 }}>作者</label>
                  <input className="input" value={paper.authors} placeholder="Zixuan Zhang (第一作者)"
                    onChange={e => update(prev => { const p = [...prev.papers]; p[i] = { ...p[i], authors: e.target.value }; return { papers: p }; })} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: 4 }}>期刊/会议</label>
                  <input className="input" value={paper.journal} placeholder="JBHI (SCI一区)"
                    onChange={e => update(prev => { const p = [...prev.papers]; p[i] = { ...p[i], journal: e.target.value }; return { papers: p }; })} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: 4 }}>日期</label>
                  <input className="input" value={paper.date} placeholder="2025"
                    onChange={e => update(prev => { const p = [...prev.papers]; p[i] = { ...p[i], date: e.target.value }; return { papers: p }; })} />
                </div>
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: 4 }}>摘要</label>
                <textarea className="input" value={paper.abstract || ''} rows={3} style={{ resize: 'vertical' }}
                  onChange={e => update(prev => { const p = [...prev.papers]; p[i] = { ...p[i], abstract: e.target.value }; return { papers: p }; })} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: 4 }}>链接</label>
                <input className="input" value={paper.link || ''} placeholder="https://..."
                  onChange={e => update(prev => { const p = [...prev.papers]; p[i] = { ...p[i], link: e.target.value }; return { papers: p }; })} />
              </div>
            </div>
          ))}
        </section>

        {/* ═══════ COMPETITIONS ═══════ */}
        <section id="competitions" style={{ marginBottom: 48, maxWidth: 960 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <h2 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)' }}>🏆 比赛 & 成果</h2>
            <button className="btn btn-ghost" style={{ fontSize: '0.85rem', padding: '6px 14px' }}
              onClick={() => update(prev => ({ competitions: [...prev.competitions, newCompetition()] }))}>+ 添加</button>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginBottom: 20 }}>按奖项级别排序：特等奖 → 一等奖 → 二等奖 → 三等奖。</p>

          {data.competitions.length === 0 && (
            <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.9rem', border: '2px dashed var(--border)', borderRadius: 16 }}>
              暂无比赛记录，点击上方按钮添加
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: 16 }}>
            {data.competitions.map((comp, i) => (
              <div key={i} className="card" style={{ position: 'relative' }}>
                <button onClick={() => update(prev => ({ competitions: prev.competitions.filter((_, j) => j !== i) }))}
                  style={{ position: 'absolute', top: 12, right: 12, color: 'var(--error)', fontSize: '0.8rem', cursor: 'pointer', border: 'none', background: 'none' }}>删除</button>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: 4 }}>名称</label>
                    <input className="input" value={comp.name} placeholder="比赛名称"
                      onChange={e => update(prev => { const c = [...prev.competitions]; c[i] = { ...c[i], name: e.target.value }; return { competitions: c }; })} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: 4 }}>奖项</label>
                    <select className="input" value={comp.result}
                      onChange={e => update(prev => { const c = [...prev.competitions]; c[i] = { ...c[i], result: e.target.value }; return { competitions: c }; })}>
                      <option value="">选择</option>
                      <option value="🥇 全国特等奖">🥇 全国特等奖</option>
                      <option value="🥇 全国一等奖">🥇 全国一等奖</option>
                      <option value="🥇 一等奖">🥇 一等奖</option>
                      <option value="🥈 全国二等奖">🥈 全国二等奖</option>
                      <option value="🥈 二等奖">🥈 二等奖</option>
                      <option value="🥉 三等奖">🥉 三等奖</option>
                      <option value="优秀奖">优秀奖</option>
                      <option value="入围">入围</option>
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: 4 }}>日期</label>
                  <input className="input" value={comp.date} placeholder="2025"
                    onChange={e => update(prev => { const c = [...prev.competitions]; c[i] = { ...c[i], date: e.target.value }; return { competitions: c }; })} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: 4 }}>描述</label>
                  <textarea className="input" value={comp.description || ''} rows={2} style={{ resize: 'vertical' }}
                    onChange={e => update(prev => { const c = [...prev.competitions]; c[i] = { ...c[i], description: e.target.value }; return { competitions: c }; })} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom padding */}
        <div style={{ height: 80 }} />
      </main>
    </div>
  );
}
