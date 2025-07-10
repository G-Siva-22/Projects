import { Link } from 'react-router-dom';
import { BookOpen, Heart, Mail, Twitter, Facebook, Github as GitHub, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="md:col-span-1">
            {/* <Link to="/" className="flex items-center space-x-2 mb-4">
              <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <span className="text-lg font-bold text-gray-900 dark:text-white">BlogApp</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              A platform for sharing knowledge, ideas, and stories with the world.
            </p> */}
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            {/* <h5 className="text-gray-900 dark:text-white font-semibold mb-4">Quick Links</h5> */}
            <ul className="space-y-2">
              {/* <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">
                  Privacy Policy
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-1">
            {/* <h5 className="text-gray-900 dark:text-white font-semibold mb-4">Contact</h5>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                <Mail className="w-4 h-4 mr-2" />
                <a href="mailto:info@blogapp.com" className="hover:text-blue-600 dark:hover:text-blue-400">
                  info@blogapp.com
                </a>
              </li>
            </ul> */}
          </div>

          {/* Social */}
          <div className="md:col-span-1">
            {/* <h5 className="text-gray-900 dark:text-white font-semibold mb-4">Follow Us</h5>
            <div className="flex space-x-4">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <GitHub className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div> */}
          </div>
        </div>

        {/* <hr className="my-6 border-gray-200 dark:border-gray-700" /> */}

        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* <p className="text-gray-600 dark:text-gray-400 text-sm">
            &copy; {currentYear} BlogApp. All rights reserved.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 md:mt-0">
            Made with <Heart className="w-4 h-4 inline-block text-red-500" /> by BlogApp Team
          </p> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
