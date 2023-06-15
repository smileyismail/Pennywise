import React from "react";

import { Link } from "react-router-dom";

import moneyGif from "../../assets/money.gif";
import { useAuthContext } from "../../context/AuthContext";

const Hero = () => {
  const { user } = useAuthContext();
  return (
    <section className="max-h-screen overflow-hidden max-w-6xl mx-auto p-10 pt-16 md:pt-32">
      <div className="w-full flex flex-col md:flex-row justify-between items-center">
        <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-start gap-7">
          <h1 className="text-5xl md:text-6xl text-blackLight font-semibold">
            Take Control of Your
            <span className="text-action"> Finances</span>
          </h1>
          <p className="text-lg md:text-xl text-blackLight">
            Track Your Spending and Save Money with My Easy-to-Use Expense
            Tracking App
          </p>

          {user ? (
            <Link to="/expenses" className="w-fit mx-auto md:mx-0">
              <button
                type="button"
                className="bg-action text-gray-50 text-sm py-2 px-4 sm:text-lg rounded-md drop-shadow-xl hover:contrast-200 duration-200 font-medium active:scale-105 whitespace-nowrap"
              >
                Go to Expenses
              </button>
            </Link>
          ) : (
            <Link to="/signUp" className="w-fit mx-auto md:mx-0">
              <button
                type="button"
                className="bg-action text-gray-50 text-sm py-2 px-4 sm:text-lg rounded-md drop-shadow-xl hover:contrast-200 duration-200 font-medium active:scale-105 whitespace-nowrap"
              >
                Get Started
              </button>
            </Link>
          )}

          <div className="flex justify-center items-start w-fit md:hidden mx-auto">
            <img src={moneyGif} alt="illustration" />
          </div>
        </div>

        <div className="hidden md:block w-fit scale-125">
          <img src={moneyGif} alt="illustration" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
