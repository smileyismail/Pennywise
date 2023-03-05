import React from "react";
import { Link } from "react-router-dom";

import HeaderProfile from "./HeaderProfile";

const Header = () => {
  return (
    <header className="sticky top-0 w-screen bg-secondary py-4 px-4">
      <div className="max-w-5xl flex justify-between items-center mx-auto content-center">
        <h3 className="text-3xl font-archivo text-blackDark hover:text-blackLight duration-200 hover:scale-105">
          <Link to="/">$ Pennywise</Link>
        </h3>
        <div>
          <HeaderProfile />
        </div>
      </div>
    </header>
  );
};

export default Header;
