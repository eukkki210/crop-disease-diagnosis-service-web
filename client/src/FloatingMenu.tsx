import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp, faMoon, faUserMd } from '@fortawesome/free-solid-svg-icons';
import './FloatingMenu.css';

const FloatingMenu: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.body.classList.remove('dark-mode');
    } else {
      document.body.classList.add('dark-mode');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToDiagnosis = () => {
    navigate('/diagnosis');
  };

  return (
    <div className="floating-menu">
      <button onClick={scrollToTop} className="icon-button">
        <FontAwesomeIcon icon={faArrowAltCircleUp} />
      </button>
      <button onClick={toggleDarkMode} className="icon-button">
        <FontAwesomeIcon icon={faMoon} />
      </button>
      <button onClick={navigateToDiagnosis} className="icon-button">
        <FontAwesomeIcon icon={faUserMd} />
      </button>
    </div>
  );
}

export default FloatingMenu;
