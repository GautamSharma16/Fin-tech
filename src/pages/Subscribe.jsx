import React, { useState } from 'react';
import Button from '../components/Button';
import './Subscribe.css';

const Subscribe = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // 1. Create subscription on backend
      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message || 'Failed to create subscription');

      // 2. Load Razorpay checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Frontend exposed key
        subscription_id: data.subscription_id,
        name: 'Credvia Financial Services',
        description: 'Credvia Care Monthly Subscription',
        handler: async function (response) {
          try {
            // 3. Verify payment on backend
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_subscription_id: response.razorpay_subscription_id,
                razorpay_signature: response.razorpay_signature
              })
            });
            const verifyData = await verifyRes.json();
            
            if (verifyRes.ok) {
              alert('Subscription activated successfully! Confirmation sent to email.');
              window.location.href = '/';
            } else {
              alert('Payment verification failed: ' + verifyData.message);
            }
          } catch (err) {
            alert('Error verifying payment.');
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: '#001849'
        }
      };
      
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response){
        alert('Payment failed: ' + response.error.description);
      });
      rzp.open();
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="subscribe-page container py-space-3xl">
      <div className="subscribe-card max-w-lg mx-auto bg-surface-container-lowest p-space-xl rounded-2xl shadow-xl border border-surface-container">
        <h1 className="section-title text-headline-md font-bold text-primary text-center">Start Your Credvia Care</h1>
        <p className="section-subtitle text-body-md text-on-surface-variant text-center mb-space-lg">Complete Financial Assistance at ₹699/month</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubscribe} className="subscribe-form">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="name" required value={formData.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" required value={formData.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} />
          </div>
          
          <Button variant="primary" type="submit" disabled={isLoading} className="mt-md w-full">
            {isLoading ? 'Processing...' : 'Proceed to Payment (₹699/mo)'}
          </Button>
          
          <p className="disclaimer text-sm mt-md">
            By proceeding, you agree to a recurring monthly charge of ₹699. Service charges apply.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Subscribe;
