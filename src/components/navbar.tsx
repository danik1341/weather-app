import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="z-[999] relative">
      <div className="navbar bg-gray-400/30 fixed top-0 bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] dark:bg-gray-950 dark:border-black/40 dark:bg-opacity-75">
        <div className="flex-1">
          <Link to="/" className="text-xl btn btn-ghost">
            WeatherLi
          </Link>
        </div>

        {user ? (
          <div className="px-2 space-x-2">
            <span>{user && user.email}</span>
            <button
              onClick={handleLogout}
              className="border border-gray-600 btn btn-ghost btn-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex-none">
            <ul className="px-1 menu menu-horizontal">
              <li className="text-base btn btn-sm sm:btn-md btn-info dark:btn-error">
                <Link to="/login">Get Started</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
