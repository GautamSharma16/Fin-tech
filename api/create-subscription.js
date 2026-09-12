import Razorpay from 'razorpay';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, phone, applicationId, submissionId } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({ message: 'Razorpay keys are not configured' });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // 1. Create a customer in Razorpay
    const customer = await razorpay.customers.create({
      name,
      email,
      contact: phone,
      fail_existing: 0 // Return existing customer if email/contact matches
    });

    // 2. Create a subscription
    // Assuming a plan ID for ₹699/month is configured in Razorpay dashboard
    // We will use a placeholder plan ID 'plan_XXX' that should be in ENV
    const plan_id = process.env.RAZORPAY_PLAN_ID;

    if (!plan_id) {
      return res.status(500).json({ message: 'Razorpay plan is not configured' });
    }

    const subscription = await razorpay.subscriptions.create({
      plan_id: plan_id,
      customer_id: customer.id,
      total_count: 120, // max 10 years
      customer_notify: 1,
      notes: {
        applicationId: applicationId || '',
        submissionId: submissionId || '',
      },
    });

    return res.status(200).json({
      key_id: process.env.RAZORPAY_KEY_ID,
      subscription_id: subscription.id,
      customer_id: customer.id,
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    return res.status(500).json({ message: 'Failed to create subscription', error: error.message });
  }
}
