// autosched-client/src/components/Header.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import useAuthContext from "../../hooks/useAuthContext";
import useLogout from "../../hooks/useLogout";

function Header({ title = "AutoSched" }) {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const onLogout = () => {
    logout();
  };

  // Get user initials for avatar (if no profile image is available)
  const getInitials = (email) => {
    if (!email) return "U";
    const name = email.split("@")[0];
    return name.charAt(0).toUpperCase();
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 h-16 flex items-center justify-between px-6 shadow-lg relative z-20">
      {/* Logo/Title Section */}
      <Link to="/" className="flex items-center space-x-3">
        {/* Placeholder for Logo */}
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white text-xl font-bold">
          {title.charAt(0)}
        </div>
        <div className="text-2xl font-bold text-white drop-shadow-lg">
          {title}
        </div>
      </Link>

      {/* User Section */}
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            {/* User Info with Avatar */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-300 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {getInitials(user.email)}
              </div>
              <div
                className="text-white font-semibold hidden sm:block"
                aria-label={`Logged in as ${user.email}`}
              >
                {user.email}
              </div>
            </div>
            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              aria-label="Logout"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Login Button */}
            <button
              onClick={handleLoginClick}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              aria-label="Navigate to Login"
            >
              Login
            </button>
            {/* Sign Up Button */}
            <button
              onClick={handleSignUpClick}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              aria-label="Navigate to Sign Up"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;