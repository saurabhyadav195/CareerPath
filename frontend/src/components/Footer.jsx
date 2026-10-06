import React from 'react';

// Footer Component - Renders footer navigation and dynamic current year
function Footer({ setCurrentPage }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 text-center">
            <p><strong>CareerPath</strong> &mdash; Career Guidance Portal</p>
            <div className="footer-links">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage('home');
                }}
              >
                Home
              </a>
              <a
                href="#jobs"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage('jobs');
                }}
              >
                Job Listings
              </a>
              <a
                href="#resources"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage('resources');
                }}
              >
                Career Resources
              </a>
              <a
                href="#register"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage('register');
                }}
              >
                Register
              </a>
            </div>
            <p>&copy; {currentYear} CareerPath. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
