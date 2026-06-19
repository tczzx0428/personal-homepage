# Personal Homepage · 个人主页

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-purple.svg)](https://vitejs.dev)

> 🏠 一个自带 AI 的个人主页搭建工具。拍照上传证书、拖入简历自动解析、三套主题一键切换，五分钟搭好你的专业个人展示页。

---

## 🇨🇳 中文介绍

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

---

## 🇬🇧 English

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

## 🤖 AI 工具一键安装 & 自定义

这个项目专门为 AI 编程工具设计——你可以用 Claude Code 或 Codex 一键下载、安装、运行，然后用自然语言让它帮你定制主页。

---

### Claude Code 安装使用

**前置条件**：[安装 Claude Code](https://docs.anthropic.com/en/docs/claude-code/setup)（Anthropic 官方 CLI 工具）

```bash
# 第 1 步：让 Claude Code 帮你下载项目
# 在终端任意位置打开 Claude Code：
claude

# 在 Claude Code 对话中输入：
# "帮我克隆并运行 https://github.com/tczzx0428/personal-homepage"
```

Claude Code 会自动执行：
```
git clone https://github.com/tczzx0428/personal-homepage.git
cd personal-homepage
npm install
npm run dev
```

然后访问 `http://localhost:3000` 查看展示页，`/admin` 进入管理后台。

**第 2 步：用自然语言定制**

在 Claude Code 对话中直接说：

| 你想做的 | 对 Claude Code 说 |
|---------|------------------|
| 🧑 填入个人信息 | "帮我填写个人信息，我叫张三，是前端工程师" |
| 📄 从简历导入 | "读取 ~/Desktop/我的简历.docx 解析并自动填入" |
| 🎨 换主题 | "切换到暗夜黑金主题" |
| ➕ 加新 section | "加一个博客 section，展示我的技术文章" |
| 🔧 改样式 | "把强调色改成蓝色" |
| 📤 导出部署 | "帮我 build 并部署到 Vercel" |

**第 3 步：配置 AI 功能**

1. 打开 `http://localhost:3000/admin`
2. 填入你的 **DeepSeek API Key**
3. 在管理后台或让 Claude Code 帮你调用 AI 解析简历、扫描证书

> 💡 **提示**：项目里内置了 `DESIGN.md` 设计规范，Claude Code 会读取它来确保所有修改保持设计一致性。你也可以说 "读一下 DESIGN.md 然后给我建议怎么优化"。

---

### Codex 安装使用

**前置条件**：[安装 Codex](https://github.com/openai/codex)（OpenAI 官方 CLI 工具）

```bash
# 在终端打开 Codex：
codex

# 在 Codex 对话中输入：
# "Clone and set up https://github.com/tczzx0428/personal-homepage, install deps, start dev server"
```

Codex 会执行完整的环境搭建。启动后：

```bash
# 定制你的主页（在 Codex 对话中）：
# "Open the admin panel, help me fill in my profile. My resume is at ~/Desktop/resume.docx"
# → Codex 读取 Word 文档，通过项目内置的 DeepSeek API 自动解析填入

# "Add a new skills section showing my tech stack with icons"
# → Codex 修改 Showcase.jsx，遵循 DESIGN.md 的设计约束

# "Switch to the Dark Noir theme and deploy to GitHub Pages"
# → Codex 切换主题、build、配置部署
```

> 💡 **提示**：Codex 会自动识别项目的 `DESIGN.md` 和 `src/data/api.js`，利用 DeepSeek 集成做 AI 解析。如果你还没装 mammoth（Word 解析库），Codex 会帮你装上。

---

### Cursor / Windsurf / Copilot

任何支持项目级上下文和文件编辑的 AI 工具都能用：

| 工具 | 操作 |
|------|------|
| **Cursor** | `Cmd+I` 打开 Agent → "Clone and set up https://github.com/tczzx0428/personal-homepage" |
| **Windsurf** | 打开项目文件夹 → Cascade → "Follow DESIGN.md to customize my portfolio" |
| **Gemini CLI** | `gemini` → "Read the project at ./personal-homepage and help me deploy it" |
| **GitHub Copilot** | 在 VS Code 中打开项目 → Copilot Edits → "根据 DESIGN.md 帮我加一个作品集 section" |

### 常用自然语言指令（中/英）

```
✅ "填入我的个人信息，简历在~/Desktop/resume.pdf"
✅ "帮我换到暗夜黑金主题"
✅ "把我的证书扫描件识别并填入"
✅ "按DESIGN.md规范加一个技术博客section"
✅ "导出数据并部署到Netlify"

✅ "Fill in my profile from ~/Desktop/cv.docx using the built-in DeepSeek parser"
✅ "Switch to Mineral Slate theme"
✅ "Add a 'Talks & Presentations' section following DESIGN.md"
✅ "Build and deploy to Vercel"
```

所有 AI 工具都会自动利用项目内置的 DeepSeek API 集成（`src/data/api.js`）来做简历解析和证书扫描。

## 📄 License

MIT — see [LICENSE](./LICENSE) for details.

Motion effects derived from [react-bits](https://github.com/DavidHDev/react-bits) by DavidHDev (MIT).
