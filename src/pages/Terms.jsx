import { motion } from 'framer-motion';
import { Scale, AlertTriangle, ShieldOff, Globe } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-obsidian-950 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-warn-amber/20 text-xs font-mono text-warn-amber mb-4">
            <Scale size={12} /> Terms of Use
          </div>
          <h1 className="font-display text-4xl font-bold text-slate-white mb-3">Terms of Use</h1>
          <p className="text-slate-500">Last updated: September 26, 2026 | Governed by Laws of India</p>
        </motion.div>

        <div className="p-5 rounded-xl border border-warn-amber/25 bg-warn-amber/5 mb-8 flex items-start gap-4">
          <AlertTriangle size={20} className="text-warn-amber flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-display font-bold text-slate-white text-sm mb-1">Important Legal Notice</div>
            <div className="text-slate-500 text-xs leading-relaxed">
              Nexsus CyberLaw is an educational and simulation tool. Information provided does not constitute legal advice. Always consult a qualified advocate for specific legal matters. Unauthorized misuse of information for actual cyberattacks is a criminal offence under IT Act Sections 43, 66, 66F.
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {[
            { icon: Scale, title: '1. Educational Purpose Only', content: 'Nexsus CyberLaw (nexsus.luckyverse.tech) provides educational content about Indian cyber law, simulations, and forensic demonstrations. All content is for educational purposes only and does not constitute legal advice, advocacy, or representation.' },
            { icon: ShieldOff, title: '2. Simulation Environment', content: 'All attack simulations on this platform are purely educational demonstrations. No real attacks are performed. Users must not attempt to replicate simulated attack techniques on real systems. Such actions constitute criminal offences under IT Act Section 43, 66, 66F.' },
            { icon: Globe, title: '3. Intellectual Property', content: 'All content, code, legal database, and UI design are Copyright © 2026 Nexsus CyberLaw (nexsus.luckyverse.tech). Licensed under MIT License for non-commercial educational use. Commercial use requires explicit written permission.' },
            { icon: AlertTriangle, title: '4. Limitation of Liability', content: 'Nexsus CyberLaw makes no warranties regarding the accuracy or completeness of legal information. Laws change — always verify current law with official sources (indiacode.nic.in, meity.gov.in). The platform is not liable for any actions taken based on information provided.' },
            { icon: Scale, title: '5. Governing Law', content: 'These terms are governed by the laws of India. Any disputes arising from use of this platform shall be subject to the exclusive jurisdiction of the courts of Mumbai, Maharashtra, India.' },
          ].map(({ icon: Icon, title, content }) => (
            <div key={title} className="cyber-card p-6">
              <div className="flex items-center gap-3 mb-3">
                <Icon size={16} className="text-warn-amber" />
                <h2 className="font-display font-bold text-slate-white text-sm">{title}</h2>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">{content}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 rounded-xl bg-obsidian-900/60 border border-obsidian-700 text-center">
          <div className="font-mono text-xs text-slate-600">
            Copyright © 2026 Nexsus CyberLaw (nexsus.luckyverse.tech). All rights reserved. MIT License.
          </div>
        </div>
      </div>
    </div>
  );
}
