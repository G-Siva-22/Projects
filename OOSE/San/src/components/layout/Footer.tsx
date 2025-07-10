import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">ExamPro</span>
            </div>
            <p className="mt-4 text-gray-400 text-sm">
              The leading platform for certification exam registration and management. 
              Simplifying the process for students and exam administrators since 2022.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/exams" className="text-gray-400 hover:text-blue-400 transition-colors">Browse Exams</Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-blue-400 transition-colors">Dashboard</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-blue-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-blue-400 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          {/* Exam Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Exam Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/exams?category=cloud" className="text-gray-400 hover:text-blue-400 transition-colors">Cloud Computing</Link>
              </li>
              <li>
                <Link to="/exams?category=security" className="text-gray-400 hover:text-blue-400 transition-colors">Cybersecurity</Link>
              </li>
              <li>
                <Link to="/exams?category=networking" className="text-gray-400 hover:text-blue-400 transition-colors">Networking</Link>
              </li>
              <li>
                <Link to="/exams?category=programming" className="text-gray-400 hover:text-blue-400 transition-colors">Programming</Link>
              </li>
              <li>
                <Link to="/exams?category=data" className="text-gray-400 hover:text-blue-400 transition-colors">Data Science</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  123 Certification Way<br />
                  San Francisco, CA 94107
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />
                <span className="text-gray-400">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />
                <span className="text-gray-400">support@exampro.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} ExamPro. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/terms" className="text-gray-400 hover:text-blue-400 text-sm">Terms of Service</Link>
            <Link to="/privacy" className="text-gray-400 hover:text-blue-400 text-sm">Privacy Policy</Link>
            <Link to="/cookies" className="text-gray-400 hover:text-blue-400 text-sm">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;