import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Activity, BarChart2, BookOpen, ArrowRight, Calculator, RefreshCw, Info } from 'lucide-react';

const FRAMEWORKS = {
  iso27001: {
    name: 'ISO/IEC 27001',
    subtitle: 'Information Security Management System (ISMS)',
    color: '#4FACFE',
    clauses: [
      { number: '4', title: 'Context of the Organization', desc: 'Understanding internal/external issues, interested parties, and ISMS scope definition.' },
      { number: '5', title: 'Leadership', desc: 'Top management commitment, information security policy, and organizational roles.' },
      { number: '6', title: 'Planning', desc: 'Risk assessment methodology, risk treatment plan, Statement of Applicability (SoA).' },
      { number: '7', title: 'Support', desc: 'Resources, competence, awareness, communication, documented information.' },
      { number: '8', title: 'Operation', desc: 'Operational planning, risk assessment execution, risk treatment implementation.' },
      { number: '9', title: 'Performance Evaluation', desc: 'Monitoring, measurement, internal audit, management review.' },
      { number: '10', title: 'Improvement', desc: 'Nonconformity, corrective action, continual improvement cycle.' },
    ],
    controls: 'Annex A: 93 controls across 4 themes (Organizational, People, Physical, Technological)',
    certBody: 'Accredited certification bodies (e.g., BSI, TÜV, DNV)',
  },
  nist: {
    name: 'NIST CSF 2.0',
    subtitle: 'Cybersecurity Framework',
    color: '#10B981',
    clauses: [
      { number: 'GV', title: 'GOVERN', desc: 'Cybersecurity risk management strategy, policies, accountability, and oversight.' },
      { number: 'ID', title: 'IDENTIFY', desc: 'Asset management, risk assessment, supply chain risk, business environment.' },
      { number: 'PR', title: 'PROTECT', desc: 'Identity management, access control, awareness training, data security, technology.' },
      { number: 'DE', title: 'DETECT', desc: 'Continuous monitoring, anomaly and event detection, detection process.' },
      { number: 'RS', title: 'RESPOND', desc: 'Incident response planning, communications, analysis, mitigation, improvements.' },
      { number: 'RC', title: 'RECOVER', desc: 'Recovery planning, improvements, communications for restoration.' },
    ],
    controls: '106 Categories across 6 Functions — framework for all organization sizes',
    certBody: 'NIST CSF is voluntary; assessment through NIST SP 800-53 or CISA tools',
  },
  cobit: {
    name: 'COBIT 2019',
    subtitle: 'Control Objectives for IT Governance',
    color: '#A78BFA',
    clauses: [
      { number: 'EDM', title: 'Evaluate, Direct & Monitor', desc: 'Board-level governance objectives for value delivery and risk optimization.' },
      { number: 'APO', title: 'Align, Plan & Organize', desc: 'IT strategy, enterprise architecture, innovation, risk management.' },
      { number: 'BAI', title: 'Build, Acquire & Implement', desc: 'Program management, requirements, solutions design, change management.' },
      { number: 'DSS', title: 'Deliver, Service & Support', desc: 'Operations management, service requests, incident management, continuity.' },
      { number: 'MEA', title: 'Monitor, Evaluate & Assess', desc: 'Performance monitoring, system of internal control, compliance.' },
    ],
    controls: '40 governance and management objectives across 5 domains',
    certBody: 'ISACA COBIT Foundation Certificate',
  },
  itil: {
    name: 'ITIL 4',
    subtitle: 'IT Infrastructure Library — Service Management',
    color: '#F59E0B',
    clauses: [
      { number: 'SVS', title: 'Service Value System', desc: 'Guiding principles, governance, service value chain, continual improvement.' },
      { number: 'SVC', title: 'Service Value Chain', desc: 'Plan → Improve → Engage → Design & Transition → Obtain/Build → Deliver & Support.' },
      { number: 'GP', title: 'Guiding Principles', desc: 'Focus on value, start where you are, progress iteratively, collaborate, think holistically.' },
      { number: 'CI', title: 'Continual Improvement', desc: 'Vision → Current state → Target → Plan → Take action → Check → Keep momentum.' },
    ],
    controls: '34 practices (14 General, 17 Service Management, 3 Technical Management)',
    certBody: 'PeopleCert ITIL 4 Foundation, Practitioner, Strategic Leader certifications',
  },
};

