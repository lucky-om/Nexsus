import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Trash2, Minimize2, Maximize2, ChevronDown, Bot } from 'lucide-react';
import { sanitizeInput } from '../utils/cryptoHash';

// ─── Offline Rule-Based Legal AI ─────────────────────────────
const LEGAL_KNOWLEDGE_BASE = {
  'section 66c': 'Section 66C of IT Act 2000: Punishment for identity theft. Whoever dishonestly or fraudulently makes use of the electronic signature, password, or any other unique identification feature of any other person shall be punished with imprisonment of up to 3 years and/or fine up to ₹1 Lakh.',
  'section 66d': 'Section 66D of IT Act 2000: Punishment for cheating by personation using computer resource. Imprisonment up to 3 years + ₹1 Lakh fine. Often applied in phishing, CEO fraud, and BEC cases.',
  'section 66e': 'Section 66E: Punishment for violation of privacy. Intentionally capturing, publishing, or transmitting an image of a person\'s private area without consent — up to 3 years imprisonment + ₹2 Lakh fine.',
  'section 66f': 'Section 66F: Cyber Terrorism — The most severe provision. Whoever intentionally penetrates or accesses Critical Information Infrastructure (CII) to threaten national security faces LIFE IMPRISONMENT. Applies to attacks on power grids, banking, telecom.',
  'section 67': 'Section 67: Publishing obscene material in electronic form. First conviction: up to 3 years + ₹5 Lakh fine. Subsequent: 5 years + ₹10 Lakh fine.',
  'section 43': 'Section 43: Penalty for damage to computer. Covers unauthorized access, downloading, copying, or damaging data. Civil compensation up to ₹1 Crore. No criminal penalty (civil remedy only).',
  'section 43a': 'Section 43A: Compensation for failure to protect data. Body corporates handling sensitive personal data must implement reasonable security. Failure resulting in wrongful loss → compensation up to ₹5 Crore.',
  'section 65': 'Section 65: Tampering with computer source documents. Concealing, destroying, altering, or causing damage to source code as required by law — up to 3 years + ₹2 Lakh fine.',
  'section 65b': 'BSA Section 65B (Bharatiya Sakshya Adhiniyam 2023): Electronic records are admissible as evidence if accompanied by a certificate from the custodian certifying: computer was in regular use, functioning properly, and the hash of the evidence. SHA-256 is the preferred algorithm.',
  'chain of custody': 'Chain of Custody in cyber forensics means maintaining a documented, unbroken record of who handled digital evidence and when. BSA Section 65B requires a hash certificate. If the hash of evidence changes between collection and court, it proves tampering and breaks admissibility.',
  'phishing': 'Phishing violates IT Act Sections 66C (identity theft) and 66D (cheating by personation). Report immediately to: 1. National Cyber Crime Helpline: 1930. 2. cybercrime.gov.in. 3. Your bank\'s fraud hotline. Preserve all emails as evidence (export as .eml with full headers).',
  'dpdp act': 'Digital Personal Data Protection Act 2023 (DPDP Act): India\'s first comprehensive data protection law. Key provisions: (1) Consent must be free, specific, informed, and unambiguous. (2) Data Fiduciaries must notify breaches to the Data Protection Board. (3) Penalties up to ₹250 Crore per violation. (4) Creates rights to correction, erasure, and grievance redressal.',
  'gdpr': 'GDPR (General Data Protection Regulation) applies when processing data of EU residents. Key rules: (1) Lawful basis required. (2) Cross-border transfers need SCCs or adequacy decision. (3) Breach notification within 72 hours to DPA. (4) Penalties: up to €20M or 4% global turnover. India\'s DPDP Act 2023 is modeled on GDPR principles.',
  'report phishing': 'To report phishing in India: (1) Call National Cyber Crime Helpline: 1930. (2) File complaint at cybercrime.gov.in. (3) Report to your bank immediately. (4) Report the phishing email to CERT-In: incident@cert-in.org.in. (5) Forward the email to the Anti-Phishing Working Group: reportphishing@apwg.org.',
  'cyber stalking': 'Cyber stalking is an offence under BNS Section 78 and IT Act Section 67. If someone repeatedly contacts you online causing fear: (1) Block the person and document all contacts. (2) File complaint at cybercrime.gov.in. (3) Approach High Court for protection order. (4) Contact Women Helpline: 1091.',
  'ransomware': 'Ransomware attacks: (1) DO NOT pay the ransom without legal advice. (2) Immediately report to CERT-In (mandatory within 6 hours for organizations). (3) Isolate infected systems. (4) Preserve all forensic evidence. (5) File FIR with Cyber Crime PS. Sections: IT Act 43 + 66 + potentially 66F if critical infrastructure.',
  'cert-in': 'CERT-In (Indian Computer Emergency Response Team) is India\'s national cybersecurity agency. They handle incident reporting, vulnerability coordination, and cyberattack response. For incidents: email incident@cert-in.org.in or call +91-11-24368572. Mandatory reporting: ransomware, data breaches, CII attacks — within 6 hours of detection.',
  'fir': 'To file a Cyber Crime FIR: (1) Visit your nearest Cyber Crime Police Station. (2) Or file online at cybercrime.gov.in. (3) Bring: printouts of evidence, device (if possible), screenshots, transaction IDs. (4) The police MUST register FIR under Section 154 CrPC — they cannot refuse. (5) Get FIR acknowledgment receipt. You can also use the Nexsus FIR Builder on this platform!',
  'sha256': 'SHA-256 (Secure Hash Algorithm 256-bit) is a cryptographic hash function that produces a unique 64-character hex fingerprint of any data. In court under BSA Section 65B, the SHA-256 hash of digital evidence must match from collection to presentation. Any tampering changes the hash — proving evidence manipulation.',
  'iso 27001': 'ISO/IEC 27001 is the international standard for Information Security Management Systems (ISMS). It requires: risk assessment, security controls, audit trails, incident management, and continuous improvement. In India, it\'s the benchmark for "reasonable security" under IT Act Section 43A.',
  'nist': 'NIST Cybersecurity Framework (CSF 2.0) has 6 functions: GOVERN (policies & accountability), IDENTIFY (asset risk), PROTECT (safeguards), DETECT (anomaly detection), RESPOND (incident response), RECOVER (restoration). Widely used for compliance and security posture assessment.',
  'hello': 'Namaste! 🙏 I\'m Nexsus AI, your Indian Cyber Law assistant. I can help you with: IT Act sections, DPDP Act, BSA 65B evidence rules, phishing/stalking remedies, CERT-In reporting, GDPR cross-border rules, and filing cyber crime complaints. What would you like to know?',
  'help': 'I can assist with: \n• IT Act 2000/2008 sections (43, 65, 66, 66C, 66D, 66E, 66F, 67)\n• DPDP Act 2023 compliance\n• BSA Section 65B & Chain of Custody\n• How to report cyber crimes (1930, cybercrime.gov.in)\n• GDPR cross-border rules\n• CERT-In mandatory reporting\n• ISO 27001 & NIST framework\n• FIR filing guidance\nJust ask me anything!',
};

