import { useState, useContext, useRef } from "react";
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
  const [shakeEmail, setShakeEmail] = useState(false); 
  const [shakePassword, setShakePassword] = useState(false); 
  const passwordInputRef = useRef(null); // Ref for password input
  const { dispatch } = useContext(userStatusContext);
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setShakeEmail(false);

    try {
      const res = await AuthenticationAPI.validateEmail(email);
      console.log("Email Validation Response:", res);

      if (res?.valid) {
        setStep(2);
        passwordInputRef.current?.focus(); // Focus on password input
      } else {
        setError("Invalid email");
        setShakeEmail(true);
        setTimeout(() => setShakeEmail(false), 500);
      }
    } catch (err) {
      console.error("Email Validation Error:", err.response?.data || err.message);
      setError(err.response?.data || "Invalid email");
      setShakeEmail(true);
      setTimeout(() => setShakeEmail(false), 500);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setShakePassword(false);

    try {
      const res = await AuthenticationAPI.validatePassword(email, password);

      if (res?.username) {
        dispatch({ type: "login", username: res.username });
        navigate("/");
      } else {
        setError("Invalid password");
        setShakePassword(true);
        setTimeout(() => setShakePassword(false), 500);
      }
    } catch (err) {
      console.error("Password Validation Error:", err.response?.data || err.message);
      setError(err.response?.data || "Invalid password");
      setShakePassword(true);
      setTimeout(() => setShakePassword(false), 500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-5">
      <img src={LogoImage} alt="Logo" className="w-36 " />
      <h2 className="flex self-center mb-4 text-2xl font-bold text-white">Login</h2>
      <form
        onSubmit={step === 1 ? handleEmailSubmit : handlePasswordSubmit}
        className="flex flex-col justify-center w-full p-3 rounded-md shadow-md md:w-96 "
      >
        {/* Email Input */}
        <div className={`flex rounded-md bg-white ${shakeEmail ? "animate-shakeX" : ""}`}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded-md outline-none "
          />
          {step === 1 && (
            <button
              type="submit"
              className="mr-1 text-gray-500 hover:text-gray-700"
            >
              <ArrowRightCircleIcon className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Password Input */}
        <div
          className={`relative overflow-hidden transition-all duration-300 ease-in-out ${
            step === 2 ? "max-h-[200px]" : "max-h-0"
          }`}
        >
          <input
            ref={passwordInputRef} // Attach ref to password input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-2 border rounded-md mt-2 outline-none ${
              shakePassword ? "animate-shakeX" : ""
            }`}
          />
          {step === 2 && (
            <button
              type="submit"
              className="absolute text-gray-500 -translate-y-1/2 mt-[29px] right-2 hover:text-gray-700"
            >
              <ArrowRightCircleIcon className="w-6 h-6" />
            </button>
          )}
        </div>

        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
