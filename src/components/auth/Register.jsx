import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationAPI from "../../apis/AuthenticationAPI";
import LogoImage from "../../assets/mrcolby-invert.png";
import InputField from "../../components/InputField";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
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
      !formData.firstName ||
      !formData.lastName ||
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
    <div className="flex items-start justify-center gap-10">
      <div className="hidden md:flex flex-col md:w-1/3 items-center justify-center gap-5 text-white">
        <img src={LogoImage} alt="Logo" className="mx-auto w-52" />

        <p className="text-center font-light text-xl">
          Welcome, traveler. Here, thou shalt enter thy name, email, and a
          secret word to mark thy place in this realm. If thou hast a fine
          portrait, share it too! When all is done, thy path forward shall be
          revealed.{" "}
        </p>
      </div>

      <div className="w-full md:w-2/6">
        <h2 className="text-4xl text-center font-bold text-white mb-5">
          Register
        </h2>
        <form
          onSubmit={handleSubmit}
          className="w-full p-4 flex flex-col gap-4 bg-white rounded shadow"
        >
          {error && <p className="text-red-500">{error}</p>}
          {success && (
            <p className="text-green-500">Registration successful!</p>
          )}

          <InputField
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <InputField
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          <InputField
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
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
          <div className="flex flex-col gap-2">
            <label htmlFor="profileImage">Profile Picture</label>
            <input
              type="file"
              name="profileImage"
              id="profileImage"
              accept="image/*"
              onChange={handleChange}
              className="w-full mb-4 file:rounded-full file:border-0 file:font-medium file:px-4 file:py-1"
            />
          </div>

          <button type="submit" className="p-2 text-white bg-[#06073b] hover:bg-[#030424] rounded">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
