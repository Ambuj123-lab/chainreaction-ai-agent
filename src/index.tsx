import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { marked } from 'marked';
import { GoogleGenAI, HarmCategory, HarmBlockThreshold } from "@google/genai";
import {
  Terminal, Activity, Cpu, Shield, Book, Feather,
  CheckCircle2, HelpCircle, X, Fingerprint, Lock, Settings,
  ArrowRight, Loader2, RotateCcw
} from 'lucide-react';

// ==========================================
// 1. CONFIGURATION & TYPES
// ==========================================

const CONFIG = {
  MODEL_NAME: "gemini-2.5-flash",
  TEMPERATURE: 0.7,
  MAX_TOKENS: 2000,
  SYSTEM_INSTRUCTION: `
    You are "ChainReaction", an advanced agentic workflow engine architected by Ambuj Kumar Tripathi.
    PROTOCOL:
    1. Do NOT act like a simple chatbot. 
    2. If the user greets (e.g., "Hi"), analyze the greeting sociologically or technically. Do not just say "Hello".
    3. Output must be structured, high-level, and technical.
  `
};

enum NodeStatus { IDLE = 'IDLE', THINKING = 'THINKING', COMPLETED = 'COMPLETED', ERROR = 'ERROR' }

interface ChainNode {
  id: string; title: string; role: string; promptTemplate: string; output: string; status: NodeStatus; icon: string;
}

// ==========================================
// 2. API LOGIC (DIRECT & ROBUST)
// ==========================================

const generateNodeResponse = async (prompt: string, roleInstruction: string): Promise<string> => {
  try {
    // @ts-ignore
    const apiKey = import.meta.env.VITE_API_KEY;

    if (!apiKey) {
      console.error("API Key Missing");
      return "⚠️ ERROR: VITE_API_KEY is missing in .env file.";
    }

    const combinedSystemPrompt = `${CONFIG.SYSTEM_INSTRUCTION}\n\nCURRENT AGENT ROLE: ${roleInstruction}`;

    // Using direct REST API to avoid SDK version mismatches
    // Fallback to gemini-flash-latest which is confirmed available
    const MODEL = "gemini-flash-latest";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{
        parts: [{ text: prompt }]
      }],
      systemInstruction: {
        parts: [{ text: combinedSystemPrompt }]
      },
      generationConfig: {
        temperature: CONFIG.TEMPERATURE,
        maxOutputTokens: CONFIG.MAX_TOKENS
      },
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
      ]
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log("API RESPONSE:", JSON.stringify(data, null, 2));
    console.log("Extracted text path:", data.candidates?.[0]?.content?.parts?.[0]?.text);

    if (!response.ok) {
      return `⚠️ API ERROR: ${data.error?.message || response.statusText}`;
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return "⚠️ EMPTY RESPONSE: AI returned no text.";
    }

    return text;
  } catch (error: any) {
    console.error("Fetch Error:", error);
    return `CONNECTION FAILURE: ${error.message}`;
  }
};

// ==========================================
// 3. UI COMPONENTS (CYBERPUNK THEME)
// ==========================================

