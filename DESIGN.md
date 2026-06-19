# DESIGN.md

> **Magazine Editorial** — 浅色纸质感个人主页。字体当装饰、不对称排版、大量呼吸感。像高端杂志内页。
>
> **Quality Stack**: ui-ux-pro-max（设计系统）+ Impeccable（视觉品质）+ Karpathy（代码纪律）+ react-bits（动效组件）
> **Karpathy 行为约束**: 先声明再写码 · 最小实现无冗余 · 只改该改的 · 写完即验证

## 1. Visual Theme & Atmosphere

**Style**: Magazine Editorial + Bento Grid（浅色版本）
**Keywords**: 纸质感、衬线装饰、不对称排版、大量留白、墨水质感、暗琥珀强调
**Tone**: 高端杂志内页、学术期刊 — NOT 模板化、NOT 廉价白色
**Feel**: 翻开一本厚重设计杂志，纸张纹理隐约可见，版面呼吸感十足。

**Interaction Tier**: L2 流畅交互
**Dependencies**: react-bits (SplitText, ScrollFloat, ScrollReveal, Silk, Magnet, GlareHover, MagicBento, SpotlightCard, TiltedCard)
**Physical Scene**: 一位开发者在傍晚 7 点、27 寸外接显示器前，屋内仅一盏台灯，检视自己的技术成果集。暗色模式减少眼部疲劳，暖色调强调色让内容在低光环境中舒适可读。

## 2. Color Palette & Roles

```css
:root {
  /* ── Backgrounds (tinted warm dark ── OKLCH) ── */
  --bg:              oklch(15% 0.007 80);      /* 页面背景，非纯黑 */
  --surface:          oklch(19% 0.007 80);      /* 卡片/容器 */
  --surface-alt:      oklch(23% 0.007 80);      /* 交替 section */
  --surface-hover:    oklch(26% 0.007 80);      /* 悬停态表面 */
  --surface-glass:    oklch(90% 0.003 80 / 6%); /* 毛玻璃表面 */

  /* ── Borders ── */
  --border:           oklch(30% 0.007 80);      /* 默认边框 */
  --border-hover:     oklch(45% 0.007 80);      /* 悬停边框 */
  --border-subtle:    oklch(24% 0.007 80);      /* 轻边框 */

  /* ── Text ── */
  --text:             oklch(93% 0.002 80);      /* 主文字：标题、重要文案 */
  --text-secondary:   oklch(72% 0.005 80);      /* 次文字：正文、描述 */
  --text-tertiary:    oklch(55% 0.005 80);      /* 三级文字：标签、时间 */
  --text-on-accent:   oklch(15% 0.005 80);      /* 强调色上的文字 */

  /* ── Accent (warm amber) ── */
  --accent:           oklch(73% 0.17 62);       /* 主强调色：CTA、链接、活跃态 */
  --accent-hover:     oklch(78% 0.18 62);       /* 强调色 hover */
  --accent-subtle:    oklch(35% 0.04 62);       /* 强调色弱底 */
  --accent-glow:      oklch(73% 0.15 62 / 25%); /* 强调色光晕 */

  /* ── RGB for rgba() fallback ── */
  --accent-rgb:       217 119 6;                /* #d97706 近似 */
  --bg-rgb:           38 36 33;

  /* ── Semantic ── */
  --success:          oklch(68% 0.15 145);      /* 成功绿 */
  --error:            oklch(58% 0.2 25);        /* 错误红 */
  --warning:          oklch(72% 0.12 80);       /* 警告橙 */
}
```

**Color Rules:**
- 所有颜色通过 `var(--xxx)` 引用，**零硬编码色彩值**
- 同一 section 内最多使用 accent 色 2 处（CTA + 一个强调元素）
- Border 只用于分隔，不作为装饰元素
- 禁止 `#000`、`#fff`、`#18181B` 等裸 hex
- 暗色背景下文字对比度 ≥ 4.5:1（text-secondary 需在表面色上验证）

## 3. Typography Rules

**Font Stack:**
```css
@import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,400;6..96,500;6..96,600;6..96,700&family=Jost:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --font-heading: 'Bodoni Moda', 'Noto Serif SC', serif;
  --font-body:    'Jost', 'Noto Sans SC', sans-serif;
  --font-mono:    'JetBrains Mono', 'Fira Code', monospace;
}
```

