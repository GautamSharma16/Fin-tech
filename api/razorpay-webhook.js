import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers['x-razorpay-signature'];
    
    if (!signature) {
      return res.status(400).json({ message: 'Missing signature' });
    }

    // Verify webhook signature
    const generated_signature = crypto
      .createHmac('sha256', secret)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (generated_signature !== signature) {
      return res.status(400).json({ message: 'Invalid webhook signature' });
    }

    const event = req.body.event;
    const payload = req.body.payload;

    console.log(`Received webhook event: ${event}`);

    // In a real application, you would ensure idempotency here
    // by checking if this event ID was already processed in a database.

    if (event === 'subscription.charged') {
      const subscription = payload.subscription.entity;
      const payment = payload.payment.entity;
      
      // Here you would integrate with Google Sheets API or send an email to the admin
      // containing the customer and subscription details for Excel entry.
      console.log('Subscription charged successfully:', subscription.id);
      
      // Example placeholders for external API calls:
      // await addToGoogleSheet(subscription, payment);
      // await sendAdminNotificationEmail(subscription, payment);
      // await sendCustomerReceiptEmail(subscription, payment);
    } else if (event === 'subscription.cancelled') {
      // Handle cancellation
    }

    return res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ message: 'Webhook processing failed' });
  }
}
