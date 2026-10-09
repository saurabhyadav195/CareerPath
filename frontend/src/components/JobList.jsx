import React, { useState, useEffect } from 'react';

const API = 'http://localhost:5000/api/jobs';

const emptyForm = { title: '', company: '', location: '', qualification: '', salary: '' };

// JobList Component - Displays jobs from MySQL with CRUD operations
function JobList({ setCurrentPage }) {
  const [jobs, setJobs]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [message, setMessage]   = useState('');
  const [form, setForm]         = useState(emptyForm);
  const [editId, setEditId]     = useState(null);   // null = Add mode, number = Edit mode
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all jobs from MySQL
  const fetchJobs = () => {
    setLoading(true);
    fetch(API)
      .then((res) => res.json())
      .then((data) => { setJobs(data); setLoading(false); })
      .catch(() => { setMessage('Error: Could not connect to server.'); setLoading(false); });
  };

  useEffect(() => { fetchJobs(); }, []);

  // Handle form field changes
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Submit form — Add or Update
  const handleSubmit = (e) => {
    e.preventDefault();
    const method = editId ? 'PUT' : 'POST';
    const url    = editId ? `${API}/${editId}` : API;

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message || data.error);
        setForm(emptyForm);
        setEditId(null);
        fetchJobs();
      })
      .catch(() => setMessage('Error: Could not save job.'));
  };

  // Load job into form for editing
  const handleEdit = (job) => {
    setForm({ title: job.title, company: job.company, location: job.location, qualification: job.qualification, salary: job.salary });
    setEditId(job.id);
    setMessage('');
  };

  // Delete a job
  const handleDelete = (id) => {
    if (!window.confirm('Delete this job?')) return;
    fetch(`${API}/${id}`, { method: 'DELETE' })
      .then((res) => res.json())
      .then((data) => { setMessage(data.message || data.error); fetchJobs(); })
      .catch(() => setMessage('Error: Could not delete job.'));
  };

  // Cancel edit — back to Add mode
  const handleCancel = () => { setForm(emptyForm); setEditId(null); setMessage(''); };

  // Filter jobs by search
  const filteredJobs = jobs.filter((job) => {
    const q = searchQuery.toLowerCase();
    return job.title.toLowerCase().includes(q) || job.company.toLowerCase().includes(q) || job.location.toLowerCase().includes(q);
  });

  return (
    <div>
      {/* ── Message Banner ── */}
      {message && (
        <div className={`alert ${message.startsWith('Error') ? 'alert-danger' : 'alert-success'}`} style={{ marginTop: '10px' }}>
          {message}
          <button type="button" className="close" style={{ float: 'right', background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer' }} onClick={() => setMessage('')}>×</button>
        </div>
      )}

      {/* ── Add / Edit Job Form ── */}
      <div className="panel panel-default" style={{ marginTop: '15px' }}>
        <div className="panel-heading">
          <strong>{editId ? '✏️ Edit Job' : '➕ Add New Job'}</strong>
        </div>
        <div className="panel-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              {['title', 'company', 'location', 'qualification', 'salary'].map((field) => (
                <div className="col-xs-12 col-sm-6 col-md-4" key={field} style={{ marginBottom: '8px' }}>
                  <input
                    type="text"
                    name={field}
                    className="form-control"
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={form[field]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
              <div className="col-xs-12 col-sm-6 col-md-4" style={{ marginBottom: '8px' }}>
                <button type="submit" className="btn btn-primary" style={{ marginRight: '8px' }}>
                  {editId ? 'Update Job' : 'Add Job'}
                </button>
                {editId && (
                  <button type="button" className="btn btn-default" onClick={handleCancel}>
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* ── Search ── */}
      <div className="row" style={{ marginBottom: '10px' }}>
        <div className="col-xs-12 col-sm-6 col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title, company, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* ── Jobs Table ── */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover jobs-table-bs">
          <caption>Job Openings — fetched from MySQL</caption>
          <thead>
            <tr>
              <th>#</th>
              <th>Job Title</th>
              <th>Company</th>
              <th>Location</th>
              <th>Qualification</th>
              <th>Salary (per month)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" className="text-center">Loading jobs from MySQL...</td></tr>
            ) : filteredJobs.length === 0 ? (
              <tr><td colSpan="7" className="text-center">No jobs found.</td></tr>
            ) : (
              filteredJobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.id}</td>
                  <td>{job.title}</td>
                  <td>{job.company}</td>
                  <td>{job.location}</td>
                  <td>{job.qualification}</td>
                  <td>{job.salary}</td>
                  <td>
                    <button className="btn btn-xs btn-warning" style={{ marginRight: '4px' }} onClick={() => handleEdit(job)}>Edit</button>
                    <button className="btn btn-xs btn-danger" onClick={() => handleDelete(job.id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default JobList;
