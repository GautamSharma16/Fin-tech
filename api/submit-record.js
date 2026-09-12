const defaultEmail = 'khantanzeel321@gmail.com';

async function postJson(url, payload, headers = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed with status ${response.status}`);
  }

  return response;
}

async function recordInGoogleSheet(record) {
  if (!process.env.GOOGLE_SHEET_WEBHOOK_URL) {
    return { skipped: true, reason: 'GOOGLE_SHEET_WEBHOOK_URL is not configured' };
  }

  await postJson(process.env.GOOGLE_SHEET_WEBHOOK_URL, record, {
    ...(process.env.GOOGLE_SHEET_WEBHOOK_SECRET
      ? { Authorization: `Bearer ${process.env.GOOGLE_SHEET_WEBHOOK_SECRET}` }
      : {}),
  });

  return { skipped: false };
}

async function sendLeadEmail(record) {
  if (record.type !== 'lead') return { skipped: true };

  const selectedPlan = record.selectedPlan || 'your selected plan';
  const to = record.email;
  const subject = `Thank You for Showing Interest in ${selectedPlan}`;
  const text = `Thank you for showing interest in ${selectedPlan}.\n\nOur team will call you shortly.`;

  if (process.env.RESEND_API_KEY) {
    await postJson(
      'https://api.resend.com/emails',
      {
        from: process.env.MAIL_FROM || `Credvia Financial Services <${defaultEmail}>`,
        to,
        subject,
        text,
      },
      { Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
    );
    return { skipped: false, provider: 'resend' };
  }

  if (process.env.EMAIL_WEBHOOK_URL) {
    await postJson(process.env.EMAIL_WEBHOOK_URL, { to, subject, text, record }, {
      ...(process.env.EMAIL_WEBHOOK_SECRET
        ? { Authorization: `Bearer ${process.env.EMAIL_WEBHOOK_SECRET}` }
        : {}),
    });
    return { skipped: false, provider: 'webhook' };
  }

  return { skipped: true, reason: 'No email provider configured' };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { type, payload = {}, submissionId, payment = null, status = 'submitted' } = req.body || {};

    if (!submissionId || !['lead', 'application'].includes(type)) {
      return res.status(400).json({ message: 'Invalid submission payload' });
    }

    if (type === 'lead' && (!payload.fullName || !payload.mobile || !payload.email || !payload.selectedPlan)) {
      return res.status(400).json({ message: 'Missing required lead fields' });
    }

    const record = {
      submissionId,
      type,
      status,
      submittedAt: new Date().toISOString(),
      source: payload.source || 'website',
      ...payload,
      payment,
    };

    const sheet = await recordInGoogleSheet(record);
    const email = await sendLeadEmail(record);

    return res.status(200).json({ success: true, sheet, email });
  } catch (error) {
    console.error('Submission processing failed:', error);
    return res.status(500).json({ success: false, message: 'Submission processing failed', error: error.message });
  }
}
