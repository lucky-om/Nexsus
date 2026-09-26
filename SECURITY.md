# SECURITY.md — Nexsus CyberLaw Security Policy

## OWASP Compliance Posture

### Frontend Security Controls

| Control | Implementation | Status |
|---------|---------------|--------|
| XSS Prevention | All user inputs sanitized via `sanitizeInput()` in `cryptoHash.js` — strips HTML tags, escapes special characters, blocks `javascript:` URIs and event handlers | ✅ Implemented |
| Content Security Policy | Strict CSP via `vercel.json` — blocks unsafe-inline scripts, restricts `script-src` to `'self'`, `frame-ancestors: 'none'` | ✅ Implemented |
| Clickjacking Prevention | `X-Frame-Options: DENY` header prevents embedding in iframes | ✅ Implemented |
| MIME Sniffing | `X-Content-Type-Options: nosniff` prevents MIME confusion attacks | ✅ Implemented |
| Referrer Leakage | `Referrer-Policy: strict-origin-when-cross-origin` limits referrer information | ✅ Implemented |
| Browser Feature Restrictions | `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()` | ✅ Implemented |
| HTTPS Enforcement | `Strict-Transport-Security` with 2-year max-age and preload | ✅ Implemented |
| Safe Hashing | Native `window.crypto.subtle` (SHA-256) — no vulnerable external libraries | ✅ Implemented |
| Dependency Safety | Minimal dependencies: React, Framer Motion, Lucide, jsPDF, React Router, Tailwind | ✅ Implemented |

### OWASP Top 10 Coverage

| Vulnerability | Mitigation |
|--------------|------------|
| A01: Broken Access Control | N/A — public educational content, no authentication |
| A02: Cryptographic Failures | All hashing via native Web Crypto API. No sensitive data stored. |
| A03: Injection | All user inputs sanitized and HTML-escaped before rendering |
| A04: Insecure Design | Educational-only architecture, no server-side processing |
| A05: Security Misconfiguration | Strict CSP, security headers via vercel.json |
| A06: Vulnerable Components | Minimal, well-maintained dependencies |
| A07: Auth Failures | No authentication required |
| A08: Software Integrity | Production builds use Vite with integrity verification |
| A09: Logging Failures | No sensitive data logged to console |
| A10: SSRF | No server-side requests; all API calls are client-side with user-provided keys |

---

## Incident Reporting Notice

**This platform is for educational and simulation purposes only.**

If you discover a security vulnerability in Nexsus CyberLaw:

### Responsible Disclosure

1. **Do NOT** publicly disclose the vulnerability before coordinating with us
2. **Email:** security@nexsus.luckyverse.tech
3. **Include:**
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Your contact information

We commit to:
- Acknowledge your report within 48 hours
- Provide regular updates on our progress
- Credit you in our security acknowledgements (if desired)
- Not pursue legal action against good-faith researchers

### Scope

**In Scope:**
- nexsus.luckyverse.tech (production)
- Client-side XSS vulnerabilities
- CSP bypass techniques
- Logic flaws in simulation pages

**Out of Scope:**
- Social engineering attacks
- Physical security
- Denial of service attacks
- Automated scanning without prior permission

---

## Legal Notice

Unauthorized security testing of production systems without explicit written permission is illegal under IT Act 2000 Section 43 and 66. Only test against your local development instance.

**National Cyber Crime Helpline: 1930**  
**CERT-In:** incident@cert-in.org.in

---

Copyright © 2026 Nexsus CyberLaw (nexsus.luckyverse.tech). All rights reserved.
