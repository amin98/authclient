import { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Login from '../components/auth/Login';
import { userStatusContext } from '../components/contexts/UserStatus';

const LoginPage = () => {
  const { user } = useContext(userStatusContext);

  // Redirect authenticated users to "/"
  if (user.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex items-center justify-center h-screen ">
      <Link to="/register" className="absolute text-white right-5 top-3">
        Register
      </Link>
      <Login />
    </div>
  );
};

export default LoginPage;
