import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useExams } from '../context/ExamContext';
import { Calendar, User, Settings, Clock, AlertCircle, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import Button from '../components/common/Button';

const DashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { getBookingsByUserId, getExamById, getLocationById, getTimeSlotById } = useExams();
  const [activeTab, setActiveTab] = useState<string>('upcoming');
  
  if (!currentUser) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // Get user's bookings
  const userBookings = getBookingsByUserId(currentUser.id);
  
  // Filter bookings by status
  const upcomingBookings = userBookings.filter(
    booking => booking.status === 'confirmed' || booking.status === 'pending'
  );
  
  const completedBookings = userBookings.filter(
    booking => booking.status === 'completed'
  );
  
  const cancelledBookings = userBookings.filter(
    booking => booking.status === 'cancelled'
  );
  
  // Format date for display
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Confirmed
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            Unknown
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Dashboard Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 pt-8 pb-32 px-6 md:px-10">
          <h1 className="text-white text-3xl font-bold">Student Dashboard</h1>
          <p className="text-blue-100 mt-2">
            Welcome back, {currentUser.firstName}!
          </p>
          
          {/* Profile Quick Stats */}
          <div className="absolute bottom-0 right-0 transform translate-y-1/2 mr-6 md:mr-10">
            <div className="flex items-center bg-white rounded-lg shadow-lg p-4">
              <div className="flex-shrink-0 mr-4">
                {currentUser.profilePicture ? (
                  <img 
                    src={currentUser.profilePicture} 
                    alt={`${currentUser.firstName} ${currentUser.lastName}`}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-semibold">
                    {currentUser.firstName.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-gray-900 font-semibold">
                  {currentUser.firstName} {currentUser.lastName}
                </h2>
                <p className="text-gray-500 text-sm">{currentUser.email}</p>
                <div className="mt-1">
                  <Link to="/dashboard/profile" className="text-blue-600 text-sm font-medium hover:text-blue-800">
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Dashboard Navigation */}
        <div className="bg-gray-50 py-6 px-6 md:px-10">
          <div className="flex flex-wrap border-b border-gray-200">
            <button
              className={`mr-8 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'upcoming'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming Exams
            </button>
            <button
              className={`mr-8 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'completed'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('completed')}
            >
              Completed Exams
            </button>
            <button
              className={`py-4 text-sm font-medium border-b-2 ${
                activeTab === 'cancelled'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('cancelled')}
            >
              Cancelled Exams
            </button>
          </div>
        </div>
        
        {/* Dashboard Content */}
        <div className="px-6 md:px-10 py-8">
          {/* Upcoming Exams Tab */}
          {activeTab === 'upcoming' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Upcoming Exams ({upcomingBookings.length})
                </h2>
                <Link to="/exams">
                  <Button variant="outline">
                    Book New Exam
                  </Button>
                </Link>
              </div>
              
              {upcomingBookings.length > 0 ? (
                <div className="space-y-6">
                  {upcomingBookings.map(booking => {
                    const exam = getExamById(booking.examId);
                    const location = getLocationById(booking.locationId);
                    const timeSlot = getTimeSlotById(booking.timeSlotId);
                    
                    if (!exam || !location || !timeSlot) return null;
                    
                    return (
                      <div key={booking.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                        <div className="p-6">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="mb-4 md:mb-0">
                              <div className="flex items-center mb-2">
                                {getStatusBadge(booking.status)}
                                <span className="ml-2 text-sm text-gray-500">
                                  Booked on {formatDate(booking.createdAt)}
                                </span>
                              </div>
                              <h3 className="text-lg font-semibold text-gray-900">{exam.title}</h3>
                            </div>
                            
                            <div className="flex flex-wrap gap-2">
                              <Link to={`/confirmation/${booking.id}`}>
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                              </Link>
                              {booking.status === 'confirmed' && (
                                <Button variant="outline" size="sm">
                                  Reschedule
                                </Button>
                              )}
                            </div>
                          </div>
                          
                          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-start">
                              <Calendar className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="text-sm font-medium text-gray-900">Date</h4>
                                <p className="text-sm text-gray-600">{formatDate(timeSlot.date)}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <Clock className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="text-sm font-medium text-gray-900">Time</h4>
                                <p className="text-sm text-gray-600">{timeSlot.startTime} - {timeSlot.endTime}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <MapPin className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="text-sm font-medium text-gray-900">Location</h4>
                                <p className="text-sm text-gray-600">{location.name}, {location.city}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Upcoming Exams</h3>
                  <p className="text-gray-600 mb-6">You don't have any upcoming exams scheduled.</p>
                  <Link to="/exams">
                    <Button variant="primary">
                      Browse Exams
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}
          
          {/* Completed Exams Tab */}
          {activeTab === 'completed' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Completed Exams ({completedBookings.length})
              </h2>
              
              {completedBookings.length > 0 ? (
                <div className="space-y-6">
                  {completedBookings.map(booking => {
                    const exam = getExamById(booking.examId);
                    const location = getLocationById(booking.locationId);
                    const timeSlot = getTimeSlotById(booking.timeSlotId);
                    
                    if (!exam || !location || !timeSlot) return null;
                    
                    return (
                      <div key={booking.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                        <div className="p-6">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="mb-4 md:mb-0">
                              <div className="flex items-center mb-2">
                                {getStatusBadge(booking.status)}
                                <span className="ml-2 text-sm text-gray-500">
                                  Completed on {formatDate(timeSlot.date)}
                                </span>
                              </div>
                              <h3 className="text-lg font-semibold text-gray-900">{exam.title}</h3>
                            </div>
                            
                            <Button variant="primary" size="sm">
                              View Certificate
                            </Button>
                          </div>
                          
                          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-start">
                              <MapPin className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="text-sm font-medium text-gray-900">Location</h4>
                                <p className="text-sm text-gray-600">{location.name}, {location.city}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <Award className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="text-sm font-medium text-gray-900">Certification</h4>
                                <p className="text-sm text-gray-600">{exam.title}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Completed Exams</h3>
                  <p className="text-gray-600">You haven't completed any exams yet.</p>
                </div>
              )}
            </div>
          )}
          
          {/* Cancelled Exams Tab */}
          {activeTab === 'cancelled' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Cancelled Exams ({cancelledBookings.length})
              </h2>
              
              {cancelledBookings.length > 0 ? (
                <div className="space-y-6">
                  {cancelledBookings.map(booking => {
                    const exam = getExamById(booking.examId);
                    const location = getLocationById(booking.locationId);
                    const timeSlot = getTimeSlotById(booking.timeSlotId);
                    
                    if (!exam || !location || !timeSlot) return null;
                    
                    return (
                      <div key={booking.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                        <div className="p-6">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="mb-4 md:mb-0">
                              <div className="flex items-center mb-2">
                                {getStatusBadge(booking.status)}
                                <span className="ml-2 text-sm text-gray-500">
                                  Cancelled on {formatDate(booking.createdAt)}
                                </span>
                              </div>
                              <h3 className="text-lg font-semibold text-gray-900">{exam.title}</h3>
                            </div>
                            
                            <Button variant="outline" size="sm">
                              Rebook
                            </Button>
                          </div>
                          
                          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-start">
                              <Calendar className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="text-sm font-medium text-gray-900">Original Date</h4>
                                <p className="text-sm text-gray-600">{formatDate(timeSlot.date)}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <MapPin className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="text-sm font-medium text-gray-900">Location</h4>
                                <p className="text-sm text-gray-600">{location.name}, {location.city}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <XCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Cancelled Exams</h3>
                  <p className="text-gray-600">You don't have any cancelled exams.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Quick Links Section */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center mr-4">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Profile Settings</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Update your personal information, change password, or manage your notification preferences.
          </p>
          <Link to="/dashboard/profile">
            <Button variant="outline" fullWidth>
              Manage Profile
            </Button>
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center mr-4">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Browse Exams</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Explore our catalog of certification exams across various professional fields and disciplines.
          </p>
          <Link to="/exams">
            <Button variant="outline" fullWidth>
              View Catalog
            </Button>
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center mr-4">
              <Settings className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Support</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Need help? Contact our support team for assistance with bookings, technical issues, or questions.
          </p>
          <Link to="/contact">
            <Button variant="outline" fullWidth>
              Get Help
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;