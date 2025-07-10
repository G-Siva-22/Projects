import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Tag, BookOpen, Settings, 
  ChevronLeft, ChevronRight, LogOut 
} from 'lucide-react';
import { removeAuth } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminSidebar = ({ open, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAuth();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <div 
      className={`bg-gray-800 text-white h-screen ${open ? 'w-64' : 'w-20'} transition-all duration-300 
      fixed top-0 left-0 z-30 md:relative`}
    >
      <div className="flex items-center justify-between p-5 border-b border-gray-700">
        <Link to="/admin" className="flex items-center">
          <BookOpen className="h-8 w-8 text-blue-400" />
          {open && <span className="ml-2 font-bold text-xl">Admin</span>}
          }
        </Link>
        <button 
          onClick={toggleSidebar}
          className="text-gray-300 hover:text-white"
        >
          {open ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </button>
      </div>

      <nav className="mt-5 px-2">
        <Link 
          to="/admin" 
          className={`flex items-center px-4 py-3 rounded-md mb-2 transition-colors ${
            isActive('/admin') && !isActive('/admin/categories') && !isActive('/admin/users')
              ? 'bg-blue-700 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          <LayoutDashboard className="h-5 w-5" />
          {open && <span className="ml-3">Dashboard</span>}
          }
        </Link>

        <Link 
          to="/admin/categories" 
          className={`flex items-center px-4 py-3 rounded-md mb-2 transition-colors ${
            isActive('/admin/categories')
              ? 'bg-blue-700 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          <Tag className="h-5 w-5" />
          {open && <span className="ml-3">Categories</span>}
          }
        </Link>

        <Link 
          to="/admin/users" 
          className={`flex items-center px-4 py-3 rounded-md mb-2 transition-colors ${
            isActive('/admin/users')
              ? 'bg-blue-700 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          <Users className="h-5 w-5" />
          {open && <span className="ml-3">Users</span>}
          }
        </Link>

        <Link 
          to="/admin/settings" 
          className={`flex items-center px-4 py-3 rounded-md mb-2 transition-colors ${
            isActive('/admin/settings')
              ? 'bg-blue-700 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          <Settings className="h-5 w-5" />
          {open && <span className="ml-3">Settings</span>}
          }
        </Link>
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
        <button 
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
        >
          <LogOut className="h-5 w-5" />
          {open && <span className="ml-3">Logout</span>}
          }
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;