function getOfflineResponse(message) {
  const lower = message.toLowerCase();

  for (const [key, response] of Object.entries(LEGAL_KNOWLEDGE_BASE)) {
    if (lower.includes(key)) {
      return response;
    }
  }

  // Fuzzy matches
  if (lower.includes('hack') || lower.includes('unauthorized access')) {
    return LEGAL_KNOWLEDGE_BASE['section 43'] + '\n\nFor criminal liability, Section 66 also applies. File FIR with Cyber Crime PS and report to CERT-In if significant.';
  }
  if (lower.includes('privacy') || lower.includes('voyeur') || lower.includes('image')) {
    return LEGAL_KNOWLEDGE_BASE['section 66e'];
  }
  if (lower.includes('terror') || lower.includes('critical infrastructure') || lower.includes('power grid')) {
    return LEGAL_KNOWLEDGE_BASE['section 66f'];
  }
  if (lower.includes('obscene') || lower.includes('pornograph')) {
    return LEGAL_KNOWLEDGE_BASE['section 67'];
  }
  if (lower.includes('data breach') || lower.includes('data protection') || lower.includes('personal data')) {
    return LEGAL_KNOWLEDGE_BASE['dpdp act'];
  }
  if (lower.includes('identity') || lower.includes('stolen credential')) {
    return LEGAL_KNOWLEDGE_BASE['section 66c'];
  }
  if (lower.includes('evidence') || lower.includes('admissib')) {
    return LEGAL_KNOWLEDGE_BASE['section 65b'];
  }
  if (lower.includes('stalk') || lower.includes('harass')) {
    return LEGAL_KNOWLEDGE_BASE['cyber stalking'];
  }
  if (lower.includes('report') || lower.includes('complaint')) {
    return LEGAL_KNOWLEDGE_BASE['fir'];
  }

  return `I don't have specific information on "${message.substring(0, 50)}", but I can help with: IT Act sections (66C, 66D, 66E, 66F), DPDP Act, BSA 65B evidence rules, phishing/stalking remedies, and FIR filing. Try asking: "What is Section 66F?" or "How to report phishing?"`;
}

