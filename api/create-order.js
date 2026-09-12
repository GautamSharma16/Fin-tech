// api/create-order.js
// Creates a one-time Razorpay order for ₹699

import Razorpay from 'razorpay';

const AMOUNT_PAISE = 69900; // ₹699 in paise
const CURRENCY = 'INR';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { name, email, phone, applicationId, submissionId } = req.body || {};

  if (!name || !email || !phone) {
    return res.status(400).json({ success: false, message: 'name, email, and phone are required.' });
  }

  const keyId     = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    console.error('Missing RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET');
    return res.status(500).json({ success: false, message: 'Payment service is not configured.' });
  }

  const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

  try {
    const order = await razorpay.orders.create({
      amount:   AMOUNT_PAISE,
      currency: CURRENCY,
      receipt:  submissionId || `rcpt_${Date.now()}`,
      notes: {
        applicantName: name,
        email,
        phone,
        applicationId: applicationId || '',
        submissionId:  submissionId  || '',
        service:       'Credvia Care — Financial Assistance',
      },
    });

    return res.status(200).json({
      success:  true,
      key_id:   keyId,
      order_id: order.id,
      amount:   order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error('Razorpay order creation failed:', error);
    return res.status(500).json({ success: false, message: error.message || 'Failed to create payment order.' });
  }
}
