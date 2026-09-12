// api/verify-payment.js
// Verifies Razorpay one-time order payment signature
// HMAC input for orders: order_id + "|" + payment_id

import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {};

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({
      success: false,
      message: 'Missing razorpay_order_id, razorpay_payment_id, or razorpay_signature.',
    });
  }

  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) {
    console.error('Missing RAZORPAY_KEY_SECRET');
    return res.status(500).json({ success: false, message: 'Payment service is not configured.' });
  }

  const generated = crypto
    .createHmac('sha256', secret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (generated === razorpay_signature) {
    return res.status(200).json({ success: true, message: 'Payment verified successfully.' });
  }

  return res.status(400).json({ success: false, message: 'Payment signature verification failed.' });
}
