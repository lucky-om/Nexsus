# Nexsus CyberLaw — Interactive Legal Navigator & Cyber Forensics Lab

> **nexsus.luckyverse.tech** — India's Premier Interactive Cyber Law Education and Attack Simulation Portal

[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)](https://nexsus.luckyverse.tech)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![OWASP Hardened](https://img.shields.io/badge/Security-OWASP%20Hardened-green)](./SECURITY.md)

---

## 🛡️ Overview

Nexsus CyberLaw is a production-grade, 100% client-side web application for interactive cyber law education under Indian law. Built for students, legal professionals, cyber security practitioners, and digital citizens.

### Coverage
- **IT Act 2000/2008** — Sections 43, 43A, 65, 66, 66C, 66D, 66E, 66F, 67, 67A, 67B
- **Bharatiya Nyaya Sanhita (BNS) 2023** — Sections 78, 318, 356, 384
- **Bharatiya Sakshya Adhiniyam (BSA) 2023** — Section 65B (Electronic Evidence)
- **DPDP Act 2023** — Sections 6, 7, 8, 16, 33
- **GDPR** — Articles 46, 83 (Cross-border transfers)
- **CFAA** (US reference for international cases)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔍 **Crime Search Engine** | Natural language crime-to-section mapper |
| 📚 **Law Directory** | 18+ offences with sections, penalties, remedies, pagination |
| 🧪 **Phishing Lab** | Interactive mock SBI inbox with clickable red-flag indicators |
| 👤 **Harassment Lab** | 3 social media case studies with IT Rules 2021 takedown workflow |
| #️⃣ **Hash Integrity Lab** | Live SHA-256 via Web Crypto API + BSA 65B chain of custody PDF |
| 📊 **Governance Hub** | 5×5 Risk Matrix, ALE calculator, ISO 27001 / NIST / COBIT / ITIL tabs |
| 📄 **FIR Builder** | 4-step wizard → legally structured PDF complaint via jsPDF |
| 🤖 **Nexsus AI** | Floating chatbot with offline legal knowledge base + Gemini API |
| 🔒 **OWASP Hardened** | CSP, X-Frame-Options, input sanitization, Web Crypto only |

---

## 🚀 Local Development

### Prerequisites
- Node.js 18+
- npm 9+

### Setup

```bash
# Clone or navigate to project
cd nexsus-cyberlaw

# Install dependencies
npm install

# Configure environment (optional — for live AI mode)
cp .env.example .env
# Edit .env and add your Gemini API key

# Start dev server
npm run dev
```

The app will be available at **http://localhost:5173**

---

## 🔧 Environment Configuration

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_NEXSUS_AI_API_KEY` | Optional | Gemini API key for live AI chatbot. If not set, offline mode activates. |

**Get a free key at:** https://aistudio.google.com/app/apikey

---

## 🌐 Vercel Deployment & Custom Domain

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Custom Domain Setup (nexsus.luckyverse.tech)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add domain: `nexsus.luckyverse.tech`
3. In your DNS provider (Cloudflare/Namecheap/GoDaddy), add:
   - Type: `CNAME`
   - Name: `nexsus`
   - Value: `cname.vercel-dns.com`
4. Wait for DNS propagation (5-30 minutes)
5. Vercel auto-provisions SSL certificate

### Environment Variables on Vercel

Vercel Dashboard → Project → Settings → Environment Variables:
```
VITE_NEXSUS_AI_API_KEY = your_gemini_api_key
```

---

## 📁 Project Structure

```
nexsus-cyberlaw/
├── public/
│   ├── assets/logo.png          # Brand logo
│   ├── assets/ailogo.png        # AI chatbot avatar
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── Navbar.jsx            # Sticky glassmorphic navbar
│   │   ├── Footer.jsx            # Full footer with emergency contacts
│   │   ├── NexsusChatbot.jsx     # Floating AI assistant
│   │   ├── LoadingSkeleton.jsx   # Cyber skeleton loaders
│   │   ├── LawCard.jsx           # Expandable law card
│   │   └── Pagination.jsx        # Numbered pagination
│   ├── pages/
│   │   ├── Home.jsx              # Hero + crime search + stats
│   │   ├── LawDirectory.jsx      # Filterable law explorer
│   │   ├── SimulationsHub.jsx    # Lab launcher cards
│   │   ├── PhishingLab.jsx       # Interactive phishing inspector
│   │   ├── HarassmentLab.jsx     # Social media harassment cases
│   │   ├── HashEvidenceLab.jsx   # SHA-256 forensics lab
│   │   ├── GovernanceHub.jsx     # Risk matrix + frameworks
│   │   ├── FIRGenerator.jsx      # 4-step FIR wizard
│   │   ├── PrivacyPolicy.jsx
│   │   └── Terms.jsx
│   ├── data/
│   │   └── cyberLawDatabase.js   # 18+ offences database
│   ├── utils/
│   │   ├── cryptoHash.js         # Web Crypto SHA-256 + XSS sanitizer
│   │   └── pdfExport.js          # jsPDF FIR + Chain of Custody
│   ├── App.jsx                   # Router + page transitions
│   ├── index.css                 # Full cyber design system
│   └── main.jsx
├── vercel.json                   # OWASP security headers + SPA rewrites
├── tailwind.config.js
├── .env.example
├── README.md
├── SECURITY.md
└── LICENSE
```

---

## 🛡️ Security

See [SECURITY.md](./SECURITY.md) for OWASP compliance posture and responsible disclosure policy.

**Quick Contact:** National Cyber Crime Helpline: **1930** | cybercrime.gov.in

---

## ⚖️ Legal Disclaimer

Nexsus CyberLaw is an educational and simulation tool. Information provided does not constitute legal advice. Please consult a qualified advocate for specific legal matters. All simulations are for educational purposes only.

---

## 📄 License

MIT License — Copyright © 2026 Nexsus CyberLaw (nexsus.luckyverse.tech). All rights reserved.
