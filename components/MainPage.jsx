import React from 'react';
import './MainPage.css';
import monexLogo from '../assets/monex-logo.png';

function MainPage({ onRegisterClick, onLoginClick }) {
  return (
    <div className="main-container">
      <div className="main-content">
        <header className="main-header">
          <img src={monexLogo} alt="Monex Logo" className="main-logo" />
          <h1>Welcome to Monex</h1>
          <p className="main-tagline">Your simple & secure finance platform</p>
        </header>

        <div className="main-buttons">
          <button onClick={onRegisterClick}>Register</button>
          <button onClick={onLoginClick}>Login</button>
        </div>

        <footer className="main-footer">
          © 2025 Monex Inc. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default MainPage;
