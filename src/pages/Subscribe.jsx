import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  BriefcaseBusiness,
  Building2,
  Check,
  CheckCircle2,
  FileCheck2,
  IndianRupee,
  Landmark,
  Lock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from 'lucide-react';
import step1Image from '../assets/step1img.png';
import step2Image from '../assets/step2img.png';
import step3Image from '../assets/step3.png';
import step4Image from '../assets/step4img.png';
import { APPLICATION_SHEET_URL, applicationSheetPayload, postToSheet } from '../utils/formPipeline';
import './Subscribe.css';

const serviceAmount = 699;
const storageKey = 'credvia-care-application';
const steps = ['Personal Details', 'Employment Details', 'Bank Details', 'Review & Submit'];

const initialData = {
  applicantName: '', dob: '', mobile: '', pan: '', aadhar: '', fatherName: '', motherName: '',
  spouseName: '', education: '', email: '', officeEmail: '', address: '', residenceLandline: '',
  residenceType: '', yearsAtResidence: '', permanentAddress: '', permanentMobile: '', companyName: '',
  officeAddress: '', officialLandline: '', officialEmail: '', occupationType: '', yearsAtJob: '',
  department: '', designation: '', previousOrganisation: '', netMonthlyPay: '', bankName: '', otherBankName: '', accountNo: '', branchName: '',
  confirmed: false,
};

const options = {
  education: ['10th', '12th', 'Diploma', 'Graduate', 'Post Graduate', 'Professional'],
  residenceType: ['Owned', 'Rented', 'Family Owned', 'Other'],
  yearsAtResidence: ['Less than 1 year', '1-2 years', '3-5 years', '5-10 years', '10+ years'],
  occupationType: ['Salaried', 'Self Employed', 'Business', 'Professional', 'Other'],
  yearsAtJob: ['Less than 1 year', '1-2 years', '3-5 years', '5-10 years', '10+ years'],
  bankName: ['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank', 'Kotak Mahindra Bank', 'Bank of Baroda', 'Yes Bank', 'IDFC FIRST Bank', 'Other'],
};

const panelContent = [
  {
    eyebrow: 'STEP 1 OF 4', heading: "Let's get started",
    description: 'Tell us a little about yourself so we can understand your credit profile and financial goals.',
    benefits: [['CIBIL Profile Guidance', 'Understand the factors affecting your credit profile', ShieldCheck], ['Personalized Assessment', 'Get clarity on your current financial position', CheckCircle2], ['Expert Support', 'Speak with a personal financial advisor', UserRound]],
    art: 'personal',
  },
  {
    eyebrow: 'STEP 2 OF 4', heading: 'Tell us about your work',
    description: 'Your work profile helps us prepare a practical eligibility and borrowing-capacity assessment.',
    benefits: [['Eligibility Check', 'Understand which loan options may fit your profile', BriefcaseBusiness], ['Borrowing Capacity', 'Get guidance based on income and stability', CheckCircle2], ['Secure Information', 'Your financial details stay protected', ShieldCheck]],
    art: 'work',
  },
  {
    eyebrow: 'STEP 3 OF 4', heading: 'Add your bank details',
    description: 'Add your account details so our team can complete your documentation and lender-readiness review.',
    benefits: [['Documentation Check', 'Identify gaps before submitting an application', Landmark], ['Lender Readiness', 'Prepare a stronger, more complete profile', CheckCircle2], ['Protected Data', 'Your banking information stays confidential', Lock]],
    art: 'bank',
  },
  {
    eyebrow: 'STEP 4 OF 4', heading: 'Review your application',
    description: 'Review your details before we begin your Credvia Care consultation and guidance process.',
    benefits: [['Advisor Session', 'Get one-on-one financial guidance', CheckCircle2], ['Action Roadmap', 'Receive practical credit improvement next steps', ShieldCheck], ['Lender Recommendations', 'Explore suitable interest-rate options', FileCheck2]],
    art: 'review',
  },
];

