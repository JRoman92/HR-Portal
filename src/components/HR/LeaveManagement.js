import React, { useState, useEffect } from 'react';
import './HRDashboard.css';

const LeaveManagement = ({ onUpdate }) => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    loadLeaveRequests();
  }, []);

  const loadLeaveRequests = () => {
    const requests = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
    // Sort by date, newest first
    const sorted = requests.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    setLeaveRequests(sorted);
    if (onUpdate) onUpdate();
  };

  const handleStatusUpdate = (requestId, newStatus, hrComments = '') => {
    const requests = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
    const updatedRequests = requests.map(req => 
      req.id === requestId 
        ? { 
            ...req, 
            status: newStatus, 
            hrComments,
            reviewedAt: new Date().toISOString() 
          } 
        : req
    );
    localStorage.setItem('leaveRequests', JSON.stringify(updatedRequests));
    loadLeaveRequests();
  };

  const getEmployeeName = (employeeId) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const employee = users.find(u => u.id === employeeId);
    return employee ? `${employee.firstName} ${employee.lastName}` : 'Unknown';
  };

  const filteredRequests = filterStatus === 'all' 
    ? leaveRequests 
    : leaveRequests.filter(req => req.status === filterStatus);

  return (
    <div className="leave-management-container">
      <div className="section-header">
        <h2>Leave Request Management</h2>
        <p>Review and manage employee leave requests</p>
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
                  <h3>{getEmployeeName(request.employeeId)}</h3>
                  <p className="leave-type">{request.leaveType}</p>
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

                <div className="leave-meta">
                  <small>Submitted: {new Date(request.submittedAt).toLocaleString()}</small>
                  {request.reviewedAt && (
                    <small>Reviewed: {new Date(request.reviewedAt).toLocaleString()}</small>
                  )}
                </div>
              </div>

              {request.status === 'pending' && (
                <div className="leave-request-actions">
                  <button 
                    className="btn btn-success"
                    onClick={() => {
                      const comments = prompt('Add comments (optional):');
                      handleStatusUpdate(request.id, 'approved', comments || '');
                    }}
                  >
                    ✓ Approve
                  </button>
                  <button 
                    className="btn btn-danger"
                    onClick={() => {
                      const comments = prompt('Add reason for rejection:');
                      if (comments) {
                        handleStatusUpdate(request.id, 'rejected', comments);
                      }
                    }}
                  >
                    ✗ Reject
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

export default LeaveManagement;
