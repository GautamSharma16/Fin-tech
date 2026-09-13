import React, { useState } from 'react';
import { notifyUser, postToSheet } from '../utils/formPipeline';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    serviceCategory: '',
    message: '',
    consentAgreement: false,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (formSubmitting) return;

    setFormSubmitting(true);
    try {
      await postToSheet(import.meta.env.VITE_LEAD_SHEET_URL, {
        timestamp: new Date().toISOString(),
        fullName: formData.fullName.trim(),
        mobile: formData.phoneNumber.trim(),
        email: formData.emailAddress.trim(),
        selectedPlan: formData.serviceCategory,
        message: formData.message.trim(),
        source: 'contact-us',
        sendConfirmationEmail: true,
        emailTo: formData.emailAddress.trim(),
        emailSubject: 'We received your Credvia enquiry',
      });
      notifyUser({
        name: formData.fullName.trim(),
        email: formData.emailAddress.trim(),
        type: 'contact',
        extra: {
          subject: 'We received your Credvia enquiry',
          summary: formData.message.trim() || `Service: ${formData.serviceCategory}`,
        },
      });
      setFormSubmitted(true);
    } catch {
      setFormSubmitted(true);
    } finally {
      setFormSubmitting(false);
    }
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: 'How quickly can I get loan approval after contacting Credvia?',
      a: 'For digital personal loans and pre-qualified applicants, conditional digital in-principle sanction is delivered in under 15 minutes. Disbursal into your verified bank account generally takes less than 4 to 24 business hours post document e-KYC.',
    },
    {
      q: 'What documents do I need for Credvia Financial Assistance?',
      a: 'You only need your registered Mobile Number and PAN card for instant digital retrieval of your credit profile. No physical paperwork, income certificates, or collateral records are needed for the initial credit advisory evaluation.',
    },
    {
      q: 'Is my financial and credit data protected with Credvia?',
      a: 'Yes, absolutely. Credvia Financial Services utilizes bank-grade 256-bit AES encryption across all customer transmission endpoints. As an authorised channel partner, we never share, monetize, or disclose customer credit reports to unauthorized third parties without explicit consent.',
    },
  ];

  return (
    <div className="w-full bg-surface">
      {/* Top Decorative Gradient Glow */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-gradient-to-b from-surface-container-high/60 via-secondary-container/10 to-transparent blur-3xl pointer-events-none -z-10"></div>
        {/* Hero / Header Section */}
        <div className="max-w-container-max mx-auto px-gutter-mobile md:px-gutter-tablet lg:px-gutter-desktop pt-space-2xl pb-space-xl">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            {/* Official Badge */}
            <div className="inline-flex items-center gap-space-2xs px-space-sm py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm uppercase tracking-wider mb-space-sm shadow-sm">
              <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse"></span>
              <span>WE ARE HERE TO HELP YOU</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight mb-space-xs">
              Have a question?{' '}
              <span className="text-primary-container underline decoration-secondary-fixed decoration-4 underline-offset-8">
                Let’s talk.
              </span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-space-xs">
              Our dedicated customer success officers and loan specialists are ready to answer your inquiries, assist with documentation, or discuss tailored credit solutions.
            </p>
            {/* Response Guarantee Quick Badge */}
            <div className="mt-space-md flex flex-wrap items-center justify-center gap-space-md text-on-surface-variant font-label-md text-label-md">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-base">timer</span>
                <span>
                  Avg Response: <strong className="text-primary">Under 120 Mins</strong>
                </span>
              </div>
              <span className="text-outline-variant hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-base">verified</span>
                <span>Authorised Channel Partner</span>
              </div>
              <span className="text-outline-variant hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-base">support_agent</span>
                <span>Dedicated Loan Officer Assigned</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interaction Zone (Two-Column Layout) */}
      <div className="max-w-container-max mx-auto px-gutter-mobile md:px-gutter-tablet lg:px-gutter-desktop pb-space-3xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          {/* Left Column: Modern Corporate Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl p-space-lg sm:p-space-xl shadow-sm border-0 relative">
            <div className="flex items-start justify-between gap-space-sm mb-space-md">
              <div>
                <span className="font-label-sm text-label-sm text-secondary font-bold tracking-wider uppercase">
                  Direct Dispatch Desk
                </span>
                <h2 className="font-headline-md text-headline-md text-primary mt-1">Send Us a Direct Message</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Fill out your details below and our team will get back to you within 2 business hours.
                </p>
              </div>
              <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-xl bg-surface-container-low text-primary shrink-0">
                <span className="material-symbols-outlined text-2xl">mark_email_read</span>
              </div>
            </div>

            <form className="flex flex-col gap-space-md" onSubmit={handleFormSubmit}>
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label
                  className="font-label-md text-label-md text-on-surface font-semibold flex items-center justify-between"
                  htmlFor="fullName"
                >
                  <span>
                    Full Name <span className="text-error">*</span>
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-normal">
                    As per PAN / Aadhaar
                  </span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-xl pointer-events-none">
                    person
                  </span>
                  <input
                    className="w-full h-[52px] pl-12 pr-4 bg-surface-container-low rounded-xl text-primary font-body-md text-body-md placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all"
                    id="fullName"
                    name="fullName"
                    placeholder="e.g. Rajesh Kumar"
                    required
                    type="text"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Dual Field: Phone & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                {/* Phone Number */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="phoneNumber">
                    Phone Number <span className="text-error">*</span>
                  </label>
                  <div className="flex h-[52px] rounded-xl bg-surface-container-low overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:bg-surface-container-lowest transition-all">
                    <div className="flex items-center gap-1 px-3.5 bg-surface-container-high text-primary font-label-md text-label-md font-bold select-none shrink-0">
                      <span>🇮🇳</span>
                      <span>+91</span>
                    </div>
                    <input
                      className="w-full px-3.5 bg-transparent text-primary font-body-md text-body-md placeholder:text-outline focus:outline-none"
                      id="phoneNumber"
                      maxLength="10"
                      name="phoneNumber"
                      pattern="[6-9][0-9]{9}"
                      placeholder="98765 43210"
                      required
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="emailAddress">
                    Email Address <span className="text-error">*</span>
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-xl pointer-events-none">
                      mail
                    </span>
                    <input
                      className="w-full h-[52px] pl-12 pr-4 bg-surface-container-low rounded-xl text-primary font-body-md text-body-md placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all"
                      id="emailAddress"
                      name="emailAddress"
                      placeholder="rajesh.kumar@example.com"
                      required
                      type="email"
                      value={formData.emailAddress}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* Select Service Dropdown */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="serviceCategory">
                  Select Requirement / Service <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-xl pointer-events-none">
                    category
                  </span>
                  <select
                    className="w-full h-[52px] pl-12 pr-10 bg-surface-container-low rounded-xl text-primary font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all appearance-none cursor-pointer"
                    id="serviceCategory"
                    name="serviceCategory"
                    required
                    value={formData.serviceCategory}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>
                      Choose a loan service or assistance category...
                    </option>
                    <option value="personal">Personal Loan (Instant Pre-Approved)</option>
                    <option value="business">Business Loan / MSME Working Capital</option>
                    <option value="credit-care">Credvia Care (Financial Assistance Audit)</option>
                    <option value="consumer">Consumer Durable Loan</option>
                    <option value="lap">Loan Against Property (LAP)</option>
                    <option value="grievance">Grievance / Existing Loan Support</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline text-xl pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Message Area */}
              <div className="flex flex-col gap-1.5">
                <label
                  className="font-label-md text-label-md text-on-surface font-semibold flex items-center justify-between"
                  htmlFor="messageBox"
                >
                  <span>Your Query or Message</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-normal">Optional</span>
                </label>
                <textarea
                  className="w-full p-4 bg-surface-container-low rounded-xl text-primary font-body-md text-body-md placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all resize-none"
                  id="messageBox"
                  name="message"
                  placeholder="Tell us about your requirement, desired loan amount, tenure preference, or specific questions..."
                  rows="4"
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              {/* Verification / Consent Checkbox */}
              <div className="flex items-start gap-space-xs pt-1">
                <input
                  className="mt-1 w-5 h-5 rounded accent-primary cursor-pointer shrink-0"
                  id="consentAgreement"
                  name="consentAgreement"
                  required
                  type="checkbox"
                  checked={formData.consentAgreement}
                  onChange={handleInputChange}
                />
                <label
                  className="font-body-sm text-body-sm text-on-surface-variant cursor-pointer select-none"
                  htmlFor="consentAgreement"
                >
                  I authorize <strong className="text-primary font-semibold">Credvia Financial Services</strong> to contact me via Call, SMS, or WhatsApp regarding my inquiry. I understand this overrides any NDNC registry preferences in accordance with RBI and TRAI guidelines.
                </label>
              </div>

              {/* Submit Button & SLA Notice */}
              <div className="pt-space-xs flex flex-col sm:flex-row items-center justify-between gap-space-md">
                <button
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-space-xl py-space-sm rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-lg text-label-lg font-extrabold hover:bg-secondary-fixed-dim active:scale-[0.99] transition-all shadow-[0_4px_16px_rgba(190,245,60,0.4)] cursor-pointer disabled:opacity-60"
                  type="submit"
                  disabled={formSubmitting || formSubmitted}
                >
                  <span>{formSubmitting ? 'Sending...' : formSubmitted ? 'Message Sent' : 'Send Message / Request Callback'}</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
                <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm text-center sm:text-left">
                  <span className="material-symbols-outlined text-secondary text-base shrink-0">speed</span>
                  <span>
                    Average response time: <strong className="text-primary font-semibold">Under 120 minutes</strong>
                  </span>
                </div>
              </div>

              {/* Form Feedback Toast Area */}
              {formSubmitted && (
                <div className="p-space-md bg-secondary-container rounded-xl text-on-secondary-fixed flex items-center gap-3 animate-fadeIn">
                  <span className="material-symbols-outlined text-2xl text-on-secondary-container">check_circle</span>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md font-bold text-on-secondary-container">
                      Inquiry Received Successfully!
                    </span>
                    <span className="font-body-sm text-body-sm text-on-secondary-fixed-variant">
                      A designated relationship manager has been assigned and will call you shortly.
                    </span>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Direct Contact & Office Details (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-space-lg">
            {/* Detailed Contact Cards Stack */}
            <div className="flex flex-col gap-space-sm">
              {/* Card 1: Phone Support */}
              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex items-start gap-space-md hover:bg-surface-container-low transition-colors">
                <div className="w-11 h-11 rounded-xl bg-surface-container-high text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-xl">phone_in_talk</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wide">
                    Customer Support Lines
                  </span>
                  <a className="font-title-md text-title-md font-bold text-primary hover:underline" href="tel:+918340421940">
                    +91 83404 21940
                  </a>
                  <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    Direct Helpdesk:{' '}
                    <a className="text-primary font-semibold hover:underline" href="tel:+915224001234">
                      +91 522 400 1234
                    </a>
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary font-medium mt-1">
                    Mon–Sat, 9:30 AM – 7:00 PM IST
                  </span>
                </div>
              </div>

              {/* Card 2: Email Support */}
              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex items-start gap-space-md hover:bg-surface-container-low transition-colors">
                <div className="w-11 h-11 rounded-xl bg-surface-container-high text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-xl">drafts</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wide">
                    Electronic Inquiries
                  </span>
                  <a className="font-label-lg text-label-lg font-bold text-primary hover:underline" href="mailto:khantanzeel321@gmail.com">
                    khantanzeel321@gmail.com
                  </a>
                  <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    Corporate:{' '}
                    <a className="text-primary hover:underline" href="mailto:khantanzeel321@gmail.com">
                      khantanzeel321@gmail.com
                    </a>
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                    Response guaranteed within 2 hours
                  </span>
                </div>
              </div>

              {/* Card 3: Registered Corporate Office */}
              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex items-start gap-space-md hover:bg-surface-container-low transition-colors">
                <div className="w-11 h-11 rounded-xl bg-surface-container-high text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-xl">corporate_fare</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wide">
                    Registered Corporate Headquarters
                  </span>
                  <span className="font-title-md text-title-md font-bold text-primary mt-0.5">
                    CREDVIA FINANCIAL SERVICES
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                    Building No./Flat No.: G/A-1, Dwarika Bhawan, <br />
                    Road/Street: Babu Raj Kumar Shriwastav Marg, <br />
                    Locality: Aliganj, City/District: Lucknow, <br />
                    State: Uttar Pradesh - PIN Code: 226024
                  </p>
                  <div className="mt-1 text-xs font-semibold text-primary">
                    GSTIN: <span className="font-mono bg-surface-container px-1.5 py-0.5 rounded">09DPOPA9703N1ZA</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-secondary"></span>
                    <span className="font-label-sm text-label-sm text-on-surface">
                      Monday to Saturday: 9:30 AM – 7:00 PM | Sunday: Closed
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Realistic Interactive Styled Map Placeholder */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col gap-space-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-xl">pin_drop</span>
                  <span className="font-title-md text-title-md font-bold text-primary">Headquarters Location</span>
                </div>
                <a
                  className="inline-flex items-center gap-1 font-label-sm text-label-sm font-bold text-primary hover:text-secondary transition-colors"
                  href="https://maps.google.com/?q=Aliganj+Lucknow+Uttar+Pradesh"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>Get Driving Directions</span>
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
              </div>

              {/* Styled Map Canvas Container */}
              <div
                className="w-full h-52 bg-cover bg-center rounded-xl relative overflow-hidden shadow-inner flex flex-col justify-between p-space-sm"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBSdn8t7o6go0Q-Sbhq-hsRj-JHmECq6pWrdzcMCzQZrL80h5r1VGh0AoVUK8Rg2LSKkIsDocZFYjz1wdkvnDQTaHs6RXKmDXrte5HZKjojcO8Qlp5NxSwq6WptkqmPGlXcrpoKgT1u-Y50MMvnce6-o0yCqJMv6gz7QN6J0u0AEudpjwcQsNhFGPF_CcOhUNynW7b6pIgmJ7SI2mjQTfXTmrGNhd9tMf4OQojOVJehdupzZ_bAP5lp')",
                }}
              >
                {/* Map overlay tag */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-lowest/90 backdrop-blur-md text-primary font-label-sm text-label-sm font-bold shadow-md self-start">
                  <span className="w-2.5 h-2.5 rounded-full bg-error"></span>
                  <span>Credvia Financial HQ (Aliganj, Lucknow)</span>
                </div>
                {/* Zoom Pill Controls */}
                <div className="self-end flex flex-col gap-1 bg-surface-container-lowest/90 backdrop-blur-md rounded-lg p-1 shadow-md">
                  <button
                    aria-label="Zoom in"
                    className="w-7 h-7 flex items-center justify-center rounded bg-surface-container-lowest hover:bg-surface-container text-primary font-bold"
                    type="button"
                  >
                    +
                  </button>
                  <button
                    aria-label="Zoom out"
                    className="w-7 h-7 flex items-center justify-center rounded bg-surface-container-lowest hover:bg-surface-container text-primary font-bold"
                    type="button"
                  >
                    −
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Accordion FAQs */}
      <div className="max-w-container-max mx-auto px-gutter-mobile md:px-gutter-tablet lg:px-gutter-desktop py-space-3xl w-full">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-space-xl">
          <span className="font-label-sm text-label-sm text-secondary font-bold tracking-wider uppercase">Got Questions?</span>
          <h2 className="font-headline-md text-headline-md text-primary mt-1">Frequently Asked Questions</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Quick clarity on our approval speeds, verification process, and consumer protection policies.
          </p>
        </div>
        <div className="max-w-3xl mx-auto flex flex-col gap-space-sm">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-surface-container-lowest rounded-xl p-space-md shadow-sm transition-all duration-200 cursor-pointer ${
                openFaq === index ? 'bg-surface-container-low' : ''
              }`}
              onClick={() => toggleFaq(index)}
            >
              <div className="flex items-center justify-between gap-space-sm">
                <h4 className="font-title-md text-title-md font-bold text-primary">{faq.q}</h4>
                <span
                  className="material-symbols-outlined text-primary text-2xl transition-transform duration-200"
                  style={{ transform: openFaq === index ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  expand_more
                </span>
              </div>
              {openFaq === index && (
                <div className="mt-space-sm pt-space-sm border-t border-surface-container font-body-md text-body-md text-on-surface-variant leading-relaxed animate-fadeIn">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
