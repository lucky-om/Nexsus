import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NexsusChatbot from './components/NexsusChatbot';

import Home from './pages/Home';
import LawDirectory from './pages/LawDirectory';
import SimulationsHub from './pages/SimulationsHub';
import PhishingLab from './pages/PhishingLab';
import HarassmentLab from './pages/HarassmentLab';
import HashEvidenceLab from './pages/HashEvidenceLab';
import GovernanceHub from './pages/GovernanceHub';
import FIRGenerator from './pages/FIRGenerator';
import DataProtection from './pages/DataProtection';
import Terms from './pages/Terms';

const pageVariants = {
  initial: { opacity: 0, scale: 0.96, filter: 'blur(10px)' },
  animate: { 
    opacity: 1, 
    scale: 1, 
    filter: 'blur(0px)',
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1] 
    } 
  },
  exit: { 
    opacity: 0, 
    scale: 1.04, 
    filter: 'blur(10px)',
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } 
  },
};

// Premium Clean Background (Non-generic, Apple Pro style)
function GlobalBackground() {
  return (
    <div className="fixed inset-0 z-[-1] bg-black">
      {/* Subtle, static, extremely clean dark gradient (like Mac Pro marketing) */}
      <div 
        className="absolute inset-0 opacity-[0.8]"
        style={{
          background: 'radial-gradient(circle at 50% 0%, #151515 0%, #000000 70%)'
        }}
      />
    </div>
  );
}

// Initial Loader Screen
function InitialLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 relative flex items-center justify-center mb-8"
          >
            <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-white/20 animate-spin" />
            <div className="absolute inset-2 rounded-full border-b-2 border-l-2 border-white/40 animate-[spin_2s_reverse_infinite]" />
            <div className="absolute inset-4 rounded-full border-t-2 border-white/60 animate-[spin_3s_linear_infinite]" />
            <img src="/logo.png" alt="Nexsus" className="w-10 h-10 object-contain z-10 animate-pulse" />
          </motion.div>
          <div className="overflow-hidden h-6">
            <motion.div
              initial={{ y: 30 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-white tracking-[0.3em] font-semibold text-sm uppercase"
            >
              Loading Nexsus
            </motion.div>
          </div>
          <div className="w-48 h-1 bg-white/10 rounded-full mt-6 overflow-hidden">
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1/2 h-full bg-white rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/laws" element={<LawDirectory />} />
          <Route path="/simulations" element={<SimulationsHub />} />
          <Route path="/simulations/phishing" element={<PhishingLab />} />
          <Route path="/simulations/harassment" element={<HarassmentLab />} />
          <Route path="/simulations/forensics" element={<HashEvidenceLab />} />
          <Route path="/governance" element={<GovernanceHub />} />
          <Route path="/report-generator" element={<FIRGenerator />} />
          <Route path="/privacy-policy" element={<DataProtection />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 relative z-10">
              <div className="text-[120px] font-bold text-white/10 tracking-tighter mb-4 blur-[2px]">404</div>
              <div className="text-3xl font-bold text-white mb-4">Void Reached</div>
              <div className="text-white/50 mb-8 max-w-md text-lg">The forensic protocol you are attempting to access does not exist in our system.</div>
              <a href="/" className="apple-btn-secondary px-8 py-4 font-bold tracking-wide">Return to Safe Zone</a>
            </div>
          } />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <InitialLoader />
      <GlobalBackground />
      <div className="flex flex-col min-h-screen relative z-10">
        <Navbar />
        <main className="flex-1 w-full flex flex-col">
          <AnimatedRoutes />
        </main>
        <Footer />
        <NexsusChatbot />
      </div>
    </BrowserRouter>
  );
}
