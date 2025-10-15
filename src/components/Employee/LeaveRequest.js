import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './EmployeeDashboard.css';

const LeaveRequest = ({ onSubmit }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    // Validation
    if (!formData.leaveType || !formData.startDate || !formData.endDate || !formData.reason) {
      setMessage({ type: 'error', text: 'Please fill in all fields' });
      setLoading(false);
      return;
    }

    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      setMessage({ type: 'error', text: 'End date must be after start date' });
      setLoading(false);
      return;
    }

    const days = calculateDays(formData.startDate, formData.endDate);

    // Create leave request
    const leaveRequest = {
      id: Date.now().toString(),
      employeeId: user.id,
      ...formData,
      days,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };

    // Save to localStorage
    const existingRequests = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
    existingRequests.push(leaveRequest);
    localStorage.setItem('leaveRequests', JSON.stringify(existingRequests));

    setMessage({ type: 'success', text: 'Leave request submitted successfully!' });
    setFormData({
      leaveType: '',
      startDate: '',
      endDate: '',
      reason: ''
    });
    
    if (onSubmit) onSubmit();
    setLoading(false);
  };

  const days = formData.startDate && formData.endDate 
    ? calculateDays(formData.startDate, formData.endDate) 
    : 0;

  return (
    <div className="leave-request-container">
      <div className="section-header">
        <h2>Request Leave</h2>
        <p>Submit a new leave request for approval</p>
      </div>

      <div className="leave-request-form-card">
        <form onSubmit={handleSubmit} className="leave-form">
          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="leaveType">Leave Type *</label>
            <select
              id="leaveType"
              name="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
              required
            >
              <option value="">Select Leave Type</option>
              <option value="Annual Leave">Annual Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Personal Leave">Personal Leave</option>
              <option value="Maternity Leave">Maternity Leave</option>
              <option value="Paternity Leave">Paternity Leave</option>
              <option value="Unpaid Leave">Unpaid Leave</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startDate">Start Date *</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="endDate">End Date *</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                min={formData.startDate || new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>

          {days > 0 && (
            <div className="days-info">
              <strong>Total Days:</strong> {days} day(s)
            </div>
          )}

          <div className="form-group">
            <label htmlFor="reason">Reason for Leave *</label>
            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Please provide a detailed reason for your leave request..."
              rows="5"
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Leave Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveRequest;
