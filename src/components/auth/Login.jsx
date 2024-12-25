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
      console.error(
        "Email Validation Error:",
        err.response?.data || err.message
      );
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
      console.error(
        "Password Validation Error:",
        err.response?.data || err.message
      );
      setError(err.response?.data || "Invalid password");
      setShakePassword(true);
      setTimeout(() => setShakePassword(false), 500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-5">
      <img src={LogoImage} alt="Logo" className="w-52" />
      <h2 className="flex self-center text-4xl font-bold text-white">Login</h2>
      <form
        onSubmit={step === 1 ? handleEmailSubmit : handlePasswordSubmit}
        className="relative flex flex-col justify-center w-full p-3 rounded-md shadow-md md:w-[36rem]  "
      >
        <p
          className={`absolute text-sm text-red-600 transition-all duration-300 ease-out ${
            error ? "opacity-100 -top-4" : "opacity-0 -top-0"
          }`}
        >
          {error || " "}
        </p>

        <div
          className={`flex rounded-md bg-white ${
            error ? "animate-shakeX border-2 border-red-600" : "border-0"
          }`}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 text-2xl rounded-md outline-none "
          />
          {step === 1 && (
            <button
              type="submit"
              className="pr-2 text-gray-500 hover:text-gray-700"
            >
              <ArrowRightCircleIcon className="size-9" />
            </button>
          )}
        </div>

        <div
          className={`flex rounded-md bg-white overflow-hidden mt-4 transition-all duration-300 ease-in-out ${
            step === 2 ? "max-h-[200px]" : "max-h-0"  // Change height based on step
          } ${error ? "animate-shakeX border-2 border-red-600" : ""
          }` }
        >
          <input
            ref={passwordInputRef}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 text-2xl  rounded-md  outline-none" />
          {step === 2 && (
            <button
              type="submit"
              className=" text-gray-500 pr-2 hover:text-gray-700"
            >
              <ArrowRightCircleIcon className="size-9" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
