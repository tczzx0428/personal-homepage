# Personal Homepage · 个人主页

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-purple.svg)](https://vitejs.dev)

> 🏠 自带 AI 的个人主页搭建工具 · AI-powered personal portfolio builder

---

## 🇨🇳 中文

### 这是什么？

一个**本地优先、AI 驱动**的个人主页生成器。不需要后端、不需要数据库、不需要写代码——打开浏览器就能管理你的证书、履历、论文、比赛成果，然后生成一个杂志编辑风格的专业展示页。

### 能做什么？

| 功能 | 说明 |
|------|------|
| 🤖 **AI 简历解析** | 上传 Word/TXT 简历，DeepSeek 自动提取姓名、教育、工作、技能，填入表单 |
| 📷 **AI 证书扫描** | 拍一张证书照片，AI 自动识别名称、机构、日期，结构化存储 |
| 🎨 **三套主题** | 杂志浅色 / 暗夜黑金 / 矿物灰，一键切换 |
| 📄 **论文展示** | 学术期刊目录风格，编号、作者、期刊、摘要 |
| 🏆 **比赛成果** | 国家级/省市级分类，奖牌 emoji 直观展示 |
| 📅 **履历时间线** | 教育+工作经历，左侧日期右侧详情 |
| 💾 **纯本地存储** | 所有数据在浏览器 localStorage 里，不上传任何服务器 |
| 📥 **导入导出** | JSON 格式一键备份恢复 |

### 为什么做这个？

市面上建个人主页要么要写代码（Hugo/Jekyll/Hexo），要么是臃肿的 SaaS（Wix/WordPress），要么只能展示不能管理。这个项目把「管理」和「展示」合在一起，加上 AI 帮你自动录入——你只需要上传文件、确认信息，主页就有了。

### 适合谁？

- 🎓 **学生/研究者**：展示论文、竞赛、学术成果
- 💼 **求职者**：替代传统 PDF 简历，链接发出去就是一页专业展示
- 👨‍💻 **开发者**：Fork 一份，自己改主题、加 section
- 🤖 **AI 爱好者**：体验 DeepSeek + 前端结合的轻量 AI 应用

### 快速开始

```bash
git clone https://github.com/tczzx0428/personal-homepage.git
cd personal-homepage
npm install
npm run dev
# → http://localhost:3000 展示页
# → http://localhost:3000/admin 管理后台
```

### AI 功能配置

1. 打开 `/admin` → 填入 **DeepSeek API Key**
2. 上传 Word/TXT 简历 → AI 自动提取信息填入表单
3. 上传证书照片 → AI 自动识别名称、机构、日期
4. Key 仅存储在浏览器 localStorage 中

### 三套主题

点击导航栏或侧边栏的主题按钮切换：

| 主题 | 配色 | 感觉 |
|------|------|------|
| 📰 杂志浅色 | 暖调纸色 · 琥珀墨 | 高端杂志内页 |
| 🌙 暗夜黑金 | 深炭灰 · 琥珀光 | 深夜书房 |
| 🪨 矿物灰 | 冷调灰 · 钢蓝 | 沉稳专业 |

### 用 AI 工具一键安装 & 自定义

#### Claude Code

```bash
# 1. 打开 Claude Code
claude

# 2. 输入：
"帮我克隆并运行 https://github.com/tczzx0428/personal-homepage"
```

Claude Code 自动执行 clone → npm install → npm run dev。然后直接用自然语言定制：

| 你想做的 | 对 Claude Code 说 |
|---------|------------------|
| 🧑 填入个人信息 | "帮我填写个人信息，我叫张三，是前端工程师" |
| 📄 从简历导入 | "读取 ~/Desktop/我的简历.docx 解析并自动填入" |
| 🎨 换主题 | "切换到暗夜黑金主题" |
| ➕ 加新 section | "加一个博客 section，展示我的技术文章" |
| 🔧 改样式 | "把强调色改成蓝色" |
| 📤 导出部署 | "帮我 build 并部署到 Vercel" |

> 💡 项目内置 `DESIGN.md` 设计规范，Claude Code 会读取它确保修改不破坏设计一致性。

#### Codex

```bash
# 1. 打开 Codex
codex

# 2. 输入：
"Clone and set up https://github.com/tczzx0428/personal-homepage, install deps, start dev server"
```

启动后用自然语言定制：

```
"Open the admin panel, read my resume at ~/Desktop/resume.docx, auto-fill everything"
"Add a blog section following DESIGN.md"
"Switch to Dark Noir theme and deploy to GitHub Pages"
```

> 💡 Codex 会自动识别 `DESIGN.md` 和 `src/data/api.js`，利用 DeepSeek 集成做 AI 解析。

#### 其他 AI 工具

| 工具 | 操作 |
|------|------|
| **Cursor** | `Cmd+I` → "Clone and set up this portfolio project" |
| **Windsurf** | 打开文件夹 → Cascade → "Follow DESIGN.md to customize" |
| **Gemini CLI** | `gemini` → "Read ./personal-homepage and help me deploy" |
| **GitHub Copilot** | Copilot Edits → "根据 DESIGN.md 帮我加一个作品集 section" |

#### 常用自然语言指令

```
✅ "填入我的个人信息，简历在~/Desktop/resume.docx"
✅ "帮我换到暗夜黑金主题"
✅ "把我的证书扫描件识别并填入"
✅ "按DESIGN.md规范加一个技术博客section"
✅ "导出数据并部署到Netlify"

✅ "Fill in my profile from ~/Desktop/cv.docx using the built-in DeepSeek parser"
✅ "Switch to Mineral Slate theme"
✅ "Add a 'Talks & Presentations' section following DESIGN.md"
✅ "Build and deploy to Vercel"
```

---

## 🇬🇧 English

### What is this?

A self-hosted personal portfolio builder with AI-powered content extraction. Build your professional homepage in minutes — manage certificates, resume, papers, and competition achievements, then showcase with magazine-editorial design. All data stored locally in your browser.

### Features

| Category | Details |
|----------|---------|
| 🎨 **3 Themes** | Magazine Light, Dark Noir, Mineral Slate — one-click switch |
| 🤖 **AI Import** | Upload Word/TXT resume → DeepSeek auto-fills your profile |
| 📷 **AI Scan** | Upload certificate image → AI extracts title, issuer, date |
| 📄 **Papers** | Academic journal-style table of contents layout |
| 🏆 **Competitions** | Structured awards showcase with medal indicators |
| 📅 **Timeline** | Education + work experience with editorial layout |
| 🏷️ **Skills** | Tag-based skill display |
| 💾 **Local First** | All data in localStorage, no server required |
| 📥 **Export/Import** | JSON backup & restore in one click |

### Quick Start

```bash
git clone https://github.com/tczzx0428/personal-homepage.git
cd personal-homepage
npm install
npm run dev
# → http://localhost:3000 (showcase)
# → http://localhost:3000/admin (management)

npm run build  # → dist/ ready for production
```

### AI Setup

1. Open `/admin` → set your **DeepSeek API Key**
2. Upload a Word/TXT resume → AI auto-fills profile, education, work, skills
3. Upload a certificate image → AI extracts title, issuer, date
4. Key stored in browser localStorage only — never leaves your machine

### Themes

| Theme | Palette | Vibe |
|-------|---------|------|
| 📰 Magazine Light | Warm paper · Amber ink | Editorial print |
| 🌙 Dark Noir | Deep charcoal · Glowing amber | Night study |
| 🪨 Mineral Slate | Cool gray · Steel blue | Calm professional |

### Use with AI Coding Tools

#### Claude Code

```bash
# Open Claude Code and say:
"Clone and set up https://github.com/tczzx0428/personal-homepage"
```

Claude Code handles clone → install → dev server. Then customize in natural language:

```
"Fill in my profile from ~/Desktop/cv.docx using the built-in DeepSeek parser"
"Add a blog section following DESIGN.md"
"Switch to Dark Noir theme and deploy to Vercel"
```

#### Codex

```bash
# Open Codex and say:
"Clone and set up https://github.com/tczzx0428/personal-homepage, install deps, start dev server"
```

Then:

```
"Read my resume and auto-fill everything"
"Add a new section for my open source projects"
```

#### Cursor / Windsurf / Copilot / Gemini CLI

Any AI coding tool with file editing capability works — open the project folder and start customizing with natural language. All tools leverage the built-in DeepSeek API integration (`src/data/api.js`) for resume parsing and certificate scanning.

### Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 19 + Vite 8 |
| **Styling** | OKLCH CSS variables (zero runtime) |
| **Animation** | react-bits (SplitText, ScrollFloat, ScrollReveal, Silk, Magnet, GlareHover) |
| **AI** | DeepSeek API (resume parsing + certificate OCR) |
| **Word Parsing** | mammoth.js |
| **Design Quality** | Impeccable + ui-ux-pro-max standards |

### Project Structure

```
src/
├── pages/
│   ├── Showcase.jsx       # Public portfolio (/)
│   └── Admin.jsx          # Management panel (/admin)
├── components/
│   ├── Nav.jsx            # Navigation + theme switcher
│   └── Footer.jsx
├── effects/               # react-bits animations (MIT)
│   ├── Silk.jsx, SplitText.jsx, ScrollFloat.jsx
│   ├── ScrollReveal.jsx, Magnet.jsx, GlareHover.jsx
│   ├── MagicBento.jsx, SpotlightCard.jsx
│   └── TiltedCard.jsx
├── context/
│   └── ThemeContext.jsx    # 3-theme system
├── data/
│   ├── store.js            # localStorage CRUD
│   └── api.js              # DeepSeek API abstraction
└── index.css               # OKLCH design tokens + global styles
```

---

## 📄 License

MIT — see [LICENSE](./LICENSE) for details.

Motion effects derived from [react-bits](https://github.com/DavidHDev/react-bits) by DavidHDev (MIT).
