<div align="center">

# ⚡ ChainReaction

### Advanced Multi-Agent Reasoning Engine

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2.0-61dafb)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646cff)](https://vitejs.dev/)
[![Gemini API](https://img.shields.io/badge/Gemini-2.5%20Flash-4285f4)](https://ai.google.dev/)

**Architected by [Ambuj Kumar Tripathi](https://github.com/Ambuj123-lab)**

*A sophisticated agentic workflow engine that breaks down complex topics through a 3-stage deliberation pipeline: Logic → Adversarial Stress-Testing → Final Synthesis.*

[Demo](#-demo) • [Features](#-features) • [Installation](#-quick-start) • [Architecture](#-architecture) • [API](#-api-configuration)

</div>

---

## 🎯 Overview

ChainReaction is an **advanced multi-agent reasoning system** that leverages Google's Gemini 2.5 Flash model to perform deep analytical thinking through three specialized AI agents:

1. **The Architect** (LOGIC_CORE) - Breaks down problems into first principles
2. **The Adversary** (STRESS_TEST) - Critically challenges assumptions
3. **The Arbiter** (FINAL_VERDICT) - Synthesizes insights into final judgment

Each agent processes the output of the previous one, creating a **chain reaction** of increasingly refined reasoning.

---

## 🎯 Demo

Try the live demo: https://chainreaction-agent.onrender.com/

## ✨ Features

- 🤖 **Three-Stage Agent Pipeline** - Logic → Adversarial → Synthesis
- 📊 **Markdown Rendering** - Full support for tables, code blocks, LaTeX, and formatting
- 🎨 **Cyberpunk UI** - Dark theme with emerald accents and holographic effects
- 🔧 **Engineer Mode** - View and edit system prompts in real-time
- 🔒 **Secure Authentication** - Password-protected access portal
- ⚡ **Zero Latency** - Direct REST API calls to Gemini
- 🎭 **Two Presets** - Critical Debate & Creative Engine modes
- 📱 **Responsive Design** - Modern, animated interface

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    USER INPUT                           │
│            (e.g., "Can AI replace humans?")            │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  AGENT 1: THE ARCHITECT (LOGIC_CORE)                   │
│  Role: Break down into 3 logical pillars               │
│  Output: First principles analysis                      │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  AGENT 2: THE ADVERSARY (STRESS_TEST)                  │
│  Role: Attack arguments, find failure points           │
│  Output: Critical counterarguments                      │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  AGENT 3: THE ARBITER (FINAL_VERDICT)                  │
│  Role: Synthesize & render final judgment              │
│  Output: Unbiased, comprehensive verdict               │
└─────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
chainreaction/
├── 📄 index.html              # Main HTML entry point with Tailwind CDN
├── 📄 package.json            # Dependencies and scripts
├── 📄 vite.config.ts          # Vite configuration
├── 📄 tsconfig.json           # TypeScript configuration
├── 📄 .env.example            # Environment variables template
├── 📄 .gitignore              # Git ignore rules
├── 📄 README.md               # This file
│
└── 📂 src/
    └── 📄 index.tsx           # Main React application
                               # ├── API Logic (fetch-based)
                               # ├── UI Components (ChainNodeCard)
                               # ├── Main App (ChainReactionApp)
                               # ├── Authentication
                               # └── State Management
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0.0 or higher
- **NPM** or **Yarn**
- **Gemini API Key** ([Get one here](https://aistudio.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ambuj123-lab/chainreaction-ai-agent.git
   cd chainreaction-ai-agent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your credentials:
   ```env
   VITE_API_KEY=your_gemini_api_key_here
   VITE_APP_PASSWORD=your_password_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3001
   ```

---

## � API Configuration

### Model Specifications

| Parameter               | Value                              |
| ----------------------- | ---------------------------------- |
| **Model**               | `gemini-flash-latest`              |
| **Actual Version**      | `gemini-2.5-flash-preview-09-2025` |
| **Max Output Tokens**   | 2000 per agent                     |
| **Temperature**         | 0.7                                |
| **Total Tokens/Run**    | ~6000 (3 agents × 2000)            |
| **Safety Settings**     | BLOCK_NONE (all categories)        |

### Gemini API Free Tier

| Metric                 | Limit         | Renewal      |
| ---------------------- | ------------- | ------------ |
| Requests per Day       | 1,500 RPD     | Daily (UTC)  |
| Requests per Minute    | 15 RPM        | Per minute   |
| Input Tokens           | Up to 2M      | Per request  |
| Expected Usage         | ~3-6 requests | Per run      |

**Note:** Free tier is sufficient for typical usage. Resets daily at midnight UTC.

---

## 🎨 Usage

### Preset Workflows

1. **Critical Debate** (Default)
   - Analyzes topics through rigorous logical breakdown
   - Perfect for philosophical, ethical, or technical discussions

2. **Creative Engine**
   - Generates creative narratives with conflict and resolution
   - Ideal for storytelling and world-building

### Engineer Mode

Toggle **ENG_MODE** to:
- View underlying system prompts
- Edit agent instructions in real-time
- Customize reasoning behavior

---

## 🛠️ Known Issues & Roadmap

| Issue                          | Severity | Status      |
| ------------------------------ | -------- | ----------- |
| Output truncation at climax    | HIGH     | Planned     |
| Long outputs need pagination   | MEDIUM   | Planned     |
| No error handling UI           | MEDIUM   | In Progress |
| Mobile responsiveness          | LOW      | Testing     |
| Token usage display            | LOW      | Planned     |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Gemini API** by Google DeepMind
- **React** & **Vite** for the development stack
- **Tailwind CSS** for styling utilities
- **Lucide React** for icons
- **Marked.js** for markdown parsing

---

## 📧 Contact

**Ambuj Kumar Tripathi**

- GitHub: [@Ambuj123-lab](https://github.com/Ambuj123-lab)
- Repository: [chainreaction-ai-agent](https://github.com/Ambuj123-lab/chainreaction-ai-agent)

---

<div align="center">

**⭐ Star this repo if you find it useful!**

Made with ❤️ by Ambuj Kumar Tripathi

</div>
