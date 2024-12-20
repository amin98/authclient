import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationAPI from "../../apis/AuthenticationAPI";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      await AuthenticationAPI.register(username, email, password);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000); // Redirect to login after success
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white rounded shadow"
      >
        <h2 className="mb-4 text-2xl font-bold">Register</h2>
        {error && <p className="mb-2 text-sm text-red-500">{error}</p>}
        {success && <p className="mb-2 text-sm text-green-500">Registration successful! Redirecting...</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
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
          className="w-full p-2 text-white bg-green-500 rounded hover:bg-green-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
