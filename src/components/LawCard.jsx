import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Shield, AlertTriangle, ExternalLink } from 'lucide-react';

export default function LawCard({ law, index = 0 }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="apple-glass flex flex-col p-6 h-full"
    >
      {/* Top Meta */}
      <div className="flex items-center justify-between mb-5 gap-2">
        <span className="text-[11px] font-semibold tracking-wider uppercase text-[var(--color-apple-text-muted)]">
          {law.category}
        </span>
        <span className="text-[9px] font-bold px-2.5 py-1 rounded-full bg-white/10 border border-white/5 uppercase tracking-widest">
          {law.severity}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold mb-3 tracking-tight leading-[1.2]">
        {law.title}
      </h3>

      {/* Attack Vector */}
      <div className="flex items-start gap-2.5 mb-6">
        <AlertTriangle size={14} className="text-[var(--color-apple-text-muted)] flex-shrink-0 mt-0.5" />
        <span className="text-[var(--color-apple-text-muted)] text-[13px] leading-relaxed">{law.attackVector}</span>
      </div>

      {/* Tags (Sections / Acts) */}
      <div className="flex flex-wrap gap-2 mb-6">
        {law.sections.map((sec) => (
          <span key={sec} className="px-2.5 py-1 bg-white/10 text-white text-[11px] font-semibold rounded-md backdrop-blur-md">
            {sec}
          </span>
        ))}
        {law.acts.map((act) => (
          <span key={act} className="px-2.5 py-1 bg-transparent border border-white/10 text-[var(--color-apple-text-muted)] text-[11px] font-medium rounded-md">
            {act}
          </span>
        ))}
      </div>

      {/* Penalty */}
      <div className="flex flex-col gap-1.5 p-4 bg-white/5 border border-white/5 rounded-2xl mb-6 backdrop-blur-md">
        <div className="text-[10px] font-semibold text-[var(--color-apple-text-muted)] uppercase tracking-widest">Statutory Penalty</div>
        <div className="text-[15px] font-medium">{law.penalty}</div>
      </div>

      {/* Reporting */}
      <div className="flex items-center gap-2 mb-6 pb-6 border-b border-[var(--color-apple-border)]">
        <Shield size={14} className={law.certIn ? 'text-white' : 'text-[var(--color-apple-text-muted)]'} />
        <span className="text-[13px] text-[var(--color-apple-text-muted)]">{law.reporting}</span>
        {law.certIn && (
          <span className="ml-auto text-[9px] font-bold tracking-widest px-2 py-0.5 rounded-full bg-white text-black uppercase">
            CERT-In
          </span>
        )}
      </div>

      {/* Expand Toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-auto flex items-center justify-between w-full text-[13px] font-medium text-[var(--color-apple-text-muted)] hover:text-white transition-colors"
      >
        <span>Legal Precedents & Details</span>
        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-5 mt-5 border-t border-[var(--color-apple-border)]">
              <div className="flex items-center gap-4 mb-4">
                <div>
                  <div className="text-[10px] font-semibold text-[var(--color-apple-text-muted)] uppercase tracking-widest mb-1">Bail Status</div>
                  <div className="text-[13px]">{law.bailable ? 'Bailable' : 'Non-Bailable'}</div>
                </div>
                <div className="w-px h-6 bg-white/10" />
                <div>
                  <div className="text-[10px] font-semibold text-[var(--color-apple-text-muted)] uppercase tracking-widest mb-1">Nature</div>
                  <div className="text-[13px]">{law.cognizable ? 'Cognizable' : 'Non-Cognizable'}</div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-[10px] font-semibold text-[var(--color-apple-text-muted)] uppercase tracking-widest mb-2">Key Precedent</div>
                <div className="text-[13px] text-[var(--color-apple-text-muted)] italic pl-3 border-l-2 border-white/20">
                  {law.precedent}
                </div>
              </div>

              {law.references?.length > 0 && (
                <div>
                  <div className="text-[10px] font-semibold text-[var(--color-apple-text-muted)] uppercase tracking-widest mb-2">External References</div>
                  <div className="flex flex-col gap-1.5">
                    {law.references.map((ref, idx) => (
                      <a key={idx} href={ref.url} target="_blank" rel="noopener noreferrer" className="text-[12px] text-[var(--color-apple-text-muted)] hover:text-white flex items-center gap-1.5 transition-colors">
                        <ExternalLink size={12} /> {ref.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