| Role | Font | Size | Weight | Line Height | Letter Spacing |
|------|------|------|--------|-------------|----------------|
| Hero H1 | Bodoni Moda | clamp(3.5rem, 7vw, 6rem) | 600 | 1.1 | -0.01em |
| Section H2 | Bodoni Moda | clamp(2rem, 4vw, 2.8rem) | 500 | 1.2 | 0 |
| H3 / Card Title | Jost | 1.15rem | 600 | 1.3 | 0 |
| Body | Jost | 1rem~1.0625rem | 400 | 1.7 | 0.01em |
| Body (中文) | Jost → Noto Sans SC | 1rem~1.0625rem | 400 | 1.75 | 0.02em |
| Label / Badge | Jost | 0.75rem | 500 | 1 | 0.04em |
| Mono / Code | JetBrains Mono | 0.875rem | 400 | 1.6 | 0 |

**Typography Rules:**
- Heading weight 永远 ≥ 500
- 正文行宽上限 68ch（约 600px 中文），超则折行
- 标题/正文层级比例 ≥ 1.25（type scale）
- 中文段落行高 ≥ 1.7、字距 0.02em
- **NEVER use**: Inter、Roboto、Arial、Open Sans、Space Grotesk、DM Sans、Fraunces、系统默认字体

**Text Decoration:**
- Hero h1: 允许 subtle glow text-shadow（暗色背景 + 大字号），**禁用** gradient text（`background-clip: text`）
- Section h2: 无渐变、无投影（克制）
- 正文 p: 禁止任何装饰
- 链接 hover: `text-decoration: underline` with `text-underline-offset: 4px`，颜色过渡 200ms

## 4. Component Stylings

### Buttons
```css
.btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 12px 28px; border-radius: 12px;
  font-family: var(--font-body); font-size: 0.95rem; font-weight: 500;
  cursor: pointer; transition: all 200ms ease;
  border: 1px solid transparent;
  position: relative; overflow: hidden;
}
/* Primary */
.btn-primary {
  background: var(--accent); color: var(--text-on-accent);
}
.btn-primary:hover { background: var(--accent-hover); transform: translateY(-1px); }
.btn-primary:active { transform: translateY(0); }
.btn-primary:focus-visible {
  outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 14px;
}
.btn-primary:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

/* Secondary / Ghost */
.btn-ghost {
  background: transparent; color: var(--text); border-color: var(--border);
}
.btn-ghost:hover { background: var(--surface-hover); border-color: var(--border-hover); }
.btn-ghost:active { background: var(--surface-alt); }
.btn-ghost:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
.btn-ghost:disabled { opacity: 0.3; cursor: not-allowed; }
```

### Cards
```css
.card {
  background: var(--surface); border: 1px solid var(--border-subtle);
  border-radius: 20px; padding: 28px;
  transition: border-color 300ms ease, box-shadow 300ms ease;
}
.card:hover {
  border-color: var(--border-hover);
  box-shadow: 0 0 0 1px var(--border-hover), 0 8px 32px oklch(0% 0 0 / 25%);
}
.card:focus-within {
  outline: 2px solid var(--accent); outline-offset: 2px; border-radius: 20px;
}
/* ── 禁止卡片嵌套！── */
```

### Navigation
```css
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  padding: 16px 0;
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: oklch(15% 0.005 80 / 75%);
  border-bottom: 1px solid transparent;
  transition: border-color 300ms ease, background 300ms ease;
}
.nav.scrolled { border-bottom-color: var(--border-subtle); }

.nav-link {
  color: var(--text-secondary); font-family: var(--font-body);
  font-size: 0.9rem; font-weight: 500; text-decoration: none;
  padding: 6px 0; transition: color 200ms ease;
  position: relative;
}
.nav-link::after {
  content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 1.5px;
  background: var(--accent); transition: width 250ms ease;
}
.nav-link:hover { color: var(--text); }
.nav-link:hover::after { width: 100%; }
.nav-link.active { color: var(--text); }
.nav-link.active::after { width: 100%; }
.nav-link:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; border-radius: 2px; }
```

