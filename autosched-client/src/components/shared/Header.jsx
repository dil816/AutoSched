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

  return (
    <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6">
      <div className="text-2xl font-bold text-gray-800 flex items-center">
        {/*<img src="/logo.png" alt="Logo" className="w-8 h-8 mr-2" />*/}
        {title}
      </div>
      <div className="flex space-x-4">
        {user ? (
          <>
            <div
              className="text-gray-800 font-semibold"
              aria-label={`Logged in as ${user.email}`}
            >
              {user.email}
            </div>
            <button
              onClick={onLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
              aria-label="Logout"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleLoginClick}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              aria-label="Navigate to Login"
            >
              Login
            </button>
            <button
              onClick={handleSignUpClick}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
              aria-label="Navigate to Sign Up"
            >
              SignUp
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
