import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Search, ArrowRight, ExternalLink, FileText, Crosshair, Scale, ShieldAlert } from 'lucide-react';
import { sanitizeInput } from '../utils/cryptoHash';

const CRIME_SEARCH_SUGGESTIONS = [
  { query: 'fake bank OTP sms', result: 'Phishing / Identity Theft → IT Act Sec 66C, 66D', severity: 'High' },
  { query: 'hacked server database', result: 'Unauthorised Access → IT Act Sec 43 + 66', severity: 'Critical' },
  { query: 'obscene message WhatsApp', result: 'Obscenity / Harassment → IT Act Sec 67 + BNS 78', severity: 'High' },
  { query: 'deepfake video leaked', result: 'Voyeurism + Sec 66E + Sec 67 + DPDP Violation', severity: 'Critical' },
];

const GOV_LINKS = [
  { name: 'National Cyber Crime Portal', url: 'https://cybercrime.gov.in/', desc: 'Official portal to report cyber crimes in India.' },
  { name: 'CERT-In', url: 'https://www.cert-in.org.in/', desc: 'Indian Computer Emergency Response Team.' },
  { name: 'NCIIPC', url: 'https://nciipc.gov.in/', desc: 'National Critical Info Infra Protection Centre.' },
  { name: 'I4C', url: 'https://i4c.mha.gov.in/', desc: 'Indian Cyber Crime Coordination Centre.' }
];

