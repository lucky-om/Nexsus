import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserX, AlertTriangle, Heart, MessageCircle, Flag, Shield, ChevronRight, ArrowLeft, CheckCircle, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const CASE_STUDIES = [
  {
    id: 'impersonation',
    title: 'Fake Profile Impersonation',
    badge: 'Case 1',
    color: '#EC4899',
    posts: [
      {
        author: 'Priya Sharma [FAKE]',
        avatar: 'PS',
        handle: '@PriyaSharma_official99',
        time: '2 hours ago',
        content: 'Hey guys! It\'s me, Priya. I\'m in trouble and need urgent financial help. Please send money to UPI: attacker@upi. Will repay soon! DM me.',
        likes: 42,
        isFake: true,
        redFlags: ['Handle doesn\'t match real profile', 'Urgency + financial request', 'Unverified account'],
      },
      {
        author: 'Priya Sharma ✓',
        avatar: 'PS',
        handle: '@PriyaSharma',
        time: 'Official Account',
        content: 'WARNING: Someone has created a FAKE profile using my name and photos. Please ignore any messages asking for money. This is NOT me.',
        likes: 1205,
        isFake: false,
        redFlags: [],
      }
    ],
    sections: ['IT Act Sec 66C', 'IT Act Sec 66D', 'BNS Sec 318'],
    remedy: 'Report profile → Platform takedown under IT Rules 2021 → File FIR under Sec 66D',
    takedownProcess: ['Report fake profile to platform (must respond within 24 hours)', 'Contact Grievance Officer of social media platform', 'File cyber crime complaint at cybercrime.gov.in', 'Criminal FIR under Sec 66D + BNS 318'],
  },
  {
    id: 'stalking',
    title: 'Repeated Threatening DMs',
    badge: 'Case 2',
    color: '#EF4444',
    posts: [
      {
        author: 'Unknown User',
        avatar: '??',
        handle: '@unknown_user_123',
        time: '3 days of messages',
        content: '⚠️ [DAY 1] "I know where you live. Be careful."\n[DAY 3] "I\'m watching you at the coffee shop daily."\n[DAY 7] "You will regret ignoring me."',
        likes: 0,
        isFake: true,
        redFlags: ['Repeated threatening pattern', 'Physical location references', 'Escalation over time'],
      }
    ],
    sections: ['BNS Sec 78', 'IT Act Sec 67', 'CrPC Sec 107'],
    remedy: 'Document all messages → Emergency FIR → Protection Order from Magistrate',
    takedownProcess: ['Screenshot ALL messages with timestamps', 'Do NOT delete conversations (evidence)', 'File FIR at nearest Cyber Crime PS (cite BNS 78)', 'Apply to Magistrate for protection order under CrPC 107', 'Contact NCW (National Commission for Women) if victim is female'],
  },
  {
    id: 'media',
    title: 'Non-Consensual Media Threat',
    badge: 'Case 3',
    color: '#A78BFA',
    posts: [
      {
        author: 'Blackmailer',
        avatar: 'B!',
        handle: '@private_dm',
        time: '5 hours ago',
        content: 'DM: "I have private photos of you. If you don\'t pay ₹50,000, I will share them with your family and post publicly within 48 hours."',
        likes: 0,
        isFake: true,
        redFlags: ['Extortion using private content', 'Threat to distribute', 'Financial demand'],
      }
    ],
    sections: ['IT Act Sec 66E', 'IT Act Sec 67', 'BNS Sec 384 (Extortion)'],
    remedy: 'Emergency: Call 1930 immediately. Do NOT pay. Preserve all evidence.',
    takedownProcess: ['IMMEDIATELY call 1930 (National Cyber Crime Helpline)', 'Do NOT pay — it emboldens attackers and doesn\'t stop them', 'Screenshot extortion message with metadata', 'Emergency takedown request to platform (IT Rules 2021 — 24 hours)', 'Criminal FIR under Sec 66E + 67 + BNS 384', 'Contact NCW cybercrime helpline for support'],
  },
];

