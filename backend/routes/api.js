const express = require('express');
const router = express.Router();

// Sample dummy data (3-5 jobs)
const jobsData = [
  {
    id: 1,
    title: 'Software Developer',
    company: 'TCS',
    location: 'Pune',
    qualification: 'B.E. / B.Tech (CS/IT)',
    salary: 'Rs. 35,000 - 50,000',
    deadline: '25 Aug 2024'
  },
  {
    id: 2,
    title: 'Data Analyst',
    company: 'Infosys',
    location: 'Bangalore',
    qualification: 'B.Sc. / BCA / B.Tech',
    salary: 'Rs. 30,000 - 45,000',
    deadline: '30 Aug 2024'
  },
  {
    id: 3,
    title: 'Web Designer',
    company: 'Wipro',
    location: 'Mumbai',
    qualification: 'Any Graduate (IT)',
    salary: 'Rs. 25,000 - 40,000',
    deadline: '15 Sep 2024'
  },
  {
    id: 4,
    title: 'HR Executive',
    company: 'HCL Technologies',
    location: 'Hyderabad',
    qualification: 'MBA (HR) / BBA',
    salary: 'Rs. 20,000 - 30,000',
    deadline: '10 Sep 2024'
  },
  {
    id: 5,
    title: 'Network Engineer',
    company: 'Tech Mahindra',
    location: 'Chennai',
    qualification: 'B.E. / B.Tech (IT/ECE)',
    salary: 'Rs. 28,000 - 42,000',
    deadline: '20 Sep 2024'
  }
];

// Sample dummy data for resources
const resourcesData = [
  { id: 1, title: 'Group Discussion Guide', type: 'Workshop' },
  { id: 2, title: 'Campus Placement Prep', type: 'Interview' },
  { id: 3, title: 'Resume Writing Tips', type: 'Guide' },
  { id: 4, title: 'Interview Q&A Cheatsheet', type: 'Reference' }
];

// GET /api/jobs - Return list of available jobs
router.get('/jobs', (req, res) => {
  res.json(jobsData);
});

// GET /api/resources - Return list of resources
router.get('/resources', (req, res) => {
  res.json(resourcesData);
});

// POST /api/register - Receive registration form data
router.post('/register', (req, res) => {
  const { fullName, email, phone, qualification, jobRole } = req.body;

  // Basic validation check
  if (!fullName || !email || !phone || !qualification || !jobRole) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed. All required fields must be provided.'
    });
  }

  console.log('--- New Student Registration Received ---');
  console.log('Name:', fullName);
  console.log('Email:', email);
  console.log('Phone:', phone);
  console.log('Qualification:', qualification);
  console.log('Preferred Job Role:', jobRole);
  console.log('-----------------------------------------');

  res.json({
    success: true,
    message: 'Student registration successfully received by server!',
    data: {
      fullName,
      email,
      jobRole
    }
  });
});

module.exports = router;
