import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useExams } from '../context/ExamContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { ChevronLeft, Calendar as CalendarIcon, CheckCircle, MapPin } from 'lucide-react';
import Button from '../components/common/Button';
import Calendar from '../components/booking/Calendar';
import LocationSelector from '../components/booking/LocationSelector';

const BookingPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const { getExamById, getLocationById, getTimeSlotById, bookExam, isLoading } = useExams();
  const { currentUser } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState<string | null>(null);
  const [specialRequirements, setSpecialRequirements] = useState<string>('');
  const [bookingStep, setBookingStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  const exam = examId ? getExamById(examId) : undefined;
  
  // Get available locations for this exam
  const availableLocations = exam
    ? exam.availableLocations
        .map(locId => getLocationById(locId))
        .filter(Boolean)
    : [];
    
  // Get available time slots for this exam
  const availableTimeSlots = exam
    ? exam.availableTimeSlots
        .map(tsId => getTimeSlotById(tsId))
        .filter(Boolean)
    : [];
  
  // Reset location and time slot if exam changes
  useEffect(() => {
    setSelectedLocationId(null);
    setSelectedTimeSlotId(null);
    setBookingStep(1);
  }, [examId]);
  
  // Handle location selection
  const handleSelectLocation = (locationId: string) => {
    setSelectedLocationId(locationId);
  };
  
  // Handle time slot selection
  const handleSelectTimeSlot = (timeSlotId: string) => {
    setSelectedTimeSlotId(timeSlotId);
  };
  
  // Go to next step
  const handleNextStep = () => {
    if (bookingStep === 1 && !selectedLocationId) {
      addToast('Please select a location', 'error');
      return;
    }
    
    if (bookingStep === 2 && !selectedTimeSlotId) {
      addToast('Please select a date and time', 'error');
      return;
    }
    
    setBookingStep(prev => prev + 1);
  };
  
  // Go to previous step
  const handlePreviousStep = () => {
    setBookingStep(prev => prev - 1);
  };
  
  // Submit booking
  const handleSubmitBooking = async () => {
    if (!currentUser || !examId || !selectedLocationId || !selectedTimeSlotId) {
      addToast('Missing required booking information', 'error');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const bookingId = await bookExam({
        userId: currentUser.id,
        examId,
        locationId: selectedLocationId,
        timeSlotId: selectedTimeSlotId,
        specialRequirements: specialRequirements.trim() || undefined
      });
      
      addToast('Booking created successfully!', 'success');
      navigate(`/payment/${bookingId}`);
    } catch (error) {
      addToast('Failed to create booking', 'error');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!exam) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Exam Not Found</h1>
        <p className="text-gray-600 mb-8">The exam you're trying to book doesn't exist or has been removed.</p>
        <Link to="/exams">
          <Button variant="primary">
            Browse All Exams
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <Link to={`/exams/${examId}`} className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Exam Details
        </Link>
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-blue-600 text-white p-6">
          <h1 className="text-2xl font-bold">Book Your Exam</h1>
          <p className="text-blue-100 mt-1">
            {exam.title}
          </p>
        </div>
        
        {/* Progress Steps */}
        <div className="border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              
              <div className="relative flex justify-between">
                <div className="flex flex-col items-center">
                  <div className={`
                    flex items-center justify-center w-8 h-8 rounded-full 
                    ${bookingStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}
                  `}>
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="text-sm font-medium text-gray-500 mt-2">Location</div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className={`
                    flex items-center justify-center w-8 h-8 rounded-full 
                    ${bookingStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}
                  `}>
                    <CalendarIcon className="h-4 w-4" />
                  </div>
                  <div className="text-sm font-medium text-gray-500 mt-2">Date & Time</div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className={`
                    flex items-center justify-center w-8 h-8 rounded-full 
                    ${bookingStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}
                  `}>
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div className="text-sm font-medium text-gray-500 mt-2">Review</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Step Content */}
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            {/* Step 1: Location Selection */}
            {bookingStep === 1 && (
              <div className="animate-fade-in">
                <LocationSelector
                  locations={availableLocations}
                  onSelectLocation={handleSelectLocation}
                  selectedLocationId={selectedLocationId || undefined}
                />
              </div>
            )}
            
            {/* Step 2: Date & Time Selection */}
            {bookingStep === 2 && (
              <div className="animate-fade-in">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Date & Time</h2>
                <Calendar
                  availableTimeSlots={availableTimeSlots}
                  onSelectTimeSlot={handleSelectTimeSlot}
                  selectedTimeSlotId={selectedTimeSlotId || undefined}
                />
              </div>
            )}
            
            {/* Step 3: Review & Confirmation */}
            {bookingStep === 3 && (
              <div className="animate-fade-in">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Review Your Booking</h2>
                
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-900 mb-1">Exam</h3>
                    <p className="text-gray-700">{exam.title}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-900 mb-1">Location</h3>
                    {selectedLocationId && (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                        <p className="text-gray-700">
                          {getLocationById(selectedLocationId)?.name}, {getLocationById(selectedLocationId)?.city}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-900 mb-1">Date & Time</h3>
                    {selectedTimeSlotId && (
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 text-gray-500 mr-2" />
                        <p className="text-gray-700">
                          {new Date(getTimeSlotById(selectedTimeSlotId)?.date || '').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}, {getTimeSlotById(selectedTimeSlotId)?.startTime} - {getTimeSlotById(selectedTimeSlotId)?.endTime}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Price</h3>
                    <p className="text-gray-700">${exam.price.toFixed(2)}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="special-requirements" className="block text-sm font-medium text-gray-700 mb-1">
                    Special Requirements (Optional)
                  </label>
                  <textarea
                    id="special-requirements"
                    rows={4}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Do you have any special requirements or accommodations needed for your exam?"
                    value={specialRequirements}
                    onChange={(e) => setSpecialRequirements(e.target.value)}
                  ></textarea>
                  <p className="mt-1 text-sm text-gray-500">
                    Please note that special accommodations may need to be approved in advance.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-md mb-6">
                  <p className="text-sm text-blue-800">
                    By proceeding, you confirm that all information is correct and agree to our terms and conditions for exam booking.
                  </p>
                </div>
              </div>
            )}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {bookingStep > 1 && (
                <Button
                  variant="outline"
                  onClick={handlePreviousStep}
                >
                  Previous Step
                </Button>
              )}
              
              <div className="ml-auto">
                {bookingStep < 3 ? (
                  <Button
                    variant="primary"
                    onClick={handleNextStep}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={handleSubmitBooking}
                    loading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;