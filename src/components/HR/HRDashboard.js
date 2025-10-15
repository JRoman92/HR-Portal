import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Navigation from '../Common/Navigation';
import EmployeeList from './EmployeeList';
import LeaveManagement from './LeaveManagement';
import './HRDashboard.css';

const HRDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalEmployees: 0,
    pendingLeaves: 0,
    activeEmployees: 0,
    departments: 0
  });

  useEffect(() => {
    calculateStats();
  }, []);

  const calculateStats = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const employees = users.filter(u => u.role === 'employee');
    const leaveRequests = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
    const pendingLeaves = leaveRequests.filter(l => l.status === 'pending');
    const departments = [...new Set(employees.map(e => e.department).filter(d => d))];

    setStats({
      totalEmployees: employees.length,
      pendingLeaves: pendingLeaves.length,
      activeEmployees: employees.filter(e => e.status === 'active').length,
      departments: departments.length
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="overview-content">
            <h2>Dashboard Overview</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#dbeafe' }}>
                  <span style={{ color: '#1e40af' }}>👥</span>
                </div>
                <div className="stat-info">
                  <h3>{stats.totalEmployees}</h3>
                  <p>Total Employees</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#fef3c7' }}>
                  <span style={{ color: '#92400e' }}>⏳</span>
                </div>
                <div className="stat-info">
                  <h3>{stats.pendingLeaves}</h3>
                  <p>Pending Leaves</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#d1fae5' }}>
                  <span style={{ color: '#065f46' }}>✓</span>
                </div>
                <div className="stat-info">
                  <h3>{stats.activeEmployees}</h3>
                  <p>Active Employees</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#ddd6fe' }}>
                  <span style={{ color: '#5b21b6' }}>🏢</span>
                </div>
                <div className="stat-info">
                  <h3>{stats.departments}</h3>
                  <p>Departments</p>
                </div>
              </div>
            </div>

            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <div className="action-buttons">
                <button className="btn btn-primary" onClick={() => setActiveTab('employees')}>
                  Manage Employees
                </button>
                <button className="btn btn-primary" onClick={() => setActiveTab('leaves')}>
                  Review Leave Requests
                </button>
              </div>
            </div>
          </div>
        );
      case 'employees':
        return <EmployeeList onUpdate={calculateStats} />;
      case 'leaves':
        return <LeaveManagement onUpdate={calculateStats} />;
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
          { id: 'employees', label: 'Employees', icon: '👥' },
          { id: 'leaves', label: 'Leave Requests', icon: '📅' }
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

export default HRDashboard;
