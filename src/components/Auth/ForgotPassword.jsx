import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

import Spinner from "../UI/Others/Spinner";

const ForgotPassword = () => {
  const [values, setValues] = useState({ email: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { forgotPassword } = useAuthContext();

  function handleChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  function validate() {
    const newErrors = {};

    if (!values.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = "Email is invalid";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      setServerError("");

      forgotPassword(values.email)
        .then(() => navigate("/signIn"))
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

      <div className="text-gray-800">
        <Link
          to="/signIn"
          className="text-action hover:contrast-200 duration-200"
        >
          Sign In
        </Link>
        &nbsp;or&nbsp;
        <Link
          to="/signUp"
          className="text-action hover:contrast-200 duration-200"
        >
          Sign Up
        </Link>
      </div>

      <button
        type="submit"
        className="w-full bg-action text-gray-50 p-2 text-lg rounded-md drop-shadow-xl hover:contrast-200 duration-200 font-medium active:scale-105"
      >
        {loading ? <Spinner /> : "Submit"}
      </button>
    </form>
  );
};

export default ForgotPassword;
