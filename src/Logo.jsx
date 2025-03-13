import React from 'react';
import { useNavigate } from 'react-router-dom';
import s from './assets/Logos/s.png'; 
import './assets/Styles/Logo.css';

export default function Logo() {
  const navigate = useNavigate();

  return (
    <div className="logo-container" onClick={() => navigate('/customerhome')}>
      <img
        src={s} 
        alt="SalesSavvy Logo"
        className="logo-image"
        onError={(e) => { e.target.src = 'fallback-logo.png'; }} 
      />
      <span className="logo-text">SalesSavvy</span>
    </div>
  );
}
