// ============================================================
// PDF EXPORT — jsPDF-based FIR/Complaint Generator
// Generates legally structured incident complaint drafts
// ============================================================

import { jsPDF } from 'jspdf';

/**
 * Generate a legally structured FIR/Complaint PDF
 * @param {Object} formData - FIR form data from wizard
 */
export function generateFIRPDF(formData) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // ─── Header ───────────────────────────────────────────────
  doc.setFillColor(9, 13, 22);
  doc.rect(0, 0, pageWidth, 35, 'F');

  doc.setTextColor(0, 242, 254);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('NEXSUS CYBERLAW', pageWidth / 2, 14, { align: 'center' });

  doc.setTextColor(200, 220, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Cyber Crime Complaint / FIR Draft — For Official Submission', pageWidth / 2, 21, { align: 'center' });
  doc.text('nexsus.luckyverse.tech | National Cyber Crime Helpline: 1930', pageWidth / 2, 27, { align: 'center' });

  y = 42;

  // ─── Document Title ────────────────────────────────────────
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('CYBER CRIME COMPLAINT / FIRST INFORMATION REPORT', pageWidth / 2, y, { align: 'center' });
  y += 6;

  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}  |  Ref: NEXSUS-${Date.now().toString(36).toUpperCase()}`, pageWidth / 2, y + 4, { align: 'center' });

  y += 14;

  // ─── Disclaimer Box ────────────────────────────────────────
  doc.setFillColor(255, 248, 220);
  doc.setDrawColor(245, 158, 11);
  doc.roundedRect(margin, y, contentWidth, 14, 2, 2, 'FD');
  doc.setFontSize(8);
  doc.setTextColor(120, 80, 0);
  doc.setFont('helvetica', 'bold');
  doc.text('⚠  LEGAL DISCLAIMER:', margin + 4, y + 5);
  doc.setFont('helvetica', 'normal');
  doc.text('This document is an educational draft prepared by Nexsus CyberLaw. Please review with a qualified advocate before filing.', margin + 4, y + 10);

  y += 20;

  // ─── Section: Complainant Details ─────────────────────────
  const addSection = (title, fields) => {
    doc.setFillColor(13, 17, 23);
    doc.rect(margin, y, contentWidth, 8, 'F');
    doc.setTextColor(0, 242, 254);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(title.toUpperCase(), margin + 4, y + 5.5);
    y += 12;

    doc.setTextColor(30, 30, 30);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);

    fields.forEach(([label, value]) => {
      if (!value) return;
      doc.setFont('helvetica', 'bold');
      doc.text(`${label}:`, margin + 2, y);
      doc.setFont('helvetica', 'normal');
      const lines = doc.splitTextToSize(String(value), contentWidth - 50);
      doc.text(lines, margin + 50, y);
      y += lines.length * 5.5 + 2;
    });

    y += 4;
  };

  addSection('PART I — COMPLAINANT / VICTIM DETAILS', [
    ['Full Name', formData.complainantName],
    ['Father / Spouse Name', formData.fatherName],
    ['Date of Birth', formData.dob],
    ['Mobile Number', formData.mobile],
    ['Email Address', formData.email],
    ['Residential Address', formData.address],
    ['State', formData.state],
    ['Aadhaar (Last 4)', formData.aadhaarLast4 ? `XXXX-XXXX-${formData.aadhaarLast4}` : 'Not Provided'],
  ]);

  addSection('PART II — INCIDENT DESCRIPTION', [
    ['Type of Offence', formData.offenceType],
    ['Applicable Act(s)', formData.applicableActs],
    ['Applicable Section(s)', formData.sections],
    ['Date of Incident', formData.incidentDate],
    ['Time of Incident', formData.incidentTime],
    ['Platform / Website', formData.platform],
    ['Description', formData.description],
  ]);

  addSection('PART III — EVIDENCE & DIGITAL FORENSICS', [
    ['Evidence Available', formData.evidence],
    ['SHA-256 Hash (if computed)', formData.sha256Hash],
    ['Screenshots Attached', formData.screenshots ? 'Yes' : 'No'],
    ['Bank Transaction IDs', formData.transactionIds],
    ['Accused Information', formData.accusedInfo],
    ['Witnesses', formData.witnesses],
  ]);

  addSection('PART IV — RELIEFS SOUGHT', [
    ['Criminal Action', `FIR registration under ${formData.sections || 'applicable sections'} of ${formData.applicableActs || 'IT Act 2000/2008'}`],
    ['Civil Relief', formData.civilRelief || 'Compensation for loss/damages caused'],
    ['Interim Relief', formData.interimRelief || 'Freeze of accused accounts / Takedown of content'],
    ['Reporting Authority', formData.reportingAuthority || 'Cyber Crime Police Station & CERT-In'],
  ]);

  // ─── Applicable Law Summary ────────────────────────────────
  doc.setFillColor(13, 17, 23);
  doc.rect(margin, y, contentWidth, 8, 'F');
  doc.setTextColor(0, 242, 254);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('PART V — APPLICABLE LAW SUMMARY', margin + 4, y + 5.5);
  y += 14;

  const lawSummaries = {
    'Identity Theft': 'IT Act Sec 66C: Dishonest use of electronic signature/password. Penalty: 3 Years + ₹1L Fine.',
    'Phishing / Fraud': 'IT Act Sec 66D: Cheating by personation using computer resource. Penalty: 3 Years + ₹1L Fine.',
    'Hacking / Unauthorised Access': 'IT Act Sec 43 (Civil) + Sec 66 (Criminal). Civil: up to ₹1 Crore. Criminal: 3 Years + ₹5L Fine.',
    'Voyeurism / Non-Consensual Images': 'IT Act Sec 66E: Violation of privacy. Penalty: 3 Years + ₹2L Fine.',
    'Cyber Terrorism / CII Attack': 'IT Act Sec 66F: Penalty — Life Imprisonment.',
    'Data Breach / DPDP Violation': 'IT Act Sec 43A + DPDP Act Sec 33. Penalty: up to ₹250 Crore.',
    'Cyber Stalking / Harassment': 'BNS Sec 78 + IT Act Sec 67. Penalty: 3–5 Years + Fine.',
    'Obscene Content': 'IT Act Sec 67/67A. Penalty: 5 Years + ₹10L Fine.',
    'Ransomware / Malware': 'IT Act Sec 43 + 66 + 66F. Mandatory CERT-In report within 6 hours.',
  };

  const selectedLaw = lawSummaries[formData.offenceType] || 'Please consult Section 43, 66, 66C, 66D, 66E, 66F, 67 of IT Act 2000/2008 as applicable.';
  doc.setFontSize(9);
  doc.setTextColor(30, 30, 30);
  doc.setFont('helvetica', 'normal');
  const lawLines = doc.splitTextToSize(selectedLaw, contentWidth - 4);
  doc.text(lawLines, margin + 2, y);
  y += lawLines.length * 5.5 + 6;

  // ─── BSA Section 65B Note ──────────────────────────────────
  doc.setFillColor(230, 255, 250);
  doc.setDrawColor(16, 185, 129);
  doc.roundedRect(margin, y, contentWidth, 22, 2, 2, 'FD');
  doc.setTextColor(0, 80, 50);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('BSA Section 65B — Electronic Evidence Certificate Requirement:', margin + 4, y + 6);
  doc.setFont('helvetica', 'normal');
  const bsaNote = 'All digital evidence (screenshots, logs, emails) must be accompanied by a Section 65B certificate from the custodian of the computer system. The certificate must include: (1) SHA-256/MD5 hash of the evidence, (2) system description, (3) period of regular use, (4) proper functioning attestation. Failure to provide this certificate will render electronic evidence inadmissible.';
  const bsaLines = doc.splitTextToSize(bsaNote, contentWidth - 8);
  doc.text(bsaLines, margin + 4, y + 12);
  y += 28;

  // ─── Signature Block ───────────────────────────────────────
  if (y + 40 > pageHeight - margin) {
    doc.addPage();
    y = margin;
  }

  doc.setDrawColor(200, 200, 200);
  doc.line(margin, y + 20, margin + 60, y + 20);
  doc.line(pageWidth - margin - 60, y + 20, pageWidth - margin, y + 20);

  doc.setFontSize(9);
  doc.setTextColor(80, 80, 80);
  doc.text('Complainant\'s Signature', margin, y + 25);
  doc.text('Date & Place', pageWidth - margin - 60, y + 25);

  y += 35;

  // ─── Footer ───────────────────────────────────────────────
  doc.setFillColor(9, 13, 22);
  doc.rect(0, pageHeight - 14, pageWidth, 14, 'F');
  doc.setTextColor(100, 150, 200);
  doc.setFontSize(7.5);
  doc.text('Nexsus CyberLaw | nexsus.luckyverse.tech | National Cyber Crime Helpline: 1930 | cybercrime.gov.in', pageWidth / 2, pageHeight - 6, { align: 'center' });
  doc.text(`Page 1 | Generated by Nexsus CyberLaw FIR Builder | ${new Date().toISOString()}`, pageWidth / 2, pageHeight - 2, { align: 'center' });

  // ─── Save ──────────────────────────────────────────────────
  const fileName = `NexsusCyberLaw_FIR_${formData.complainantName?.replace(/\s+/g, '_') || 'Complaint'}_${Date.now()}.pdf`;
  doc.save(fileName);

  return fileName;
}

/**
 * Generate Chain of Custody PDF for forensic evidence
 */
export function generateChainOfCustodyPDF(evidenceData) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  doc.setFillColor(9, 13, 22);
  doc.rect(0, 0, pageWidth, 30, 'F');
  doc.setTextColor(0, 242, 254);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('CHAIN OF CUSTODY CERTIFICATE', pageWidth / 2, 14, { align: 'center' });
  doc.setFontSize(8);
  doc.setTextColor(200, 220, 255);
  doc.text('BSA Section 65B — Electronic Evidence Integrity Certificate', pageWidth / 2, 22, { align: 'center' });

  y = 38;

  const addField = (label, value) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(30, 30, 30);
    doc.text(`${label}:`, margin, y);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(String(value || 'N/A'), contentWidth - 50);
    doc.text(lines, margin + 50, y);
    y += lines.length * 5.5 + 3;
  };

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('EVIDENCE IDENTIFICATION', margin, y);
  doc.setDrawColor(0, 242, 254);
  doc.line(margin, y + 2, margin + contentWidth, y + 2);
  y += 10;

  addField('Evidence Label', evidenceData.label || 'Digital Evidence Item #1');
  addField('Evidence Type', evidenceData.type || 'Electronic Record');
  addField('Capture Timestamp', evidenceData.timestamp || new Date().toISOString());
  addField('Custodian', evidenceData.custodian || 'Investigating Officer');
  addField('Computer System', evidenceData.system || 'Described separately');

  y += 5;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('CRYPTOGRAPHIC INTEGRITY VERIFICATION', margin, y);
  doc.line(margin, y + 2, margin + contentWidth, y + 2);
  y += 10;

  doc.setFillColor(0, 20, 10);
  doc.rect(margin, y, contentWidth, 30, 'F');
  doc.setTextColor(0, 242, 254);
  doc.setFont('courier', 'bold');
  doc.setFontSize(8);
  doc.text('SHA-256 HASH (Original Evidence):', margin + 4, y + 8);
  doc.setTextColor(0, 255, 150);
  doc.text(evidenceData.sha256 || '[Hash not computed]', margin + 4, y + 14, { maxWidth: contentWidth - 8 });
  doc.setTextColor(0, 242, 254);
  doc.text('MD5 HASH (Legacy Reference):', margin + 4, y + 22);
  doc.setTextColor(0, 255, 150);
  doc.text(evidenceData.md5 || '[Hash not computed]', margin + 4, y + 28, { maxWidth: contentWidth - 8 });
  y += 36;

  doc.setTextColor(30, 30, 30);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  const cert = 'I hereby certify that: (1) The electronic record was produced by the computer system described above during regular use; (2) The computer was functioning properly at the time; (3) The information was derived from data regularly supplied to the computer; (4) The hash values listed above represent the cryptographic digest of the original unmodified evidence; (5) Any modification to this evidence will result in a different hash, immediately detectable.';
  const certLines = doc.splitTextToSize(cert, contentWidth);
  doc.text(certLines, margin, y);
  y += certLines.length * 5 + 15;

  doc.line(margin, y, margin + 60, y);
  doc.text('Authorized Signatory', margin, y + 5);
  doc.text(`Date: ${new Date().toLocaleDateString('en-IN')}`, margin + 100, y + 5);

  doc.save(`ChainOfCustody_BSA65B_${Date.now()}.pdf`);
}
