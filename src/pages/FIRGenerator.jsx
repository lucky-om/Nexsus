import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, ChevronRight, ChevronLeft, CheckCircle, User, Scale, Shield } from 'lucide-react';
import { sanitizeInput } from '../utils/cryptoHash';
import { generateFIRPDF } from '../utils/pdfExport';

const OFFENCE_OPTIONS = [
  'Identity Theft',
  'Phishing / Fraud',
  'Hacking / Unauthorised Access',
  'Cyber Stalking / Harassment',
  'Voyeurism / Non-Consensual Images',
  'Ransomware / Malware',
  'Data Breach / DPDP Violation',
  'Obscene Content',
  'Cyber Terrorism / CII Attack',
  'Business Email Compromise (BEC)',
  'Software Piracy',
  'Cyber Defamation',
  'Other Cyber Offence',
];

const SECTION_MAP = {
  'Identity Theft': 'IT Act Sec 66C, IT Act Sec 66D',
  'Phishing / Fraud': 'IT Act Sec 66C, IT Act Sec 66D, BNS Sec 318',
  'Hacking / Unauthorised Access': 'IT Act Sec 43, IT Act Sec 66',
  'Cyber Stalking / Harassment': 'BNS Sec 78, IT Act Sec 67',
  'Voyeurism / Non-Consensual Images': 'IT Act Sec 66E, IT Act Sec 67',
  'Ransomware / Malware': 'IT Act Sec 43, IT Act Sec 66, IT Act Sec 66F',
  'Data Breach / DPDP Violation': 'IT Act Sec 43A, DPDP Act Sec 8, DPDP Act Sec 33',
  'Obscene Content': 'IT Act Sec 67, IT Act Sec 67A',
  'Cyber Terrorism / CII Attack': 'IT Act Sec 66F',
  'Business Email Compromise (BEC)': 'IT Act Sec 66C, IT Act Sec 66D',
  'Software Piracy': 'IT Act Sec 43, Copyright Act Sec 63B',
  'Cyber Defamation': 'BNS Sec 356',
  'Other Cyber Offence': 'IT Act Sec 43, IT Act Sec 66',
};

const ACT_MAP = {
  'Identity Theft': 'IT Act 2000/2008, BNS 2023',
  'Phishing / Fraud': 'IT Act 2000/2008, BNS 2023',
  'Hacking / Unauthorised Access': 'IT Act 2000/2008',
  'Cyber Stalking / Harassment': 'IT Act 2000/2008, BNS 2023',
  'Voyeurism / Non-Consensual Images': 'IT Act 2000/2008, BNS 2023',
  'Ransomware / Malware': 'IT Act 2000/2008',
  'Data Breach / DPDP Violation': 'IT Act 2000/2008, DPDP Act 2023',
  'Obscene Content': 'IT Act 2000/2008',
  'Cyber Terrorism / CII Attack': 'IT Act 2000/2008',
  'Business Email Compromise (BEC)': 'IT Act 2000/2008, BNS 2023',
  'Software Piracy': 'IT Act 2000/2008, Copyright Act 1957',
  'Cyber Defamation': 'BNS 2023',
  'Other Cyber Offence': 'IT Act 2000/2008',
};

const STEPS = [
  { id: 1, label: 'Complainant', icon: User },
  { id: 2, label: 'Incident', icon: Scale },
  { id: 3, label: 'Evidence', icon: Shield },
  { id: 4, label: 'Export', icon: FileText },
];

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu & Kashmir', 'Ladakh',
];

const appleEasing = [0.16, 1, 0.3, 1];

