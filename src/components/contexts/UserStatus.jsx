import { useEffect, useReducer, createContext } from 'react';
import axios from 'axios'; 

const initialState = {
  isAuthenticated: false,
  username: null,
  error: null,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        isAuthenticated: true,
        username: action.username,
        error: null,
      };
    case "logout":
      return {
        ...state,
        isAuthenticated: false,
        username: null,
      };
    case "error":
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export const userStatusContext = createContext();

const UserStatusContextProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('/api/auth/me', { withCredentials: true });
        console.log('Auth Check Response:', res.data); // Debugging

        if (res.data.username) {
          dispatch({ type: 'login', username: res.data.username });
        }
      } catch (err) {
        console.error('Auth Check Error:', err.response?.data || err.message); // Debugging
        dispatch({ type: 'logout' }); // Ensure user is logged out if not authenticated
      }
    };

    checkAuth();
  }, []);

  return (
    <userStatusContext.Provider value={{ user, dispatch }}>
      {children}
    </userStatusContext.Provider>
  );
};

export default UserStatusContextProvider;