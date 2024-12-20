import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Login from '../components/auth/Login';
import { userStatusContext } from '../components/contexts/UserStatus';

const LoginPage = () => {
  const { user } = useContext(userStatusContext);

  // Redirect authenticated users to "/"
  if (user.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex items-center justify-center h-full">
      <Login />
    </div>
  );
};

export default LoginPage;
