import React from 'react';

// Navbar Component - Renders navigation bar using Bootstrap 3 layout and React state
function Navbar({ currentPage, setCurrentPage }) {
  return (
    <nav className="navbar navbar-default navbar-static-top" role="navigation">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#main-navbar"
            aria-expanded="false"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a
            className="navbar-brand"
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage('home');
            }}
          >
            <img
              src="/images/logo.png"
              alt="CareerPath Logo"
              style={{
                height: '30px',
                width: 'auto',
                display: 'inline-block',
                verticalAlign: 'middle',
                marginRight: '8px'
              }}
            />
            CareerPath
          </a>
        </div>

        <div className="collapse navbar-collapse" id="main-navbar">
          <ul className="nav navbar-nav navbar-right">
            <li className={currentPage === 'home' ? 'active' : ''}>
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage('home');
                }}
              >
                Home
              </a>
            </li>
            <li className={currentPage === 'jobs' ? 'active' : ''}>
              <a
                href="#jobs"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage('jobs');
                }}
              >
                Job Listings
              </a>
            </li>
            <li className={currentPage === 'resources' ? 'active' : ''}>
              <a
                href="#resources"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage('resources');
                }}
              >
                Career Resources
              </a>
            </li>
            <li className={currentPage === 'register' ? 'active' : ''}>
              <a
                href="#register"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage('register');
                }}
              >
                Register
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
