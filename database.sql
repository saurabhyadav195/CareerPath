-- ============================================
-- CareerPath - Practical No. 8
-- MySQL Database Setup
-- ============================================

-- Step 1: Create the database
CREATE DATABASE IF NOT EXISTS careerpath_db;

-- Step 2: Select the database
USE careerpath_db;

-- Step 3: Create the jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  title        VARCHAR(100) NOT NULL,
  company      VARCHAR(100) NOT NULL,
  location     VARCHAR(100) NOT NULL,
  qualification VARCHAR(150) NOT NULL,
  salary       VARCHAR(100) NOT NULL
);

-- Step 4: Insert sample job records
INSERT INTO jobs (title, company, location, qualification, salary) VALUES
('Software Developer', 'TCS',            'Pune',      'B.E. / B.Tech (CS/IT)',   'Rs. 35,000 - 50,000'),
('Data Analyst',       'Infosys',        'Bangalore', 'B.Sc. / BCA / B.Tech',    'Rs. 30,000 - 45,000'),
('Web Designer',       'Wipro',          'Mumbai',    'Any Graduate (IT)',        'Rs. 25,000 - 40,000'),
('HR Executive',       'HCL Technologies','Hyderabad','MBA (HR) / BBA',           'Rs. 20,000 - 30,000'),
('Network Engineer',   'Tech Mahindra',  'Chennai',   'B.E. / B.Tech (IT/ECE)',  'Rs. 28,000 - 42,000');