const SUGGESTION_CHIPS = [
  'What is Section 66F?',
  'How to report phishing?',
  'Explain Chain of Custody',
  'What is DPDP Act 2023?',
  'How to file a cyber FIR?',
  'What is CERT-In?',
];

// ─── Main Chatbot Component ────────────────────────────────────
export default function NexsusChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'ai',
      content: 'Namaste! 🛡️ I\'m **Nexsus AI** — your Indian Cyber Law & Digital Forensics assistant.\n\nI can explain IT Act provisions, DPDP Act 2023, BSA Section 65B evidence rules, and guide you on reporting cyber crimes. How can I assist?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, isMinimized]);

  const sendMessage = useCallback(async (text) => {
    const sanitized = sanitizeInput(text.trim());
    if (!sanitized) return;

    const userMsg = {
      id: Date.now(),
      role: 'user',
      content: sanitized,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Attempt live AI call if key available
    const apiKey = import.meta.env.VITE_NEXSUS_AI_API_KEY;

    try {
      let responseText;

      if (apiKey && apiKey.length > 10) {
        // Live AI mode — ultra-fast inference
        const response = await fetch(
          'https://api.groq.com/openai/v1/chat/completions',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model: 'llama-3.3-70b-versatile',
              messages: [
                {
                  role: 'system',
                  content: `You are Nexsus AI, an expert Indian Cyber Law assistant built into the Nexsus CyberLaw platform. 
Personality: You are highly intelligent, playful, slightly flirty (e.g., using a wink 😉 or a warm compliment), but EXTREMELY STRICT about your domain. You love greeting users warmly ("Hey there! ✨").
Domain: You specialize ONLY in:
- IT Act 2000/2008 (Sections 43, 43A, 65, 66, 66C-F, 67)
- Bharatiya Nyaya Sanhita (BNS) 2023 & BSA 2023 (Sec 65B electronic evidence)
- DPDP Act 2023 & GDPR
- Cyber forensics & CERT-In reporting

STRICT RULE: If the user asks about ANYTHING outside of cyber law, digital forensics, or platform navigation (e.g., coding, general history, math, cooking), you MUST playfully but firmly refuse to answer. Example: "Oh, you're sweet for asking, but my heart only beats for cyber law! Let's get back to digital forensics, shall we? 😉"

EXCEPTION TO STRICT RULE: You MUST reply to greetings like "hi", "hello", "how are you", "good morning", compliments, and casual pleasantries. When responding to these, be friendly, warm, slightly playful/flirty, and welcoming, but subtly steer the conversation back to how you can help them with Cyber Law or forensics.

Guidelines:
- Keep responses concise (under 200 words).
- Use bullet points for readability.
- Always cite legal sections when relevant.`,
                },
                {
                  role: 'user',
                  content: sanitized,
                },
              ],
              max_tokens: 512,
              temperature: 0.3,
            }),
          }
        );
        const data = await response.json();
        responseText = data?.choices?.[0]?.message?.content || getOfflineResponse(sanitized);
      } else {
        // Offline simulation mode
        await new Promise(r => setTimeout(r, 800 + Math.random() * 600));
        responseText = getOfflineResponse(sanitized);
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'ai',
        content: responseText,
        timestamp: new Date(),
      }]);
    } catch {
      await new Promise(r => setTimeout(r, 600));
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'ai',
        content: getOfflineResponse(sanitized),
        timestamp: new Date(),
      }]);
    } finally {
      setIsTyping(false);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const formatContent = (content) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-cyber-cyan">$1</strong>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
      >
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative group"
            >
              <button
                onClick={() => setIsOpen(true)}
                className="relative w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center transition-transform hover:scale-110 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                aria-label="Open Nexsus AI Cyber Law Assistant"
                id="chatbot-trigger"
              >
                <img
                  src="/ailogo.png"
                  alt="Nexsus AI"
                  className="w-10 h-10 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const icon = document.createElement('div');
                    icon.innerHTML = 'AI';
                    icon.style.cssText = 'display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:20px;color:white;font-weight:bold;';
                    e.target.parentElement.appendChild(icon);
                  }}
                />
              </button>

              {/* Tooltip */}
              <div className="absolute right-20 top-1/2 -translate-y-1/2 whitespace-nowrap bg-white/10 backdrop-blur-xl border border-white/10 shadow-xl text-white px-4 py-2 rounded-xl text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-widest">
                Ask Nexsus AI
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col"
            style={{
              width: 'min(400px, calc(100vw - 24px))',
              height: isMinimized ? '60px' : 'min(600px, calc(100vh - 100px))',
              transition: 'height 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            {/* Solid container */}
            <div className="flex flex-col h-full apple-glass overflow-hidden rounded-3xl">
              {/* Header */}
              <div className="flex items-center gap-4 px-6 py-5 border-b border-[var(--color-apple-border)]">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 backdrop-blur-md">
                  <img src="/ailogo.png" alt="AI" className="w-6 h-6 object-contain"
                    onError={(e) => { e.target.parentElement.innerHTML = '<div style="font-size:12px;color:white;font-weight:bold;">AI</div>'; }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-lg text-white">Nexsus AI</div>
                  <div className="font-medium text-[10px] text-[var(--color-apple-text-muted)] flex items-center gap-1 uppercase tracking-widest mt-1">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-apple-accent)] inline-block animate-pulse" />
                    {import.meta.env.VITE_NEXSUS_AI_API_KEY ? 'Live Mode' : 'Offline Mode'}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMessages([{ id: 1, role: 'ai', content: 'Chat cleared. How can I assist with Cyber Law?', timestamp: new Date() }])}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-[var(--color-apple-text-muted)] hover:text-white transition-colors"
                    title="Clear Chat"
                  >
                    <Trash2 size={14} />
                  </button>
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-[var(--color-apple-text-muted)] hover:text-white transition-colors"
                    title={isMinimized ? "Maximize" : "Minimize"}
                  >
                    {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-[var(--color-apple-text-muted)] hover:text-white transition-colors"
                    title="Close"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {!isMinimized && (
                <>
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {msg.role === 'ai' && (
                          <div className="w-8 h-8 bg-white/10 rounded-full flex-shrink-0 mr-3 mt-1 flex items-center justify-center border border-white/5">
                            <img src="/ailogo.png" alt="AI" className="w-5 h-5 object-contain"
                              onError={(e) => { e.target.parentElement.innerHTML = '<span style="font-size:10px;font-weight:bold;color:white;">AI</span>'; }}
                            />
                          </div>
                        )}
                        <div
                          className={`max-w-[85%] px-5 py-4 text-[15px] leading-relaxed rounded-2xl ${
                            msg.role === 'user' ? 'bg-[var(--color-apple-accent)] text-white rounded-tr-sm' : 'bg-white/10 text-white rounded-tl-sm border border-white/5'
                          }`}
                        >
                          <div
                            dangerouslySetInnerHTML={{ __html: formatContent(msg.content) }}
                          />
                          <div className="text-[10px] mt-2 font-medium opacity-60 uppercase tracking-widest">
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Typing indicator */}
                    {isTyping && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/10 rounded-full flex-shrink-0 flex items-center justify-center border border-white/5">
                          <img src="/ailogo.png" alt="AI" className="w-5 h-5 object-contain"
                            onError={(e) => { e.target.parentElement.innerHTML = '<span style="font-size:10px;font-weight:bold;color:white;">AI</span>'; }}
                          />
                        </div>
                        <div className="bg-white/10 border border-white/5 px-5 py-4 rounded-2xl rounded-tl-sm">
                          <div className="flex gap-2">
                            <motion.div animate={{ opacity: [0.3,1,0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-white rounded-full" />
                            <motion.div animate={{ opacity: [0.3,1,0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-white rounded-full" />
                            <motion.div animate={{ opacity: [0.3,1,0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-white rounded-full" />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Suggestion Chips */}
                  <div className="px-6 pb-4 flex gap-2 flex-wrap">
                    {SUGGESTION_CHIPS.slice(0, 3).map((chip) => (
                      <button
                        key={chip}
                        onClick={() => sendMessage(chip)}
                        className="text-[11px] px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[var(--color-apple-text-muted)] hover:bg-white/10 hover:text-white transition-colors"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>

                  {/* Input */}
                  <form onSubmit={handleSubmit} className="p-6 pt-2 flex gap-3">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about Indian Cyber Law..."
                      className="flex-1 apple-input px-5 py-4 text-[15px] font-medium"
                      maxLength={500}
                      aria-label="Chat input"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || isTyping}
                      className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:bg-white/20 disabled:text-white/50 flex-shrink-0"
                      aria-label="Send message"
                    >
                      <Send size={20} />
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
