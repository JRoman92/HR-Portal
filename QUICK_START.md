# Quick Start Guide - HR Portal

## Installation Steps

1. **Open Terminal/Command Prompt** in the project directory

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Application**
   ```bash
   npm start
   ```

4. **Access the Application**
   - The app will automatically open in your browser at `http://localhost:3000`
   - If not, manually navigate to `http://localhost:3000`

## First Time Setup

The application automatically initializes with demo data including:
- 1 HR Manager account
- 4 Employee accounts
- Sample leave requests

## Login Credentials

### HR Manager
- Email: `hr@company.com`
- Password: `password123`

### Employee
- Email: `employee@company.com`
- Password: `password123`

## Testing the Application

### As HR Manager:
1. Login with HR credentials
2. View dashboard statistics
3. Navigate to "Employees" to see all employees
4. Navigate to "Leave Requests" to approve/reject leave requests
5. Click on any employee to view detailed profile

### As Employee:
1. Login with employee credentials
2. View your dashboard overview
3. Navigate to "My Profile" to update your information
4. Navigate to "Request Leave" to submit a new leave request
5. Navigate to "My Leaves" to view all your requests

## Creating New Accounts

1. Click "Sign up here" on the login page
2. Fill in all required fields (marked with *)
3. Select role (Employee or HR Manager)
4. Submit the form
5. You'll be automatically logged in

## Troubleshooting

### If npm install fails:
- Make sure Node.js is installed: `node --version`
- Try clearing npm cache: `npm cache clean --force`
- Delete `node_modules` folder and try again

### If the app doesn't start:
- Check if port 3000 is already in use
- Try `npm start` again
- Check console for error messages

### If data doesn't persist:
- The app uses localStorage for demo purposes
- Don't clear browser data/cache
- Use the same browser for testing

## Features Overview

### ✅ Completed Features:
- [x] User authentication (Login/Signup)
- [x] Role-based access control (HR/Employee)
- [x] HR Dashboard with statistics
- [x] Employee management and profiles
- [x] Leave request submission
- [x] Leave request approval/rejection
- [x] Profile management
- [x] Responsive design
- [x] Modern UI with gradient theme
- [x] Data persistence with localStorage

## Need Help?

Refer to the main README.md file for detailed documentation.
