// api/submit-to-sheets.js
// Submits form data to Google Sheets via Apps Script Web App

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const sheetUrl = process.env.GOOGLE_SHEET_URL;
  if (!sheetUrl || sheetUrl.includes('YOUR_SCRIPT_ID')) {
    // Not configured yet — skip silently, don't block payment
    return res.status(200).json({ success: true, message: 'Sheet not configured, skipped.' });
  }

  const payload = req.body || {};

  try {
    const response = await fetch(sheetUrl, {
      method:  'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        timestamp:         new Date().toISOString(),
        applicationId:     payload.applicationId     || '',
        submissionId:      payload.submissionId      || '',
        applicantName:     payload.applicantName     || '',
        dob:               payload.dob               || '',
        mobile:            payload.mobile            || '',
        pan:               payload.pan               || '',
        aadhar:            payload.aadhar            || '',
        fatherName:        payload.fatherName        || '',
        motherName:        payload.motherName        || '',
        spouseName:        payload.spouseName        || '',
        education:         payload.education         || '',
        email:             payload.email             || '',
        officeEmail:       payload.officeEmail       || '',
        address:           payload.address           || '',
        residenceLandline: payload.residenceLandline || '',
        residenceType:     payload.residenceType     || '',
        yearsAtResidence:  payload.yearsAtResidence  || '',
        permanentAddress:  payload.permanentAddress  || '',
        permanentMobile:   payload.permanentMobile   || '',
        companyName:       payload.companyName       || '',
        officeAddress:     payload.officeAddress     || '',
        officialLandline:  payload.officialLandline  || '',
        officialEmail:     payload.officialEmail     || '',
        occupationType:    payload.occupationType    || '',
        yearsAtJob:        payload.yearsAtJob        || '',
        department:        payload.department        || '',
        designation:       payload.designation       || '',
        previousOrg:       payload.previousOrganisation || '',
        bankName:          payload.bankName          || '',
        accountNo:         payload.accountNo         || '',
        branchName:        payload.branchName        || '',
        paymentStatus:     payload.paymentStatus     || 'pending',
        razorpayOrderId:   payload.razorpayOrderId   || '',
        razorpayPaymentId: payload.razorpayPaymentId || '',
        amount:            '699',
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Google Sheets submission failed:', text);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    // Non-blocking — payment can still proceed
    return res.status(200).json({ success: false, message: 'Sheet error, payment can continue.' });
  }
}
