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
  ChevronRight,
  CreditCard,
  FileCheck2,
  Landmark,
  Lock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Smartphone,
  UserRound,
  Wallet,
} from 'lucide-react';
import step1Image from '../assets/step1img.png';
import step2Image from '../assets/step2img.png';
import step3Image from '../assets/step3.png';
import step4Image from '../assets/step4img.png';
import './Subscribe.css';

const serviceAmount = 699;
const storageKey = 'credvia-care-application';
const steps = ['Personal Details', 'Employment Details', 'Bank Details', 'Review & Submit'];

const initialData = {
  applicantName: '', dob: '', mobile: '', pan: '', aadhar: '', fatherName: '', motherName: '',
  spouseName: '', education: '', email: '', officeEmail: '', address: '', residenceLandline: '',
  residenceType: '', yearsAtResidence: '', permanentAddress: '', permanentMobile: '', companyName: '',
  officeAddress: '', officialLandline: '', officialEmail: '', occupationType: '', yearsAtJob: '',
  department: '', designation: '', previousOrganisation: '', bankName: '', accountNo: '', branchName: '',
  confirmed: false,
};

const options = {
  education: ['10th', '12th', 'Diploma', 'Graduate', 'Post Graduate', 'Professional'],
  residenceType: ['Owned', 'Rented', 'Family Owned', 'Other'],
  yearsAtResidence: ['Less than 1 year', '1-2 years', '3-5 years', '5-10 years', '10+ years'],
  occupationType: ['Salaried', 'Self Employed', 'Business', 'Professional', 'Other'],
  yearsAtJob: ['Less than 1 year', '1-2 years', '3-5 years', '5-10 years', '10+ years'],
  bankName: ['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank', 'Kotak Mahindra Bank', 'Bank of Baroda', 'Yes Bank', 'IDFC FIRST Bank'],
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
  return errors;
}

function ApplicationPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [data, setData] = useState(readSavedData);
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [view, setView] = useState('form');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const applicationId = 'CRV-' + new Date().getFullYear() + '-1042';
  const paymentId = 'PAY-' + applicationId.slice(-4) + '81';

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(data));
  }, [data]);

  const update = (key, value) => {
    setData((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: '' }));
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

  const submitApplication = () => {
    const allErrors = { ...validateStep(1, data), ...validateStep(2, data), ...validateStep(3, data) };
    if (!data.confirmed) allErrors.confirmed = 'Please confirm the information before submitting.';
    if (Object.keys(allErrors).length) {
      setErrors(allErrors);
      if (Object.keys(validateStep(1, data)).length) setStep(1);
      else if (Object.keys(validateStep(2, data)).length) setStep(2);
      else if (Object.keys(validateStep(3, data)).length) setStep(3);
      return;
    }
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setView('payment');
    }, 900);
  };

  if (view === 'payment') {
    return <PaymentView amount={serviceAmount} applicationId={applicationId} method={paymentMethod} setMethod={setPaymentMethod} onPaid={() => setView('success')} />;
  }
  if (view === 'success') {
    return <SuccessView amount={serviceAmount} applicationId={applicationId} paymentId={paymentId} onStatus={() => navigate('/')} />;
  }

  const content = panelContent[step - 1];
  const progress = ((step - 1) / 3) * 100;

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
            return <div className={`progress-step ${number === step ? 'active' : ''} ${complete ? 'complete' : ''}`} key={label}>
              <span className="progress-node">{complete ? <Check size={15} /> : number}</span><span>{label}</span>
            </div>;
          })}
        </div>

        <div className="application-layout">
          <aside className="application-sidebar">
            <div className="panel-copy"><span className="panel-eyebrow">{content.eyebrow}</span><h2>{content.heading}</h2><p>{content.description}</p></div>
            <div className="benefit-list">
              {content.benefits.map(([title, description, Icon]) => <div className="benefit" key={title}><span className="benefit-icon"><Icon size={17} /></span><span><strong>{title}</strong><small>{description}</small></span></div>)}
            </div>
            <Illustration type={content.art} />
          </aside>

          <section className="application-card">
            {step < 4 ? <>
              <div className="card-heading"><span className="card-icon"><UserRound size={20} /></span><div><h2>{steps[step - 1]}</h2><p>{step === 1 ? 'Please provide your basic information.' : step === 2 ? 'Please provide your current employment information.' : 'Please provide your salary account information.'}</p></div><span className="mandatory">* All fields are mandatory</span></div>
              <div className="fields-grid">{fieldGroups[step].map(([label, key, type, Icon]) => <FormField key={key} label={label} name={key} type={type} icon={Icon} value={data[key]} error={errors[key]} options={options[key]} onChange={update} />)}</div>
              {step === 3 && <div className="security-box"><Lock size={18} /><span>Your banking information is encrypted and used only for application verification.</span></div>}
              <div className="form-actions"><button type="button" className="outline-button" onClick={step === 1 ? saveAndExit : () => { setStep(step - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{step === 1 ? (saved ? 'Progress Saved' : 'Save & Exit') : <><ArrowLeft size={16} /> Back: {steps[step - 2]}</>}</button><button type="button" className="solid-button" onClick={goNext}>{step === 3 ? 'Continue to Review' : `Next: ${steps[step]} `}<ArrowRight size={16} /></button></div>
            </> : <Review data={data} errors={errors} setStep={setStep} update={update} onSubmit={submitApplication} submitting={submitting} />}
          </section>
        </div>
      </div>
    </div>
  );
}

function FormField({ label, name, type, icon: Icon, value, error, options: fieldOptions, onChange }) {
  const control = type === 'select' ? <select value={value} onChange={(event) => onChange(name, event.target.value)}><option value="">Select {label.toLowerCase()}</option>{fieldOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select> : type === 'textarea' ? <textarea value={value} onChange={(event) => onChange(name, event.target.value)} placeholder={`Enter ${label.toLowerCase()}`} rows="3" /> : <input type={type} value={value} onChange={(event) => onChange(name, event.target.value)} placeholder={`Enter ${label.toLowerCase()}`} />;
  return <label className={`form-field ${error ? 'has-error' : ''}`}><span>{label} <b>*</b></span><div className="control"><Icon size={16} />{control}</div>{error && <small className="field-error">{error}</small>}</label>;
}

function Review({ data, errors, setStep, update, onSubmit, submitting }) {
  const sections = [
    ['Personal Details', UserRound, [['Applicant Name', data.applicantName], ['Mobile No', data.mobile], ['PAN', data.pan], ['Aadhaar', data.aadhar], ['Email', data.email], ['Residence Address', data.address]]],
    ['Employment Details', BriefcaseBusiness, [['Company Name', data.companyName], ['Occupation Type', data.occupationType], ['Designation', data.designation], ['Department', data.department], ['Office Address', data.officeAddress]]],
    ['Bank Details', Landmark, [['Bank Name', data.bankName], ['Account Number', `XXXX XXXX ${String(data.accountNo).slice(-4)}`], ['Branch Name', data.branchName]]],
  ];
  return <div className="review-content"><div className="card-heading"><span className="card-icon"><FileCheck2 size={20} /></span><div><h2>Review &amp; Submit</h2><p>Please review the details below before submitting.</p></div></div><div className="review-sections">{sections.map(([title, Icon, values], index) => <div className="review-section" key={title}><div className="review-section-head"><span><Icon size={17} />{title}<CheckCircle2 size={16} className="verified" /></span><button type="button" onClick={() => { setStep(index + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Edit</button></div><div className="review-values">{values.map(([label, value]) => <div key={label}><small>{label}</small><strong>{value || 'Not provided'}</strong></div>)}</div></div>)}</div><label className="confirm-line"><input type="checkbox" checked={data.confirmed} onChange={(event) => update('confirmed', event.target.checked)} /><span>I confirm that the information provided above is accurate and complete.</span></label>{errors.confirmed && <small className="field-error">{errors.confirmed}</small>}<div className="review-security"><Lock size={15} />Your information is protected using secure data handling practices.</div><div className="form-actions"><button type="button" className="outline-button" onClick={() => setStep(3)}><ArrowLeft size={16} /> Back: Bank Details</button><button type="button" className="solid-button" disabled={submitting} onClick={onSubmit}>{submitting ? 'Submitting your application...' : 'Submit Application'}<ArrowRight size={16} /></button></div></div>;
}

function Illustration({ type }) {
  const images = { personal: step1Image, work: step2Image, bank: step3Image, review: step4Image };
  return <div className={`illustration illustration-${type}`}><img className="illustration-image" src={images[type]} alt="" /></div>;
}

function PaymentView({ amount, applicationId, method, setMethod, onPaid }) {
  const [processing, setProcessing] = useState(false);
  const pay = () => { setProcessing(true); window.setTimeout(() => { setProcessing(false); onPaid(); }, 900); };
  return <div className="application-page payment-state"><div className="payment-layout"><div className="payment-copy"><span className="application-kicker">CREDVIA CARE / SECURE CHECKOUT</span><h1>Complete Your Payment</h1><p>Your application has been submitted successfully. Complete the payment to proceed with the next stage.</p><div className="payment-summary"><div><span>Application Status</span><strong>Application Submitted</strong></div><div><span>Application ID</span><strong>{applicationId}</strong></div><div><span>Payable Amount</span><strong>₹{amount.toLocaleString('en-IN')}</strong></div></div></div><div className="payment-card"><div className="payment-card-title"><span className="card-icon"><CreditCard size={20} /></span><h2>Secure Payment</h2></div><div className="pay-amount"><span>Credvia Care onboarding</span><strong>₹{amount.toLocaleString('en-IN')}</strong></div><div className="payment-methods">{['UPI', 'Credit / Debit Card', 'Net Banking', 'Wallets'].map((item) => <button type="button" className={method === item ? 'selected' : ''} onClick={() => setMethod(item)} key={item}>{item}</button>)}</div><button type="button" className="solid-button pay-button" onClick={pay} disabled={processing}>{processing ? 'Processing...' : 'Pay Securely'}<ArrowRight size={17} /></button><div className="secure-label"><Lock size={15} />100% Secure Payment</div><div className="payment-icons"><Smartphone size={18} /><CreditCard size={18} /><Wallet size={18} /><Banknote size={18} /></div></div></div></div>;
}

function SuccessView({ amount, applicationId, paymentId, onStatus }) {
  return <div className="application-page success-state"><div className="success-card"><div className="success-mark"><Check size={35} /></div><span className="application-kicker">CREDVIA CARE / CONFIRMED</span><h1>Payment Successful</h1><p>Your payment has been received successfully.</p><div className="success-details"><div><span>Application ID</span><strong>{applicationId}</strong></div><div><span>Payment ID</span><strong>{paymentId}</strong></div><div><span>Payment Status</span><strong>Paid</strong></div><div><span>Amount</span><strong>₹{amount.toLocaleString('en-IN')}</strong></div><div><span>Transaction Date</span><strong>{new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</strong></div></div><div className="success-actions"><button type="button" className="solid-button" onClick={onStatus}>View Application Status<ChevronRight size={17} /></button><button type="button" className="outline-button" onClick={onStatus}>Back to Dashboard</button></div></div></div>;
}

export default ApplicationPage;
