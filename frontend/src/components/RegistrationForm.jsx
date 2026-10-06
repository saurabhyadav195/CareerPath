import React, { useState } from 'react';

// RegistrationForm Component - Form handling with basic React state & validation
function RegistrationForm({ onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    qualification: '',
    skills: '',
    jobRole: '',
    resume: null,
    message: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  // Universal change handler for inputs
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Form submit handler with validation logic and backend fetch
  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;

    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your Full Name.');
      return;
    }

    if (!formData.email.trim() || !emailPattern.test(formData.email.trim())) {
      setErrorMessage('Please enter a valid Email address.');
      return;
    }

    if (!formData.phone.trim() || !phonePattern.test(formData.phone.trim())) {
      setErrorMessage('Please enter a valid 10-digit Phone number.');
      return;
    }

    if (!formData.qualification) {
      setErrorMessage('Please select your Qualification.');
      return;
    }

    if (!formData.jobRole.trim()) {
      setErrorMessage('Please enter your Preferred Job Role.');
      return;
    }

    if (!formData.resume) {
      setErrorMessage('Please upload your Resume (PDF/DOC).');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    try {
      // Send POST request to backend API
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          qualification: formData.qualification,
          skills: formData.skills,
          jobRole: formData.jobRole,
          message: formData.message
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMessage(data.message || 'Registration successful!');
        if (onSubmitSuccess) {
          onSubmitSuccess(data);
        }
      } else {
        setErrorMessage(data.message || 'Registration failed on server.');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setErrorMessage('Server connection error. Please make sure backend is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Form reset handler
  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      qualification: '',
      skills: '',
      jobRole: '',
      resume: null,
      message: ''
    });
    setErrorMessage('');
    setSuccessMessage('');
  };

  return (
    <form onSubmit={handleSubmit} onReset={handleReset} novalidate="novalidate">
      <fieldset>
        <legend>Registration Form</legend>

        {/* Validation Error Message Box */}
        {errorMessage && (
          <div className="alert alert-danger" style={{ marginBottom: '15px' }}>
            {errorMessage}
          </div>
        )}

        {/* Success Message Box */}
        {successMessage && (
          <div className="alert alert-success" style={{ marginBottom: '15px' }}>
            {successMessage}
          </div>
        )}

        {/* Row 1: Full Name + Email */}
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label className="control-label" htmlFor="fullname">Full Name *</label>
              <input
                type="text"
                className="form-control"
                id="fullname"
                name="fullName"
                placeholder="Enter full name"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="control-label" htmlFor="email">Email *</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Row 2: Phone + Qualification */}
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label className="control-label" htmlFor="phone">Phone *</label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                placeholder="10-digit mobile number"
                maxLength="10"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="control-label" htmlFor="qualification">Qualification *</label>
              <select
                className="form-control"
                id="qualification"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
              >
                <option value="">-- Select --</option>
                <option value="ssc">SSC (10th)</option>
                <option value="hsc">HSC (12th)</option>
                <option value="diploma">Diploma</option>
                <option value="ug">Under Graduate (B.E./B.Tech/B.Sc.)</option>
                <option value="pg">Post Graduate (M.E./M.Tech/MBA)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Row 3: Skills + Preferred Job Role */}
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label className="control-label" htmlFor="skills">Skills</label>
              <input
                type="text"
                className="form-control"
                id="skills"
                name="skills"
                placeholder="e.g. HTML, CSS, Java"
                value={formData.skills}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="control-label" htmlFor="jobrole">Preferred Job Role *</label>
              <input
                type="text"
                className="form-control"
                id="jobrole"
                name="jobRole"
                placeholder="e.g. Software Developer"
                value={formData.jobRole}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Row 4: Resume Upload */}
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label className="control-label" htmlFor="resume">Upload Resume *</label>
              <input
                type="file"
                id="resume"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Row 5: Message */}
        <div className="row">
          <div className="col-xs-12">
            <div className="form-group">
              <label className="control-label" htmlFor="message">Message</label>
              <textarea
                className="form-control"
                id="message"
                name="message"
                rows="3"
                placeholder="Write a short message..."
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </div>
      </fieldset>

      {/* Buttons */}
      <div className="row">
        <div className="col-xs-12">
          <button type="submit" className="btn btn-primary" id="btn-submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
          <button
            type="reset"
            className="btn btn-default"
            id="btn-reset"
            style={{ marginLeft: '10px' }}
            disabled={isSubmitting}
          >
            Reset
          </button>
        </div>
      </div>
    </form>
  );
}

export default RegistrationForm;
