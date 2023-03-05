import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuthContext } from "../../context/AuthContext";

import Spinner from "../UI/Others/Spinner";
import SocialAuth from "./SocialAuth";

const SignIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const { signIn } = useAuthContext();

  function handleChange(e) {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  }

  function validate() {
    const newErrors = {};
    if (!values.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!values.password) {
      newErrors.password = "Password is required";
    } else if (values.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (validate()) {
      setLoading(true);
      setServerError("");

      signIn(values.email, values.password)
        .then(() => navigate("/expenses"))
        .catch((err) => {
          setServerError(err.message);
          setLoading(false);
        });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center gap-6 mt-20 bg-white max-w-lg mx-auto rounded-lg drop-shadow-2xl p-10 font-roboto text-gray-800"
    >
      <h4 className="text-2xl font-bold text-gray-800">Sign In</h4>
      <div className="flex flex-col w-full gap-1">
        <label htmlFor="email" className="text-sm text-gray-600">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={values.email}
          placeholder="Enter email address"
          onChange={handleChange}
          className="border-gray-400 border-[1px] p-2 rounded-md text-gray-800 focus:outline-none"
        />
        <p className="text-sm text-rose-600">{errors && errors.email}</p>
      </div>
      <div className="flex flex-col w-full gap-1">
        <label htmlFor="password" className="text-sm text-gray-600">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={values.password}
          placeholder="Enter password"
          onChange={handleChange}
          className="border-gray-400 border-[1px] p-2 rounded-md text-gray-800 focus:outline-none"
        />
        <p className="text-sm text-rose-600">{errors && errors.password}</p>
      </div>

      <div className="text-end w-full text-sm text-action hover:contrast-200 duration-200">
        <Link to="/forgotPassword">Forgot Password?</Link>
      </div>

      <p className="text-sm text-rose-600">{serverError}</p>

      <div className="text-gray-800">
        Don't have an account?
        <Link
          to="/signUp"
          className="text-action hover:contrast-200 duration-200"
        >
          &nbsp;Sign Up
        </Link>
      </div>

      <button
        type="submit"
        className="w-full bg-action text-gray-50 p-2 text-lg rounded-md drop-shadow-xl hover:contrast-200 duration-200 font-medium active:scale-105"
      >
        {loading ? <Spinner /> : "Sign In"}
      </button>

      <div className="w-full flex justify-center items-center gap-2">
        <div className="h-0.5 bg-gray-200 w-full" />
        <p className="whitespace-nowrap text-sm text-gray-500">Sign In with</p>
        <div className="h-0.5 bg-gray-200 w-full" />
      </div>

      <SocialAuth />
    </form>
  );
};

export default SignIn;