export default function FIRGenerator() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    complainantName: '', fatherName: '', dob: '', mobile: '', email: '',
    address: '', state: 'Maharashtra', aadhaarLast4: '',
    offenceType: 'Phishing / Fraud', incidentDate: '', incidentTime: '',
    platform: '', description: '',
    sections: SECTION_MAP['Phishing / Fraud'],
    applicableActs: ACT_MAP['Phishing / Fraud'],
    evidence: '', sha256Hash: '', screenshots: false,
    transactionIds: '', accusedInfo: '', witnesses: '',
    civilRelief: '', interimRelief: '', reportingAuthority: 'Cyber Crime Police Station',
  });
  const [generated, setGenerated] = useState(false);
  const [generating, setGenerating] = useState(false);

  const update = (field, value) => {
    const sanitized = typeof value === 'string' ? sanitizeInput(value) : value;
    setFormData(prev => {
      const updated = { ...prev, [field]: sanitized };
      if (field === 'offenceType') {
        updated.sections = SECTION_MAP[sanitized] || SECTION_MAP['Other Cyber Offence'];
        updated.applicableActs = ACT_MAP[sanitized] || ACT_MAP['Other Cyber Offence'];
      }
      return updated;
    });
  };

  const handleGenerate = async () => {
    setGenerating(true);
    await new Promise(r => setTimeout(r, 800));
    generateFIRPDF(formData);
    setGenerated(true);
    setGenerating(false);
  };

  const isStep1Valid = formData.complainantName && formData.mobile && formData.address;
  const isStep2Valid = formData.offenceType && formData.incidentDate && formData.description;

  const renderStep1 = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-[13px] font-bold text-[var(--color-apple-text-muted)] uppercase tracking-wider mb-2" htmlFor="complainant-name">Full Name *</label>
        <input id="complainant-name" className="apple-input w-full" value={formData.complainantName} onChange={e => update('complainantName', e.target.value)} placeholder="As per government ID" />
      </div>
      <div>
        <label className="block text-[13px] font-bold text-[var(--color-apple-text-muted)] uppercase tracking-wider mb-2" htmlFor="father-name">Father / Spouse Name</label>
        <input id="father-name" className="apple-input w-full" value={formData.fatherName} onChange={e => update('fatherName', e.target.value)} placeholder="Optional" />
      </div>
      <div>
        <label className="block text-[13px] font-bold text-[var(--color-apple-text-muted)] uppercase tracking-wider mb-2" htmlFor="dob-input">Date of Birth</label>
        <input id="dob-input" type="date" className="apple-input w-full" value={formData.dob} onChange={e => update('dob', e.target.value)} />
      </div>
      <div>
        <label className="block text-[13px] font-bold text-[var(--color-apple-text-muted)] uppercase tracking-wider mb-2" htmlFor="mobile-input">Mobile Number *</label>
        <input id="mobile-input" className="apple-input w-full" value={formData.mobile} onChange={e => update('mobile', e.target.value)} placeholder="10-digit mobile" maxLength={10} />
      </div>
      <div>
        <label className="block text-[13px] font-bold text-[var(--color-apple-text-muted)] uppercase tracking-wider mb-2" htmlFor="email-input">Email Address</label>
        <input id="email-input" type="email" className="apple-input w-full" value={formData.email} onChange={e => update('email', e.target.value)} placeholder="your@email.com" />
      </div>
      <div>
        <label className="block text-[13px] font-bold text-[var(--color-apple-text-muted)] uppercase tracking-wider mb-2" htmlFor="aadhaar-input">Aadhaar Last 4 (Optional)</label>
        <input id="aadhaar-input" className="apple-input w-full" value={formData.aadhaarLast4} onChange={e => update('aadhaarLast4', e.target.value)} placeholder="XXXX" maxLength={4} />
      </div>
      <div className="md:col-span-2">
        <label className="block text-[13px] font-bold text-[var(--color-apple-text-muted)] uppercase tracking-wider mb-2" htmlFor="address-input">Residential Address *</label>
        <textarea id="address-input" className="apple-input w-full py-4 min-h-[100px]" rows={3} value={formData.address} onChange={e => update('address', e.target.value)} placeholder="Full address with PIN code" />
      </div>
      <div>
        <label className="block text-[13px] font-bold text-[var(--color-apple-text-muted)] uppercase tracking-wider mb-2" htmlFor="state-input">State *</label>
        <select id="state-input" className="apple-input w-full appearance-none" value={formData.state} onChange={e => update('state', e.target.value)}>
          {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[13px] font-bold text-[var(--color-apple-text-muted)] uppercase tracking-wider mb-2" htmlFor="offence-type">Type of Offence *</label>
          <select id="offence-type" className="apple-input w-full appearance-none" value={formData.offenceType} onChange={e => update('offenceType', e.target.value)}>
            {OFFENCE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[13px] font-bold text-[var(--color-apple-text-muted)] uppercase tracking-wider mb-2">Applicable Sections (Auto-filled)</label>
          <div className="apple-input w-full bg-white/5 border-white/5 text-emerald-400 font-mono text-xs flex items-center">{formData.sections}</div>
        </div>
        <div>
          <label className="block text-[13px] font-bold text-[var(--color-apple-text-muted)] uppercase tracking-wider mb-2" htmlFor="incident-date">Date of Incident *</label>
          <input id="incident-date" type="date" className="apple-input w-full" value={formData.incidentDate} onChange={e => update('incidentDate', e.target.value)} />
        </div>
        <div>
          <label className="block text-[13px] font-bold text-[var(--color-apple-text-muted)] uppercase tracking-wider mb-2" htmlFor="incident-time">Time of Incident (approx)</label>
          <input id="incident-time" type="time" className="apple-input w-full" value={formData.incidentTime} onChange={e => update('incidentTime', e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-[13px] font-bold text-[var(--color-apple-text-muted)] uppercase tracking-wider mb-2" htmlFor="platform-input">Platform / Website / App</label>
          <input id="platform-input" className="apple-input w-full" value={formData.platform} onChange={e => update('platform', e.target.value)} placeholder="e.g., Gmail, WhatsApp, SBI website, Instagram" />
        </div>
      </div>
      <div>
        <label className="block text-[13px] font-bold text-[var(--color-apple-text-muted)] uppercase tracking-wider mb-2" htmlFor="description-input">Detailed Description of Incident *</label>
        <textarea id="description-input" className="apple-input w-full py-4 min-h-[150px]" rows={6} value={formData.description} onChange={e => update('description', e.target.value)} placeholder="Describe what happened in chronological order. Include: what was done, how you discovered it, what losses occurred..." />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-[13px] font-bold text-[var(--color-apple-text-muted)] uppercase tracking-wider mb-2" htmlFor="evidence-input">Evidence Available</label>
        <textarea id="evidence-input" className="apple-input w-full py-4 min-h-[100px]" rows={4} value={formData.evidence} onChange={e => update('evidence', e.target.value)} placeholder="List all evidence: email printouts, screenshots, transaction receipts, chat logs, URLs, IP addresses..." />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[13px] font-bold text-[var(--color-apple-text-muted)] uppercase tracking-wider mb-2" htmlFor="sha256-input">SHA-256 Hash of Evidence</label>
          <input id="sha256-input" className="apple-input w-full font-mono text-[13px]" value={formData.sha256Hash} onChange={e => update('sha256Hash', e.target.value)} placeholder="Use Hash Integrity Lab to compute" />
          <div className="text-[12px] text-[var(--color-apple-text-muted)] mt-2 font-medium">Required for BSA Section 65B certificate</div>
        </div>
        <div>
          <label className="block text-[13px] font-bold text-[var(--color-apple-text-muted)] uppercase tracking-wider mb-2" htmlFor="transaction-input">Bank/UPI Transaction IDs</label>
          <input id="transaction-input" className="apple-input w-full" value={formData.transactionIds} onChange={e => update('transactionIds', e.target.value)} placeholder="If financial loss involved" />
        </div>
        <div>
          <label className="block text-[13px] font-bold text-[var(--color-apple-text-muted)] uppercase tracking-wider mb-2" htmlFor="accused-input">Accused Information (if known)</label>
          <input id="accused-input" className="apple-input w-full" value={formData.accusedInfo} onChange={e => update('accusedInfo', e.target.value)} placeholder="Name, email, phone, social profile, IP..." />
        </div>
        <div>
          <label className="block text-[13px] font-bold text-[var(--color-apple-text-muted)] uppercase tracking-wider mb-2" htmlFor="witnesses-input">Witnesses (if any)</label>
          <input id="witnesses-input" className="apple-input w-full" value={formData.witnesses} onChange={e => update('witnesses', e.target.value)} placeholder="Name and contact of witnesses" />
        </div>
      </div>
      <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
        <input
          type="checkbox"
          id="screenshots-check"
          checked={formData.screenshots}
          onChange={e => setFormData(p => ({ ...p, screenshots: e.target.checked }))}
          className="w-5 h-5 accent-white rounded"
        />
        <label htmlFor="screenshots-check" className="text-white text-sm cursor-pointer font-medium">
          I have screenshots / printouts of the evidence attached with this complaint.
        </label>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-8">
      <div className="p-8 rounded-3xl border border-white/10 bg-black/40">
        <div className="text-[13px] font-bold text-[var(--color-apple-text-muted)] uppercase tracking-widest mb-6">Complaint Summary Preview</div>
        <div className="space-y-4">
          {[
            ['Complainant', formData.complainantName || '—'],
            ['Offence', formData.offenceType],
            ['Date', formData.incidentDate || '—'],
            ['Platform', formData.platform || '—'],
            ['Sections', formData.sections],
            ['Acts', formData.applicableActs],
          ].map(([k, v]) => (
            <div key={k} className="flex flex-col sm:flex-row gap-2 sm:gap-6">
              <span className="font-bold text-[var(--color-apple-text-muted)] text-[14px] w-32 flex-shrink-0">{k}:</span>
              <span className="text-white text-[15px] font-medium">{v}</span>
            </div>
          ))}
        </div>
      </div>

      {!generated ? (
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="w-full apple-btn-primary h-16 rounded-[20px] text-lg flex items-center justify-center gap-3 shadow-[0_8px_32px_rgba(255,255,255,0.15)]"
          id="generate-fir-btn"
        >
          {generating ? (
            <>
              <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full" />
              Generating PDF...
            </>
          ) : (
            <>
              <Download size={20} />
              Generate & Download FIR Draft PDF
            </>
          )}
        </button>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
          className="p-8 rounded-[32px] border border-emerald-500/30 bg-emerald-500/5 text-center"
        >
          <CheckCircle size={48} className="text-emerald-500 mx-auto mb-4" />
          <div className="text-2xl font-black text-emerald-400 mb-2">FIR Draft Generated!</div>
          <div className="text-[var(--color-apple-text-muted)] text-[15px] mb-8 max-w-md mx-auto">Your PDF complaint has been downloaded. Review with a qualified advocate before filing.</div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={handleGenerate} className="apple-btn-secondary px-6 h-12">
              Re-download PDF
            </button>
            <button onClick={() => { setStep(1); setGenerated(false); }} className="apple-btn-secondary px-6 h-12">
              New Complaint
            </button>
            <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer"
              className="apple-btn-primary px-6 h-12 border border-white/10 flex items-center gap-2">
              cybercrime.gov.in <ChevronRight size={16} />
            </a>
          </div>
        </motion.div>
      )}

      <div className="p-5 rounded-2xl border border-orange-500/20 bg-orange-500/5 text-[13px] text-[var(--color-apple-text-muted)] text-center font-medium">
        ⚖️ This PDF is an educational draft only. Please review with a qualified cyber law advocate before filing. National Helpline: <strong className="text-orange-400">1930</strong>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-24 text-[var(--color-apple-text)] relative overflow-hidden">
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="relative max-w-5xl mx-auto px-6 md:px-12 z-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: appleEasing }} className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
            FIR <span className="text-[var(--color-apple-text-muted)]">Generator</span>
          </h1>
          <p className="text-[var(--color-apple-text-muted)] max-w-2xl mx-auto text-lg leading-relaxed font-medium">
            Formulate legally structured incident complaint drafts. Exports a client-side PDF pre-filled with appropriate IT Act sections.
          </p>
        </motion.div>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-12 max-w-2xl mx-auto relative z-10">
          <div className="absolute left-0 right-0 top-1/2 h-px bg-white/10 -z-10" />
          <motion.div className="absolute left-0 top-1/2 h-px bg-white -z-10" 
            initial={{ width: 0 }} 
            animate={{ width: `${((step - 1) / 3) * 100}%` }} 
            transition={{ duration: 0.5, ease: appleEasing }} 
          />
          
          {STEPS.map((s) => {
            const isActive = step === s.id;
            const isCompleted = step > s.id;
            return (
              <div key={s.id} className="flex flex-col items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isActive ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-110' :
                  isCompleted ? 'bg-white/20 text-white border border-white/30' : 'bg-black text-white/30 border border-white/10'
                }`}>
                  {isCompleted ? <CheckCircle size={20} /> : <s.icon size={20} />}
                </div>
                <div className={`text-[12px] font-bold tracking-wide ${isActive || isCompleted ? 'text-white' : 'text-white/30'}`}>
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Form Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, ease: appleEasing }}
            className="apple-glass rounded-[40px] p-8 md:p-12 border border-white/10 shadow-2xl"
          >
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-4">
              {(() => { const S = STEPS[step - 1]; return <S.icon size={28} className="text-[var(--color-apple-text-muted)]" />; })()}
              {STEPS[step - 1].label}
            </h2>

            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}

            {/* Navigation */}
            <div className="flex justify-between mt-12 pt-8 border-t border-white/10">
              <button
                onClick={() => setStep(s => s - 1)}
                disabled={step === 1}
                className="apple-btn-secondary px-6 h-12 disabled:opacity-30 disabled:cursor-not-allowed"
                id="step-back-btn"
              >
                <ChevronLeft size={18} className="mr-2" /> Back
              </button>
              {step < 4 && (
                <button
                  onClick={() => setStep(s => s + 1)}
                  disabled={step === 1 ? !isStep1Valid : step === 2 ? !isStep2Valid : false}
                  className="apple-btn-primary px-8 h-12 disabled:opacity-30 disabled:cursor-not-allowed disabled:bg-white/50"
                  id="step-next-btn"
                >
                  Next <ChevronRight size={18} className="ml-2" />
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
