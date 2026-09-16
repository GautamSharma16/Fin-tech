const companyInbox = 'khantanzeel321@gmail.com';

export function postToSheet(sheetUrl, payload) {
  if (!sheetUrl) return Promise.resolve();
  return fetch(sheetUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  }).catch(() => {});
}

export const APPLICATION_SHEET_URL =
  'https://script.google.com/macros/s/AKfycbyJaRcuEhlTvTBRP7ypvvkWoaKvu2a72VbnJ3_aTctl7CfMCC-Ih8Zyi0xadej9GWtT/exec';

function text(value) {
  return value == null ? '' : String(value).trim();
}

export function applicationSheetPayload(data, extra = {}) {
  return {
    timestamp: extra.timestamp || new Date().toISOString(),
    applicationId: text(extra.applicationId),
    submissionId: text(extra.submissionId),
    associateName: text(data.associateName),
    applicantName: text(data.applicantName),
    dob: text(data.dob),
    mobile: text(data.mobile),
    whatsappNumber: text(data.mobile),
    pan: text(data.pan),
    aadhar: text(data.aadhar),
    fatherName: text(data.fatherName),
    motherName: text(data.motherName),
    spouseName: text(data.spouseName),
    education: text(data.education),
    email: text(data.email),
    officeEmail: text(data.officeEmail),
    address: text(data.address),
    residenceLandline: text(data.residenceLandline),
    residenceType: text(data.residenceType),
    yearsAtResidence: text(data.yearsAtResidence),
    permanentAddress: text(data.permanentAddress),
    permanentMobile: text(data.permanentMobile),
    companyName: text(data.companyName),
    officeAddress: text(data.officeAddress),
    officialLandline: text(data.officialLandline),
    officialEmail: text(data.officialEmail),
    occupationType: text(data.occupationType),
    yearsAtJob: text(data.yearsAtJob),
    department: text(data.department),
    designation: text(data.designation),
    previousOrg: text(data.previousOrganisation),
    netPay: text(data.netMonthlyPay),
    bankName: data.bankName === 'Other' ? text(data.otherBankName) : text(data.bankName),
    accountNo: text(data.accountNo),
    branchName: text(data.branchName),
    paymentStatus: text(extra.paymentStatus) || 'pending',
    razorpayOrderId: text(extra.razorpayOrderId),
    razorpayPaymentId: text(extra.razorpayPaymentId),
    amount: text(extra.amount) || '699',
  };
}

const autoresponses = {
  lead: (name, extra) =>
    `Hi ${name},\n\nThank you for showing interest in ${extra.plan || 'Credvia'}. Our team will call you shortly to help with your enquiry.\n\n— Credvia Financial Services`,
  contact: (name) =>
    `Hi ${name},\n\nWe have received your message. A Credvia advisor will get back to you within 2 business hours.\n\n— Credvia Financial Services`,
  application: (name) =>
    `Hi ${name},\n\nYour Credvia Care application has been received. Our team will review your details and contact you shortly, even if payment is still pending.\n\n— Credvia Financial Services`,
};

export function notifyUser({ name, email, type, extra = {} }) {
  if (!email) return Promise.resolve();
  const displayName = name || 'there';
  const body = (autoresponses[type] || autoresponses.contact)(displayName, extra);

  const apiCall = fetch('/api/notify-user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: displayName, email, type, extra, body }),
  }).catch(() => {});

  const formsubmitCall = fetch(`https://formsubmit.co/ajax/${companyInbox}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      name: displayName,
      email,
      _subject: extra.subject || 'Credvia enquiry received',
      _template: 'table',
      _autoresponse: body,
      message: extra.summary || body,
      source: type,
    }),
  }).catch(() => {});

  return Promise.all([apiCall, formsubmitCall]);
}
