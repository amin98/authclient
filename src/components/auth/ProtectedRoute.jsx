import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { userStatusContext } from '../contexts/UserStatus';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(userStatusContext);

  if (!user.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
