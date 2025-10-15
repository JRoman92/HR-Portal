import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import HRDashboard from './components/HR/HRDashboard';
import EmployeeDashboard from './components/Employee/EmployeeDashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import { initializeData } from './utils/initializeData';

function PrivateRoute({ children, requiredRole }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={user.role === 'hr' ? '/hr/dashboard' : '/employee/dashboard'} />;
  }
  
  return children;
}

function AppRoutes() {
  const { user } = useAuth();
  
  return (
    <Routes>
      <Route path="/" element={
        user ? (
          <Navigate to={user.role === 'hr' ? '/hr/dashboard' : '/employee/dashboard'} />
        ) : (
          <Navigate to="/login" />
        )
      } />
      <Route path="/login" element={
        user ? (
          <Navigate to={user.role === 'hr' ? '/hr/dashboard' : '/employee/dashboard'} />
        ) : (
          <Login />
        )
      } />
      <Route path="/signup" element={
        user ? (
          <Navigate to={user.role === 'hr' ? '/hr/dashboard' : '/employee/dashboard'} />
        ) : (
          <Signup />
        )
      } />
      <Route path="/hr/dashboard" element={
        <PrivateRoute requiredRole="hr">
          <HRDashboard />
        </PrivateRoute>
      } />
      <Route path="/employee/dashboard" element={
        <PrivateRoute requiredRole="employee">
          <EmployeeDashboard />
        </PrivateRoute>
      } />
    </Routes>
  );
}

function App() {
  useEffect(() => {
    // Initialize demo data on first load
    initializeData();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <AppRoutes />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
