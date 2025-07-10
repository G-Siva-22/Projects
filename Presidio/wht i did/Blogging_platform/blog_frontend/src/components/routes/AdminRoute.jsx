import { Navigate, Outlet } from 'react-router-dom';
import { isAdmin } from '../../utils/auth';

const AdminRoute = () => {
  const admin = isAdmin();
  
  if (!admin) {
    return <Navigate to="/" replace />;
  }
  
  return <Outlet />;
};

export default AdminRoute;