import React from 'react';

const BillingInformation = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Billing Information Page</h2>
      <img src={require('./upi.jpg')} alt="Billing Information" style={{ width: 200, height: 200 }} />

      <p>UPI ID: 7702072637@ybl</p>
      <p>Scan and pay for the completion of billing process</p>
    </div>
  );
};

export default BillingInformation;
