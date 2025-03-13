import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useravatar from './assets/Logos/useravatar.png'; 
import './assets/Styles/ProfileDropdown.css';

export function ProfileDropdown({ username }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); 

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:9090/api/auth/logout', {
        method: 'POST', 
        credentials: 'include', 
      });

      if (response.ok) {
        console.log('User successfully logged out');
        navigate('/');
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  const handleOrdersClick = () => {
    navigate('/orders'); 
  };
  return (
    <div className="profile-dropdown">
      <button className="profile-button" onClick={toggleDropdown}>
        <img
          src={useravatar}
          alt="User Avatar"
          className="user-avatar"
          onError={(e) => { e.target.src = 'fallback-logo.png'; }} 
        />
        <span className="username">{username || 'Guest'}</span>
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <a href="#">Profile</a>
          <a onClick={handleOrdersClick}>Orders</a>
          <button className="profile-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
