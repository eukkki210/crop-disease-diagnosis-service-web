import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="logo">
                <Link to="/">
                    <img src="/images/drss_logo.png" alt="Service Icon" />
                </Link>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <h1>Dr. 쑥쑥</h1>
                </Link>
            </div>
        </header>
    );
}

export default Header;
