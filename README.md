# HR Portal - Employee Management System

A comprehensive, secure, and user-friendly HR portal built with React that streamlines HR operations within an organization. This web-based application enables HR professionals to manage employee data, approve leave requests, and facilitate the onboarding process with ease.

## 🎯 Project Overview

The HR Portal addresses the challenges of outdated and manual HR processes by providing a modern, automated solution that:
- Simplifies employee data management
- Streamlines leave request approval workflows
- Facilitates efficient onboarding processes
- Provides secure, role-based access control
- Offers a responsive UI accessible from any device

## ✨ Features

### For HR Managers
- **Dashboard Overview**: View key metrics including total employees, pending leave requests, and department statistics
- **Employee Management**: 
  - View all employees in a searchable, filterable grid
  - Access detailed employee profiles
  - Update employee status (active/inactive)
  - Filter by department
- **Leave Request Management**:
  - Review pending leave requests
  - Approve or reject requests with comments
  - View complete leave history
  - Filter by status (pending, approved, rejected)

### For Employees
- **Personal Dashboard**: Overview of leave statistics and quick actions
- **Profile Management**: 
  - Update personal information
  - Manage contact details
  - Update department and other details
- **Leave Requests**:
  - Submit new leave requests with automatic day calculation
  - View all submitted requests
  - Track request status
  - Cancel pending requests
  - View HR comments and feedback

### Authentication & Security
- Secure login and signup system
- Role-based access control (HR/Employee)
- Password-protected accounts
- Session management with localStorage

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd "HR Portal"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Demo Credentials

The application comes with pre-populated demo data for testing:

### HR Manager Account
- **Email**: hr@company.com
- **Password**: password123

### Employee Account
- **Email**: employee@company.com
- **Password**: password123

Additional employee accounts are available:
- emily.davis@company.com / password123
- michael.brown@company.com / password123
- jessica.wilson@company.com / password123

## 📁 Project Structure

```
HR Portal/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   └── Auth.css
│   │   ├── HR/
│   │   │   ├── HRDashboard.js
│   │   │   ├── EmployeeList.js
│   │   │   ├── LeaveManagement.js
│   │   │   └── HRDashboard.css
│   │   ├── Employee/
│   │   │   ├── EmployeeDashboard.js
│   │   │   ├── ProfileManagement.js
│   │   │   ├── LeaveRequest.js
│   │   │   ├── MyLeaves.js
│   │   │   └── EmployeeDashboard.css
│   │   └── Common/
│   │       ├── Navigation.js
│   │       └── Navigation.css
│   ├── context/
│   │   └── AuthContext.js
│   ├── utils/
│   │   └── initializeData.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🛠️ Technology Stack

- **Frontend Framework**: React 18.2.0
- **Routing**: React Router DOM 6.20.0
- **Styling**: Custom CSS with CSS Variables
- **State Management**: React Context API
- **Data Storage**: Browser localStorage (for demo purposes)

## 💾 Data Storage

The application uses browser localStorage for data persistence. This includes:
- User accounts and profiles
- Leave requests and their statuses
- Employee information

**Note**: In a production environment, this should be replaced with a proper backend API and database.

## 🎨 Design Features

- **Modern UI**: Clean, professional interface with gradient accents
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Intuitive Navigation**: Tab-based navigation with clear visual indicators
- **Accessibility**: Semantic HTML and keyboard-friendly interactions
- **Visual Feedback**: Loading states, success/error messages, and status badges

## 📋 Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm build`
Builds the app for production to the `build` folder

### `npm test`
Launches the test runner in interactive watch mode

### `npm eject`
**Note**: This is a one-way operation. Once you eject, you can't go back!

## 🔄 Workflow Examples

### Employee Leave Request Flow
1. Employee logs in and navigates to "Request Leave"
2. Selects leave type, dates, and provides reason
3. System automatically calculates number of days
4. Request is submitted and marked as "pending"
5. HR receives notification of pending request
6. HR reviews and approves/rejects with comments
7. Employee can view status and HR feedback

### HR Employee Management Flow
1. HR logs in and views dashboard overview
2. Navigates to "Employees" section
3. Can search/filter employees by name or department
4. Clicks on employee to view detailed profile
5. Can update employee status as needed
6. Changes are immediately reflected in the system

## 🚀 Future Enhancements

Potential features for future development:
- Backend API integration with database
- Email notifications for leave requests
- Document upload functionality
- Performance review system
- Attendance tracking
- Payroll integration
- Advanced reporting and analytics
- Multi-language support
- Dark mode theme

## 🤝 Contributing

This is an educational project. Feel free to fork and modify for your own learning purposes.

## 📄 License

This project is created for educational purposes.

## 👥 Support

For questions or issues, please refer to the project documentation or create an issue in the repository.

---

**Built with ❤️ using React**
