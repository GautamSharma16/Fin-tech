import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import contactImg from '../assets/contact.png';

function ThankYou() {
  const [searchParams] = useSearchParams();
  const applicationId = searchParams.get('applicationId');

  return (
    <div className="application-page success-state">
      <div className="thank-you-card">
        <div className="thank-you-image">
          <img src={contactImg} alt="Credvia advisor support" />
        </div>
        <div className="thank-you-copy">
          <span className="application-kicker">CREDVIA CARE / CONFIRMED</span>
          <h1>Thank you</h1>
          <p className="thank-you-primary">Our team will contact you shortly.</p>
          <p>You will receive a confirmation mail.</p>
          {applicationId && (
            <div className="thank-you-reference">
              <span>Application ID</span>
              <strong>{applicationId}</strong>
            </div>
          )}
          <Link className="solid-button" to="/">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;
