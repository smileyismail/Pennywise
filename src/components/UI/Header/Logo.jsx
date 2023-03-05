import React from "react";

import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div>
      <h3 className="text-2xl sm:text-3xl font-archivo text-blackDark hover:text-blackLight duration-200 hover:scale-105 whitespace-nowrap">
        <Link to="/">$ Pennywise</Link>
      </h3>
    </div>
  );
};

export default Logo;
