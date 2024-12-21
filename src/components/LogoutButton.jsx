import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { userStatusContext } from './contexts/UserStatus';
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/solid';
import axios from 'axios';

const LogoutButton = () => {
  const { dispatch } = useContext(userStatusContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      dispatch({ type: "logout" });
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="p-2 bg-gray-700 rounded-full hover:bg-gray-400"
    >
      <ArrowRightStartOnRectangleIcon className="w-5 h-5 text-white" />
    </button>
  );
};

export default LogoutButton;
