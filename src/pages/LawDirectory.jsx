import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, SortAsc, Shield, ChevronDown } from 'lucide-react';
import { cyberLawDatabase, categories } from '../data/cyberLawDatabase';
import LawCard from '../components/LawCard';
import Pagination from '../components/Pagination';
import { LawCardSkeleton } from '../components/LoadingSkeleton';
import { sanitizeInput } from '../utils/cryptoHash';

const ITEMS_PER_PAGE = 6;

const sortOptions = [
  { value: 'severity-desc', label: 'Severity: Critical First' },
  { value: 'severity-asc', label: 'Severity: Low First' },
  { value: 'title-asc', label: 'Title A–Z' },
  { value: 'penalty-desc', label: 'Penalty: Highest First' },
];

const severityOrder = { Critical: 4, High: 3, Medium: 2, Low: 1 };

export default function LawDirectory() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('severity-desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading] = useState(false);

  const filtered = useMemo(() => {
    const q = sanitizeInput(search).toLowerCase();
    let data = [...cyberLawDatabase];

    if (category !== 'All') {
      data = data.filter(law => law.category === category);
    }

    if (q) {
      data = data.filter(law =>
        law.title.toLowerCase().includes(q) ||
        law.offence.toLowerCase().includes(q) ||
        law.sections.some(s => s.toLowerCase().includes(q)) ||
        law.acts.some(a => a.toLowerCase().includes(q)) ||
        law.category.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'severity-desc':
        data.sort((a, b) => (severityOrder[b.severity] || 0) - (severityOrder[a.severity] || 0));
        break;
      case 'severity-asc':
        data.sort((a, b) => (severityOrder[a.severity] || 0) - (severityOrder[b.severity] || 0));
        break;
      case 'title-asc':
        data.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'penalty-desc':
        data.sort((a, b) => (b.maxSentence || 0) - (a.maxSentence || 0));
        break;
    }

    return data;
  }, [search, category, sortBy]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (val) => {
    setSearch(val);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen py-24 text-[var(--color-apple-text)] relative overflow-hidden">
      
      {/* Ambient glow */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-white/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
            Law <span className="text-[var(--color-apple-text-muted)]">Directory</span>
          </h1>
          <p className="text-[var(--color-apple-text-muted)] text-lg max-w-2xl mx-auto leading-relaxed">
            Comprehensive mapping of cyber offences to exact IT Act sections, applicable penalties, reporting channels, and legal remedies.
          </p>
        </motion.div>

        {/* Search & Sort Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-10"
        >
          <div className="relative flex-1">
            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--color-apple-text-muted)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search offences, sections, acts..."
              className="apple-input w-full pl-12 pr-6 h-14 text-base"
              maxLength={200}
            />
          </div>
          <div className="relative">
            <SortAsc size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--color-apple-text-muted)] pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="apple-input w-full sm:w-auto pl-12 pr-10 min-w-[240px] h-14 text-base appearance-none cursor-pointer"
            >
              {sortOptions.map(o => (
                <option key={o.value} value={o.value} className="bg-black text-white">{o.label}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-[var(--color-apple-text-muted)] pointer-events-none" />
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-full font-medium transition-all text-[13px] ${
                category === cat
                  ? 'bg-white text-black'
                  : 'bg-white/5 border border-white/10 text-[var(--color-apple-text-muted)] hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--color-apple-border)] px-2">
          <div className="text-[13px] text-[var(--color-apple-text-muted)]">
            Showing <span className="text-white font-semibold">{paginated.length}</span> of{' '}
            <span className="text-white font-semibold">{filtered.length}</span> offences
            {category !== 'All' && (
              <span className="ml-1">in <span className="text-white font-medium">{category}</span></span>
            )}
          </div>
          {filtered.length === 0 && (
            <span className="text-[var(--color-apple-text-muted)] text-[11px] uppercase tracking-widest font-semibold">No results</span>
          )}
        </div>

        {/* Law Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => <LawCardSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
              <Search size={24} className="text-[var(--color-apple-text-muted)]" />
            </div>
            <h3 className="text-2xl font-bold mb-3">No offences found</h3>
            <p className="text-[var(--color-apple-text-muted)] text-sm mb-8">Try searching for "hacking", "Section 66C", or "phishing"</p>
            <button
              onClick={() => { setSearch(''); setCategory('All'); setCurrentPage(1); }}
              className="apple-btn-secondary px-6 py-2.5 text-sm"
            >
              Reset Filters
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {paginated.map((law, idx) => (
              <LawCard key={law.id} law={law} index={idx} />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      </div>
    </div>
  );
}
