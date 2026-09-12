// api/submit-lead.js
// Saves lead form data (Get Details popup) to Google Sheets

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const sheetUrl = process.env.GOOGLE_LEAD_SHEET_URL;
  if (!sheetUrl || sheetUrl.includes('YOUR_LEAD_SCRIPT_ID')) {
    // Not configured yet — skip silently
    return res.status(200).json({ success: true, message: 'Lead sheet not configured, skipped.' });
  }

  const { fullName, mobile, email, selectedPlan, source } = req.body || {};

  try {
    const response = await fetch(sheetUrl, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        timestamp:    new Date().toISOString(),
        fullName:     fullName     || '',
        mobile:       mobile       || '',
        email:        email        || '',
        selectedPlan: selectedPlan || '',
        source:       source       || 'loan-card-modal',
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Lead sheet submission failed:', text);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error submitting lead to sheet:', error);
    return res.status(200).json({ success: false, message: 'Lead sheet error.' });
  }
}