const riskLabels = { 1: 'Very Low', 2: 'Low', 3: 'Medium', 4: 'High', 5: 'Critical' };
const getRiskLevel = (l, i) => {
  const score = l * i;
  if (score <= 4) return { level: 'Low', color: '#10B981' };
  if (score <= 9) return { level: 'Medium', color: '#F59E0B' };
  if (score <= 16) return { level: 'High', color: '#EF4444' };
  return { level: 'Critical', color: '#DC2626' };
};

const BCP_DRP = {
  bcp: {
    name: 'BCP — Business Continuity Plan',
    color: '#4FACFE',
    desc: 'Proactive strategy to maintain essential functions during and after a disaster. Covers people, processes, communication, and alternative work arrangements.',
    scope: 'Entire business operations (people, processes, facilities)',
    goal: 'Keep the business running with minimal disruption',
    trigger: 'Any event threatening business operations',
    elements: ['Business Impact Analysis (BIA)', 'Critical function identification', 'Alternate site strategy', 'Communication plan', 'Staff relocation', 'Vendor/supply chain backup'],
  },
  drp: {
    name: 'DRP — Disaster Recovery Plan',
    color: '#10B981',
    desc: 'Reactive technical procedures to restore IT systems, data, and infrastructure after a disaster. DRP is a subset of BCP focused on technology recovery.',
    scope: 'IT systems, data, infrastructure, applications',
    goal: 'Restore IT operations within defined RTO/RPO',
    trigger: 'IT system failure, cyberattack, hardware failure',
    elements: ['IT asset inventory', 'Backup and recovery procedures', 'RTO / RPO definitions', 'Failover procedures', 'Data replication strategy', 'Test and validation schedule'],
  },
};

const appleEasing = [0.16, 1, 0.3, 1];