const ChainNodeCard = ({ node, index, engineerMode, onPromptChange, isActiveLine }: {
  node: ChainNode; index: number; engineerMode: boolean; onPromptChange: (id: string, v: string) => void; isActiveLine: boolean;
}) => {

  const getIcon = () => {
    const spinClass = node.status === NodeStatus.THINKING ? "engine-spin text-emerald-400" : "text-zinc-600";
    switch (node.icon) {
      case 'cpu': return <Cpu size={24} className={spinClass} />;
      case 'shield': return <Shield size={24} className={spinClass} />;
      case 'book': return <Book size={24} className={spinClass} />;
      case 'terminal': return <Terminal size={24} className={spinClass} />;
      default: return <Activity size={24} className={spinClass} />;
    }
  };

  return (
    <div className="relative pl-20 pb-16 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${index * 150}ms` }}>

      {/* THE LIQUID WIRE */}
      {index !== 2 && (
        <div className={`absolute left-[34px] top-12 bottom-0 w-[2px] z-0 transition-all duration-500 ${isActiveLine ? 'bg-emerald-500 shadow-[0_0_15px_#10b981]' : 'bg-zinc-800'
          }`} />
      )}

      {/* NODE HUB (Rotating Gear UI) */}
      <div className={`absolute left-0 top-0 w-[70px] h-[70px] rounded-full border-2 border-zinc-800 flex items-center justify-center z-10 bg-[#050505] transition-all duration-500 ${node.status === NodeStatus.THINKING ? 'border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]' : ''
        }`}>
        {/* Inner Ring */}
        <div className={`absolute inset-1 rounded-full border border-dashed border-zinc-700 ${node.status === NodeStatus.THINKING ? 'animate-spin-slow' : ''}`}></div>
        <div className="relative z-10 bg-black/50 p-3 rounded-full backdrop-blur-sm">
          {node.status === NodeStatus.COMPLETED ? <CheckCircle2 size={24} className="text-emerald-500" /> : getIcon()}
        </div>
      </div>

      {/* HOLOGRAPHIC CARD */}
      <div className={`holo-card rounded-xl p-6 relative overflow-hidden transition-all duration-500 hover:border-emerald-500/30 ${node.status === NodeStatus.THINKING ? 'holo-card-active' : ''
        }`}>
        {/* Active Scan Line inside card */}
        {node.status === NodeStatus.THINKING && (
          <div className="absolute top-0 left-0 w-full h-[1px] bg-emerald-400 shadow-[0_0_20px_#10b981] animate-[scan_1.5s_linear_infinite]" />
        )}

        <div className="flex justify-between items-start mb-4 border-b border-zinc-800/50 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-500 bg-emerald-900/10 px-2 py-0.5 rounded border border-emerald-500/20">{node.role}</span>
            </div>
            <h3 className="text-white font-bold tracking-tight text-xl">{node.title}</h3>
          </div>
          {node.status === NodeStatus.THINKING && (
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded border border-emerald-500/20">
              <Loader2 size={12} className="animate-spin text-emerald-400" />
              <span className="text-[10px] font-mono text-emerald-400 tracking-widest">PROCESSING</span>
            </div>
          )}
        </div>

        {engineerMode && (
          <div className="mb-4 bg-[#080808] rounded border border-zinc-800 p-4 relative group">
            <div className="absolute -top-2 left-3 px-1 bg-[#080808] text-[9px] text-zinc-500 font-mono tracking-widest">SYSTEM_INJECTION_PROTOCOL</div>
            <textarea
              value={node.promptTemplate}
              onChange={(e) => onPromptChange(node.id, e.target.value)}
              className="w-full bg-transparent text-emerald-400/80 text-xs font-mono focus:outline-none resize-none leading-relaxed" rows={3}
            />
          </div>
        )}

        <div className={`prose prose-invert prose-sm max-w-none ${node.output ? '' : 'italic text-zinc-700'}`}>
          {node.output ? (
            <div
              dangerouslySetInnerHTML={{ __html: marked(node.output) }}
              className="markdown-output"
            />
          ) : (
            "Waiting for data stream..."
          )}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. MAIN APP ORCHESTRATION
// ==========================================

const PRESETS = {
  DEBATE: {
    name: 'Critical Debate', nodes: [
      { id: '1', title: 'The Architect', role: 'LOGIC_CORE', promptTemplate: "Analyze '{{INPUT}}'. Break down 3 logical pillars. Focus on first principles.", output: '', status: NodeStatus.IDLE, icon: 'cpu' },
      { id: '2', title: 'The Adversary', role: 'STRESS_TEST', promptTemplate: "Attack these arguments: {{PREV_OUTPUT}}. Identify 3 critical points of failure.", output: '', status: NodeStatus.IDLE, icon: 'shield' },
      { id: '3', title: 'The Arbiter', role: 'FINAL_VERDICT', promptTemplate: "Synthesize {{NODE_1}} and {{PREV_OUTPUT}}. Render a final, unbiased judgment.", output: '', status: NodeStatus.IDLE, icon: 'book' }
    ]
  },
  STORY: {
    name: 'Creative Engine', nodes: [
      { id: '1', title: 'World Builder', role: 'NARRATIVE', promptTemplate: "Create a cyberpunk setting for: '{{INPUT}}'. Describe the atmosphere.", output: '', status: NodeStatus.IDLE, icon: 'book' },
      { id: '2', title: 'Chaos Agent', role: 'CONFLICT', promptTemplate: "Introduce a catastrophic event to: {{PREV_OUTPUT}}.", output: '', status: NodeStatus.IDLE, icon: 'cpu' },
      { id: '3', title: 'Resolution', role: 'CLIMAX', promptTemplate: "Resolve the conflict in {{PREV_OUTPUT}} with a philosophical twist.", output: '', status: NodeStatus.IDLE, icon: 'feather' }
    ]
  }
};

const ChainReactionApp: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [started, setStarted] = useState(false);
  const [activePreset, setActivePreset] = useState<keyof typeof PRESETS>('DEBATE');
  const [nodes, setNodes] = useState<ChainNode[]>(PRESETS.DEBATE.nodes);
  const [inputTopic, setInputTopic] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [engineerMode, setEngineerMode] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [showManual, setShowManual] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // @ts-ignore
    const validPass = import.meta.env.VITE_APP_PASSWORD;
    if (password === validPass) {
      setIsAuthenticated(true);
    } else {
      setLoginError('BIOMETRIC MISMATCH: ACCESS DENIED');
      setTimeout(() => setLoginError(''), 3000);
    }
  };

  const runChain = async () => {
    if (isRunning) return;
    const cleanInput = inputTopic.trim();
    if (cleanInput.length < 2) return;

    setIsRunning(true);
    const newNodes = nodes.map(n => ({ ...n, output: '', status: NodeStatus.IDLE }));
    setNodes(newNodes);

    let currentInput = inputTopic;
    const nodeOutputs: Record<string, string> = {};

    for (let i = 0; i < newNodes.length; i++) {
      const node = newNodes[i];
      setNodes(prev => prev.map((n, idx) => idx === i ? { ...n, status: NodeStatus.THINKING } : n));

      let prompt = node.promptTemplate.replace('{{INPUT}}', inputTopic).replace('{{PREV_OUTPUT}}', currentInput);
      nodes.forEach((n, idx) => { if (nodeOutputs[n.id]) prompt = prompt.replace(`{{NODE_${idx + 1}}}`, nodeOutputs[n.id]); });

      const result = await generateNodeResponse(prompt, `You are ${node.title}. Role: ${node.role}`);
      nodeOutputs[node.id] = result;
      currentInput = result;
      setNodes(prev => prev.map((n, idx) => idx === i ? { ...n, output: result, status: NodeStatus.COMPLETED } : n));
      await new Promise(r => setTimeout(r, 600));
    }
    setIsRunning(false);
  };

  // --- VIEW 1: BIOMETRIC LOGIN ---
  if (!isAuthenticated) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#020202] text-white relative overflow-hidden font-mono">
        <div className="absolute inset-0 cyber-grid opacity-30"></div>
        <div className="scan-line"></div>

        <div className="z-20 w-full max-w-md relative">
          <div className="holo-card p-12 rounded-2xl text-center border border-zinc-800 relative group hover:border-emerald-500/50 transition-colors duration-500">

            <div className="mb-8 flex justify-center">
              <div className="w-20 h-20 rounded-full border-2 border-emerald-500/30 flex items-center justify-center relative animate-pulse">
                <Fingerprint size={40} className="text-emerald-500" />
                <div className="absolute inset-0 rounded-full border-t-2 border-emerald-400 animate-spin"></div>
              </div>
            </div>

            <h1 className="text-3xl font-bold tracking-tighter mb-2 text-white whitespace-nowrap">ChainReaction<span className="text-emerald-500">_</span></h1>
            <p className="text-zinc-500 text-[10px] uppercase tracking-[0.4em] mb-8">Secure Access Portal</p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="ENTER ACCESS CODE"
                  className="w-full bg-[#050505] border border-zinc-800 rounded px-4 py-4 text-center text-emerald-500 tracking-[0.5em] focus:border-emerald-500 focus:outline-none focus:shadow-[0_0_20px_rgba(16,185,129,0.2)] placeholder-zinc-800 transition-all uppercase"
                  autoFocus
                />
                {loginError && <div className="absolute -bottom-6 w-full text-center text-red-500 text-[9px] tracking-widest">{loginError}</div>}
              </div>
              <button type="submit" className="w-full bg-emerald-900/20 border border-emerald-500/30 text-emerald-400 text-xs py-4 hover:bg-emerald-500 hover:text-black transition-all uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 rounded">
                INITIATE HANDSHAKE <ArrowRight size={14} />
              </button>
            </form>

            <div className="mt-10 border-t border-zinc-800 pt-6">
              <p className="text-[10px] text-zinc-600 leading-relaxed max-w-xs mx-auto">
                Solves iterative reasoning latency via multi-agent chaining.
                <br />Serverless Architecture v2.5
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 text-zinc-700 text-[10px] font-mono tracking-[0.2em] w-full text-center">
          ARCHITECTED BY AMBUJ KUMAR TRIPATHI
        </div>
      </div>
    );
  }

  // --- VIEW 2: CINEMATIC LANDING ---
  if (!started) {
    return (
      <div className="h-screen w-full bg-[#020202] flex flex-col items-center justify-center text-white relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-20"></div>

        <div className="z-10 text-center px-6 max-w-5xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="mb-8 flex justify-center">
            <div className="px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-900/10 text-emerald-400 text-[10px] font-mono tracking-[0.3em] flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div> SYSTEM ONLINE
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold tracking-tighter mb-8 text-white">
            CHAIN REACTION
          </h1>

          <p className="text-zinc-400 max-w-2xl mx-auto mb-16 text-lg font-light leading-relaxed tracking-wide">
            Advanced Agentic Workflow Engine. <br />
            <span className="text-zinc-600">Zero-Latency Orchestration / Multi-Agent Reasoning / Serverless</span>
          </p>

          <button onClick={() => setStarted(true)} className="mt-4 group relative px-16 py-5 bg-white text-black font-bold tracking-[0.3em] hover:bg-emerald-400 transition-all uppercase text-sm rounded-sm">
            INITIALIZE ENGINE
          </button>
        </div>

        <div className="absolute bottom-10 w-full text-center">
          <p className="text-zinc-600 text-[10px] font-mono tracking-[0.4em] uppercase">Architected by Ambuj Kumar Tripathi</p>
        </div>
      </div>
    );
  }

  // --- VIEW 3: ENGINEER DASHBOARD ---
  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-emerald-500/30 pb-20 crt">
      <div className="fixed inset-0 cyber-grid opacity-15 pointer-events-none"></div>

      {/* COMMAND BAR */}
      <nav className="border-b border-zinc-800 bg-[#020202]/90 backdrop-blur-md sticky top-0 z-50 h-20 flex items-center justify-between px-8">
        <div className="flex items-center gap-6">
          <div className="w-10 h-10 bg-zinc-900 border border-zinc-700 flex items-center justify-center font-bold font-mono text-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.2)]">CR</div>
          <div className="h-8 w-[1px] bg-zinc-800"></div>
          <span className="font-mono text-sm font-bold tracking-[0.2em] text-emerald-500 shadow-emerald-500/20 drop-shadow-md">AMBUJ AI LABS</span>
        </div>
        <div className="flex items-center gap-8">
          <button onClick={() => setShowManual(true)} className="text-[10px] text-white hover:text-emerald-400 flex items-center gap-2 font-mono uppercase tracking-wider border border-zinc-800 px-3 py-1.5 rounded hover:border-emerald-500 transition-colors">
            <HelpCircle size={12} /> PROTOCOLS
          </button>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-zinc-500 font-mono tracking-wider">ENG_MODE</span>
            <button onClick={() => setEngineerMode(!engineerMode)} className={`w-10 h-5 rounded-full transition-colors relative border border-zinc-700 ${engineerMode ? 'bg-emerald-900/50 border-emerald-500' : 'bg-zinc-900'}`}>
              <div className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white transition-transform duration-300 ${engineerMode ? 'translate-x-5 bg-emerald-400 shadow-[0_0_10px_#10b981]' : 'translate-x-0.5'}`}></div>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-16 relative z-10">

        {/* PRESET SELECTOR (Tabs) */}
        <div className="flex border-b border-zinc-800 mb-12">
          {Object.entries(PRESETS).map(([key, val]) => (
            <button key={key} onClick={() => { setActivePreset(key as any); setNodes(PRESETS[key as any].nodes); }}
              className={`px-8 py-4 text-xs font-mono tracking-[0.2em] border-b-2 transition-all ${activePreset === key ? 'border-emerald-500 text-white bg-zinc-900/30' : 'border-transparent text-zinc-600 hover:text-zinc-400'}`}>
              {val.name.toUpperCase()}
            </button>
          ))}
        </div>

        {/* TERMINAL INPUT */}
        <div className="mb-20 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-transparent rounded-xl blur opacity-50"></div>
          <div className="relative bg-[#050505] border border-zinc-800 rounded-xl p-2 flex items-center shadow-2xl">
            <div className="pl-6 pr-4 text-emerald-600"><Terminal size={20} /></div>
            <input
              type="text"
              value={inputTopic}
              onChange={(e) => setInputTopic(e.target.value)}
              placeholder="ENTER TARGET PARAMETER..."
              className="w-full bg-transparent border-none text-white px-2 py-5 focus:outline-none font-mono text-sm placeholder-zinc-700 tracking-wide"
              onKeyDown={(e) => e.key === 'Enter' && runChain()}
            />
            <button onClick={runChain} disabled={isRunning} className="whitespace-nowrap px-8 py-4 bg-white text-black font-bold font-mono text-xs hover:bg-emerald-400 transition-colors rounded-lg disabled:opacity-50 disabled:bg-zinc-800 disabled:text-zinc-500 tracking-widest shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              {isRunning ? 'EXECUTING...' : 'IGNITE_SEQUENCE'}
            </button>
          </div>

          <div className="flex justify-between mt-3 px-2">
            <button onClick={() => { setNodes(PRESETS[activePreset].nodes); setIsRunning(false); }} className="text-[10px] text-zinc-600 hover:text-red-400 font-mono tracking-wider flex items-center gap-1 transition-colors"><RotateCcw size={10} /> FLUSH_CACHE</button>
          </div>
        </div>

        {/* NODE GRAPH */}
        <div className="relative pl-10 border-l border-zinc-800/50 space-y-8">
          {nodes.map((node, i) => (
            <ChainNodeCard key={node.id} node={node} index={i} engineerMode={engineerMode} onPromptChange={(id, v) => setNodes(prev => prev.map(n => n.id === id ? { ...n, promptTemplate: v } : n))} isActiveLine={node.status === NodeStatus.COMPLETED && nodes[i + 1]?.status === NodeStatus.THINKING} />
          ))}
        </div>

      </main>

      {/* MODAL */}
      {showManual && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-lg holo-card rounded-2xl p-10 relative border border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.1)]">
            <button onClick={() => setShowManual(false)} className="absolute top-6 right-6 text-zinc-600 hover:text-white"><X size={24} /></button>
            <h2 className="text-xl font-bold font-mono text-white mb-8 flex items-center gap-3"><Book size={20} className="text-emerald-500" /> OPERATIONAL PROTOCOLS</h2>
            <div className="space-y-6 text-xs text-zinc-400 font-mono leading-relaxed tracking-wide">
              <p><span className="text-emerald-400 font-bold">01. INPUT INJECTION:</span> Enter a complex variable (e.g., "AI Ethics in Warfare").</p>
              <p><span className="text-emerald-400 font-bold">02. CHAIN REACTION:</span> Trigger the 3-stage agentic chain. Watch the liquid data flow.</p>
              <p><span className="text-emerald-400 font-bold">03. ENGINEER OVERRIDE:</span> Toggle 'ENG_MODE' to reveal and edit the underlying system prompts in real-time.</p>
              <p className="text-zinc-600 mt-8 border-t border-zinc-800 pt-6">SYSTEM VERSION 3.0 // ARCHITECTED BY AMBUJ KUMAR TRIPATHI</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const container = document.getElementById('root');
if (container) { const root = createRoot(container); root.render(<ChainReactionApp />); }