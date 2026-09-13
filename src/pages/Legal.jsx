import React from 'react';
import { Link } from 'react-router-dom';
import './Legal.css';

function LegalLayout({ kicker, title, updated, children }) {
  return (
    <div className="legal-page">
      <div className="legal-hero">
        <div className="legal-wrap">
          <span className="legal-kicker">{kicker}</span>
          <h1>{title}</h1>
          <p>Last updated: {updated}</p>
        </div>
      </div>
      <div className="legal-wrap legal-body">{children}</div>
    </div>
  );
}

export function PrivacyPolicy() {
  return (
    <LegalLayout kicker="Legal" title="Privacy Policy" updated="13 September 2026">
      <section>
        <h2>Who we are</h2>
        <p>Credvia Financial Services (“Credvia”, “we”, “us”) is an authorised channel partner and direct selling associate facilitating loan enquiries with RBI-regulated banks and NBFCs. We are not a bank or NBFC and do not lend from our own balance sheet.</p>
      </section>
      <section>
        <h2>Information we collect</h2>
        <p>When you use our website, enquiry forms, or Credvia Care application, we may collect your name, mobile number, email, residential and employment details, bank account information you choose to share, and the service you requested.</p>
      </section>
      <section>
        <h2>How we use your information</h2>
        <ul>
          <li>To respond to your enquiry and assign an advisor.</li>
          <li>To assess documentation readiness and share your profile with lenders you may choose to apply with.</li>
          <li>To send application and enquiry acknowledgements to your email.</li>
          <li>To improve our website and customer support.</li>
        </ul>
      </section>
      <section>
        <h2>Sharing</h2>
        <p>We do not sell your data. We share information only with authorised lending partners, payment processors (such as Razorpay) when you pay, and service providers needed to run our operations, under confidentiality obligations.</p>
      </section>
      <section>
        <h2>Security &amp; retention</h2>
        <p>We use reasonable technical and organisational measures to protect information in transit and at rest. We retain enquiry and application records as needed for follow-up, compliance, and dispute handling, then delete or anonymise them when no longer required.</p>
      </section>
      <section>
        <h2>Your choices</h2>
        <p>You may request access, correction, or deletion of your personal information by writing to <a href="mailto:khantanzeel321@gmail.com">khantanzeel321@gmail.com</a> or calling +91 83404 21940.</p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>CREDVIA FINANCIAL SERVICES, G/A-1, Dwarika Bhawan, Babu Raj Kumar Shriwastav Marg, Aliganj, Lucknow, Uttar Pradesh 226024. GSTIN: 09DPOPA9703N1ZA.</p>
        <p><Link to="/contact">Go to Contact Us</Link></p>
      </section>
    </LegalLayout>
  );
}

export function TermsConditions() {
  return (
    <LegalLayout kicker="Legal" title="Terms & Conditions" updated="13 September 2026">
      <section>
        <h2>Acceptance</h2>
        <p>By using this website, submitting an enquiry, or completing a Credvia Care application, you agree to these terms and our <Link to="/privacy">Privacy Policy</Link>.</p>
      </section>
      <section>
        <h2>Our role</h2>
        <p>Credvia is an authorised channel partner. We facilitate credit discovery, documentation guidance, and introductions to regulated lenders. Loan sanction, interest rates, fees, disbursal, and collections are decided solely by the lending partner.</p>
      </section>
      <section>
        <h2>Credvia Care fee</h2>
        <p>The ₹699 Credvia Care amount is a one-time facilitation and advisory fee. Submitting the form stores your application with us even if payment is not completed. Payment, when made, is processed securely through Razorpay. The fee is not a loan processing charge levied by a bank or NBFC unless a partner separately discloses its own charges.</p>
      </section>
      <section>
        <h2>Accuracy of information</h2>
        <p>You confirm that details you provide are true and complete. Incomplete or inaccurate information may delay or prevent lender consideration.</p>
      </section>
      <section>
        <h2>No guarantee of sanction</h2>
        <p>Eligibility, approval, and disbursal are not guaranteed. Any indication of possible loan amount or tenure is indicative only.</p>
      </section>
      <section>
        <h2>Communications</h2>
        <p>You authorise Credvia to contact you by call, SMS, WhatsApp, or email regarding your enquiry, including where you are registered on NDNC, to the extent permitted by applicable TRAI and other guidelines.</p>
      </section>
      <section>
        <h2>Limitation of liability</h2>
        <p>To the extent permitted by law, Credvia is not liable for lender decisions, delays, or losses arising from third-party systems, including payment gateways, except where caused by our wilful misconduct.</p>
      </section>
      <section>
        <h2>Governing law</h2>
        <p>These terms are governed by the laws of India. Courts at Lucknow, Uttar Pradesh shall have exclusive jurisdiction.</p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>Questions: <a href="mailto:khantanzeel321@gmail.com">khantanzeel321@gmail.com</a> · +91 83404 21940.</p>
      </section>
    </LegalLayout>
  );
}
