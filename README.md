<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# ChainReaction | Agentic Workflow Engine

**Architected by Ambuj Kumar Tripathi**

An advanced multi-agent reasoning system that breaks down complex topics through a 3-stage deliberation pipeline: Logic → Adversarial Stress-Testing → Final Synthesis.

## ⚙️ Technical Specifications

- **Model**: `gemini-flash-latest` (resolves to `gemini-2.5-flash-preview-09-2025`)
- **Max Output Tokens**: `2000` per agent response
- **Total Tokens per Run**: ~6000 tokens (3 agents × 2000 tokens)
- **API**: Direct REST call to Gemini API (`/v1beta/models/{model}:generateContent`)

## 🚀 Run Locally

**Prerequisites:** Node.js 18+

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set your API key in `.env`:
   ```
   VITE_API_KEY=your_gemini_api_key_here
   VITE_APP_PASSWORD=your_password
   ```

3. Run the app:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3001](http://localhost:3001)

## 📊 Gemini API Free Tier Limits

| Limit Type            | Value                  | Renewal     |
| --------------------- | ---------------------- | ----------- |
| Requests per Day      | 1,500 RPD              | Daily (UTC) |
| Requests per Minute   | 15 RPM                 | Per minute  |
| Tokens per Request    | Up to 2M input tokens  | -           |
| Expected Usage        | ~3-6 requests per run  | -           |
| Token Cost per Run    | ~6,000 tokens          | Safe range  |

**Note:** Free tier is more than sufficient for typical usage. Daily limits reset at midnight UTC.

## 🛠️ Known Issues & Planned Improvements

| Issue                          | Severity | Fix                                                                        |
| ------------------------------ | -------- | -------------------------------------------------------------------------- |
| Output truncation at climax    | HIGH     | Implement proper stream completion detection; add "END_OF_SEQUENCE" marker |
| Long outputs need pagination   | MEDIUM   | Add collapsible sections or summary mode                                   |
| No error handling UI           | MEDIUM   | Add error boundaries & user-friendly error messages                        |
| Mobile responsiveness untested | LOW      | Test on mobile; may need responsive redesign                               |
| No token usage display         | LOW      | Add real-time token counter in UI                                          |

## 🎨 Features

- **3-Agent Deliberation Pipeline**: Logic Core → Adversarial Stress Test → Final Arbiter
- **Markdown Rendering**: Full support for tables, headers, code blocks, and formatting
- **Cyberpunk UI**: Dark theme with emerald accents and holographic effects
- **Engineer Mode**: View and edit system prompts in real-time
- **Safety Settings**: All harm categories set to BLOCK_NONE for unrestricted reasoning

---

View the app in AI Studio: https://ai.studio/apps/drive/1mR_ELtYHYMhD2PDcYFUgPzFSL68fGQnz
