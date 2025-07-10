import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useExams } from '../context/ExamContext';
import { useAuth } from '../context/AuthContext';
import { Clock, DollarSign, Award, BookOpen, CheckCircle, ChevronLeft, AlertTriangle } from 'lucide-react';
import Button from '../components/common/Button';

const ExamDetailsPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const { getExamById, isLoading } = useExams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const exam = examId ? getExamById(examId) : undefined;
  
  // Function to get difficulty badge color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'advanced':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Function to get category badge color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cloud':
        return 'bg-blue-100 text-blue-800';
      case 'security':
        return 'bg-red-100 text-red-800';
      case 'networking':
        return 'bg-green-100 text-green-800';
      case 'programming':
        return 'bg-purple-100 text-purple-800';
      case 'data':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Handle booking button click
  const handleBookExam = () => {
    if (!currentUser) {
      navigate('/login', { state: { redirectTo: `/booking/${examId}` } });
    } else {
      navigate(`/booking/${examId}`);
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
        <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Exam Not Found</h1>
        <p className="text-gray-600 mb-8">The exam you're looking for doesn't exist or has been removed.</p>
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
        <Link to="/exams" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Exams
        </Link>
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header Image */}
        <div className="h-64 md:h-80 bg-gray-300 relative">
          <img 
            src={exam.image} 
            alt={exam.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(exam.category)}`}>
              {exam.category.charAt(0).toUpperCase() + exam.category.slice(1)}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-white mt-2">
              {exam.title}
            </h1>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  <Clock className="h-4 w-4 mr-1" />
                  {exam.duration} min
                </span>
                
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(exam.difficulty)}`}>
                  <Award className="h-4 w-4 mr-1" />
                  {exam.difficulty.charAt(0).toUpperCase() + exam.difficulty.slice(1)}
                </span>
                
                {exam.passScore && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Pass Score: {exam.passScore}
                  </span>
                )}
              </div>
              
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Exam</h2>
              <p className="text-gray-700 mb-6 whitespace-pre-line">
                {exam.description}
              </p>
              
              {exam.prerequisites && exam.prerequisites.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Prerequisites</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {exam.prerequisites.map((prerequisite, index) => (
                      <li key={index}>{prerequisite}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What You'll Learn</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Comprehensive knowledge of {exam.title} concepts and best practices</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Industry-recognized skills validated by a respected certification</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Practical expertise applicable to real-world scenarios</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Career advancement potential with a globally recognized certification</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:border-l lg:border-gray-200 lg:pl-8">
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-gray-900">
                    ${exam.price.toFixed(2)}
                  </span>
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                
                <Button
                  variant="primary"
                  fullWidth
                  size="lg"
                  onClick={handleBookExam}
                >
                  Book This Exam
                </Button>
                
                <div className="mt-6 text-sm text-gray-500">
                  <p className="flex items-start mb-2">
                    <Clock className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Exam Duration: {exam.duration} minutes</span>
                  </p>
                  {exam.passScore && (
                    <p className="flex items-start mb-2">
                      <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Passing Score: {exam.passScore}</span>
                    </p>
                  )}
                  <p className="flex items-start">
                    <BookOpen className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Online study materials available after registration</span>
                  </p>
                </div>
              </div>
              
              <div className="border rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Available Locations</h3>
                <p className="text-gray-700 mb-2 text-sm">
                  This exam is available at {exam.availableLocations.length} testing centers.
                </p>
                <p className="text-gray-700 text-sm">
                  Complete booking to view available dates and locations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Exams */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Exams</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* This would normally show related exams based on category or other criteria */}
          <div className="bg-white rounded-lg shadow border p-6 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-lg mb-2">Microsoft Azure Administrator</h3>
            <p className="text-gray-600 text-sm mb-4">Master Azure services, security, and infrastructure management</p>
            <Link to="/exams" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View Details
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow border p-6 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-lg mb-2">CompTIA Security+</h3>
            <p className="text-gray-600 text-sm mb-4">Learn essential security concepts, tools, and procedures</p>
            <Link to="/exams" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View Details
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow border p-6 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-lg mb-2">Cisco CCNA</h3>
            <p className="text-gray-600 text-sm mb-4">Build skills in network fundamentals, security, and automation</p>
            <Link to="/exams" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamDetailsPage;