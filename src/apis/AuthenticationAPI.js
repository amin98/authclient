import RequestHandler from "./RequestHandler";

// const componentURL = '/User';

const AuthenticationAPI = {
    login: async (email, password) => {
      const res = await RequestHandler.post(`/api/auth/login`, {
        email: email,
        password: password,
      });
  
      return res.data; // Assuming the token is in res.data
    },
  
    register: async (username, email, password) => {
      const res = await RequestHandler.post(`/api/auth/register`, {
        username: username,
        email: email,
        password: password,
      });
  
      return res.data;
    },
  };
  
  export default AuthenticationAPI;
  