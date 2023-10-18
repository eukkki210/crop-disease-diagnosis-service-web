import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MainContent.css'

const MainContent: React.FC = () => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const timer = setTimeout(() => {
            document.querySelector('.main-content')?.classList.add('show');
        }, 1000);
        return () => {
            clearTimeout(timer);
            document.body.style.overflow = 'auto';
        }
    }, []);

    return (
        <div className="main-content">
            <h1>Dr.쑥쑥으로 당신의 농작물을 더 스마트하게 지켜보세요!</h1>
            <p>
                Dr. 쑥쑥은 누구든지 할 수 있는 농작물 관리를 위한 플랫폼입니다.
            </p>
            <p>
                도시 농부를 위한 최고의 솔루션으로 당신의 농작물을 더 쉽고 편리하게 관리하고 키우세요.
            </p>
            <Link to="/diagnosis">
                <button>내 농작물 병해충 진단해보기</button>
            </Link>
        </div>
    );
};

export default MainContent;
