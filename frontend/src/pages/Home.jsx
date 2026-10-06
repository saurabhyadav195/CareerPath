import React, { useState } from 'react';
import CareerCard from '../components/CareerCard.jsx';

// Home Page Component - Renders banner, about, and career categories with React state
function Home({ setCurrentPage }) {
  const [selectedCategory, setSelectedCategory] = useState({
    title: '',
    description: ''
  });

  const categories = [
    {
      id: 'dev',
      icon: '💻',
      title: 'Software Development',
      description: 'Build software applications and systems.'
    },
    {
      id: 'ds',
      icon: '📊',
      title: 'Data Science',
      description: 'Analyze data and build predictive models.'
    },
    {
      id: 'cs',
      icon: '🔒',
      title: 'Cyber Security',
      description: 'Protect systems and networks from threats.'
    }
  ];

  const handleCategorySelect = (title, description) => {
    const detailedDescriptions = {
      'Software Development': 'Explore software development and programming careers.',
      'Data Science': 'Explore careers involving data analysis and machine learning.',
      'Cyber Security': 'Explore careers in security and network protection.'
    };
    setSelectedCategory({
      title,
      description: detailedDescriptions[title] || description
    });
  };

  return (
    <div className="container">
      {/* Welcome Banner */}
      <div
        className="alert alert-info"
        style={{ marginTop: '15px', marginBottom: '15px' }}
      >
        Welcome to CareerPath! Explore career categories, job listings, and guidance resources below.
      </div>

      {/* Hero Section */}
      <section className="bs-section" id="hero-section">
        <div className="row">
          <div className="col-xs-12 col-sm-5 col-md-5">
            <img
              src="/images/banner.jpg"
              alt="Career Guidance Banner"
              className="img-responsive hero-banner-img"
            />
          </div>
          <div className="col-xs-12 col-sm-7 col-md-7">
            <div className="hero-text-bs">
              <h2>Find Your Dream Career</h2>
              <p>Find jobs, improve your skills, and prepare for your career.</p>
              <div className="hero-btn-group">
                <button
                  className="btn btn-danger"
                  onClick={() => setCurrentPage('jobs')}
                >
                  Browse Jobs
                </button>
                <button
                  className="btn btn-default"
                  onClick={() => setCurrentPage('register')}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bs-section" id="about">
        <h2>About CareerPath</h2>
        <p>CareerPath helps students explore job opportunities and career resources.</p>
      </section>

      {/* Career Categories Section */}
      <section className="bs-section" id="categories">
        <h2>Career Categories</h2>

        {/* Selected Category Alert Message */}
        {selectedCategory.title && (
          <div className="alert alert-info" style={{ marginTop: '12px' }}>
            <strong>{selectedCategory.title}:</strong> {selectedCategory.description}
          </div>
        )}

        <div className="row" style={{ marginTop: '12px' }}>
          {categories.map((cat) => (
            <CareerCard
              key={cat.id}
              icon={cat.icon}
              title={cat.title}
              description={cat.description}
              isSelected={selectedCategory.title === cat.title}
              onSelect={handleCategorySelect}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
