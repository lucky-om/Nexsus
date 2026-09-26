import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, AlertTriangle, Shield, CheckCircle, X, Eye, ExternalLink, ChevronRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PHISHING_EMAIL = {
  from: 'alerts@sbibanksecure-kyc.in',
  fromDisplay: 'SBI Bank Security Team <alerts@sbibanksecure-kyc.in>',
  subject: '🚨 URGENT: Your SBI Account KYC Suspended — Verify Immediately',
  to: 'you@gmail.com',
  date: 'Fri, Sep 26, 2026 09:47 AM',
  body: `Dear Valued Customer,

We have detected suspicious activity on your State Bank of India account. Your account has been SUSPENDED due to incomplete KYC verification.

To avoid permanent account closure, please verify your details IMMEDIATELY by clicking below:

[ VERIFY MY ACCOUNT NOW ]
https://www.sbi-kyc-verification-secure.com/verify?token=abc123

Required Information:
• Full Name
• Account Number
• Debit Card Number + CVV
• OTP (will be sent to registered mobile)
• Date of Birth

⚠️ WARNING: Failure to verify within 24 HOURS will result in permanent account blocking and legal action.

Regards,
State Bank of India Security Division
Customer Care: 1800-11-2211`,
  redFlags: [
    { id: 'domain', x: '38%', y: '24%', label: 'Forged Sender Domain', desc: 'sbibanksecure-kyc.in is NOT the official SBI domain (onlinesbi.sbi). Cybercriminals register lookalike domains to deceive victims.', law: 'IT Act Sec 66C — Identity Theft (using SBI brand)' },
    { id: 'url', x: '30%', y: '51%', label: 'Malicious URL', desc: 'sbi-kyc-verification-secure.com is a spoofed domain. Hovering reveals the real destination — never click links from suspicious emails.', law: 'IT Act Sec 66D — Cheating by personation via computer' },
    { id: 'urgency', x: '60%', y: '68%', label: 'Artificial Urgency', desc: '"24 HOURS" deadline and "permanent blocking" threats are classic social engineering techniques to prevent victims from thinking critically.', law: 'BNS Sec 318 — Cheating (psychological manipulation)' },
    { id: 'data', x: '20%', y: '58%', label: 'Requesting CVV + OTP', desc: 'NO legitimate bank EVER asks for your CVV, full debit card number, or OTP via email. This is designed to steal your banking credentials.', law: 'IT Act Sec 66C — Dishonest use of authentication credentials' },
  ],
};

const REAL_EMAIL = {
  from: 'alerts@onlinesbi.sbi',
  subject: 'Your SBI transaction of ₹5,000 completed successfully',
  body: `Dear Customer,

Your SBI account XXXXXX1234 has been debited for ₹5,000.00 on 26-Sep-2026.

Transaction ID: INF23456789012
If not done by you, call 1800-11-2211 immediately.

State Bank of India`,
  greenFlags: ['Official domain: @onlinesbi.sbi', 'No request for credentials/OTP', 'Specific account/transaction details', 'Official helpline number'],
};