### Links
```css
a {
  color: var(--accent); text-decoration: none;
  transition: color 200ms ease, text-decoration-color 200ms ease;
}
a:hover { text-decoration: underline; text-underline-offset: 4px; text-decoration-color: var(--accent); }
a:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; border-radius: 2px; }
a:visited { color: var(--accent); } /* 暗色模式下 visited 不区分 */
```

### Tags / Badges
```css
.tag {
  display: inline-flex; align-items: center;
  padding: 4px 12px; border-radius: 9999px;
  background: var(--surface-alt); color: var(--text-secondary);
  font-family: var(--font-body); font-size: 0.75rem; font-weight: 500;
  letter-spacing: 0.04em; text-transform: uppercase;
  border: 1px solid var(--border-subtle);
  transition: border-color 200ms ease, color 200ms ease;
}
.tag.accent {
  background: var(--accent-subtle); color: var(--accent);
  border-color: oklch(50% 0.08 62 / 30%);
}
.tag:hover { border-color: var(--border-hover); }
```

### Form Inputs (for certificate upload)
```css
.input {
  width: 100%; padding: 12px 16px; border-radius: 12px;
  background: var(--surface); border: 1px solid var(--border);
  color: var(--text); font-family: var(--font-body); font-size: 0.95rem;
  transition: border-color 200ms ease, box-shadow 200ms ease;
}
.input::placeholder { color: var(--text-tertiary); }
.input:hover { border-color: var(--border-hover); }
.input:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-glow); }
.input:disabled { opacity: 0.4; cursor: not-allowed; }
```

### Upload Zone
```css
.upload-zone {
  border: 2px dashed var(--border);
  border-radius: 20px; padding: 48px 24px;
  text-align: center; cursor: pointer;
  background: var(--surface);
  transition: border-color 200ms ease, background 200ms ease, box-shadow 200ms ease;
}
.upload-zone:hover { border-color: var(--border-hover); background: var(--surface-hover); }
.upload-zone.dragover {
  border-color: var(--accent); background: var(--accent-subtle);
  box-shadow: 0 0 0 4px var(--accent-glow);
}
.upload-zone:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
```

## 5. Layout Principles

**Container:**
- Max width: 1280px
- Padding: clamp(16px, 4vw, 40px)
- Narrow variant (text sections): 720px

**Spacing Scale (8px base):**
- Section vertical padding: 100px (desktop) / 64px (mobile)
- Section gap: 24px
- Card internal padding: 28px
- Component gap: 16-24px
- Grid gap: 20px

**Bento Grid:**
```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 200px;
  gap: 20px;
}
.bento-grid > * { border-radius: 24px; }
/* Varied spans — NO equal-size cards */
.bento-span-1 { grid-column: span 1; grid-row: span 1; }
.bento-span-2 { grid-column: span 2; grid-row: span 1; }
.bento-span-2-2 { grid-column: span 2; grid-row: span 2; }
.bento-span-4 { grid-column: span 4; }
```

**Masonry (certificates):**
```css
.masonry {
  columns: 3; column-gap: 20px;
}
.masonry > * { break-inside: avoid; margin-bottom: 20px; }
```

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | `box-shadow: none` | 页面背景、section 背景 |
| Subtle | `box-shadow: 0 1px 3px oklch(0% 0 0 / 20%)` | 默认卡片 |
| Elevated | `box-shadow: 0 8px 32px oklch(0% 0 0 / 30%)` | hover 卡片、浮层 |
| Glow | `box-shadow: 0 0 24px var(--accent-glow)` | 强调态、CTA hover |

**Rule:** 同一屏最多 2 种 elevation 同时出现。卡片嵌套会产生 elevation 叠加——禁止。

## 7. Animation & Interaction

**Motion Philosophy**: 克制优雅——动效只用于引导视线和反馈操作，不为动而动。所有动效只使用 `opacity` 和 `transform`（GPU 合成层），禁止 `width/height` 动画。

**Tier**: L2

### Dependencies
```
react-bits (MIT by DavidHDev)
```

### React-Bits Component Assignments

