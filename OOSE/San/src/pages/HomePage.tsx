import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Award, MapPin, Calendar, CheckCircle, Shield, BookOpen } from 'lucide-react';
import { useExams } from '../context/ExamContext';
import ExamCard from '../components/exams/ExamCard';
import Button from '../components/common/Button';

const HomePage: React.FC = () => {
  const { exams } = useExams();
  
  // Get featured exams (top 3)
  const featuredExams = exams.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 animate-fade-in">
                Your Path to Certification Excellence
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-lg">
                Register for professional certification exams on our secure, user-friendly platform. Select dates, locations, and make secure payments in minutes.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/exams">
                  <Button 
                    variant="primary" 
                    size="lg"
                    className="bg-white text-blue-700 hover:bg-blue-50"
                    icon={<Search className="h-5 w-5" />}
                  >
                    Browse Exams
                  </Button>
                </Link>
                <Link to="/register">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="bg-transparent border-white text-white hover:bg-blue-700"
                  >
                    Create Account
                  </Button>
                </Link>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-yellow-400 rounded-lg transform rotate-6 opacity-70"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-400 rounded-full transform opacity-70"></div>
                <img 
                  src="https://images.pexels.com/photos/6238120/pexels-photo-6238120.jpeg" 
                  alt="Student preparing for exam" 
                  className="relative z-10 rounded-lg shadow-xl object-cover object-center w-full max-w-md h-80 md:h-96"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose ExamPro?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We've simplified the exam registration process with these key features
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Calendar className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600">
                Choose from multiple dates and times that fit your calendar. Our interactive scheduler shows real-time availability.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <MapPin className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Convenient Locations</h3>
              <p className="text-gray-600">
                Access testing centers near you with our location-based search. Find the perfect venue for your exam.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Shield className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Payments</h3>
              <p className="text-gray-600">
                Make payments with confidence through our encrypted payment system supporting multiple payment methods.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <CheckCircle className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Confirmation</h3>
              <p className="text-gray-600">
                Receive immediate confirmation of your registration, including all exam details and preparation instructions.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Award className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Top Certifications</h3>
              <p className="text-gray-600">
                Access industry-leading certifications across IT, business, healthcare, and many other professional fields.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <BookOpen className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Study Resources</h3>
              <p className="text-gray-600">
                Get recommended study materials and resources to help you prepare effectively for your certification exam.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Exams Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Exams</h2>
              <p className="text-lg text-gray-600">
                Explore our most popular certification exams
              </p>
            </div>
            <Link to="/exams">
              <Button variant="outline">
                View All Exams
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredExams.map(exam => (
              <ExamCard key={exam.id} exam={exam} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to advance your career?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-xl mx-auto">
            Register today and take the next step toward professional certification and career advancement.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/exams">
              <Button 
                variant="primary" 
                size="lg"
                className="bg-white text-blue-700 hover:bg-blue-50"
              >
                Get Started
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                variant="outline" 
                size="lg"
                className="bg-transparent border-white text-white hover:bg-blue-700"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from professionals who have successfully used our platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg" 
                  alt="John Smith" 
                  className="h-12 w-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-lg font-semibold">John Smith</h4>
                  <p className="text-sm text-gray-500">AWS Solutions Architect</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The registration process was incredibly smooth. I was able to find a convenient location and time for my AWS certification exam. Highly recommended!"
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg" 
                  alt="Sarah Johnson" 
                  className="h-12 w-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-lg font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500">Cybersecurity Specialist</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "ExamPro made it easy to register for my CISSP exam. The payment process was secure, and I received my confirmation immediately. Great service!"
              </p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" 
                  alt="Michael Chen" 
                  className="h-12 w-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-lg font-semibold">Michael Chen</h4>
                  <p className="text-sm text-gray-500">Network Engineer</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "I've used ExamPro for multiple certifications. The dashboard keeps track of all my exams, and the reminders ensure I never miss a test date. Fantastic platform!"
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;