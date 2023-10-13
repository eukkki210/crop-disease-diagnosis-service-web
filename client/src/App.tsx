import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';
import MainContent from './MainContent';
import Diagnosis from './Diagnosis';
import FloatingMenu from './FloatingMenu';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/diagnosis" element={<Diagnosis />} />
          {/* Add more routes for other features, e.g., market, crop diary, etc. */}
        </Routes>
        <FloatingMenu />
      </div>
    </Router>
  );
}

export default App;
