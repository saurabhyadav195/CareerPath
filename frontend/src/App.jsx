import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Jobs from './pages/Jobs.jsx';
import Resources from './pages/Resources.jsx';
import Register from './pages/Register.jsx';
import Submitted from './pages/Submitted.jsx';

// Main App Component - Manages current page state and layout
function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Render current page based on state
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'jobs':
        return <Jobs setCurrentPage={setCurrentPage} />;
      case 'resources':
        return <Resources />;
      case 'register':
        return <Register setCurrentPage={setCurrentPage} />;
      case 'submitted':
        return <Submitted setCurrentPage={setCurrentPage} />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="app-container">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main>{renderPage()}</main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default App;
