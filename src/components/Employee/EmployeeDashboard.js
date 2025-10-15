import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Navigation from '../Common/Navigation';
import ProfileManagement from './ProfileManagement';
import LeaveRequest from './LeaveRequest';
import MyLeaves from './MyLeaves';
import './EmployeeDashboard.css';

const EmployeeDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalLeaves: 0,
    pendingLeaves: 0,
    approvedLeaves: 0,
    rejectedLeaves: 0
  });

  useEffect(() => {
    calculateStats();
  }, [user]);

  const calculateStats = () => {
    const leaveRequests = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
    const myLeaves = leaveRequests.filter(l => l.employeeId === user.id);
    
    setStats({
      totalLeaves: myLeaves.length,
      pendingLeaves: myLeaves.filter(l => l.status === 'pending').length,
      approvedLeaves: myLeaves.filter(l => l.status === 'approved').length,
      rejectedLeaves: myLeaves.filter(l => l.status === 'rejected').length
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="overview-content">
            <h2>Welcome back, {user.firstName}!</h2>
            <p className="welcome-text">Here's an overview of your HR activities</p>
            
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#dbeafe' }}>
                  <span style={{ color: '#1e40af' }}>📋</span>
                </div>
                <div className="stat-info">
                  <h3>{stats.totalLeaves}</h3>
                  <p>Total Leave Requests</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#fef3c7' }}>
                  <span style={{ color: '#92400e' }}>⏳</span>
                </div>
                <div className="stat-info">
                  <h3>{stats.pendingLeaves}</h3>
                  <p>Pending Requests</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#d1fae5' }}>
                  <span style={{ color: '#065f46' }}>✓</span>
                </div>
                <div className="stat-info">
                  <h3>{stats.approvedLeaves}</h3>
                  <p>Approved Leaves</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#fee2e2' }}>
                  <span style={{ color: '#991b1b' }}>✗</span>
                </div>
                <div className="stat-info">
                  <h3>{stats.rejectedLeaves}</h3>
                  <p>Rejected Requests</p>
                </div>
              </div>
            </div>

            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <div className="action-buttons">
                <button className="btn btn-primary" onClick={() => setActiveTab('leave-request')}>
                  Request Leave
                </button>
                <button className="btn btn-primary" onClick={() => setActiveTab('my-leaves')}>
                  View My Leaves
                </button>
                <button className="btn btn-secondary" onClick={() => setActiveTab('profile')}>
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        );
      case 'profile':
        return <ProfileManagement />;
      case 'leave-request':
        return <LeaveRequest onSubmit={calculateStats} />;
      case 'my-leaves':
        return <MyLeaves onUpdate={calculateStats} />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <Navigation 
        user={user} 
        logout={logout}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={[
          { id: 'overview', label: 'Overview', icon: '📊' },
          { id: 'profile', label: 'My Profile', icon: '👤' },
          { id: 'leave-request', label: 'Request Leave', icon: '📝' },
          { id: 'my-leaves', label: 'My Leaves', icon: '📅' }
        ]}
      />
      
      <div className="dashboard-content">
        <div className="container">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
