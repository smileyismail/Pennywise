import React, { useState } from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(values);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center gap-8 mt-20"
    >
      <input
        type="password"
        name="password"
        value={values.password}
        placeholder="passoword"
        onChange={handleChange}
      />
      <input
        type="password"
        name="confirmPassword"
        value={values.confirmPassword}
        placeholder="confirm passwork"
        onChange={handleChange}
      />

      <Link to="/auth/login">Already have an account?</Link>

      <button type="submit">Register</button>
    </form>
  );
};

export default ResetPassword;