const fieldGroups = {
  1: [
    ['Applicant Name', 'applicantName', 'text', UserRound], ['Applicant DOB', 'dob', 'date', UserRound],
    ['Mobile No', 'mobile', 'tel', Phone], ['PAN Card No', 'pan', 'text', FileCheck2],
    ['Aadhar Card No', 'aadhar', 'text', ShieldCheck], ["Father's Name", 'fatherName', 'text', UserRound],
    ["Mother's Name", 'motherName', 'text', UserRound], ['Spouse Name with DOB', 'spouseName', 'text', UserRound],
    ['Education (Qualification)', 'education', 'select', FileCheck2], ['Personal E-mail ID', 'email', 'email', Mail],
    ['Office Mail ID', 'officeEmail', 'email', Mail], ['Residence Address with Landmark', 'address', 'textarea', MapPin],
    ['Landline No. of Residence Address', 'residenceLandline', 'tel', Phone], ['Residence Type', 'residenceType', 'select', MapPin],
    ['No. of Years at Above Residence (Current Address)', 'yearsAtResidence', 'select', MapPin],
    ['Permanent Address with Landmark', 'permanentAddress', 'textarea', MapPin], ['Permanent Address Mobile No', 'permanentMobile', 'tel', Phone],
  ],
  2: [
    ['Company Name / Present Employer (If Salaried)', 'companyName', 'text', Building2], ['Office Address with Landmark', 'officeAddress', 'textarea', MapPin],
    ['Official Landline No', 'officialLandline', 'tel', Phone], ['Official E-mail ID', 'officialEmail', 'email', Mail],
    ['Occupation Type', 'occupationType', 'select', BriefcaseBusiness], ['No. of Years at Current Job', 'yearsAtJob', 'select', BriefcaseBusiness],
    ['Department', 'department', 'text', BriefcaseBusiness], ['Designation', 'designation', 'text', BriefcaseBusiness],
    ['Net Monthly Pay (Take-home salary)', 'netMonthlyPay', 'currency', IndianRupee],
    ['Name of Previous Organisation', 'previousOrganisation', 'text', Building2],
  ],
  3: [
    ['Salary Account Bank Name', 'bankName', 'select', Landmark], ['Bank A/C No.', 'accountNo', 'text', Banknote], ['Bank Branch Name', 'branchName', 'text', Landmark],
  ],
};

function readSavedData() {
  try {
    return { ...initialData, ...JSON.parse(localStorage.getItem(storageKey) || '{}') };
  } catch {
    return initialData;
  }
}

function validateStep(step, data) {
  const errors = {};
  fieldGroups[step].forEach(([, key]) => {
    if (!String(data[key] || '').trim()) errors[key] = 'This field is required.';
  });
  if (data.mobile && !/^\d{10}$/.test(data.mobile)) errors.mobile = 'Enter a valid 10-digit mobile number.';
  if (data.permanentMobile && !/^\d{10}$/.test(data.permanentMobile)) errors.permanentMobile = 'Enter a valid 10-digit mobile number.';
  if (data.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]$/i.test(data.pan)) errors.pan = 'Enter a valid PAN number.';
  if (data.aadhar && !/^\d{12}$/.test(data.aadhar)) errors.aadhar = 'Aadhaar must be 12 digits.';
  ['email', 'officeEmail', 'officialEmail'].forEach((key) => {
    if (data[key] && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data[key])) errors[key] = 'Enter a valid email address.';
  });
  if (data.netMonthlyPay && !/^\d+$/.test(String(data.netMonthlyPay))) errors.netMonthlyPay = 'Enter take-home salary in numbers only.';
  if (data.netMonthlyPay && Number(data.netMonthlyPay) < 1000) errors.netMonthlyPay = 'Enter a valid monthly take-home amount.';
  if (step === 3 && data.bankName === 'Other' && !String(data.otherBankName || '').trim()) {
    errors.otherBankName = 'Please enter your bank name.';
  }
  return errors;
}

function makeSubmissionId(prefix = 'CRV') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

function ApplicationPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [data, setData] = useState(readSavedData);
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [applicationId] = useState(() => makeSubmissionId(`CRV-${new Date().getFullYear()}`));
  const [submissionId] = useState(() => makeSubmissionId('APP'));

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(data));
  }, [data]);

  const update = (key, value) => {
    setData((current) => {
      const next = { ...current, [key]: value };
      if (key === 'bankName' && value !== 'Other') next.otherBankName = '';
      return next;
    });
    setErrors((current) => ({ ...current, [key]: '', ...(key === 'bankName' ? { otherBankName: '' } : {}) }));
  };

  const saveAndExit = () => {
    localStorage.setItem(storageKey, JSON.stringify(data));
    setSaved(true);
    window.setTimeout(() => navigate('/'), 700);
  };

  const goNext = () => {
    const nextErrors = validateStep(step, data);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setStep((current) => Math.min(current + 1, 4));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const saveApplicationToSheet = (paymentExtra = {}) => {
    const payload = applicationSheetPayload(data, {
      applicationId,
      submissionId,
      ...paymentExtra,
    });
    return postToSheet(APPLICATION_SHEET_URL, payload);
  };

  const submitApplication = async () => {
    const allErrors = {
      ...validateStep(1, data),
      ...validateStep(2, data),
      ...validateStep(3, data),
    };
    if (!data.confirmed) allErrors.confirmed = 'Please confirm the information before submitting.';
    if (Object.keys(allErrors).length) {
      setErrors(allErrors);
      if (Object.keys(validateStep(1, data)).length) setStep(1);
      else if (Object.keys(validateStep(2, data)).length) setStep(2);
      else if (Object.keys(validateStep(3, data)).length) setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setSubmitting(true);
    setSubmitError('');

    try {
      await saveApplicationToSheet({ paymentStatus: 'pending' });

      if (!window.Razorpay) {
        setSubmitting(false);
        setSubmitError('Your details are saved. Payment gateway could not be loaded — please refresh to pay, or our team will still follow up.');
        return;
      }

      // ── Create Razorpay one-time order ─────────────────────────────────────
      const orderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:          data.applicantName,
          email:         data.email,
          phone:         data.mobile,
          applicationId,
          submissionId,
        }),
      });
      const order = await orderRes.json();
      if (!orderRes.ok || !order.success) {
        throw new Error(order.message || 'Failed to create payment order. Please try again.');
      }

      // ── Step 3: Open Razorpay checkout ────────────────────────────────────
      const razorpay = new window.Razorpay({
        key:         order.key_id,
        order_id:    order.order_id,
        amount:      order.amount,
        currency:    order.currency,
        name:        'Credvia Financial Services',
        description: 'Credvia Care — One-Time Financial Assistance',
        prefill: {
          name:    data.applicantName,
          email:   data.email,
          contact: data.mobile,
        },
        notes: { applicationId, submissionId },
        theme: { color: '#001849' },
        modal: {
          ondismiss: () => {
            setSubmitting(false);
            setSubmitError('Payment was cancelled. Your application is already saved — our team will follow up, or you can pay again.');
          },
        },
        handler: async (response) => {
          // response = { razorpay_order_id, razorpay_payment_id, razorpay_signature }
          try {
            // ── Step 4: Verify payment signature ────────────────────────────
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(response),
            });
            const verified = await verifyRes.json();
            if (!verifyRes.ok || !verified.success) {
              throw new Error(verified.message || 'Payment verification failed. Please contact support.');
            }

            await saveApplicationToSheet({
              paymentStatus: 'paid',
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
            });

            // ── Step 6: Clear saved form data and redirect ───────────────────
            localStorage.removeItem(storageKey);
            navigate(
              `/thank-you?applicationId=${encodeURIComponent(applicationId)}&paymentId=${encodeURIComponent(response.razorpay_payment_id)}`
            );
          } catch (error) {
            setSubmitting(false);
            setSubmitError(error.message);
          }
        },
      });

      razorpay.on('payment.failed', (response) => {
        setSubmitting(false);
        setSubmitError(response.error?.description || 'Payment failed. Your details are already saved — please try paying again.');
      });

      razorpay.open();
    } catch (error) {
      setSubmitting(false);
      setSubmitError(error.message ? `${error.message} Your details are already saved.` : 'Payment could not start. Your details are already saved.');
    }
  };

  const content = panelContent[step - 1];
  const progress = ((step - 1) / 3) * 100;

  const goToStep = (number) => {
    if (number < step) {
      setStep(number);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="application-page">
      <div className="application-container">
        <div className="application-intro">
          <span className="application-kicker">CREDVIA CARE / FINANCIAL ASSISTANCE</span>
          <h1>Get clear guidance before you apply.</h1>
          <p>Complete your Credvia Care profile for credit diagnostics, eligibility guidance, documentation support, and a one-on-one advisor session.</p>
        </div>

        <div className="application-progress" aria-label="Application progress">
          <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
          {steps.map((label, index) => {
            const number = index + 1;
            const complete = number < step;
            return (
              <button
                type="button"
                className={`progress-step ${number === step ? 'active' : ''} ${complete ? 'complete' : ''}`}
                key={label}
                onClick={() => goToStep(number)}
                disabled={number > step}
              >
                <span className="progress-node">{complete ? <Check size={15} /> : number}</span>
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        <div className="application-layout">
          <aside className="application-sidebar" key={`side-${step}`}>
            <div className="panel-copy">
              <span className="panel-eyebrow">{content.eyebrow}</span>
              <h2>{content.heading}</h2>
              <p>{content.description}</p>
            </div>
            <div className="benefit-list">
              {content.benefits.map(([title, description, Icon]) => (
                <div className="benefit" key={title}>
                  <span className="benefit-icon"><Icon size={17} /></span>
                  <span><strong>{title}</strong><small>{description}</small></span>
                </div>
              ))}
            </div>
            <Illustration type={content.art} />
          </aside>

          <section className="application-card">
            {step < 4 ? (
              <div className="step-panel" key={step}>
                <div className="card-heading">
                  <span className="card-icon"><UserRound size={20} /></span>
                  <div>
                    <h2>{steps[step - 1]}</h2>
                    <p>
                      {step === 1 ? 'Please provide your basic information.'
                        : step === 2 ? 'Please provide your current employment information.'
                        : 'Please provide your salary account information.'}
                    </p>
                  </div>
                  <span className="mandatory">* All fields are mandatory</span>
                </div>
                <div className="fields-grid">
                  {fieldGroups[step].map(([label, key, type, Icon], index) => (
                    <React.Fragment key={key}>
                      <FormField
                        label={label}
                        name={key}
                        type={type}
                        icon={Icon}
                        value={data[key]}
                        error={errors[key]}
                        options={options[key]}
                        hint={key === 'netMonthlyPay' ? 'Salary credited to your account after PF, tax and other deductions.' : ''}
                        onChange={update}
                        delay={index}
                      />
                      {key === 'bankName' && data.bankName === 'Other' && (
                        <FormField
                          label="Enter your bank name"
                          name="otherBankName"
                          type="text"
                          icon={Landmark}
                          value={data.otherBankName}
                          error={errors.otherBankName}
                          onChange={update}
                          delay={index + 1}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
                {step === 3 && (
                  <div className="security-box">
                    <Lock size={18} />
                    <span>Your banking information is encrypted and used only for application verification.</span>
                  </div>
                )}
                <div className="form-actions">
                  <button type="button" className="outline-button" onClick={step === 1 ? saveAndExit : () => { setStep(step - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    {step === 1 ? (saved ? 'Progress Saved' : 'Save & Exit') : <><ArrowLeft size={16} /> Back: {steps[step - 2]}</>}
                  </button>
                  <button type="button" className="solid-button" onClick={goNext}>
                    {step === 3 ? 'Continue to Review' : `Next: ${steps[step]} `}<ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <Review
                data={data}
                errors={errors}
                setStep={setStep}
                update={update}
                onSubmit={submitApplication}
                submitting={submitting}
                submitError={submitError}
                amount={serviceAmount}
              />
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

function formatInrDigits(value) {
  const digits = String(value || '').replace(/\D/g, '');
  if (!digits) return '';
  return Number(digits).toLocaleString('en-IN');
}

function FormField({ label, name, type, icon: Icon, value, error, options: fieldOptions = [], onChange, delay = 0, hint = '' }) {
  const filled = Boolean(String(value || '').trim()) && !error;
  const control = type === 'select'
    ? <select value={value} onChange={(e) => onChange(name, e.target.value)}>
        <option value="">Select {label.toLowerCase()}</option>
        {fieldOptions.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    : type === 'textarea'
    ? <textarea value={value} onChange={(e) => onChange(name, e.target.value)} placeholder={`Enter ${label.toLowerCase()}`} rows="3" />
    : type === 'currency'
    ? (
      <>
        <span className="currency-prefix">₹</span>
        <input
          type="text"
          inputMode="numeric"
          value={formatInrDigits(value)}
          onChange={(e) => onChange(name, e.target.value.replace(/\D/g, ''))}
          placeholder="e.g. 45,000"
        />
      </>
    )
    : <input type={type} value={value} onChange={(e) => onChange(name, e.target.value)} placeholder={`Enter ${label.toLowerCase()}`} />;

  return (
    <label className={`form-field ${type === 'currency' ? 'form-field-currency' : ''} ${error ? 'has-error' : ''} ${filled ? 'is-filled' : ''}`} style={{ animationDelay: `${Math.min(delay, 12) * 40}ms` }}>
      <span>{label} <b>*</b></span>
      <div className="control"><Icon size={16} />{control}{filled && <CheckCircle2 size={16} className="field-ok" />}</div>
      {hint && !error && <small className="field-hint">{hint}</small>}
      {error && <small className="field-error">{error}</small>}
    </label>
  );
}

function Review({ data, errors, setStep, update, onSubmit, submitting, submitError, amount }) {
  const sections = [
    ['Personal Details', UserRound, [['Applicant Name', data.applicantName], ['Mobile No', data.mobile], ['PAN', data.pan], ['Aadhaar', data.aadhar], ['Email', data.email], ['Residence Address', data.address]]],
    ['Employment Details', BriefcaseBusiness, [['Company Name', data.companyName], ['Occupation Type', data.occupationType], ['Designation', data.designation], ['Department', data.department], ['Net Monthly Pay', data.netMonthlyPay ? `₹${Number(data.netMonthlyPay).toLocaleString('en-IN')}` : ''], ['Office Address', data.officeAddress]]],
    ['Bank Details', Landmark, [['Bank Name', data.bankName === 'Other' ? data.otherBankName : data.bankName], ['Account Number', `XXXX XXXX ${String(data.accountNo).slice(-4)}`], ['Branch Name', data.branchName]]],
  ];

  return (
    <div className="review-content step-panel">
      <div className="card-heading">
        <span className="card-icon"><FileCheck2 size={20} /></span>
        <div><h2>Review &amp; Submit</h2><p>Please review the details below before submitting.</p></div>
      </div>

      <div className="review-sections">
        {sections.map(([title, Icon, values], index) => (
          <div className="review-section" key={title}>
            <div className="review-section-head">
              <span><Icon size={17} />{title}<CheckCircle2 size={16} className="verified" /></span>
              <button type="button" onClick={() => { setStep(index + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Edit</button>
            </div>
            <div className="review-values">
              {values.map(([label, value]) => (
                <div key={label}><small>{label}</small><strong>{value || 'Not provided'}</strong></div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <label className="confirm-line">
        <input type="checkbox" checked={data.confirmed} onChange={(e) => update('confirmed', e.target.checked)} />
        <span>I confirm that the information provided above is accurate and complete.</span>
      </label>
      {errors.confirmed && <small className="field-error">{errors.confirmed}</small>}

      {submitError && <div className="payment-error">{submitError}</div>}

      <div className="form-actions">
        <button type="button" className="outline-button" onClick={() => { setStep(3); window.scrollTo({ top: 0, behavior: 'smooth' }); }} disabled={submitting}>
          <ArrowLeft size={16} /> Back: Bank Details
        </button>
        <button type="button" className="solid-button" disabled={submitting} onClick={onSubmit}>
          {submitting ? 'Processing...' : `Pay ₹${amount} & Submit`}<ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

function Illustration({ type }) {
  const images = { personal: step1Image, work: step2Image, bank: step3Image, review: step4Image };
  return <div className={`illustration illustration-${type}`}><img className="illustration-image" src={images[type]} alt="" /></div>;
}

export default ApplicationPage;
