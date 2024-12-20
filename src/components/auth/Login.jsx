import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userStatusContext } from "../contexts/UserStatus";
import AuthenticationAPI from "../../apis/AuthenticationAPI";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { dispatch } = useContext(userStatusContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await AuthenticationAPI.login(email, password);

      if (!res || !res.token) {
        throw new Error("Authentication failed"); // Guard against unexpected API behavior
      }
      
      localStorage.setItem("token", res.token);
      dispatch({ type: "login", token: res.token, username: res.username });
      navigate("/");
    } catch (err) {
      setError(err.response?.data || "Invalid email or password");
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="max-w-md p-6 mx-auto bg-white rounded shadow">
      <h2 className="mb-4 text-2xl font-bold">Login</h2>
      {error && <p className="mb-2 text-sm text-red-500">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <button
        type="submit"
        className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
