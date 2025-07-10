import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useExams } from '../context/ExamContext';
import { 
  PieChart, 
  BarChart, 
  Calendar, 
  Users, 
  Settings, 
  Bell, 
  Menu, 
  X, 
  BookOpen,
  MapPin,
  CreditCard
} from 'lucide-react';
import Button from '../components/common/Button';

const AdminDashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { exams, getBookingById } = useExams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  // Function to check if a route is active
  const isActive = (path: string): boolean => {
    return location.pathname === `/admin${path}` || location.pathname === `/admin${path}/`;
  };

  // Sidebar content
  const SidebarContent = () => (
    <>
      <div className="px-6 py-4 border-b border-gray-700">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-md bg-blue-500 flex items-center justify-center mr-3">
            <PieChart className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-semibold text-white">Admin Panel</span>
        </div>
      </div>
      
      <div className="py-6">
        <div className="px-6 mb-6">
          <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">Dashboard</p>
          <Link 
            to="/admin" 
            className={`flex items-center px-3 py-2 rounded-md mb-1 ${
              isActive('') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            <BarChart className="h-5 w-5 mr-3" />
            Overview
          </Link>
        </div>
        
        <div className="px-6 mb-6">
          <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">Management</p>
          <Link 
            to="/admin/exams" 
            className={`flex items-center px-3 py-2 rounded-md mb-1 ${
              isActive('/exams') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            <BookOpen className="h-5 w-5 mr-3" />
            Exams
          </Link>
          <Link 
            to="/admin/bookings" 
            className={`flex items-center px-3 py-2 rounded-md mb-1 ${
              isActive('/bookings') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            <Calendar className="h-5 w-5 mr-3" />
            Bookings
          </Link>
          <Link 
            to="/admin/locations" 
            className={`flex items-center px-3 py-2 rounded-md mb-1 ${
              isActive('/locations') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            <MapPin className="h-5 w-5 mr-3" />
            Locations
          </Link>
          <Link 
            to="/admin/users" 
            className={`flex items-center px-3 py-2 rounded-md mb-1 ${
              isActive('/users') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            <Users className="h-5 w-5 mr-3" />
            Users
          </Link>
          <Link 
            to="/admin/payments" 
            className={`flex items-center px-3 py-2 rounded-md mb-1 ${
              isActive('/payments') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            <CreditCard className="h-5 w-5 mr-3" />
            Payments
          </Link>
        </div>
        
        <div className="px-6">
          <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">System</p>
          <Link 
            to="/admin/settings" 
            className={`flex items-center px-3 py-2 rounded-md mb-1 ${
              isActive('/settings') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            <Settings className="h-5 w-5 mr-3" />
            Settings
          </Link>
          <Link 
            to="/admin/notifications" 
            className={`flex items-center px-3 py-2 rounded-md mb-1 ${
              isActive('/notifications') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            <Bell className="h-5 w-5 mr-3" />
            Notifications
          </Link>
        </div>
      </div>
    </>
  );

  // Admin Overview component
  const AdminOverview: React.FC = () => {
    // Mock stats
    const stats = [
      { label: 'Total Exams', value: exams.length, icon: <BookOpen className="h-5 w-5 text-blue-600" /> },
      { label: 'Active Bookings', value: 42, icon: <Calendar className="h-5 w-5 text-green-600" /> },
      { label: 'Registered Users', value: 128, icon: <Users className="h-5 w-5 text-purple-600" /> },
      { label: 'Testing Locations', value: 3, icon: <MapPin className="h-5 w-5 text-orange-600" /> }
    ];
    
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Overview</h1>
          <p className="text-gray-600">Welcome to the ExamPro administration dashboard.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="divide-y divide-gray-200">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="py-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">New booking for AWS Certification</p>
                      <p className="text-xs text-gray-500">By John Doe</p>
                    </div>
                    <span className="text-xs text-gray-500">2 hours ago</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" fullWidth>
                View All Activity
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Exams</h2>
            <div className="divide-y divide-gray-200">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="py-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Microsoft Azure Fundamentals</p>
                      <p className="text-xs text-gray-500">Tech Center Downtown, New York</p>
                    </div>
                    <span className="text-xs text-gray-500">May 15, 2025</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" fullWidth>
                View Calendar
              </Button>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Exam Performance</h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md">
            <p className="text-gray-500">Chart visualization would appear here</p>
          </div>
        </div>
      </div>
    );
  };

  // Admin Exams component
  const AdminExams: React.FC = () => {
    return (
      <div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Exams</h1>
            <p className="text-gray-600">View and manage all certification exams.</p>
          </div>
          <Button variant="primary">
            Add New Exam
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exam Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Difficulty
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {exams.map((exam) => (
                  <tr key={exam.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{exam.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {exam.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {exam.duration} min
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${exam.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${exam.difficulty === 'beginner' ? 'bg-green-100 text-green-800' : 
                          exam.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'}`}>
                        {exam.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Admin Users component
  const AdminUsers: React.FC = () => {
    return (
      <div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
            <p className="text-gray-600">View and manage all registered users.</p>
          </div>
          <Button variant="primary">
            Add New User
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registered
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'student', status: 'active', date: '2025-01-01' },
                  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'student', status: 'active', date: '2025-01-05' },
                  { id: 3, name: 'Admin User', email: 'admin@example.com', role: 'admin', status: 'active', date: '2024-12-15' },
                ].map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Deactivate</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Admin Bookings component
  const AdminBookings: React.FC = () => {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Manage Bookings</h1>
          <p className="text-gray-600">View and manage all exam bookings.</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exam
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { id: 'booking-1', user: 'John Doe', examId: 'exam1', date: '2025-05-15', status: 'confirmed' },
                  { id: 'booking-2', user: 'Jane Smith', examId: 'exam2', date: '2025-05-20', status: 'pending' },
                  { id: 'booking-3', user: 'Mike Johnson', examId: 'exam3', date: '2025-05-25', status: 'cancelled' },
                ].map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{booking.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{booking.user}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {exams.find(exam => exam.id === booking.examId)?.title || 'Unknown Exam'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                      <button className="text-green-600 hover:text-green-900">Confirm</button>
                      <button className="text-red-600 hover:text-red-900">Cancel</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-40 flex md:hidden ${sidebarOpen ? 'visible' : 'invisible'}`}>
        <div 
          className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity duration-300 ease-in-out ${
            sidebarOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setSidebarOpen(false)}
        ></div>
        
        <div className={`relative flex flex-col w-full max-w-xs bg-gray-800 transition duration-300 ease-in-out transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          
          <SidebarContent />
        </div>
      </div>
      
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="w-64 flex flex-col">
          <div className="flex flex-col h-0 flex-1 bg-gray-800">
            <SidebarContent />
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col md:ml-64">
        {/* Top Bar */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex justify-between items-center px-4 py-4 md:px-6">
            <div className="flex items-center md:hidden">
              <button
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Menu className="h-6 w-6" />
              </button>
            </div>
            
            <div className="flex-1 flex justify-end">
              <div className="flex items-center">
                <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                  <span className="sr-only">Notifications</span>
                  <Bell className="h-6 w-6" />
                </button>
                
                <div className="ml-3 relative">
                  <div className="flex items-center">
                    {currentUser?.profilePicture ? (
                      <img 
                        src={currentUser.profilePicture} 
                        alt={`${currentUser.firstName} ${currentUser.lastName}`}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                        {currentUser?.firstName.charAt(0)}
                      </div>
                    )}
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {currentUser?.firstName} {currentUser?.lastName}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
          <Routes>
            <Route path="/" element={<AdminOverview />} />
            <Route path="/exams" element={<AdminExams />} />
            <Route path="/users" element={<AdminUsers />} />
            <Route path="/bookings" element={<AdminBookings />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;