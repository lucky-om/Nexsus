import { motion } from 'framer-motion';

export function LawCardSkeleton() {
  return (
    <div className="cyber-card p-5 space-y-3 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="skeleton h-5 w-32 rounded" />
        <div className="skeleton h-6 w-16 rounded-full" />
      </div>
      <div className="skeleton h-7 w-3/4 rounded" />
      <div className="skeleton h-4 w-full rounded" />
      <div className="skeleton h-4 w-5/6 rounded" />
      <div className="flex gap-2 mt-4">
        <div className="skeleton h-6 w-20 rounded-full" />
        <div className="skeleton h-6 w-20 rounded-full" />
        <div className="skeleton h-6 w-20 rounded-full" />
      </div>
      <div className="skeleton h-10 w-full rounded-lg mt-3" />
    </div>
  );
}

export function PageSkeletonLoader() {
  return (
    <div className="min-h-screen bg-obsidian-950 py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header skeleton */}
        <div className="text-center space-y-4">
          <div className="skeleton h-4 w-32 rounded-full mx-auto" />
          <div className="skeleton h-12 w-2/3 rounded-lg mx-auto" />
          <div className="skeleton h-5 w-1/2 rounded mx-auto" />
        </div>
        {/* Filter bar */}
        <div className="flex gap-3 justify-center flex-wrap">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="skeleton h-9 w-28 rounded-full" />
          ))}
        </div>
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => (
            <LawCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ScanBeamLoader({ message = 'Scanning...' }) {
  return (
    <div className="fixed inset-0 z-50 bg-obsidian-950/90 flex flex-col items-center justify-center gap-6">
      {/* Scanning beam */}
      <div className="relative w-72 h-72">
        <div className="absolute inset-0 rounded-full border border-cyber-cyan/20" />
        <div className="absolute inset-4 rounded-full border border-cyber-cyan/10" />
        <div className="absolute inset-8 rounded-full border border-cyber-cyan/20" />
        {/* Rotating scanner line */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <div className="w-1/2 h-px bg-gradient-to-r from-cyber-cyan to-transparent" style={{ transformOrigin: 'right center' }} />
        </motion.div>
        {/* Center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-4 h-4 rounded-full bg-cyber-cyan"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </div>
      <div className="text-center">
        <div className="font-mono text-cyber-cyan text-lg font-bold tracking-widest">{message}</div>
        <div className="font-mono text-slate-600 text-xs mt-2">Nexsus CyberLaw Security Engine v2.0</div>
      </div>
    </div>
  );
}

export function InlineSkeleton({ className = '' }) {
  return <div className={`skeleton ${className}`} />;
}
