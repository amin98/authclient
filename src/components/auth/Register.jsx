import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationAPI from "../../apis/AuthenticationAPI";
import LogoImage from "../../assets/mrcolby-invert.png";
import InputField from "../../components/InputField";

const Register = () => {
  const [formData, setFormData] = useState({

    username: "",
    email: "",
    password: "",
    bio: "",
    profileImage: null,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (
      !formData.username ||
      !formData.email ||
      !formData.password
    ) {
      setError("All fields are required");
      return;
    }

    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }

      await AuthenticationAPI.register(data); // Send FormData
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000); // Redirect after success
    } catch (err) {
      setError(err.response?.data || "Registration failed");
    }
  };

  return (
    <div className="grid items-start justify-center grid-cols-1 gap-10 md:grid-cols-4">
      {/* Logo Section */}
      <div className="items-center justify-center hidden col-span-2 gap-5 text-white md:grid">
        <img src={LogoImage} alt="Logo" className="w-40 mx-auto" />
        <div className="flex flex-col gap-3 text-xl font-light text-start text-pretty">
        <span>
            Hello, <strong>{formData.username || "friend"}</strong>, your journey calls, <br /> Share your name within these walls.
          </span>     
          <span>Choose a phrase to guard your stay, <br />A token to keep the world at bay.</span>
    
          <span>Offer a glimpse of what you represent, <br/>Marking the start of a journey well-spent.</span>
  
          <span>When all is ready, step through the gate, <br />Your path awaits, go shape your fate.</span>
        </div>
          <span className="mt-5">Mr. Colby</span>
      </div>
  
      {/* Register Form Section */}
      <div className="col-span-1 md:col-span-2">
        <h2 className="mb-5 text-4xl font-bold text-center text-white">
          Register
        </h2>
        <form
          onSubmit={handleSubmit}
          className="w-full p-4 grid gap-4 bg-[#f5f5f5] rounded shadow"
        >
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">Registration successful!</p>}
  
          {/* Input Fields */}

          <InputField
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            maxLength={14}
          />
          <div className="grid gap-2">
            <textarea
              name="bio"
              placeholder="Describe yourself in 1 sentence..."
              value={formData.bio}
              onChange={handleChange}
              className="w-full p-2 border rounded resize-none focus:outline-none focus:ring-1 focus:ring-blue-900"
            />
          </div>
          <InputField
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputField
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <div className="grid gap-2">
            <label htmlFor="profileImage">Profile Picture</label>
            <input
              type="file"
              name="profileImage"
              id="profileImage"
              accept="image/*"
              onChange={handleChange}
              className="w-full file:bg-gray-300 file:rounded-full file:border-0 file:font-medium file:px-4 file:py-1"
            />
          </div>
  
          {/* Submit Button */}
          <button
            type="submit"
            className="p-2 text-white bg-[#06073b] hover:bg-[#030424] rounded"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
