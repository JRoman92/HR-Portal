import React, { useState, useEffect } from 'react';
import './HRDashboard.css';

const EmployeeList = ({ onUpdate }) => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const employeeList = users.filter(u => u.role === 'employee');
    setEmployees(employeeList);
    if (onUpdate) onUpdate();
  };

  const departments = [...new Set(employees.map(e => e.department).filter(d => d))];

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = 
      emp.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = !filterDepartment || emp.department === filterDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleUpdateStatus = (employeeId, newStatus) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map(u => 
      u.id === employeeId ? { ...u, status: newStatus } : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    loadEmployees();
    setShowModal(false);
  };

  return (
    <div className="employee-list-container">
      <div className="section-header">
        <h2>Employee Management</h2>
        <p>View and manage all employees in the organization</p>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
          className="filter-select"
        >
          <option value="">All Departments</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
      </div>

      <div className="employee-grid">
        {filteredEmployees.length === 0 ? (
          <div className="empty-state">
            <p>No employees found</p>
          </div>
        ) : (
          filteredEmployees.map(employee => (
            <div key={employee.id} className="employee-card">
              <div className="employee-avatar">
                {employee.firstName?.[0]}{employee.lastName?.[0]}
              </div>
              <div className="employee-info">
                <h3>{employee.firstName} {employee.lastName}</h3>
                <p className="employee-email">{employee.email}</p>
                {employee.department && (
                  <span className="badge badge-employee">{employee.department}</span>
                )}
                <span className={`badge ${employee.status === 'active' ? 'badge-approved' : 'badge-pending'}`}>
                  {employee.status || 'active'}
                </span>
              </div>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => handleViewEmployee(employee)}
              >
                View Details
              </button>
            </div>
          ))
        )}
      </div>

      {showModal && selectedEmployee && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Employee Details</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="detail-row">
                <strong>Name:</strong>
                <span>{selectedEmployee.firstName} {selectedEmployee.lastName}</span>
              </div>
              <div className="detail-row">
                <strong>Email:</strong>
                <span>{selectedEmployee.email}</span>
              </div>
              <div className="detail-row">
                <strong>Phone:</strong>
                <span>{selectedEmployee.phone || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <strong>Department:</strong>
                <span>{selectedEmployee.department || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <strong>Date of Birth:</strong>
                <span>{selectedEmployee.dateOfBirth || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <strong>Address:</strong>
                <span>{selectedEmployee.address || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <strong>Status:</strong>
                <span className={`badge ${selectedEmployee.status === 'active' ? 'badge-approved' : 'badge-pending'}`}>
                  {selectedEmployee.status || 'active'}
                </span>
              </div>
              <div className="detail-row">
                <strong>Joined:</strong>
                <span>{new Date(selectedEmployee.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="btn btn-success"
                onClick={() => handleUpdateStatus(selectedEmployee.id, 'active')}
              >
                Mark Active
              </button>
              <button 
                className="btn btn-danger"
                onClick={() => handleUpdateStatus(selectedEmployee.id, 'inactive')}
              >
                Mark Inactive
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
