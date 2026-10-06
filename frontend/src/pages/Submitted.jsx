import React from 'react';

// Submitted Page Component - Form submission confirmation page
function Submitted({ setCurrentPage }) {
  return (
    <div className="container">
      <section className="bs-section text-center" style={{ padding: '40px 20px' }}>
        <div className="alert alert-success" style={{ fontSize: '18px', marginBottom: '25px' }}>
          <strong>Success!</strong> Your form has been submitted.
        </div>
        <h2>Thank You for Registering!</h2>
        <p>We have received your registration details. Our career guidance team will get back to you soon.</p>
        <div style={{ marginTop: '25px' }}>
          <button className="btn btn-primary" onClick={() => setCurrentPage('home')}>
            Back to Home
          </button>
          <button className="btn btn-default" style={{ marginLeft: '10px' }} onClick={() => setCurrentPage('jobs')}>
            Browse Jobs
          </button>
        </div>
      </section>
    </div>
  );
}

export default Submitted;
