import RequestHandler from "./RequestHandler";

// const componentURL = '/User';

const AuthenticationAPI = {
  // login
    login: async (email, password) => {
      const res = await RequestHandler.post(`/api/auth/login`, {
        email: email,
        password: password,
      });
  
      return res.data; 
    },

    register: async (formData) => {
      const res = await RequestHandler.post(`/api/auth/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },
    

    // Get Profile data
    getProfile: async () => {
      const res = await RequestHandler.get(`/api/auth/profile`);
      return res.data;
    },

    // Update profile data
    updateProfile: async (profileData) => {
      const res = await RequestHandler.put(`/api/auth/profile`, profileData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },

    // Validate email
    validateEmail: async (email) => {
      const res = await RequestHandler.post(`/api/auth/validate-email`, { email });
      return res.data;
    },
    
    // Validate email and password
    validatePassword: async (email, password) => {
      const res = await RequestHandler.post(`/api/auth/validate-password`, { email, password });
      return res.data;
    },
    
  };
  
  export default AuthenticationAPI;