import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/weather">실시간 날씨</Link></li>
                <li><Link to="/market">마켓</Link></li>
                <li><Link to="/diary">작물 재배 일기</Link></li>
                <li><Link to="/diseapedia">질병 백과사전</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
