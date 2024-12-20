import { useEffect, useReducer, createContext } from 'react';
import  {jwtDecode}  from 'jwt-decode';

const initialState = {
  isAuthenticated: false,
  token: null,
  username: null,
  error: null,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "login":
      if (action.token) {
        return {
          ...state,
          isAuthenticated: true,
          token: action.token,
          username: action.username,
          error: null,
        };
      }
      return { ...state, error: "Login failed" };
    case "logout":
      return {
        ...state,
        isAuthenticated: false,
        token: null,
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
    // Rehydrate state on app load
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token); 
        const currentTime = Date.now() / 1000;
        if (decoded.exp > currentTime) {
          dispatch({
            type: 'login',
            token,
            username: decoded.username, 
          });
        } else {
          localStorage.removeItem('token'); 
        }
      } catch (err) {
        console.error('Invalid token:', err);
        localStorage.removeItem('token'); 
      }
    }
  }, []);

  useEffect(() => {
    if (user.token) {
      localStorage.setItem('token', user.token);
    } else {
      localStorage.removeItem('token');
    }
  }, [user.token]);

  return (
    <userStatusContext.Provider value={{ user, dispatch }}>
      {children}
    </userStatusContext.Provider>
  );
};

export default UserStatusContextProvider;
