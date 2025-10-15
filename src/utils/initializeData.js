// Initialize demo data for the HR Portal
export const initializeData = () => {
  // Check if data already exists
  const existingUsers = localStorage.getItem('users');
  
  if (!existingUsers) {
    // Create demo users
    const demoUsers = [
      {
        id: '1',
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'hr@company.com',
        password: 'password123',
        phone: '+1 (555) 100-0001',
        department: 'HR',
        role: 'hr',
        dateOfBirth: '1985-03-15',
        address: '123 Main St, New York, NY 10001',
        status: 'active',
        createdAt: '2024-01-01T00:00:00.000Z'
      },
      {
        id: '2',
        firstName: 'John',
        lastName: 'Smith',
        email: 'employee@company.com',
        password: 'password123',
        phone: '+1 (555) 100-0002',
        department: 'Engineering',
        role: 'employee',
        dateOfBirth: '1990-06-20',
        address: '456 Oak Ave, San Francisco, CA 94102',
        status: 'active',
        createdAt: '2024-01-15T00:00:00.000Z'
      },
      {
        id: '3',
        firstName: 'Emily',
        lastName: 'Davis',
        email: 'emily.davis@company.com',
        password: 'password123',
        phone: '+1 (555) 100-0003',
        department: 'Marketing',
        role: 'employee',
        dateOfBirth: '1992-09-10',
        address: '789 Pine Rd, Boston, MA 02101',
        status: 'active',
        createdAt: '2024-02-01T00:00:00.000Z'
      },
      {
        id: '4',
        firstName: 'Michael',
        lastName: 'Brown',
        email: 'michael.brown@company.com',
        password: 'password123',
        phone: '+1 (555) 100-0004',
        department: 'Sales',
        role: 'employee',
        dateOfBirth: '1988-12-05',
        address: '321 Elm St, Chicago, IL 60601',
        status: 'active',
        createdAt: '2024-02-15T00:00:00.000Z'
      },
      {
        id: '5',
        firstName: 'Jessica',
        lastName: 'Wilson',
        email: 'jessica.wilson@company.com',
        password: 'password123',
        phone: '+1 (555) 100-0005',
        department: 'Finance',
        role: 'employee',
        dateOfBirth: '1991-04-25',
        address: '654 Maple Dr, Seattle, WA 98101',
        status: 'active',
        createdAt: '2024-03-01T00:00:00.000Z'
      }
    ];
    
    localStorage.setItem('users', JSON.stringify(demoUsers));
    
    // Create demo leave requests
    const demoLeaveRequests = [
      {
        id: '1',
        employeeId: '2',
        leaveType: 'Annual Leave',
        startDate: '2024-12-20',
        endDate: '2024-12-27',
        days: 8,
        reason: 'Year-end vacation with family',
        status: 'pending',
        submittedAt: '2024-10-10T10:00:00.000Z'
      },
      {
        id: '2',
        employeeId: '3',
        leaveType: 'Sick Leave',
        startDate: '2024-10-05',
        endDate: '2024-10-07',
        days: 3,
        reason: 'Medical appointment and recovery',
        status: 'approved',
        hrComments: 'Approved. Get well soon!',
        submittedAt: '2024-10-01T09:00:00.000Z',
        reviewedAt: '2024-10-02T14:30:00.000Z'
      },
      {
        id: '3',
        employeeId: '4',
        leaveType: 'Personal Leave',
        startDate: '2024-11-15',
        endDate: '2024-11-16',
        days: 2,
        reason: 'Personal matters to attend to',
        status: 'pending',
        submittedAt: '2024-10-12T11:00:00.000Z'
      },
      {
        id: '4',
        employeeId: '5',
        leaveType: 'Annual Leave',
        startDate: '2024-09-10',
        endDate: '2024-09-15',
        days: 6,
        reason: 'Family wedding celebration',
        status: 'rejected',
        hrComments: 'Unfortunately, this period conflicts with our quarterly review. Please select alternative dates.',
        submittedAt: '2024-08-25T08:00:00.000Z',
        reviewedAt: '2024-08-26T16:00:00.000Z'
      }
    ];
    
    localStorage.setItem('leaveRequests', JSON.stringify(demoLeaveRequests));
    
    console.log('Demo data initialized successfully!');
  }
};
