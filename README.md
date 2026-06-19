# Personal Homepage · 个人主页

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-purple.svg)](https://vitejs.dev)

A self-hosted personal portfolio builder with AI-powered content extraction. Build your professional homepage in minutes — manage certificates, resume, papers, and competition achievements, then showcase with magazine-editorial design.

**Live demo**: Deploy to Vercel/Netlify in one click. Fill your data via `/admin` and preview at `/`.

---

## ✨ Features

| Category | Details |
|----------|---------|
| 🎨 **3 Themes** | Magazine Light, Dark Noir, Mineral Slate — one-click switch |
| 🤖 **AI Import** | Upload Word/TXT resume → DeepSeek auto-fills your profile |
| 📷 **AI Scan** | Upload certificate image → DeepSeek Vision extracts info |
| 📄 **Papers** | Academic journal-style table of contents |
| 🏆 **Competitions** | Structured awards showcase |
| 📅 **Timeline** | Education + work experience with editorial layout |
| 🏷️ **Skills** | Tag-based skill display |
| 💾 **Local First** | All data in localStorage, no server needed |
| 📥 **Export/Import** | JSON backup & restore |

## 🚀 Quick Start

```bash
# Clone
git clone <your-repo-url>
cd personal-homepage

# Install
npm install

# Dev
npm run dev
# → http://localhost:3000 (showcase)
# → http://localhost:3000/admin (management)

# Build for production
npm run build
# → dist/ ready to deploy
```

## 🤖 AI Setup

1. Open `/admin` → set your **DeepSeek API Key**
2. Upload a Word/TXT resume → AI auto-fills profile, education, work, skills
3. Upload a certificate image → AI extracts title, issuer, date
4. Key stored in browser localStorage only — never leaves your machine

## 🎨 Themes

Click the theme button in the top nav or sidebar to cycle through:

| Theme | Palette | Vibe |
|-------|---------|------|
| 📰 Magazine Light | Warm paper · Amber ink | Editorial print |
| 🌙 Dark Noir | Deep charcoal · Glowing amber | Night study |
| 🪨 Mineral Slate | Cool gray · Steel blue | Calm professional |

## 🏗️ Tech Stack

- **Framework**: React 19 + Vite 8
- **Styling**: OKLCH CSS variables, zero runtime
- **Animation**: react-bits effects (SplitText, ScrollFloat, ScrollReveal)
- **AI**: DeepSeek API (resume parsing + certificate OCR)
- **Docs**: mammoth.js (Word parsing)
- **Design**: Impeccable + ui-ux-pro-max quality standards

## 📁 Project Structure

```
src/
├── pages/
│   ├── Showcase.jsx    # Public portfolio page (/)
│   └── Admin.jsx       # Management panel (/admin)
├── components/
│   ├── Nav.jsx         # Sticky navigation + theme switch
│   └── Footer.jsx
├── effects/            # react-bits animation components
│   ├── Silk.jsx        # Canvas silk background
│   ├── SplitText.jsx   # Character stagger entrance
│   ├── ScrollFloat.jsx # Scroll-triggered float
│   ├── ScrollReveal.jsx
│   ├── Magnet.jsx      # Magnetic CTA
│   └── GlareHover.jsx  # Hover glare effect
├── context/
│   └── ThemeContext.jsx # 3-theme system
├── data/
│   ├── store.js        # localStorage CRUD
│   └── api.js          # DeepSeek API abstraction
└── index.css           # OKLCH design tokens + global styles
```

## 🤖 Use with AI Coding Tools

### Claude Code

```bash
# 1. Clone the project
git clone https://github.com/tczzx0428/personal-homepage.git
cd personal-homepage

# 2. Open with Claude Code
claude

# 3. In Claude Code, run:
# "npm install && npm run dev"
# Claude will auto-detect the project and help you customize it

# 4. Customize your homepage:
# "帮我把个人信息改成我的简历" — upload your Word resume, AI fills everything
# "加一个新section展示我的开源项目" — Claude adds a new section
# "换个配色" — modify the theme
```

### Codex (OpenAI)

```bash
# 1. Clone & enter project
git clone https://github.com/tczzx0428/personal-homepage.git
cd personal-homepage

# 2. Open with Codex
codex

# 3. In Codex session:
# "Install deps and start the dev server"
# → npm install && npm run dev

# 4. Customize:
# "Read my resume at ~/Desktop/resume.docx and fill in the profile"
# → Codex uses the built-in DeepSeek integration to parse and auto-fill
```

### Other AI Tools

This project works with any AI coding assistant that can read and edit files:

- **Cursor**: Open folder → Agent mode → "Customize this portfolio for me"
- **Gemini CLI**: `gemini` → "Read DESIGN.md and help me customize the theme"
- **GitHub Copilot**: Workspace agent → "Add a new blog section to Showcase.jsx"

All AI tools can leverage the project's built-in DeepSeek API integration (`src/data/api.js`) for resume parsing and certificate scanning.

## 📄 License

MIT — see [LICENSE](./LICENSE) for details.

Motion effects derived from [react-bits](https://github.com/DavidHDev/react-bits) by DavidHDev (MIT).