| Category | Component | Landing Spot | Reason |
|----------|-----------|-------------|--------|
| **Background** | Silk | Hero 背景层 | 丝绸流动、暗色编辑风首选 |
| **Text — Hero H1** | SplitText | 首屏大标题 | 字符级 stagger 入场 |
| **Text — Section H2** | ScrollFloat | 每个 section 标题 | 随滚动浮入并保持精确位置 |
| **Text — Body/Label** | ScrollReveal | 正文段落 | 随滚动词逐行显现 |
| **Animation — 元素** | Magnet | CTA 按钮 | 鼠标磁吸微交互 |
| **Animation — 元素** | GlareHover | 所有卡片 | hover 高光扫过 |
| **Component** | MagicBento | 项目展示区 | Bento 网格 + hover 光效 |
| **Component** | SpotlightCard | 证书卡片 | 鼠标跟随聚光灯 |
| **Component** | TiltedCard | 精选成果卡片 | 3D 倾斜展示 |

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .silk-canvas { display: none; }
  [data-motion] { opacity: 1 !important; transform: none !important; }
}
```

### Mobile Degrade (< 640px)
- Silk → 静态渐变背景
- TiltedCard → 静态 2D 卡片
- Magnet → 禁用（触摸设备无 hover）
- SpotlightCard → 降级为 GlareHover 的 CSS-only 版本
- ScrollFloat → 降级为简单 fadeIn

## 8. Do's and Don'ts

### Do
- ✅ 所有颜色使用 OKLCH CSS 变量
- ✅ 卡片使用不等大 Bento grid 布局
- ✅ Serif 标题 + Sans 正文形成高对比度层次
- ✅ 每个可交互元素有 hover + focus + active 三态
- ✅ 中文段落行高 ≥ 1.7
- ✅ `prefers-reduced-motion` 降级完整
- ✅ 移动端触摸目标 ≥ 44×44px
- ✅ 图片加载失败时有文字 fallback

### Don't
- ❌ 禁止使用 hex 颜色值（`#xxx`）——全部走 OKLCH 变量
- ❌ 禁止纯黑 `oklch(0% ...)` 或纯白 `oklch(100% ...)`
- ❌ 禁止 Inter / Roboto / Space Grotesk / DM Sans / Arial / Open Sans
- ❌ 禁止渐变色文字（`background-clip: text`）
- ❌ 禁止卡片嵌套（card inside card）
- ❌ 禁止 bounce / elastic 缓动函数
- ❌ 禁止 `border-left` > 1px 侧边条纹装饰
- ❌ 禁止等大尺寸卡片网格（一律 Bento 不等大）
- ❌ 禁止 emoji 作为图标（用内联 SVG）
- ❌ 禁止 `filter: blur()` 用于运动元素
- ❌ 禁止 backdrop-filter blur > 14px

## 9. Responsive Behavior

**Breakpoints:**
| Name | Width | Key Changes |
|------|-------|-------------|
| Desktop | > 1024px | 4 列 Bento，全导航 |
| Tablet | 768px–1024px | 2 列 Bento，缩小间距 |
| Mobile | < 768px | 单列，Bento → 堆叠，导航折叠 |

**Touch Targets:** minimum 44×44px
**Collapsing Strategy:** 导航在 mobile 下折叠为 hamburger menu（slide-down drawer）

```css
/* Desktop: 4-col Bento */
@media (min-width: 1025px) {
  .bento-grid { grid-template-columns: repeat(4, 1fr); }
  .masonry { columns: 3; }
}

/* Tablet: 2-col */
@media (max-width: 1024px) {
  .bento-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 180px; }
  .bento-span-4 { grid-column: span 2; }
  .masonry { columns: 2; }
}

/* Mobile: stack */
@media (max-width: 767px) {
  .bento-grid {
    grid-template-columns: 1fr; grid-auto-rows: auto;
    gap: 16px;
  }
  .bento-grid > * { grid-column: 1 !important; grid-row: auto !important; }
  .masonry { columns: 1; }
  section { padding: 64px var(--container-px); }
}

/* Ensure no horizontal overflow */
*, *::before, *::after { box-sizing: border-box; }
body { overflow-x: hidden; }
img, canvas, video { max-width: 100%; height: auto; }
```

---

*Design system derived from ui-ux-pro-max portfolio patterns, refined with Impeccable quality standards. Motion effects inspired by [react-bits](https://github.com/DavidHDev/react-bits) by DavidHDev (MIT).*
