import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hash, CheckCircle, AlertTriangle, Copy, Download, ChevronRight, ArrowLeft, Shield, FileText, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { sha256, sanitizeInput } from '../utils/cryptoHash';
import { generateChainOfCustodyPDF } from '../utils/pdfExport';

const DEMO_EVIDENCE = {
  original: `FORENSIC EVIDENCE DOCUMENT
Case ID: CYBER-2026-00451
Date: 26-Sep-2026 09:00 AM IST
Type: Email Header + Body
Platform: Gmail

FROM: attacker@phish-domain.com
TO: victim@gmail.com
SUBJECT: Your Bank Account is Suspended

[Full email body preserved as captured by investigating officer]
SHA-256 to be computed for BSA Section 65B certificate.`,
  tampered: `FORENSIC EVIDENCE DOCUMENT
Case ID: CYBER-2026-00451
Date: 26-Sep-2026 09:00 AM IST
Type: Email Header + Body
Platform: Gmail

FROM: legitimate@realbank.com
TO: victim@gmail.com
SUBJECT: Your Bank Account is Suspended

[Full email body preserved as captured by investigating officer]
SHA-256 to be computed for BSA Section 65B certificate.`,
};

export default function HashEvidenceLab() {
  const [originalText, setOriginalText] = useState(DEMO_EVIDENCE.original);
  const [tamperedText, setTamperedText] = useState(DEMO_EVIDENCE.tampered);
  const [originalHash, setOriginalHash] = useState('');
  const [tamperedHash, setTamperedHash] = useState('');
  const [isComputing, setIsComputing] = useState(false);
  const [computed, setComputed] = useState(false);
  const [copied, setCopied] = useState('');

  const computeHashes = useCallback(async () => {
    setIsComputing(true);
    setComputed(false);
    await new Promise(r => setTimeout(r, 400));

    const [h1, h2] = await Promise.all([
      sha256(sanitizeInput(originalText) || originalText),
      sha256(sanitizeInput(tamperedText) || tamperedText),
    ]);

    setOriginalHash(h1);
    setTamperedHash(h2);
    setComputed(true);
    setIsComputing(false);
  }, [originalText, tamperedText]);

  const hashesMatch = computed && originalHash === tamperedHash;
  const mismatch = computed && !hashesMatch;

  const copyToClipboard = async (text, key) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  const downloadPDF = () => {
    generateChainOfCustodyPDF({
      label: 'Email Evidence — Phishing Case CYBER-2026-00451',
      type: 'Email Header and Body (Electronic Record)',
      timestamp: new Date().toISOString(),
      custodian: 'Investigating Officer — Cyber Crime PS',
      system: 'Gmail Server Logs (exported via IMAP)',
      sha256: originalHash,
      md5: originalHash.substring(0, 32),
    });
  };

  const resetDemo = () => {
    setOriginalText(DEMO_EVIDENCE.original);
    setTamperedText(DEMO_EVIDENCE.tampered);
    setOriginalHash('');
    setTamperedHash('');
    setComputed(false);
  };

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
          <span className="text-cyber-emerald font-mono">Lab 3: Hash Integrity Lab</span>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyber-emerald/30 text-xs font-mono text-cyber-emerald mb-4">
            <Hash size={12} /> Lab 3 — BSA Section 65B Cryptographic Hash Integrity Lab
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-white mb-3">
            Evidence <span className="text-cyber-emerald">Integrity Lab</span>
          </h1>
          <p className="text-slate-500 max-w-2xl">
            Compute SHA-256 hashes client-side using browser Web Crypto API. Detect tampered evidence and understand why hash divergence breaks chain of custody under BSA Section 65B.
          </p>
        </motion.div>

        {/* BSA 65B Info Card */}
        <div className="mb-8 p-5 rounded-xl border border-cyber-emerald/20 bg-cyber-emerald/5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-cyber-emerald/10 border border-cyber-emerald/30 flex items-center justify-center flex-shrink-0">
            <Shield size={18} className="text-cyber-emerald" />
          </div>
          <div>
            <div className="font-display font-bold text-slate-white text-sm mb-1">Bharatiya Sakshya Adhiniyam 2023 — Section 65B</div>
            <div className="text-slate-500 text-xs leading-relaxed">
              Electronic records are admissible as evidence only with a <strong className="text-slate-300">Section 65B certificate</strong> from the custodian. The certificate must include the <strong className="text-slate-300">SHA-256 hash</strong> of the original evidence. If the hash in court differs from the hash at collection → evidence is <strong className="text-warn-red">INADMISSIBLE</strong>.
            </div>
          </div>
        </div>

        {/* Two-Column Evidence Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Original Evidence */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-cyber-emerald" />
              <span className="font-mono text-xs text-cyber-emerald uppercase tracking-wider">Original Evidence (At Collection)</span>
            </div>
            <div className={`rounded-xl border overflow-hidden transition-all ${computed ? 'border-cyber-emerald/50' : 'border-obsidian-600'}`}>
              <div className="bg-obsidian-800/60 px-4 py-2 border-b border-obsidian-600 flex items-center justify-between">
                <span className="font-mono text-xs text-slate-500">evidence_original.txt</span>
                <span className="badge-emerald text-[9px]">UNTAMPERED</span>
              </div>
              <textarea
                value={originalText}
                onChange={(e) => { setOriginalText(e.target.value); setComputed(false); }}
                className="w-full bg-obsidian-900/80 text-slate-400 font-mono text-xs p-4 resize-none outline-none"
                rows={12}
                id="original-evidence-input"
                aria-label="Original evidence text"
              />
            </div>

            {/* Original Hash Output */}
            {computed && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-3 p-4 rounded-xl border ${hashesMatch ? 'hash-match' : 'border-cyber-emerald/40'}`}
              >
                <div className="font-mono text-[10px] text-slate-500 mb-1.5">SHA-256 Hash (Original):</div>
                <div className="font-mono text-xs text-cyber-emerald break-all leading-relaxed mb-2">{originalHash}</div>
                <button
                  onClick={() => copyToClipboard(originalHash, 'original')}
                  className="flex items-center gap-1.5 text-[10px] text-slate-500 hover:text-cyber-cyan transition-colors"
                >
                  <Copy size={10} />
                  {copied === 'original' ? 'Copied!' : 'Copy Hash'}
                </button>
              </motion.div>
            )}
          </div>

          {/* Tampered Evidence */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-2.5 h-2.5 rounded-full ${mismatch ? 'bg-warn-red' : 'bg-warn-amber'}`} />
              <span className={`font-mono text-xs uppercase tracking-wider ${mismatch ? 'text-warn-red' : 'text-warn-amber'}`}>
                Evidence After Submission (Potentially Tampered)
              </span>
            </div>
            <div className={`rounded-xl border overflow-hidden transition-all ${
              mismatch ? 'border-warn-red/50 hash-mismatch' :
              hashesMatch ? 'border-cyber-emerald/50 hash-match' :
              'border-obsidian-600'
            }`}>
              <div className="bg-obsidian-800/60 px-4 py-2 border-b border-obsidian-600 flex items-center justify-between">
                <span className="font-mono text-xs text-slate-500">evidence_court.txt</span>
                {mismatch && <span className="badge-danger text-[9px]">⚠ TAMPERED</span>}
                {hashesMatch && <span className="badge-emerald text-[9px]">✓ INTACT</span>}
              </div>
              <textarea
                value={tamperedText}
                onChange={(e) => { setTamperedText(e.target.value); setComputed(false); }}
                className="w-full bg-obsidian-900/80 text-slate-400 font-mono text-xs p-4 resize-none outline-none"
                rows={12}
                id="tampered-evidence-input"
                aria-label="Court-submitted evidence text"
              />
            </div>

            {/* Tampered Hash Output */}
            {computed && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-3 p-4 rounded-xl border ${mismatch ? 'hash-mismatch border-warn-red/50' : 'hash-match'}`}
              >
                <div className="font-mono text-[10px] text-slate-500 mb-1.5">SHA-256 Hash (Court Submission):</div>
                <div className={`font-mono text-xs break-all leading-relaxed mb-2 ${mismatch ? 'text-warn-red' : 'text-cyber-emerald'}`}>
                  {tamperedHash}
                </div>
                <button
                  onClick={() => copyToClipboard(tamperedHash, 'tampered')}
                  className="flex items-center gap-1.5 text-[10px] text-slate-500 hover:text-cyber-cyan transition-colors"
                >
                  <Copy size={10} />
                  {copied === 'tampered' ? 'Copied!' : 'Copy Hash'}
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <button
            onClick={computeHashes}
            disabled={isComputing}
            className="btn-cyber-solid inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm"
            id="compute-hashes-btn"
          >
            {isComputing ? (
              <>
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Computing SHA-256...
              </>
            ) : (
              <>
                <Hash size={16} />
                Compute SHA-256 Hashes
              </>
            )}
          </button>
          <button
            onClick={resetDemo}
            className="btn-cyber inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm"
          >
            <RefreshCw size={14} />
            Reset Demo
          </button>
          {computed && originalHash && (
            <button
              onClick={downloadPDF}
              className="btn-cyber inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm border-cyber-emerald/40 text-cyber-emerald"
              id="download-custody-pdf"
            >
              <Download size={14} />
              Download BSA 65B Certificate
            </button>
          )}
        </div>

        {/* Verdict Panel */}
        <AnimatePresence>
          {computed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`p-8 rounded-2xl border ${
                hashesMatch
                  ? 'border-cyber-emerald/40 bg-cyber-emerald/5'
                  : 'border-warn-red/40 bg-warn-red/5'
              }`}
            >
              <div className="text-center mb-6">
                {hashesMatch ? (
                  <>
                    <CheckCircle size={40} className="text-cyber-emerald mx-auto mb-3" />
                    <h3 className="font-display text-2xl font-bold text-cyber-emerald mb-2">Hash Match — Evidence Intact</h3>
                    <p className="text-slate-500 text-sm">Both hashes are identical. The evidence has not been modified. Chain of custody is maintained. BSA Section 65B certificate is valid.</p>
                  </>
                ) : (
                  <>
                    <AlertTriangle size={40} className="text-warn-red mx-auto mb-3" />
                    <h3 className="font-display text-2xl font-bold text-warn-red mb-2">HASH MISMATCH — Evidence Tampered!</h3>
                    <p className="text-slate-500 text-sm">The hashes differ — the evidence was modified between collection and court submission. This breaks the chain of custody and the evidence is <strong className="text-warn-red">INADMISSIBLE</strong> under BSA Section 65B.</p>
                  </>
                )}
              </div>

              {mismatch && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  {[
                    { title: 'Chain of Custody', status: 'BROKEN', color: '#EF4444' },
                    { title: 'BSA Sec 65B Certificate', status: 'INVALID', color: '#EF4444' },
                    { title: 'Court Admissibility', status: 'REJECTED', color: '#EF4444' },
                  ].map(item => (
                    <div key={item.title} className="p-4 rounded-xl border border-warn-red/20 bg-warn-red/5">
                      <div className="font-display font-bold text-warn-red text-lg mb-1">{item.status}</div>
                      <div className="text-slate-500 text-xs">{item.title}</div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Theory Section */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="cyber-card p-6">
            <FileText size={20} className="text-cyber-cyan mb-4" />
            <h3 className="font-display font-bold text-slate-white mb-3">BSA Section 65B Requirements</h3>
            <ul className="space-y-2 text-xs text-slate-400">
              {[
                'Certificate from custodian of the computer system',
                'Computer was used regularly during the period',
                'Computer was functioning properly',
                'Data was supplied to computer in the ordinary course',
                'SHA-256 hash of original evidence included',
                'Chain of custody documentation',
              ].map((req, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan flex-shrink-0 mt-1.5" />
                  {req}
                </li>
              ))}
            </ul>
          </div>

          <div className="cyber-card p-6">
            <Hash size={20} className="text-cyber-emerald mb-4" />
            <h3 className="font-display font-bold text-slate-white mb-3">Why SHA-256?</h3>
            <div className="space-y-3 text-xs text-slate-400">
              <p>SHA-256 produces a unique 256-bit (64 hex character) fingerprint. Even a single character change in the evidence produces a completely different hash — making any tampering instantly detectable.</p>
              <div className="terminal p-3">
                <div className="terminal-line-gray"># Original:</div>
                <div className="terminal-line-green text-[10px] break-all">a3f7c891e4b2d65f...</div>
                <div className="terminal-line-gray mt-2"># After 1 character change:</div>
                <div className="terminal-line-red text-[10px] break-all">9b2a4f73c1e8d902...</div>
                <div className="terminal-line-amber mt-2">→ COMPLETELY DIFFERENT HASH</div>
              </div>
              <p>CERT-In mandates SHA-256 for forensic hashing. MD5 is considered legacy (collision-vulnerable) but still accepted in some contexts.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
