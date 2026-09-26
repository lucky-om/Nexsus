import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[var(--color-apple-border)] bg-black/50 backdrop-blur-3xl relative z-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="/logo.png" 
                alt="Nexsus Logo" 
                className="w-7 h-7 object-contain filter grayscale contrast-200 brightness-200"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<span class="text-white font-bold text-xl">N</span>';
                }}
              />
              <span className="font-bold text-xl tracking-tight">Nexsus</span>
            </div>
            <p className="text-[var(--color-apple-text-muted)] max-w-sm mb-6 text-sm leading-relaxed">
              The premier interactive legal navigator and forensic simulation lab for the digital age.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-16">
            <div>
              <h4 className="font-semibold mb-4 text-sm tracking-wide">Modules</h4>
              <ul className="space-y-3">
                <li><Link to="/laws" className="text-[var(--color-apple-text-muted)] hover:text-white text-[13px] transition-colors">Law Directory</Link></li>
                <li><Link to="/simulations" className="text-[var(--color-apple-text-muted)] hover:text-white text-[13px] transition-colors">Simulations</Link></li>
                <li><Link to="/governance" className="text-[var(--color-apple-text-muted)] hover:text-white text-[13px] transition-colors">Governance</Link></li>
                <li><Link to="/report-generator" className="text-[var(--color-apple-text-muted)] hover:text-white text-[13px] transition-colors">FIR Builder</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm tracking-wide">Legal</h4>
              <ul className="space-y-3">
                <li><Link to="/data-protection" className="text-[var(--color-apple-text-muted)] hover:text-white text-[13px] transition-colors">Data Protection</Link></li>
                <li><a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="text-[var(--color-apple-text-muted)] hover:text-white text-[13px] transition-colors">Report Crime</a></li>
              </ul>
            </div>
          </div>
          
        </div>

        <div className="mt-16 pt-8 border-t border-[var(--color-apple-border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[var(--color-apple-text-muted)] text-[13px]">
            &copy; {year} Nexsus. All rights reserved.
          </p>
          <div className="text-[var(--color-apple-text-muted)] text-[10px] uppercase tracking-widest font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10">
            Zero Server Footprint
          </div>
        </div>
      </div>
    </footer>
  );
}