function SkeletonResult() {
  return (
    <div className="mt-8 p-8 apple-glass relative overflow-hidden border border-white/20">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-white/10 flex-shrink-0 animate-pulse border border-white/5" />
        <div className="flex-1 space-y-3 pt-2">
          <div className="h-4 w-1/3 bg-white/10 rounded-full animate-pulse" />
          <div className="h-3 w-3/4 bg-white/10 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}

const appleEasing = [0.16, 1, 0.3, 1];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const containerRef = useRef(null);

  // Parallax scrolling
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const heroY = useTransform(smoothProgress, [0, 0.5], [0, 150]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const modulesY = useTransform(smoothProgress, [0, 1], [100, -50]);

  const handleSearch = async (query) => {
    const sanitized = sanitizeInput(query);
    if (!sanitized.trim()) return;
    setIsSearching(true);
    setSearchResult(null);
    
    await new Promise(r => setTimeout(r, 1200)); // slightly longer for dramatic loading effect

    const lowerQuery = sanitized.toLowerCase();
    const found = CRIME_SEARCH_SUGGESTIONS.find(s => s.query.toLowerCase().includes(lowerQuery));
    
    if (found) {
      setSearchResult({ ...found, match: sanitized });
    } else {
      setSearchResult({
        match: sanitized,
        result: 'Consult Legal Counsel / File generic cyber complaint under IT Act Sec 43',
        severity: 'Unknown'
      });
    }
    setIsSearching(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9, filter: 'blur(10px)' },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 1, ease: appleEasing }
    }
  };

  return (
    <div className="min-h-screen text-[var(--color-apple-text)] relative z-10 selection:bg-white/20" ref={containerRef}>
      
      {/* ─── HERO SECTION ─── */}
      <motion.section 
        style={{ y: heroY, opacity: heroOpacity }}
        className="pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto relative z-10 min-h-[80vh] flex flex-col justify-center"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-black tracking-tighter leading-[1.05] mb-6 drop-shadow-2xl">
            The legal framework <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white/80 to-white/30">for the digital age.</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-[var(--color-apple-text-muted)] max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
            A comprehensive, <strong className="text-white">offline-first</strong> portal for analyzing forensic evidence, exploring the IT Act, and executing simulated legal attacks.
          </motion.p>

          {/* Search Widget */}
          <motion.div variants={itemVariants} className="max-w-3xl mx-auto relative group z-20">
            <div className="absolute inset-0 bg-white/10 rounded-[32px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="flex flex-col sm:flex-row items-center gap-4 relative">
              <div className="relative flex-1 w-full group/input">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50 group-focus-within/input:text-white transition-colors duration-300" size={24} />
                <input
                  type="text"
                  placeholder="Analyze threat (e.g. 'phishing email')"
                  className="w-full pl-16 pr-6 h-20 text-xl font-medium text-white placeholder-white/30 bg-black/40 backdrop-blur-3xl border border-white/20 rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.4)] focus:shadow-[0_0_0_4px_rgba(255,255,255,0.1)] focus:border-white/40 transition-all duration-300 outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,1)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSearch(searchQuery)}
                className="h-20 px-10 text-xl font-bold bg-white/90 text-black rounded-[24px] shadow-[0_8px_32px_rgba(255,255,255,0.15)] w-full sm:w-auto backdrop-blur-lg flex items-center justify-center gap-3"
                disabled={isSearching}
              >
                {isSearching ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-6 h-6 border-2 border-black/20 border-t-black rounded-full" />
                ) : (
                  <>Analyze <ArrowRight size={20} /></>
                )}
              </motion.button>
            </div>

            {/* Quick Suggestions */}
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mt-8">
              {CRIME_SEARCH_SUGGESTIONS.slice(0, 3).map((s, i) => (
                <motion.button 
                  key={i}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)", y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSearchQuery(s.query);
                    handleSearch(s.query);
                  }}
                  className="px-5 py-2.5 rounded-full text-[14px] font-semibold bg-white/5 border border-white/10 text-white/70 hover:text-white backdrop-blur-md transition-colors shadow-lg"
                >
                  {s.query}
                </motion.button>
              ))}
            </motion.div>

            {/* Live Results Panel */}
            <AnimatePresence mode="wait">
              {isSearching && (
                <motion.div key="loading" initial={{ opacity: 0, height: 0, y: -20, filter: 'blur(10px)' }} animate={{ opacity: 1, height: 'auto', y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, height: 0, y: -20, filter: 'blur(10px)' }} transition={{ duration: 0.5, ease: appleEasing }} className="text-left">
                  <SkeletonResult />
                </motion.div>
              )}
              {searchResult && !isSearching && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 30, scale: 0.95, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                  transition={{ duration: 0.6, ease: appleEasing }}
                  className="mt-8 p-8 bg-black/60 backdrop-blur-3xl border border-white/20 rounded-[32px] text-left shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className="text-sm font-semibold text-[var(--color-apple-text-muted)] flex items-center gap-2">
                      Matched Threat: <span className="text-white bg-white/10 px-3 py-1 rounded-lg border border-white/10 shadow-inner">{searchResult.match}</span>
                    </div>
                    <motion.div 
                      initial={{ scale: 0, rotate: -10 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.3, type: 'spring', damping: 12 }}
                      className="px-4 py-1.5 rounded-full bg-red-500/20 text-red-400 text-[12px] font-black uppercase tracking-widest border border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                    >
                      {searchResult.severity}
                    </motion.div>
                  </div>
                  <div className="text-3xl font-bold leading-tight relative z-10 text-white">
                    {searchResult.result}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ─── MODULES ─── */}
      <motion.section style={{ y: modulesY }} className="py-32 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 1, ease: appleEasing }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-white drop-shadow-xl">Core Operations.</h2>
          <p className="text-[var(--color-apple-text-muted)] max-w-2xl mx-auto text-xl font-medium leading-relaxed">Specialized tools engineered to test boundaries, analyze statutes, and construct legally sound digital evidence.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { title: 'Law Directory', desc: 'Comprehensive explorer for IT Act 2000, BNS, BSA 2023, and DPDP Act.', to: '/laws', icon: Scale, delay: 0, gradient: 'from-blue-500/20 to-purple-500/20' },
            { title: 'Attack Labs', desc: 'Live simulations of Phishing, Harassment, and Forensics environments.', to: '/simulations', icon: Crosshair, delay: 0.15, gradient: 'from-red-500/20 to-orange-500/20' },
            { title: 'FIR Generator', desc: 'Legally-structured wizard that compiles evidence into a compliant PDF report.', to: '/report-generator', icon: FileText, delay: 0.3, gradient: 'from-emerald-500/20 to-teal-500/20' }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 80, scale: 0.9, filter: 'blur(20px)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: item.delay, ease: appleEasing }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="h-full relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[40px]`} />
              <Link to={item.to} className="relative bg-black/40 backdrop-blur-2xl border border-white/10 p-12 flex flex-col h-full block rounded-[40px] shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden transition-colors duration-500 group-hover:bg-white/[0.08] group-hover:border-white/20">
                <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center mb-10 border border-white/20 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <item.icon size={36} className="text-white drop-shadow-md" />
                </div>
                <h3 className="text-3xl font-bold mb-4 tracking-tight text-white">{item.title}</h3>
                <p className="text-[var(--color-apple-text-muted)] mb-12 flex-1 leading-relaxed text-lg font-medium group-hover:text-white/80 transition-colors">{item.desc}</p>
                <div className="flex items-center gap-3 font-bold text-base text-[var(--color-apple-text-muted)] group-hover:text-white transition-colors">
                  Open Module <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ─── GOV LINKS ─── */}
      <section className="py-32 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto mb-10 relative z-10 border-t border-white/10 bg-gradient-to-b from-transparent to-black/50">
        <motion.div 
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: appleEasing }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-white">Official Gov Resources</h2>
          <p className="text-[var(--color-apple-text-muted)] max-w-xl mx-auto text-lg font-medium">Portals and agencies for reporting cyber crimes in India.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {GOV_LINKS.map((link, idx) => (
            <motion.a 
              key={idx} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: appleEasing }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 flex flex-col h-full group rounded-3xl hover:bg-white/10 hover:border-white/20 transition-all shadow-xl"
            >
              <h3 className="text-lg font-bold mb-4 flex items-center justify-between text-white/90 group-hover:text-white transition-colors">
                {link.name}
                <ExternalLink size={18} className="text-white/30 group-hover:text-white transition-colors group-hover:rotate-12" />
              </h3>
              <p className="text-[var(--color-apple-text-muted)] text-[15px] flex-1 leading-relaxed font-medium group-hover:text-white/70 transition-colors">{link.desc}</p>
            </motion.a>
          ))}
        </div>
      </section>

    </div>
  );
}
