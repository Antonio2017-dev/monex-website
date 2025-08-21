import React from 'react';
import './WelcomePage.css';
import monexLogo from '../assets/monex-logo.png';

function WelcomePage({ currentUser, onLogout }) {
  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <header className="welcome-header">
          <img src={monexLogo} alt="Monex Logo" className="welcome-logo" />
          <h1>Welcome, {currentUser?.firstName || 'User'}!</h1>
          <p className="welcome-subtext">You are now securely logged into Monex</p>
        </header>

        <div className="dashboard-preview">
          <h2>Account Overview</h2>
          <p><strong>Current Balance:</strong> $0</p>
          <p><strong>Last Login:</strong> 1 minute ago</p>
        </div>

        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default WelcomePage;
