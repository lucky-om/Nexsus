import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Hash, UserX, Activity, ArrowRight, Shield, AlertTriangle, Database } from 'lucide-react';

const simulations = [
  {
    id: 'phishing',
    to: '/simulations/phishing',
    icon: Mail,
    iconColor: '#F59E0B',
    title: 'Phishing & Spoof Inspector',
    subtitle: 'Lab 1',
    desc: 'Interactive mock banking inbox with forged phishing emails. Identify fake domains, spoofed senders, urgency triggers, and reveal applicable IT Act violations.',
    sections: ['Sec 66C', 'Sec 66D'],
    features: ['Mock SBI inbox interface', 'Clickable red-flag indicators', 'Section 66C/66D verdict', 'Header analysis tool'],
    difficulty: 'Beginner',
    duration: '10 min',
    badgeColor: '#F59E0B',
  },
  {
    id: 'harassment',
    to: '/simulations/harassment',
    icon: UserX,
    iconColor: '#EC4899',
    title: 'Cyber Harassment Lab',
    subtitle: 'Lab 2',
    desc: 'Simulated social media feed with 3 case studies: impersonation, threatening DMs, and non-consensual media. Explore IT Rules 2021 takedown workflows.',
    sections: ['Sec 66E', 'Sec 67', 'BNS 78', 'IT Rules 2021'],
    features: ['Live social feed mock', '3 case studies', 'Takedown workflow', 'Criminal filing guide'],
    difficulty: 'Intermediate',
    duration: '15 min',
    badgeColor: '#EC4899',
  },
  {
    id: 'forensics',
    to: '/simulations/forensics',
    icon: Hash,
    iconColor: '#10B981',
    title: 'BSA 65B Hash Lab',
    subtitle: 'Lab 3',
    desc: 'Live client-side SHA-256 hashing engine. Compare original vs tampered evidence, detect hash divergence, and understand chain of custody requirements.',
    sections: ['BSA Sec 65B', 'SHA-256', 'MD5'],
    features: ['Real SHA-256 via Web Crypto', 'Tamper detection', 'BSA 65B certificate', 'Chain of custody PDF'],
    difficulty: 'Advanced',
    duration: '20 min',
    badgeColor: '#10B981',
  },
  {
    id: 'sqlinjection',
    to: '#', // Placeholder for now
    icon: Database,
    iconColor: '#3B82F6',
    title: 'SQLi Data Breach Lab',
    subtitle: 'Lab 4 (Coming Soon)',
    desc: 'Simulated e-commerce database breach. Understand how Section 43 (Damage to computer) and Section 66 (Computer related offences) apply to database tampering.',
    sections: ['Sec 43', 'Sec 66', 'DPDP Act'],
    features: ['Mock terminal interface', 'SQL injection simulator', 'Data exfiltration metrics', 'Regulatory reporting workflow'],
    difficulty: 'Advanced',
    duration: '25 min',
    badgeColor: '#3B82F6',
  }
];

const difficultyColors = {
  Beginner: '#10B981',
  Intermediate: '#F59E0B',
  Advanced: '#EF4444',
};

export default function SimulationsHub() {
  return (
    <div className="min-h-screen py-24 text-[var(--color-apple-text)] relative overflow-hidden">
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-red-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6 drop-shadow-lg">
            Attack <span className="text-[var(--color-apple-text-muted)]">Labs</span>
          </h1>
          <p className="text-[var(--color-apple-text-muted)] text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            Hands-on interactive environments to experience and understand cyber offences, forensic analysis, and legal remedies first-hand.
          </p>
        </motion.div>

        {/* Lab Warning Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-16 p-6 rounded-3xl apple-glass border border-orange-500/20 flex flex-col md:flex-row items-start md:items-center gap-5 shadow-[0_8px_32px_rgba(245,158,11,0.05)]"
        >
          <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center flex-shrink-0">
            <AlertTriangle size={24} className="text-orange-400" />
          </div>
          <div>
            <div className="font-bold text-white text-lg mb-1">Educational Simulation Environment</div>
            <div className="text-[var(--color-apple-text-muted)] text-sm leading-relaxed">
              All simulations are purely educational. No real attacks are performed. All hashing runs locally in your browser using the Web Crypto API. Zero data is transmitted.
            </div>
          </div>
        </motion.div>

        {/* Simulation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {simulations.map((sim, i) => (
            <motion.div
              key={sim.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to={sim.to} className="block h-full group relative">
                <div className="absolute inset-0 bg-white/5 rounded-[32px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="apple-glass rounded-[32px] h-full flex flex-col p-8 overflow-hidden relative border border-white/10 group-hover:border-white/20 transition-colors duration-500 shadow-xl group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-8">
                    <div
                      className="w-16 h-16 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
                      style={{ backgroundColor: `${sim.iconColor}20` }}
                    >
                      <sim.icon size={28} style={{ color: sim.iconColor }} />
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-bold px-3 py-1 rounded-full border tracking-wider uppercase shadow-sm"
                        style={{ color: difficultyColors[sim.difficulty], backgroundColor: `${difficultyColors[sim.difficulty]}10`, borderColor: `${difficultyColors[sim.difficulty]}30` }}
                      >
                        {sim.difficulty}
                      </span>
                      <div className="text-[12px] font-medium text-[var(--color-apple-text-muted)] mt-2">{sim.duration}</div>
                    </div>
                  </div>
                  
                  <div className="font-bold text-sm mb-2" style={{ color: sim.iconColor }}>{sim.subtitle}</div>
                  <h3 className="text-3xl font-bold text-white mb-4 tracking-tight leading-tight">{sim.title}</h3>
                  <p className="text-[var(--color-apple-text-muted)] text-[15px] leading-relaxed mb-8 flex-1">
                    {sim.desc}
                  </p>

                  {/* Sections */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {sim.sections.map(s => (
                      <span key={s} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white text-[12px] font-medium">
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div
                    className="flex items-center justify-between px-6 py-4 rounded-[20px] font-bold text-[15px] transition-all"
                    style={{
                      background: `linear-gradient(135deg, ${sim.iconColor}20, ${sim.iconColor}10)`,
                      border: `1px solid ${sim.iconColor}30`,
                      color: sim.iconColor,
                    }}
                  >
                    {sim.to === '#' ? 'Coming Soon' : 'Launch Lab'}
                    <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center p-12 rounded-[40px] apple-glass border border-white/10"
        >
          <div className="w-20 h-20 rounded-[28px] bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-8 shadow-inner">
            <Shield size={36} className="text-white" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Ready to Report a Real Incident?</h3>
          <p className="text-[var(--color-apple-text-muted)] mb-10 max-w-lg mx-auto text-[15px] leading-relaxed">
            Use our FIR Builder to generate a legally structured complaint draft or go directly to the national cyber crime portal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/report-generator" className="apple-btn-primary px-8 h-14 flex items-center justify-center gap-3">
              <Activity size={18} />
              Build FIR Draft
            </Link>
            <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer"
              className="apple-btn-secondary px-8 h-14 flex items-center justify-center gap-3 border border-white/10">
              cybercrime.gov.in
              <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
