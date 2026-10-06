import React, { useState, useEffect } from 'react';

// Resources Page Component - Renders career gallery, video tips, audio guides, and API resource list
function Resources() {
  const [apiResources, setApiResources] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/resources')
      .then((res) => res.json())
      .then((data) => setApiResources(data))
      .catch((err) => console.error('Error fetching resources API:', err));
  }, []);

  const galleryItems = [
    { id: 1, title: 'Group Discussion', img: '/images/career1.jpg' },
    { id: 2, title: 'Campus Placement', img: '/images/career2.jpg' },
    { id: 3, title: 'Resume Workshop', img: '/images/career3.jpg' },
    { id: 4, title: 'Interview Preparation', img: '/images/career4.jpg' }
  ];

  return (
    <div className="container">
      {/* Gallery Section */}
      <section className="bs-section" id="gallery">
        <h2>Career Gallery</h2>
        <div className="row" style={{ marginTop: '12px' }}>
          {galleryItems.map((item) => (
            <div key={item.id} className="col-xs-12 col-sm-6 col-md-3">
              <div className="gallery-item">
                <img src={item.img} alt={item.title} className="img-responsive" />
                <p>{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Online Resources API Section */}
      {apiResources.length > 0 && (
        <section className="bs-section" id="api-resources">
          <h2>Learning & Prep Resources</h2>
          <ul className="list-group" style={{ marginTop: '12px' }}>
            {apiResources.map((res) => (
              <li key={res.id} className="list-group-item d-flex justify-content-between align-items-center">
                <strong>{res.title}</strong>
                <span className="badge badge-primary">{res.type}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Videos Section */}
      <section className="bs-section" id="interview-video">
        <h2>Video Resources</h2>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div className="media-item">
              <h3>🎬 Interview Tips</h3>
              <video controls style={{ width: '100%', marginTop: '8px' }}>
                <source src="/video/interview-tips.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          <div className="col-xs-12 col-md-6">
            <div className="media-item">
              <h3>🎬 Resume Guide</h3>
              <video controls style={{ width: '100%', marginTop: '8px' }}>
                <source src="/video/resume-guide.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Audio Section */}
      <section className="bs-section" id="audio-resources">
        <h2>Motivation Audio</h2>
        <div className="media-item">
          <h3>🎧 Career Motivation</h3>
          <audio controls style={{ width: '100%', maxWidth: '480px', marginTop: '8px' }}>
            <source src="/audio/motivation.mp3" type="audio/mpeg" />
            Your browser does not support the audio tag.
          </audio>
        </div>
      </section>
    </div>
  );
}

export default Resources;
