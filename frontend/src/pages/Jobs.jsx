import React from 'react';
import JobList from '../components/JobList.jsx';

// Jobs Page Component - Renders job openings section with search filter
function Jobs({ setCurrentPage }) {
  return (
    <div className="container">
      <section className="bs-section" id="job-listings">
        <h2>Job Listings</h2>
        <p>
          Available job openings.{' '}
          <a
            href="#register"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage('register');
            }}
          >
            Register
          </a>{' '}
          to apply.
        </p>

        <JobList setCurrentPage={setCurrentPage} />
      </section>
    </div>
  );
}

export default Jobs;
