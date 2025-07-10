import { useState } from 'react';
import { Menu, Bell, Sun, Moon, User } from 'lucide-react';
import { getUser } from '../../utils/auth';

const AdminHeader = ({ toggleSidebar }) => {
  const [darkMode, setDarkMode] = useState(document.documentElement.classList.contains('dark'));
  const user = getUser();

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow h-16 flex items-center z-20">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            className="text-gray-500 dark:text-gray-300 focus:outline-none lg:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white ml-4">Admin Dashboard</h1>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleTheme}
            className="text-gray-600 dark:text-gray-300 focus:outline-none"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <div className="relative">
            <button className="text-gray-600 dark:text-gray-300 focus:outline-none">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
          </div>

          <div className="flex items-center">
            {user?.profile_image ? (
              <img 
                src={user.profile_image} 
                alt={user.username} 
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <User className="h-4 w-4" />
              </div>
            )}
            <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">
              {user?.username || 'Admin'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;