export default function PhishingLab() {
  const [activeFlag, setActiveFlag] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [clickedFlags, setClickedFlags] = useState(new Set());
  const [verdict, setVerdict] = useState(false);

  const handleFlagClick = (flag) => {
    setActiveFlag(activeFlag?.id === flag.id ? null : flag);
    setClickedFlags(prev => new Set([...prev, flag.id]));
  };

  const allFlagsFound = clickedFlags.size === PHISHING_EMAIL.redFlags.length;

  return (
    <div className="min-h-screen bg-obsidian-950 py-12 px-4">
      <div className="cyber-grid-bg absolute inset-0 opacity-30 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link to="/simulations" className="hover:text-cyber-cyan transition-colors flex items-center gap-1">
            <ArrowLeft size={14} />Cyber Labs
          </Link>
          <ChevronRight size={14} />
          <span className="text-cyber-cyan font-mono">Lab 1: Phishing Inspector</span>
        </div>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-warn-amber/30 text-xs font-mono text-warn-amber mb-4">
            <Mail size={12} /> Lab 1 — Phishing & Spoof Inspector
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-white mb-3">
            Phishing <span className="gradient-text-warn">Detection Lab</span>
          </h1>
          <p className="text-slate-500 max-w-2xl">
            Examine a mock banking inbox. Click the highlighted red zones to uncover phishing indicators and the applicable legal violations under IT Act 2000.
          </p>
        </motion.div>

        {/* Progress */}
        <div className="flex items-center gap-4 mb-8 p-4 rounded-xl glass border border-obsidian-600">
          <div className="font-mono text-xs text-slate-500">Red Flags Found:</div>
          <div className="flex gap-2">
            {PHISHING_EMAIL.redFlags.map(flag => (
              <div
                key={flag.id}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  clickedFlags.has(flag.id)
                    ? 'border-warn-red bg-warn-red/20 text-warn-red'
                    : 'border-obsidian-600 text-slate-600'
                }`}
              >
                {clickedFlags.has(flag.id) ? <AlertTriangle size={12} /> : <span className="text-xs">?</span>}
              </div>
            ))}
          </div>
          <div className="ml-auto font-mono text-xs text-slate-500">
            {clickedFlags.size} / {PHISHING_EMAIL.redFlags.length}
          </div>
          {allFlagsFound && !verdict && (
            <button onClick={() => setVerdict(true)} className="btn-danger text-xs py-1.5 px-4">
              Reveal Verdict
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Phishing Email */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="font-mono text-xs text-warn-red mb-3 flex items-center gap-2">
              <AlertTriangle size={12} />
              SUSPICIOUS EMAIL — Click red hotspots to investigate
            </div>
            <div className="rounded-xl border border-warn-red/30 overflow-hidden"
              style={{ background: 'rgba(9,13,22,0.9)' }}>
              {/* Email header */}
              <div className="bg-obsidian-800/80 px-4 py-3 border-b border-obsidian-700">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-warn-red/60" />
                  <div className="w-3 h-3 rounded-full bg-warn-amber/60" />
                  <div className="w-3 h-3 rounded-full bg-cyber-emerald/60" />
                  <span className="font-mono text-xs text-slate-600 ml-2">Inbox — Mock SBI Alert</span>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex gap-2">
                    <span className="text-slate-600 w-12">From:</span>
                    <span className="text-warn-amber font-mono cursor-pointer hover:text-warn-red transition-colors" onClick={() => handleFlagClick(PHISHING_EMAIL.redFlags[0])}>
                      {PHISHING_EMAIL.fromDisplay}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-slate-600 w-12">To:</span>
                    <span className="text-slate-400">{PHISHING_EMAIL.to}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-slate-600 w-12">Date:</span>
                    <span className="text-slate-400">{PHISHING_EMAIL.date}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-slate-600 w-12">Subject:</span>
                    <span className="text-warn-red font-semibold">{PHISHING_EMAIL.subject}</span>
                  </div>
                </div>
              </div>

              {/* Email body with clickable zones */}
              <div className="p-5 font-mono text-sm text-slate-400 leading-relaxed space-y-3 relative">
                <p className="text-slate-300">Dear Valued Customer,</p>
                <p>We have detected <span className="text-warn-amber font-bold">suspicious activity</span> on your State Bank of India account. Your account has been <span className="text-warn-red font-bold">SUSPENDED</span> due to incomplete KYC verification.</p>
                <p>To avoid permanent account closure, please verify your details <span className="text-warn-amber font-bold cursor-pointer hover:underline" onClick={() => handleFlagClick(PHISHING_EMAIL.redFlags[0])}>IMMEDIATELY</span> by clicking below:</p>

                <button
                  onClick={() => handleFlagClick(PHISHING_EMAIL.redFlags[1])}
                  className="w-full py-3 rounded-lg font-bold text-obsidian-950 text-sm transition-all hover:opacity-80"
                  style={{ background: 'linear-gradient(135deg, #EF4444, #F59E0B)' }}
                >
                  [ VERIFY MY ACCOUNT NOW ]
                  <div className="text-xs font-normal text-obsidian-800 mt-0.5">https://www.sbi-kyc-verification-secure.com/verify...</div>
                </button>

                <p>Required Information:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Full Name</li>
                  <li>• Account Number</li>
                  <li
                    className="text-warn-red font-bold cursor-pointer hover:underline"
                    onClick={() => handleFlagClick(PHISHING_EMAIL.redFlags[3])}
                  >
                    • Debit Card Number + CVV ⚠️ CLICK ME
                  </li>
                  <li
                    className="text-warn-red font-bold cursor-pointer hover:underline"
                    onClick={() => handleFlagClick(PHISHING_EMAIL.redFlags[3])}
                  >
                    • OTP (will be sent to registered mobile) ⚠️
                  </li>
                  <li>• Date of Birth</li>
                </ul>

                <p
                  className="text-warn-red font-bold cursor-pointer hover:underline"
                  onClick={() => handleFlagClick(PHISHING_EMAIL.redFlags[2])}
                >
                  ⚠️ WARNING: Failure to verify within 24 HOURS will result in permanent account blocking — CLICK TO INVESTIGATE
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Legitimate Email + Analysis Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Legitimate Email */}
            <div>
              <div className="font-mono text-xs text-cyber-emerald mb-3 flex items-center gap-2">
                <CheckCircle size={12} />
                AUTHENTIC EMAIL — Compare with suspicious one
              </div>
              <div className="rounded-xl border border-cyber-emerald/30 overflow-hidden bg-obsidian-900/60">
                <div className="bg-cyber-emerald/5 px-4 py-3 border-b border-cyber-emerald/20">
                  <div className="text-xs space-y-1">
                    <div><span className="text-slate-600">From: </span><span className="text-cyber-emerald font-mono">{REAL_EMAIL.from}</span></div>
                    <div><span className="text-slate-600">Subject: </span><span className="text-slate-300">{REAL_EMAIL.subject}</span></div>
                  </div>
                </div>
                <div className="p-4 font-mono text-xs text-slate-400 leading-relaxed whitespace-pre-line">
                  {REAL_EMAIL.body}
                </div>
                <div className="px-4 pb-3 flex flex-wrap gap-1.5">
                  {REAL_EMAIL.greenFlags.map(flag => (
                    <span key={flag} className="badge-emerald text-[10px]">✓ {flag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Analysis Panel */}
            <AnimatePresence mode="wait">
              {activeFlag ? (
                <motion.div
                  key={activeFlag.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-5 rounded-xl border border-warn-red/30 bg-warn-red/5"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <AlertTriangle size={16} className="text-warn-red" />
                      <span className="font-display font-bold text-warn-amber text-sm">{activeFlag.label}</span>
                    </div>
                    <button onClick={() => setActiveFlag(null)} className="text-slate-600 hover:text-slate-400">
                      <X size={14} />
                    </button>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed mb-3">{activeFlag.desc}</p>
                  <div className="p-2 rounded-lg bg-obsidian-900/60 border border-warn-red/20">
                    <div className="font-mono text-[10px] text-warn-red">{activeFlag.law}</div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-5 rounded-xl border border-obsidian-600 bg-obsidian-800/40 text-center"
                >
                  <Eye size={24} className="text-slate-600 mx-auto mb-2" />
                  <div className="text-slate-600 text-sm">Click a red flag in the phishing email to reveal the legal analysis</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Verdict Panel */}
        <AnimatePresence>
          {verdict && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="mt-10 p-8 rounded-2xl border border-warn-red/40 overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.08), rgba(245,158,11,0.05))' }}
            >
              <div className="text-center mb-6">
                <div className="font-mono text-warn-red text-xs uppercase tracking-widest mb-2">⚖️ Legal Verdict</div>
                <h3 className="font-display text-2xl font-bold text-slate-white mb-2">Phishing Email — Criminal Violations Identified</h3>
                <p className="text-slate-500 text-sm">This email constitutes multiple offences under Indian cyber law</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {[
                  { section: 'IT Act Sec 66C', title: 'Identity Theft', desc: 'Dishonestly using SBI\'s identity and brand to deceive victims. Penalty: 3 Years + ₹1 Lakh Fine.', color: '#EF4444' },
                  { section: 'IT Act Sec 66D', title: 'Cheating by Personation', desc: 'Cheating by impersonating SBI through computer resources (email). Penalty: 3 Years + ₹1 Lakh Fine.', color: '#F59E0B' },
                  { section: 'BNS Sec 318', title: 'Cheating & Fraud', desc: 'Creating fraudulent inducement to give up credentials causing wrongful gain. Criminal + Civil liability.', color: '#EC4899' },
                  { section: 'Immediate Action', title: 'What To Do', desc: '1. Do NOT click any link. 2. Report to 1930. 3. Forward to report.phishing@apwg.org. 4. File at cybercrime.gov.in.', color: '#10B981' },
                ].map(item => (
                  <div key={item.section} className="p-4 rounded-xl border" style={{ borderColor: `${item.color}30`, background: `${item.color}08` }}>
                    <div className="font-mono text-xs font-bold mb-1" style={{ color: item.color }}>{item.section}</div>
                    <div className="font-display font-semibold text-slate-white text-sm mb-1">{item.title}</div>
                    <div className="text-slate-500 text-xs leading-relaxed">{item.desc}</div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-4">
                <button onClick={() => { setVerdict(false); setClickedFlags(new Set()); setActiveFlag(null); }} className="btn-cyber">
                  Reset Lab
                </button>
                <Link to="/report-generator" className="btn-cyber-solid inline-flex items-center gap-2 px-6 py-2.5 rounded-xl">
                  Build FIR Draft <ChevronRight size={14} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
