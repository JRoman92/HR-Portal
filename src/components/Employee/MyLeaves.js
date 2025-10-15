import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './EmployeeDashboard.css';

const MyLeaves = ({ onUpdate }) => {
  const { user } = useAuth();
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    loadLeaveRequests();
  }, [user]);

  const loadLeaveRequests = () => {
    const requests = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
    const myRequests = requests.filter(req => req.employeeId === user.id);
    // Sort by date, newest first
    const sorted = myRequests.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    setLeaveRequests(sorted);
    if (onUpdate) onUpdate();
  };

  const handleCancelRequest = (requestId) => {
    if (window.confirm('Are you sure you want to cancel this leave request?')) {
      const requests = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
      const updatedRequests = requests.filter(req => req.id !== requestId);
      localStorage.setItem('leaveRequests', JSON.stringify(updatedRequests));
      loadLeaveRequests();
    }
  };

  const filteredRequests = filterStatus === 'all' 
    ? leaveRequests 
    : leaveRequests.filter(req => req.status === filterStatus);

  return (
    <div className="my-leaves-container">
      <div className="section-header">
        <h2>My Leave Requests</h2>
        <p>View and manage your leave requests</p>
      </div>

      <div className="filters-section">
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            All ({leaveRequests.length})
          </button>
          <button 
            className={`filter-tab ${filterStatus === 'pending' ? 'active' : ''}`}
            onClick={() => setFilterStatus('pending')}
          >
            Pending ({leaveRequests.filter(r => r.status === 'pending').length})
          </button>
          <button 
            className={`filter-tab ${filterStatus === 'approved' ? 'active' : ''}`}
            onClick={() => setFilterStatus('approved')}
          >
            Approved ({leaveRequests.filter(r => r.status === 'approved').length})
          </button>
          <button 
            className={`filter-tab ${filterStatus === 'rejected' ? 'active' : ''}`}
            onClick={() => setFilterStatus('rejected')}
          >
            Rejected ({leaveRequests.filter(r => r.status === 'rejected').length})
          </button>
        </div>
      </div>

      <div className="leave-requests-list">
        {filteredRequests.length === 0 ? (
          <div className="empty-state">
            <p>No leave requests found</p>
          </div>
        ) : (
          filteredRequests.map(request => (
            <div key={request.id} className="leave-request-card">
              <div className="leave-request-header">
                <div>
                  <h3>{request.leaveType}</h3>
                  <p className="leave-type">Submitted on {new Date(request.submittedAt).toLocaleDateString()}</p>
                </div>
                <span className={`badge badge-${request.status}`}>
                  {request.status}
                </span>
              </div>

              <div className="leave-request-body">
                <div className="leave-dates">
                  <div className="date-item">
                    <strong>From:</strong>
                    <span>{new Date(request.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="date-item">
                    <strong>To:</strong>
                    <span>{new Date(request.endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="date-item">
                    <strong>Days:</strong>
                    <span>{request.days} day(s)</span>
                  </div>
                </div>

                <div className="leave-reason">
                  <strong>Reason:</strong>
                  <p>{request.reason}</p>
                </div>

                {request.hrComments && (
                  <div className="hr-comments">
                    <strong>HR Comments:</strong>
                    <p>{request.hrComments}</p>
                  </div>
                )}

                {request.reviewedAt && (
                  <div className="leave-meta">
                    <small>Reviewed: {new Date(request.reviewedAt).toLocaleString()}</small>
                  </div>
                )}
              </div>

              {request.status === 'pending' && (
                <div className="leave-request-actions">
                  <button 
                    className="btn btn-danger"
                    onClick={() => handleCancelRequest(request.id)}
                  >
                    Cancel Request
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyLeaves;
