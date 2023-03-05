import React from "react";
import { useNavigate } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";

import { useAuthContext } from "../../context/AuthContext";

const SocialAuth = () => {
  const navigate = useNavigate();
  const { googleAuth } = useAuthContext();

  async function handleGoogleAuth(e) {
    e.preventDefault();

    googleAuth()
      .then(() => navigate("/expenses"))
      .catch((err) => console.log(err.message));
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleGoogleAuth}
        className="border-action border-[1px] px-4 py-1 rounded-md flex justify-center items-center gap-2 hover:contrast-200 active:scale-105 duration-200"
      >
        <FcGoogle />
        Google
      </button>
    </div>
  );
};

export default SocialAuth;
