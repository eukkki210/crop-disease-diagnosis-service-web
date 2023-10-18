import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';
import Weather from './Weather';
import Diagnosis from './Diagnosis';
import Market from './Market'
import Diary from './Diary'
import Diseapedia from './Diseapedia'
import FloatingMenu from './FloatingMenu';
import './App.css';
import MainContent from './MainContent';
import DiseaseInfo from './DiseaseInfo';

function App() {
  return (
    <Router>
      <div className="App">
        <div className='Header-Navbar'>
          <Header />
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/diagnosis" element={<Diagnosis />} />
          <Route path="/disease/:disease" element={<DiseaseInfo />} />
          <Route path="/market" element={<Market />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/diseapedia" element={<Diseapedia />} />
        </Routes>
        <FloatingMenu />
      </div>
    </Router>
  );
}

export default App;
