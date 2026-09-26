import { motion } from 'framer-motion';
import { Shield, Lock, Database, Globe, Mail } from 'lucide-react';

export default function DataProtection() {
  return (
    <div className="min-h-screen bg-obsidian-950 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyber-cyan/20 text-xs font-mono text-cyber-cyan mb-4">
            <Lock size={12} /> Privacy & Data Protection
          </div>
          <h1 className="font-display text-4xl font-bold text-slate-white mb-3">Privacy Policy</h1>
          <p className="text-slate-500">Last updated: September 26, 2026 | Compliant with DPDP Act 2023 & GDPR</p>
        </motion.div>

        <div className="space-y-8">
          {[
            {
              icon: Database,
              title: '1. Data Collection',
              content: 'Nexsus CyberLaw is a 100% client-side static web application. We do not collect, store, or transmit any personal data to external servers. All simulations, hash computations, and FIR drafts are generated entirely in your browser using browser-native APIs (Web Crypto API, jsPDF). No user data is sent to our servers.',
            },
            {
              icon: Shield,
              title: '2. DPDP Act 2023 Compliance',
              content: 'In accordance with the Digital Personal Data Protection Act 2023 (DPDP Act), Nexsus CyberLaw processes no personal data requiring consent. If any analytics are implemented in future, users will be provided itemised, granular, unambiguous consent options in compliance with DPDP Act Sections 6 and 7.',
            },
            {
              icon: Globe,
              title: '3. GDPR Cross-Border Compliance',
              content: 'For users in the European Economic Area (EEA), Nexsus CyberLaw processes no personal data, making GDPR data transfer restrictions (Chapter V, Article 46) inapplicable. No Standard Contractual Clauses (SCCs) are required as no data transfer occurs.',
            },
            {
              icon: Lock,
              title: '4. Cookies & Tracking',
              content: 'Nexsus CyberLaw uses no tracking cookies, analytics scripts, or third-party trackers. The application uses browser localStorage solely for user preferences (theme, chat history) — data that never leaves your device.',
            },
            {
              icon: Shield,
              title: '5. Security',
              content: 'All cryptographic operations use browser-native Web Crypto API (SHA-256 via crypto.subtle). No external hashing libraries are loaded. Content Security Policy headers enforce strict source restrictions. All user inputs are sanitized against DOM-based XSS attacks.',
            },
            {
              icon: Mail,
              title: '6. Contact',
              content: 'For privacy concerns, contact: support@nexsus.luckyverse.tech | National Cyber Crime Helpline: 1930 | Data Protection Board of India: dataprotection.gov.in',
            },
          ].map(({ icon: Icon, title, content }) => (
            <div key={title} className="cyber-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/20 flex items-center justify-center">
                  <Icon size={18} className="text-cyber-cyan" />
                </div>
                <h2 className="font-display font-bold text-slate-white">{title}</h2>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">{content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
