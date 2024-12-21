import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userStatusContext } from "../contexts/UserStatus";
import AuthenticationAPI from "../../apis/AuthenticationAPI";
import LogoImage from "../../assets/mrcolby-invert.png";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";

const Login = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [shakeEmail, setShakeEmail] = useState(false); // Add state for shake animation
  const [shakePassword, setShakePassword] = useState(false); // Add state for shake animation
  const { dispatch } = useContext(userStatusContext);
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setShakeEmail(false);
  
    try {
      const res = await AuthenticationAPI.validateEmail(email);
      console.log("Email Validation Response:", res);
  
      if (res?.valid) { // Ensure 'valid' is returned and true
        setStep(2);
      } else {
        setError("Invalid email");
        setShakeEmail(true);
        setTimeout(() => setShakeEmail(false), 500); // Reset shake state after animation
      }
    } catch (err) {
      console.error("Email Validation Error:", err.response?.data || err.message);
      setError(err.response?.data || "Invalid email");
      setShakeEmail(true); // Shake on API error
      setTimeout(() => setShakeEmail(false), 500); // Reset shake state after animation
    }
  };
  
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setShakePassword(false);
  
    try {
      const res = await AuthenticationAPI.validatePassword(email, password);
  
      if (res?.username) { // Ensure 'username' exists in response
        dispatch({ type: "login", username: res.username });
        navigate("/");
      } else {
        setError("Invalid password");
        setShakePassword(true);
      }
    } catch (err) {
      setError(err.response?.data || "Invalid password");
      setShakePassword(true); // Shake on API error
    }
  };
  
  


  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      [<img src={LogoImage} alt="Logo" className="w-36 " />]
      <form
        onSubmit={step === 1 ? handleEmailSubmit : handlePasswordSubmit}
        className="flex flex-col justify-center w-full p-6 rounded shadow"
      >
        <h2 className="flex self-center mb-4 text-2xl font-bold text-white">
          Login
        </h2>
        {/* {error && <p className="mb-2 text-sm text-red-500">{error}</p>} */}
        <div className="relative ">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-2 mb-2 border rounded outline-none ${
              shakeEmail ? "animate-shakeX " : ""
            }`}
          />
          {step === 1 && (
            <button
              type="submit"
              className="absolute text-gray-500 -translate-y-1/2 mt-[21px] right-2 hover:text-gray-700"
            >
              <ArrowRightCircleIcon className="w-6 h-6" />
            </button>
          )}
        </div>
        {step === 2 && (
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-2 mb-4 border rounded outline-none ${
                shakePassword ? "animate-shakeX" : ""
              }`}
            />
            <button
              type="submit"
              className="absolute text-gray-500 -translate-y-1/2 mt-[21px] right-2 hover:text-gray-700"
            >
              <ArrowRightCircleIcon className="w-6 h-6" />
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