export default function GovernanceHub() {
  const [activeFramework, setActiveFramework] = useState('iso27001');
  const [likelihood, setLikelihood] = useState(3);
  const [impact, setImpact] = useState(3);
  const [assetValue, setAssetValue] = useState(500000);
  const [probability, setProbability] = useState(0.15);
  const [activeView, setActiveView] = useState('bcp');
  const [rto, setRto] = useState(4);
  const [rpo, setRpo] = useState(2);

  const riskResult = getRiskLevel(likelihood, impact);
  const riskScore = likelihood * impact;
  const ale = assetValue * probability;

  const fw = FRAMEWORKS[activeFramework];

  return (
    <div className="min-h-screen py-24 text-[var(--color-apple-text)] relative overflow-hidden">
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-500/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 z-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: appleEasing }} className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
            Governance <span className="text-[var(--color-apple-text-muted)]">Hub</span>
          </h1>
          <p className="text-[var(--color-apple-text-muted)] text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            Interactive risk calculators, enterprise frameworks, and BCP/DRP scenario tools for cyber risk management.
          </p>
        </motion.div>

        {/* ─── RISK MATRIX CALCULATOR ──────────────────────── */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <BarChart2 size={28} className="text-blue-400" />
            Interactive Risk Matrix Calculator
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Matrix Grid */}
            <div className="apple-glass rounded-[32px] p-8 border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="mb-6 text-sm font-medium text-[var(--color-apple-text-muted)]">Click a cell to set Likelihood × Impact risk level</div>
              <div className="overflow-x-auto relative z-10">
                <table className="w-full text-center">
                  <thead>
                    <tr>
                      <th className="p-3 text-xs font-bold text-[var(--color-apple-text-muted)] uppercase tracking-widest">L \ I</th>
                      {[1,2,3,4,5].map(i => (
                        <th key={i} className="p-3 text-xs font-bold text-[var(--color-apple-text-muted)]">{i}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[5,4,3,2,1].map(l => (
                      <tr key={l}>
                        <td className="p-3 text-xs font-bold text-[var(--color-apple-text-muted)]">{l}</td>
                        {[1,2,3,4,5].map(i => {
                          const r = getRiskLevel(l, i);
                          const isSelected = likelihood === l && impact === i;
                          return (
                            <td key={i} className="p-1.5">
                              <button
                                onClick={() => { setLikelihood(l); setImpact(i); }}
                                className={`w-12 h-12 rounded-2xl text-sm font-bold flex items-center justify-center transition-all ${
                                  r.level === 'Low' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                                  r.level === 'Medium' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                                  r.level === 'High' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-red-600/30 text-red-300 border border-red-600/50'
                                } hover:scale-105 ${isSelected ? 'ring-2 ring-white scale-110 shadow-[0_0_20px_rgba(255,255,255,0.2)] z-10 relative' : ''}`}
                                aria-label={`Risk L=${l} I=${i}: ${r.level}`}
                              >
                                {l * i}
                              </button>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Risk Result Panel */}
            <div className="apple-glass rounded-[32px] p-8 border border-white/10 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white to-transparent pointer-events-none" />
              <div className="text-sm font-bold text-[var(--color-apple-text-muted)] uppercase tracking-widest mb-8 relative z-10">Current Risk Assessment</div>
              <div className="text-center mb-8 relative z-10">
                <div className="text-8xl font-black mb-2 tracking-tighter" style={{ color: riskResult.color }}>{riskScore}</div>
                <div className="text-3xl font-bold tracking-tight" style={{ color: riskResult.color }}>{riskResult.level} Risk</div>
              </div>
              <div className="grid grid-cols-2 gap-6 mb-8 relative z-10">
                <div>
                  <div className="text-xs font-bold text-[var(--color-apple-text-muted)] uppercase tracking-wider mb-3">Likelihood</div>
                  <input type="range" min="1" max="5" value={likelihood} onChange={e => setLikelihood(+e.target.value)} className="w-full mb-2 accent-white" />
                  <div className="text-sm font-semibold text-white">{likelihood} — {riskLabels[likelihood]}</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-[var(--color-apple-text-muted)] uppercase tracking-wider mb-3">Impact</div>
                  <input type="range" min="1" max="5" value={impact} onChange={e => setImpact(+e.target.value)} className="w-full mb-2 accent-white" />
                  <div className="text-sm font-semibold text-white">{impact} — {riskLabels[impact]}</div>
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-[13px] text-[var(--color-apple-text-muted)] leading-relaxed relative z-10 font-medium">
                <strong className="text-white block mb-1">Treatment Recommendation: </strong>
                {riskResult.level === 'Critical' && 'IMMEDIATE ACTION REQUIRED. Escalate to CISO. Apply emergency controls. Consider operational shutdown.'}
                {riskResult.level === 'High' && 'High priority remediation within 30 days. Assign risk owner. Document treatment plan.'}
                {riskResult.level === 'Medium' && 'Scheduled remediation within 90 days. Standard control implementation.'}
                {riskResult.level === 'Low' && 'Accept risk or implement low-cost controls. Monitor periodically.'}
              </div>
            </div>
          </div>
        </section>

        {/* ─── ALE CALCULATOR ────────────────────────────── */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <Calculator size={28} className="text-orange-400" />
            Quantitative Risk Loss (ALE Formula)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="apple-glass rounded-3xl p-8 border border-white/10">
              <div className="text-xs font-bold text-[var(--color-apple-text-muted)] uppercase tracking-wider mb-4">Asset Value (₹)</div>
              <input
                type="number"
                value={assetValue}
                onChange={e => setAssetValue(+e.target.value)}
                className="apple-input w-full text-2xl font-bold h-16 bg-black/40"
                min="0"
              />
              <div className="text-[var(--color-apple-text-muted)] text-[13px] mt-4 font-medium">SLE = Asset Value × EF (assume EF=1)</div>
            </div>
            <div className="apple-glass rounded-3xl p-8 border border-white/10">
              <div className="text-xs font-bold text-[var(--color-apple-text-muted)] uppercase tracking-wider mb-4">Annual Probability</div>
              <input
                type="range" min="0.01" max="1" step="0.01"
                value={probability}
                onChange={e => setProbability(+e.target.value)}
                className="w-full accent-orange-500 mb-6"
              />
              <div className="text-3xl font-bold text-orange-400 mb-2">{(probability * 100).toFixed(0)}%</div>
              <div className="text-[var(--color-apple-text-muted)] text-[13px] font-medium">Annual Rate of Occurrence (ARO)</div>
            </div>
            <div className="apple-glass rounded-3xl p-8 border border-orange-500/30 flex flex-col items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-orange-500/5 group-hover:bg-orange-500/10 transition-colors pointer-events-none" />
              <div className="text-xs font-bold text-[var(--color-apple-text-muted)] uppercase tracking-wider mb-4 relative z-10">Annual Loss Expectancy</div>
              <div className="text-5xl font-black text-white relative z-10 tracking-tight">
                ₹{ale.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </div>
              <div className="text-[var(--color-apple-text-muted)] text-[13px] mt-6 font-medium relative z-10 text-center">
                Justifies security spend up to this amount annually.
              </div>
            </div>
          </div>
        </section>

        {/* ─── FRAMEWORK TABS ─────────────────────────────── */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <BookOpen size={28} className="text-emerald-400" />
            Governance Frameworks
          </h2>
          <div className="flex flex-wrap gap-3 mb-10">
            {Object.entries(FRAMEWORKS).map(([key, f]) => (
              <button
                key={key}
                onClick={() => setActiveFramework(key)}
                className={`px-6 py-3 rounded-full font-bold text-[14px] transition-all shadow-sm ${
                  activeFramework === key 
                    ? 'bg-white text-black shadow-lg scale-105' 
                    : 'bg-white/5 border border-white/10 text-[var(--color-apple-text-muted)] hover:bg-white/10 hover:text-white'
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFramework}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
              transition={{ duration: 0.4, ease: appleEasing }}
            >
              <div className="apple-glass rounded-[40px] p-10 lg:p-12 border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 blur-[120px] opacity-10 rounded-full" style={{ backgroundColor: fw.color }} />
                
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 relative z-10">
                  <div>
                    <h3 className="text-4xl font-black tracking-tight mb-2 text-white">{fw.name}</h3>
                    <div className="text-[var(--color-apple-text-muted)] text-lg font-medium">{fw.subtitle}</div>
                  </div>
                  <span className="mt-4 md:mt-0 px-4 py-2 rounded-xl border font-bold text-sm bg-black/40 backdrop-blur-md" style={{ borderColor: `${fw.color}50`, color: fw.color }}>
                    {fw.controls.split(':')[0]}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 relative z-10">
                  {fw.clauses.map(clause => (
                    <div key={clause.number} className="p-6 rounded-3xl bg-black/40 border border-white/5 hover:border-white/20 transition-all hover:-translate-y-1">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="w-10 h-10 flex items-center justify-center font-black text-sm rounded-xl" style={{ backgroundColor: `${fw.color}20`, color: fw.color }}>
                          {clause.number}
                        </span>
                        <span className="font-bold text-white text-[15px]">{clause.title}</span>
                      </div>
                      <p className="text-[var(--color-apple-text-muted)] text-[14px] leading-relaxed font-medium pl-14">{clause.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 relative z-10 flex flex-col sm:flex-row gap-8">
                  <div className="flex-1">
                    <div className="text-xs font-bold text-[var(--color-apple-text-muted)] uppercase tracking-wider mb-2">Controls Coverage</div>
                    <div className="text-white text-sm font-medium">{fw.controls}</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-[var(--color-apple-text-muted)] uppercase tracking-wider mb-2">Certification</div>
                    <div className="text-white text-sm font-medium">{fw.certBody}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* ─── BCP vs DRP ──────────────────────────────────── */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <Activity size={28} className="text-purple-400" />
            BCP vs DRP Breakdown
          </h2>
          <div className="flex gap-3 mb-10">
            {['bcp', 'drp'].map(v => (
              <button
                key={v}
                onClick={() => setActiveView(v)}
                className={`px-8 py-3 rounded-full font-bold text-[14px] transition-all tracking-wide ${
                  activeView === v 
                    ? 'bg-white text-black shadow-lg scale-105' 
                    : 'bg-white/5 border border-white/10 text-[var(--color-apple-text-muted)] hover:bg-white/10 hover:text-white'
                }`}
              >
                {v.toUpperCase()}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
              transition={{ duration: 0.4, ease: appleEasing }}
            >
              {(() => {
                const plan = BCP_DRP[activeView];
                return (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="apple-glass rounded-[32px] p-10 border border-white/10 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <h3 className="text-3xl font-black mb-4 tracking-tight text-white">{plan.name}</h3>
                      <p className="text-[var(--color-apple-text-muted)] text-[15px] leading-relaxed mb-8 font-medium">{plan.desc}</p>
                      <div className="space-y-4">
                        {[['Scope', plan.scope], ['Goal', plan.goal], ['Trigger', plan.trigger]].map(([k, v]) => (
                          <div key={k} className="flex gap-4 p-3 rounded-xl bg-black/20">
                            <span className="text-xs font-bold text-[var(--color-apple-text-muted)] uppercase tracking-wider w-20 pt-0.5">{k}:</span>
                            <span className="text-white text-sm font-medium">{v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="apple-glass rounded-[32px] p-10 border border-white/10 bg-black/40">
                      <div className="text-xs font-bold text-[var(--color-apple-text-muted)] mb-6 uppercase tracking-widest">Key Elements</div>
                      <ul className="space-y-4">
                        {plan.elements.map((el, i) => (
                          <li key={i} className="flex items-center gap-4 text-[15px] text-white font-medium">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-white/10 text-white flex-shrink-0 border border-white/10">{i + 1}</div>
                            {el}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </AnimatePresence>

          {/* RTO / RPO Calculator */}
          <div className="mt-8 apple-glass rounded-[32px] p-10 border border-white/10">
            <h4 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <Calculator size={24} className="text-[var(--color-apple-text-muted)]" />
              RTO / RPO Scenario
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-[var(--color-apple-text-muted)] uppercase tracking-wider">Recovery Time (RTO)</span>
                  <span className="text-2xl font-black text-white">{rto}h</span>
                </div>
                <input type="range" min="1" max="72" value={rto} onChange={e => setRto(+e.target.value)} className="w-full accent-white mb-4" />
                <div className="text-[13px] font-medium text-[var(--color-apple-text-muted)] mb-2">Max tolerable downtime: <span className="text-white">{rto} hour{rto !== 1 ? 's' : ''}</span></div>
                <div className="text-[14px] text-white font-medium p-3 rounded-xl bg-white/5 border border-white/10">
                  {rto <= 4 && '⚡ Tier 1: Mission Critical. Requires hot standby.'}
                  {rto > 4 && rto <= 24 && '🔶 Tier 2: Business Critical. Warm standby.'}
                  {rto > 24 && '🟡 Tier 3: Standard. Cold standby acceptable.'}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-[var(--color-apple-text-muted)] uppercase tracking-wider">Recovery Point (RPO)</span>
                  <span className="text-2xl font-black text-white">{rpo}h</span>
                </div>
                <input type="range" min="0" max="24" value={rpo} onChange={e => setRpo(+e.target.value)} className="w-full accent-white mb-4" />
                <div className="text-[13px] font-medium text-[var(--color-apple-text-muted)] mb-2">Max acceptable data loss: <span className="text-white">{rpo} hour{rpo !== 1 ? 's' : ''}</span></div>
                <div className="text-[14px] text-white font-medium p-3 rounded-xl bg-white/5 border border-white/10">
                  {rpo === 0 && '🟢 Zero data loss — sync replication required.'}
                  {rpo > 0 && rpo <= 4 && '🔶 Near-zero loss — async replication.'}
                  {rpo > 4 && '🟡 Standard — daily backups sufficient.'}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