export default function HarassmentLab() {
  const [activeCase, setActiveCase] = useState(0);
  const [showTakedown, setShowTakedown] = useState(false);
  const [reportedPosts, setReportedPosts] = useState(new Set());

  const currentCase = CASE_STUDIES[activeCase];

  return (
    <div className="min-h-screen bg-obsidian-950 py-12 px-4">
      <div className="cyber-grid-bg absolute inset-0 opacity-30 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link to="/simulations" className="hover:text-cyber-cyan transition-colors flex items-center gap-1">
            <ArrowLeft size={14} />Cyber Labs
          </Link>
          <ChevronRight size={14} />
          <span className="text-pink-400 font-mono">Lab 2: Cyber Harassment Lab</span>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-pink-500/30 text-xs font-mono text-pink-400 mb-4">
            <UserX size={12} /> Lab 2 — Social Media Harassment & Cyber Stalking
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-white mb-3">
            Cyber Harassment <span className="text-pink-400">Lab</span>
          </h1>
          <p className="text-slate-500 max-w-2xl">Simulated social media cases exploring cyber stalking, impersonation, and non-consensual content threats. Learn IT Rules 2021 takedown procedures.</p>
        </motion.div>

        {/* Case Study Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {CASE_STUDIES.map((cs, i) => (
            <button
              key={cs.id}
              onClick={() => { setActiveCase(i); setShowTakedown(false); setReportedPosts(new Set()); }}
              className={`sim-tab ${activeCase === i ? 'active' : ''}`}
              style={activeCase === i ? { borderColor: `${cs.color}50`, color: cs.color, backgroundColor: `${cs.color}10` } : {}}
              id={`case-tab-${i}`}
            >
              {cs.badge}: {cs.title}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Social Feed Mock */}
          <div className="lg:col-span-3">
            <div className="font-mono text-xs text-slate-500 mb-3">🖥️ Simulated Social Media Feed</div>

            {/* Platform Header */}
            <div className="rounded-t-xl border border-obsidian-600 bg-obsidian-800/60 px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">S</span>
                </div>
                <span className="font-display font-bold text-slate-white text-sm">SocialX — Mock Platform</span>
              </div>
              <span className="font-mono text-xs text-slate-600">SIMULATION ONLY</span>
            </div>

            <div className="border border-obsidian-600 border-t-0 rounded-b-xl overflow-hidden divide-y divide-obsidian-700">
              {currentCase.posts.map((post, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-5 ${post.isFake ? 'bg-warn-red/5' : 'bg-cyber-emerald/5'}`}
                >
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                        post.isFake ? 'bg-warn-red/20 text-warn-red border border-warn-red/30' : 'bg-cyber-emerald/20 text-cyber-emerald border border-cyber-emerald/30'
                      }`}>
                        {post.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-display font-bold text-sm text-slate-white">{post.author}</span>
                          {post.isFake && <span className="badge-danger text-[9px]">⚠ FAKE</span>}
                          {!post.isFake && <span className="badge-emerald text-[9px]">✓ REAL</span>}
                        </div>
                        <div className="font-mono text-xs text-slate-500">{post.handle} · {post.time}</div>
                      </div>
                    </div>
                    {post.isFake && !reportedPosts.has(i) && (
                      <button
                        onClick={() => setReportedPosts(prev => new Set([...prev, i]))}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-warn-red/30 text-warn-red text-xs hover:bg-warn-red/10 transition-all"
                        id={`report-post-${i}`}
                      >
                        <Flag size={11} /> Report
                      </button>
                    )}
                    {reportedPosts.has(i) && (
                      <span className="badge-emerald text-[10px]">✓ Reported</span>
                    )}
                  </div>

                  {/* Post Content */}
                  <div className="text-slate-400 text-sm leading-relaxed mb-3 whitespace-pre-line pl-13">
                    {post.content}
                  </div>

                  {/* Red Flags */}
                  {post.redFlags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {post.redFlags.map(flag => (
                        <span key={flag} className="badge-danger text-[9px]">⚠ {flag}</span>
                      ))}
                    </div>
                  )}

                  {/* Post Actions */}
                  <div className="flex items-center gap-5 text-slate-600 text-xs border-t border-obsidian-700 pt-3 mt-2">
                    <span className="flex items-center gap-1"><Heart size={13} /> {post.likes}</span>
                    <span className="flex items-center gap-1"><MessageCircle size={13} /> Reply</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Legal Panel */}
          <div className="lg:col-span-2 space-y-5">
            {/* Applicable Laws */}
            <div className="cyber-card p-5">
              <div className="font-mono text-xs text-slate-500 uppercase tracking-wider mb-3">Applicable Sections</div>
              <div className="flex flex-wrap gap-2 mb-4">
                {currentCase.sections.map(s => (
                  <span key={s} className="badge-danger">{s}</span>
                ))}
              </div>
              <div className="p-3 rounded-lg bg-obsidian-900/60 border border-obsidian-700 text-xs text-slate-400 leading-relaxed">
                {currentCase.remedy}
              </div>
            </div>

            {/* Takedown Workflow */}
            <div className="cyber-card p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="font-mono text-xs text-slate-500 uppercase tracking-wider">IT Rules 2021 Takedown Workflow</div>
                <button
                  onClick={() => setShowTakedown(!showTakedown)}
                  className="btn-cyber text-xs py-1.5 px-3"
                  id="show-takedown-btn"
                >
                  {showTakedown ? 'Hide' : 'Show Steps'}
                </button>
              </div>

              <AnimatePresence>
                {showTakedown && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3"
                  >
                    {currentCase.takedownProcess.map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center flex-shrink-0 text-cyber-cyan font-mono text-xs font-bold">
                          {i + 1}
                        </div>
                        <span className="text-slate-400 text-xs leading-relaxed pt-0.5">{step}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Emergency */}
            <div className="p-4 rounded-xl border border-warn-red/30 bg-warn-red/5">
              <div className="flex items-center gap-2 mb-3">
                <Phone size={16} className="text-warn-red" />
                <span className="font-display font-semibold text-slate-white text-sm">Emergency Contacts</span>
              </div>
              <div className="space-y-2">
                <a href="tel:1930" className="flex items-center gap-2 text-xs">
                  <span className="font-mono font-bold text-warn-amber">1930</span>
                  <span className="text-slate-500">National Cyber Crime Helpline</span>
                </a>
                <a href="tel:1091" className="flex items-center gap-2 text-xs">
                  <span className="font-mono font-bold text-warn-amber">1091</span>
                  <span className="text-slate-500">Women Helpline</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
