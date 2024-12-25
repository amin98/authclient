import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Register from '../components/auth/Register';
import { userStatusContext } from '../components/contexts/UserStatus';

const RegisterPage = () => {
  const { user } = useContext(userStatusContext);

  // Redirect authenticated users to "/"
  if (user.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex items-center justify-center"
    style={{ minHeight: "calc(100vh - 92px)" }} >
      <Register />
    </div>
  );
};

export default RegisterPage;