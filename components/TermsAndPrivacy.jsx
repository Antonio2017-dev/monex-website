import React from 'react';

function TermsAndPrivacy({ onBack }) {
  return (
    <div>
      <h2>Terms & Privacy Policy</h2>
      <p>Welcome to Monex. Please read these terms carefully...</p>
      <h3>1. Use of Platform</h3>
      <p>You agree to use Monex for legal purposes only...</p>
      <h3>2. Privacy</h3>
      <p>We respect your privacy. Your data is never sold...</p>
      <h3>3. Security</h3>
      <p>Keep your password secure. Do not share your login...</p>

      <button
        onClick={onBack}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#2F80ED',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Back
      </button>
    </div>
  );
}

export default TermsAndPrivacy;
