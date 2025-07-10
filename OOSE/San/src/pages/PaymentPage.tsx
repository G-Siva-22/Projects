import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useExams } from '../context/ExamContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { ArrowLeft, CreditCard, CheckCircle } from 'lucide-react';
import PaymentForm from '../components/payment/PaymentForm';

const PaymentPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const { getBookingById, getExamById, updateBookingStatus, isLoading } = useExams();
  const { currentUser } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  
  const booking = bookingId ? getBookingById(bookingId) : undefined;
  const exam = booking ? getExamById(booking.examId) : undefined;
  
  // Verify the booking belongs to the current user
  useEffect(() => {
    if (!isLoading && booking && currentUser && booking.userId !== currentUser.id) {
      addToast('You do not have permission to access this booking', 'error');
      navigate('/dashboard');
    }
  }, [booking, currentUser, isLoading, addToast, navigate]);
  
  // Handle payment completion
  const handlePaymentComplete = (paymentId: string) => {
    if (bookingId) {
      // Update booking status
      updateBookingStatus(bookingId, 'confirmed');
      
      // Show success UI
      setIsPaymentComplete(true);
      
      // Automatically redirect after a delay
      setTimeout(() => {
        navigate(`/confirmation/${bookingId}`);
      }, 3000);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!booking || !exam) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Booking Not Found</h1>
        <p className="text-gray-600 mb-8">The booking you're trying to pay for doesn't exist or has been removed.</p>
        <Link to="/dashboard" className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {!isPaymentComplete ? (
        <>
          <div className="mb-8">
            <Link to={`/booking/${booking.examId}`} className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Booking
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Payment Details</h1>
              <PaymentForm
                amount={exam.price}
                onPaymentComplete={handlePaymentComplete}
              />
            </div>
            
            <div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-6">
                <div className="bg-gray-50 px-6 py-4 border-b">
                  <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-900 mb-2">{exam.title}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <CreditCard className="h-4 w-4 mr-2" />
                      <span>Secure payment - 100% refundable up to 48 hours before the exam</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 mt-4 pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Exam Fee</span>
                      <span className="text-gray-900">${exam.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Processing Fee</span>
                      <span className="text-gray-900">$0.00</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
                      <span className="font-semibold text-gray-900">Total</span>
                      <span className="font-semibold text-gray-900">${exam.price.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 bg-blue-50 p-4 rounded-md">
                    <p className="text-sm text-blue-800">
                      You'll receive a confirmation email with your exam details after payment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="max-w-md mx-auto text-center py-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-8">
              Your payment has been processed successfully. You'll be redirected to the confirmation page shortly.
            </p>
            <div className="mt-4 flex justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;