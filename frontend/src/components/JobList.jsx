import React, { useState, useEffect } from 'react';

// JobList Component - Displays search input and filtered table of job openings fetched from API
function JobList({ setCurrentPage }) {
  const [jobsData, setJobsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch jobs list from Express backend API
  useEffect(() => {
    fetch('http://localhost:5000/api/jobs')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch jobs from server');
        }
        return res.json();
      })
      .then((data) => {
        setJobsData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching jobs:', err);
        setError('Unable to load jobs from server.');
        setLoading(false);
      });
  }, []);

  // Filter jobs based on user search query
  const filteredJobs = jobsData.filter((job) => {
    const query = searchQuery.toLowerCase().trim();
    return (
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query)
    );
  });

  return (
    <div>
      {/* Search Input Box */}
      <div className="row" style={{ marginTop: '15px', marginBottom: '15px' }}>
        <div className="col-xs-12 col-sm-6 col-md-4">
          <div className="form-group">
            <label htmlFor="job-search">Search Jobs:</label>
            <input
              type="text"
              id="job-search"
              className="form-control"
              placeholder="Search by title, company, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover jobs-table-bs">
          <caption>Job Openings - 2024</caption>
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th>Location</th>
              <th>Qualification</th>
              <th>Salary (per month)</th>
              <th>Apply Before</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center">
                  Loading jobs from server...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="6" className="text-center text-danger">
                  {error}
                </td>
              </tr>
            ) : filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.title}</td>
                  <td>{job.company}</td>
                  <td>{job.location}</td>
                  <td>{job.qualification}</td>
                  <td>{job.salary}</td>
                  <td>{job.deadline}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No matching jobs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default JobList;
