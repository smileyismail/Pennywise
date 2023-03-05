import React, { useState, useEffect, useRef } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

import useClickOutside from "../../../Hooks/useClickOutside";

import defaultAvatar from "../../../assets/defaultAvatar.jpg";

const HeaderProfile = () => {
  const [open, setOpen] = useState(false);
  let clickOutside = useClickOutside(() => setOpen(false));
  const navigate = useNavigate();
  const { user, logOut } = useAuthContext();

  function handleMenuToggle() {
    setOpen((prevState) => !prevState);
  }

  function handleLogout() {
    logOut()
      .then(() => {
        handleMenuToggle();
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <div className="relative" ref={clickOutside}>
      <button type="button" onClick={handleMenuToggle}>
        <img
          src={defaultAvatar}
          alt="profile pic"
          className="w-10 rounded-xl cursor-pointer hover:scale-105 duration-200 hover:sepia"
        />
      </button>
      {open && (
        <div className="absolute right-0 bottom-100 bg-primary rounded-lg text-blackDark font-roboto drop-shadow-xl">
          {user ? (
            <>
              <div className="py-3 px-6 hover:bg-secondary cursor-pointer duration-200 rounded-lg">
                <p className="whitespace-nowrap">{user && user.displayName}</p>
                <p className="text-xs text-blackLight">{user && user.email}</p>
              </div>

              <hr />

              <button
                onClick={handleLogout}
                className="py-3 px-8 w-full hover:bg-secondary cursor-pointer duration-200 font-medium rounded-lg active:contrast-200"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/signIn">
                <button
                  onClick={handleMenuToggle}
                  className="py-3 px-8 w-full hover:bg-secondary cursor-pointer duration-200 font-medium rounded-lg active:contrast-200 whitespace-nowrap"
                >
                  Sign In
                </button>
              </Link>
              <hr />
              <Link to="/signUp">
                <button
                  onClick={handleMenuToggle}
                  className="py-3 px-8 w-full hover:bg-secondary cursor-pointer duration-200 font-medium rounded-lg active:contrast-200 whitespace-nowrap"
                >
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderProfile;
