import React from "react";

import Logo from "./Logo";
import Nav from "./Nav";

import { useAuthContext } from "../../../context/AuthContext";

const Header = () => {
  const { user } = useAuthContext();

  return (
    <>
      {!user ? (
        <header className="sticky w-full top-0 bg-secondary p-4">
          <div className="max-w-5xl flex justify-between items-center mx-auto">
            <div>
              <Logo />
            </div>
            <div>
              <Nav />
            </div>
          </div>
        </header>
      ) : (
        <header className="fixed right-2 md:right-5 top-2 md:top-5 z-10">
          <div>
            <Nav />
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
