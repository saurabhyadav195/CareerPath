const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/jobs - Fetch all jobs from MySQL
router.get('/', (req, res) => {
  db.query('SELECT * FROM jobs', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET /api/jobs/:id - Fetch one job by ID
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM jobs WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Job not found' });
    res.json(results[0]);
  });
});

// POST /api/jobs - Add a new job
router.post('/', (req, res) => {
  const { title, company, location, qualification, salary } = req.body;
  if (!title || !company || !location || !qualification || !salary) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const sql = 'INSERT INTO jobs (title, company, location, qualification, salary) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [title, company, location, qualification, salary], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Job added successfully', id: result.insertId });
  });
});

// PUT /api/jobs/:id - Update an existing job
router.put('/:id', (req, res) => {
  const { title, company, location, qualification, salary } = req.body;
  const sql = 'UPDATE jobs SET title=?, company=?, location=?, qualification=?, salary=? WHERE id=?';
  db.query(sql, [title, company, location, qualification, salary, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Job not found' });
    res.json({ message: 'Job updated successfully' });
  });
});

// DELETE /api/jobs/:id - Delete a job
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM jobs WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Job not found' });
    res.json({ message: 'Job deleted successfully' });
  });
});

module.exports = router;
