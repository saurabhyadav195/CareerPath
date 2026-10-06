const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// Express Middleware
app.use(cors()); // Allow cross-origin requests from React frontend
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true }));

// Serve static frontend build if present
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Mount API routes
app.use('/api', apiRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.send('CareerPath Express API Server is running.');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
