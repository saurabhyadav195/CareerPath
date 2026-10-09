const express = require('express');
const router = express.Router();

// Sample data for resources (not in DB for this practical)
const resourcesData = [
  { id: 1, title: 'Group Discussion Guide', type: 'Workshop' },
  { id: 2, title: 'Campus Placement Prep', type: 'Interview' },
  { id: 3, title: 'Resume Writing Tips', type: 'Guide' },
  { id: 4, title: 'Interview Q&A Cheatsheet', type: 'Reference' }
];

// GET /api/resources
router.get('/resources', (req, res) => {
  res.json(resourcesData);
});

// POST /api/register - Receive registration form data
router.post('/register', (req, res) => {
  const { fullName, email, phone, qualification, jobRole } = req.body;

  if (!fullName || !email || !phone || !qualification || !jobRole) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed. All required fields must be provided.'
    });
  }

  console.log('--- New Student Registration ---');
  console.log('Name:', fullName, '| Email:', email, '| Role:', jobRole);

  res.json({
    success: true,
    message: 'Student registration successfully received by server!',
    data: { fullName, email, jobRole }
  });
});

module.exports = router;
