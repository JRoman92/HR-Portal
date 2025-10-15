import React, { useState } from 'react';
import './Navigation.css';

const Navigation = ({ user, logout, activeTab, setActiveTab, tabs }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <span className="brand-icon">🏢</span>
          <span className="brand-text">HR Portal</span>
        </div>

        <button 
          className="mobile-menu-btn"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          ☰
        </button>

        <div className={`nav-menu ${showMobileMenu ? 'active' : ''}`}>
          <div className="nav-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(tab.id);
                  setShowMobileMenu(false);
                }}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="nav-user">
            <div className="user-info">
              <div className="user-avatar">
                {user.firstName?.[0]}{user.lastName?.[0]}
              </div>
              <div className="user-details">
                <span className="user-name">{user.firstName} {user.lastName}</span>
                <span className={`user-role badge badge-${user.role}`}>
                  {user.role === 'hr' ? 'HR Manager' : 'Employee'}
                </span>
              </div>
            </div>
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
