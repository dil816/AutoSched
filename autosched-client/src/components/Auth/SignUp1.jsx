// autosched-client/src/components/SignUp1.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSignup from "../../hooks/usesignup";

const SignUp1 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "",
  });
  const [success, setSuccess] = useState(null);
  const { signup, error, isLoading } = useSignup();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSignup = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!formData.username || formData.username.length < 3) {
      alert("Username must be at least 3 characters long.");
      return;
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!formData.password || formData.password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    if (!formData.firstName || formData.firstName.length < 2) {
      alert("First name must be at least 2 characters long.");
      return;
    }
    if (!formData.lastName || formData.lastName.length < 2) {
      alert("Last name must be at least 2 characters long.");
      return;
    }
    // if (!formData.role) {
    //   alert("Please select a role.");
    //   return;
    // }

    // Call the signup function with all fields
    await signup(
      formData.username,
      formData.email,
      formData.password,
      formData.firstName,
      formData.lastName,
      parseInt(formData.role)
    );

    // If signup is successful, show a success message
    if (!error) {
      setSuccess("Account created successfully! Redirecting to login...");
    }
  };

  // Redirect after 2 seconds if signup is successful
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 2000);
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [success, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 animate-pulse"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

      {/* Form Container */}
      <div className="relative z-10 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-white/20">
        <h2 className="text-3xl font-bold text-center mb-6 text-white drop-shadow-lg">
          Sign Up
        </h2>
        <p className="text-center text-gray-200 mb-8">
          Create your account with your credentials
        </p>
        <form onSubmit={handleSignup} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-100 mb-2"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/20 border border-gray-300/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-100 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/20 border border-gray-300/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-100 mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/20 border border-gray-300/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-100 mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/20 border border-gray-300/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                placeholder="Enter your last name"
              />
            </div>
            {/* <div className="col-span-1 md:col-span-2">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-100 mb-2"
              >
                Role
              </label>
              <select
                name="role"
                id="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/20 border border-gray-300/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
              >
                <option value="" className="text-gray-400">
                  Select Role
                </option>
                <option value="1" className="text-black">
                  Admin
                </option>
                <option value="2" className="text-black">
                  Examiner
                </option>
                <option value="3" className="text-black">
                  Student
                </option>
              </select>
            </div> */}
            <div className="col-span-1 md:col-span-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-100 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/20 border border-gray-300/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <button
            disabled={isLoading}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
          {success && (
            <div className="p-3 bg-green-100/80 border border-green-500 text-green-600 rounded-lg mt-4 text-center animate-fadeIn">
              {success}
            </div>
          )}
          {error && (
            <div className="p-3 bg-red-100/80 border border-red-500 text-red-600 rounded-lg mt-4 text-center">
              {error}
            </div>
          )}
        </form>
        <div className="text-center mt-6 text-sm text-gray-200">
          Already have an account?{" "}
          <Link
            className="text-purple-300 hover:text-purple-200 transition-colors duration-200"
            to="/login"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp1;
