const defaultInbox = 'khantanzeel321@gmail.com';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { name, email, body, extra = {} } = req.body || {};
  if (!email || !body) {
    return res.status(400).json({ success: false, message: 'Missing email payload' });
  }

  const subject = extra.subject || 'We received your Credvia enquiry';

  try {
    if (process.env.RESEND_API_KEY) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.MAIL_FROM || `Credvia Financial Services <${defaultInbox}>`,
          to: email,
          subject,
          text: body,
        }),
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Resend request failed');
      }
      return res.status(200).json({ success: true, provider: 'resend' });
    }

    return res.status(200).json({ success: true, skipped: true });
  } catch (error) {
    console.error('User notification email failed:', error);
    return res.status(200).json({ success: false, message: error.message });
  }
}
