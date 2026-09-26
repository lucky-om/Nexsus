import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Shield, Menu, X, AlertTriangle, ChevronRight } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Overview', exact: true },
  { to: '/laws', label: 'Law Directory' },
  { to: '/simulations', label: 'Simulations' },
  { to: '/governance', label: 'Governance' },
  { to: '/report-generator', label: 'FIR Builder' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Emergency Banner */}
      <div className="bg-[var(--color-apple-card)] backdrop-blur-3xl py-2 px-6 flex flex-wrap items-center justify-between text-xs tracking-wide border-b border-[var(--color-apple-border)] z-50 relative">
        <div className="flex items-center gap-2">
          <AlertTriangle size={12} className="text-[var(--color-apple-text-muted)]" />
          <span className="text-[var(--color-apple-text-muted)] uppercase tracking-wider font-semibold">Cyber Emergency</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="tel:1930" className="font-semibold hover:text-[var(--color-apple-accent)] transition-colors">1930</a>
          <span className="text-[var(--color-apple-text-muted)] opacity-50">|</span>
          <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="text-[var(--color-apple-text-muted)] hover:text-white flex items-center gap-1 font-medium transition-colors">
            cybercrime.gov.in <ChevronRight size={10} />
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-[100] bg-[var(--color-apple-bg)]/70 backdrop-blur-2xl border-b border-[var(--color-apple-border)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src="/logo.png" 
                alt="Nexsus Logo" 
                className="w-7 h-7 object-contain filter grayscale contrast-200 brightness-200"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<span class="text-white font-bold text-xl">N</span>';
                }}
              />
              <div className="font-bold text-xl tracking-tight">
                Nexsus
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.exact}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-full text-[13px] font-medium transition-all ${
                      isActive 
                        ? 'bg-white/10 text-white' 
                        : 'text-[var(--color-apple-text-muted)] hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-[var(--color-apple-text-muted)] hover:text-white transition-colors"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="absolute top-full left-0 w-full bg-[var(--color-apple-bg)]/90 backdrop-blur-3xl border-b border-[var(--color-apple-border)] lg:hidden z-[90] p-4">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.exact}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      isActive 
                        ? 'bg-white/10 text-white' 
                        : 'text-[var(--color-apple-text-muted)] hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
