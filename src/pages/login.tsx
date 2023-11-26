import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../context/auth-context";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async () => {
    if (email && password) {
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_API_PATH}/auth/login`,
        {
          email,
          password,
        }
      );
      const { user, message, noError } = response.data;
      if (message) {
        if (noError) {
          toast.success(message);
        } else {
          toast.error(message);
        }
      }

      if (user) {
        login(user);
        navigate("/");
      }
    } else {
      toast.error("Both Email and Password must be provided!");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-5 sm:p-10">
      <h1 className="text-4xl font-bold">Login</h1>
      <div className="w-full max-w-xs py-10 space-y-4 form-control">
        <div>
          <label className="label">
            <span className="text-gray-700 label-text sm:text-lg">Email</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
                return;
              }
            }}
            placeholder="Type your email here"
            className="w-full max-w-xs dark:bg-gray-700/80 bg-gray-200/80 input input-bordered"
          />
        </div>
        <div>
          <label className="label">
            <span className="text-gray-700 label-text sm:text-lg">
              Password
            </span>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
                return;
              }
            }}
            placeholder="Type your password here"
            className="w-full max-w-xs dark:bg-gray-700/80 bg-gray-200/80 input input-bordered"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full mt-8 sm:w-1/2 sm:self-start btn btn-primary"
        >
          Submit
        </button>
      </div>

      <span>
        First time here? Click to{" "}
        <Link className="font-semibold text-blue-400 underline" to={"/signup"}>
          Sign Up
        </Link>
      </span>
    </div>
  );
}
