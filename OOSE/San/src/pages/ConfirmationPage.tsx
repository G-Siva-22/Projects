import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useExams } from '../context/ExamContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { CheckCircle, Calendar, MapPin, Clock, Download, Share2, Printer, AlertTriangle } from 'lucide-react';
import Button from '../components/common/Button';

const ConfirmationPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const { getBookingById, getExamById, getLocationById, getTimeSlotById, isLoading } = useExams();
  const { currentUser } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  
  const booking = bookingId ? getBookingById(bookingId) : undefined;
  const exam = booking ? getExamById(booking.examId) : undefined;
  const location = booking ? getLocationById(booking.locationId) : undefined;
  const timeSlot = booking ? getTimeSlotById(booking.timeSlotId) : undefined;
  
  // Verify the booking belongs to the current user
  useEffect(() => {
    if (!isLoading && booking && currentUser && booking.userId !== currentUser.id) {
      addToast('You do not have permission to access this booking', 'error');
      navigate('/dashboard');
    }
  }, [booking, currentUser, isLoading, addToast, navigate]);
  
  // Handle download confirmation
  const handleDownloadConfirmation = () => {
    addToast('Confirmation PDF downloaded successfully!', 'success');
  };
  
  // Handle share confirmation
  const handleShareConfirmation = () => {
    addToast('Confirmation link copied to clipboard!', 'success');
  };
  
  // Handle print confirmation
  const handlePrintConfirmation = () => {
    window.print();
  };
  
  // Format date for display
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Format time for display
  const formatTime = (timeString: string): string => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!booking || !exam || !location || !timeSlot) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Booking Not Found</h1>
        <p className="text-gray-600 mb-8">The booking confirmation you're looking for doesn't exist or has been removed.</p>
        <Link to="/dashboard">
          <Button variant="primary">
            Go to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex justify-center">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">Booking Confirmed!</h1>
          <p className="text-gray-600 mt-2">
            Your exam has been successfully booked. A confirmation email has been sent to your registered email address.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 mb-10 print:shadow-none print:border-none">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4 print:bg-white print:text-black">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white print:text-gray-900">Exam Confirmation</h2>
              <div className="text-white text-sm print:text-gray-600">Booking ID: {booking.id}</div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{exam.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-start mb-4">
                    <Calendar className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">Date</h4>
                      <p className="text-gray-700">{formatDate(timeSlot.date)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start mb-4">
                    <Clock className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">Time</h4>
                      <p className="text-gray-700">
                        {formatTime(timeSlot.startTime)} - {formatTime(timeSlot.endTime)}
                      </p>
                      <p className="text-sm text-gray-500">Duration: {exam.duration} minutes</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-start mb-4">
                    <MapPin className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">Location</h4>
                      <p className="text-gray-700">{location.name}</p>
                      <p className="text-gray-600">
                        {location.address}, {location.city}, {location.state} {location.zipCode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Important Information</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Please arrive 15 minutes before your scheduled exam time.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Bring a valid government-issued photo ID that matches your registration name.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Review the exam guidelines and allowed materials before your test date.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Rescheduling is available up to 48 hours before your exam time.</span>
                </li>
              </ul>
            </div>
            
            {booking.specialRequirements && (
              <div className="bg-blue-50 p-4 rounded-md mt-6">
                <h4 className="font-medium text-blue-800 mb-1">Special Requirements</h4>
                <p className="text-blue-700 text-sm">{booking.specialRequirements}</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 print:hidden">
          <Button
            variant="outline"
            onClick={handleDownloadConfirmation}
            icon={<Download className="h-5 w-5" />}
          >
            Download PDF
          </Button>
          
          <Button
            variant="outline"
            onClick={handleShareConfirmation}
            icon={<Share2 className="h-5 w-5" />}
          >
            Share
          </Button>
          
          <Button
            variant="outline"
            onClick={handlePrintConfirmation}
            icon={<Printer className="h-5 w-5" />}
          >
            Print
          </Button>
          
          <Link to="/dashboard">
            <Button variant="primary">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;