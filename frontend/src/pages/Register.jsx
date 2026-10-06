import React from 'react';
import RegistrationForm from '../components/RegistrationForm.jsx';

// Register Page Component - Student registration form page
function Register({ setCurrentPage }) {
  return (
    <div className="container">
      <section className="bs-section" id="registration">
        <h2>Student Registration</h2>
        <p>Fields marked with <strong>*</strong> are required.</p>
        <RegistrationForm onSubmitSuccess={() => setCurrentPage('submitted')} />
      </section>
    </div>
  );
}

export default Register;
