const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes/api');
const jobRoutes = require('./routes/jobs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend build if present
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Mount routes
app.use('/api/jobs', jobRoutes);   // MySQL CRUD routes for jobs
app.use('/api', apiRoutes);         // Other routes (resources, register)

// Health check
app.get('/', (req, res) => {
  res.send('CareerPath Express API Server is running.');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
