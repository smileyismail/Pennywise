import React, { useState } from "react";

import { set, ref } from "firebase/database";
import { db } from "../../config/firebase";
import { useAuthContext } from "../../context/AuthContext";
import { uid } from "uid";

import { BsPlus } from "react-icons/bs";

const initialValues = {
  amount: "",
  title: "",
  type: "",
  date: "",
};

const AddNew = () => {
  const [values, setValues] = useState(initialValues);
  const [isModalOpen, setIsModelOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const { user } = useAuthContext();

  function handleChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  function handleModelOpen() {
    setIsModelOpen(true);
  }
  function handleModelClose() {
    setIsModelOpen(false);
  }

  function validate() {
    const newErrors = {};

    if (!values.amount) {
      newErrors.amount = "Enter some amount";
    }
    if (!values.title) {
      newErrors.title = "Enter a title";
    }
    if (!values.type) {
      newErrors.type = "Select Transaction type";
    }
    if (!values.date) {
      newErrors.date = "Select a date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (validate()) {
      const id = uid();
      set(ref(db, `/${user.uid}/${id}`), { ...values, id: id })
        .then(() => {
          setIsModelOpen(false);
          setValues(initialValues);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  return (
    <div className="flex justify-center p-0 md:p-2 rounded-md">
      <button
        type="button"
        onClick={handleModelOpen}
        className="hidden md:block bg-action text-gray-50 text-sm py-2 px-4 sm:text-lg rounded-md drop-shadow-xl hover:contrast-200 duration-200 font-medium active:scale-105 whitespace-nowrap"
      >
        Add New Expense
      </button>
      <button
        type="button"
        onClick={handleModelOpen}
        className="fixed bottom-5 right-5 bg-action text-gray-50 p-4  rounded-full drop-shadow-xl hover:contrast-200 duration-200 active:scale-105"
      >
        <BsPlus className="text-2xl" />
      </button>

      {/* add modal */}
      {isModalOpen && (
        <div className="absolute z-50 top-0 left-0 w-screen h-screen bg-black/[0.7] flex justify-center items-center p-4">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center gap-6 bg-white w-full max-w-lg mx-auto rounded-lg drop-shadow-2xl p-5 md:p-10 font-roboto text-gray-800"
          >
            <h4 className="text-2xl font-bold text-gray-800">
              Add New Expense
            </h4>
            <div className="flex flex-col w-full gap-1">
              <label
                htmlFor="amount"
                className="text-sm font-medium text-gray-600"
              >
                Amount
              </label>
              <input
                type="number"
                name="amount"
                value={values.amount}
                placeholder="Enter amount"
                step="10"
                onChange={handleChange}
                className="border-gray-400 border-[1px] p-2 rounded-md text-gray-800 focus:outline-none"
              />
              <p className="text-sm text-rose-600">{errors && errors.amount}</p>
            </div>

            <div className="flex flex-col w-full gap-1">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-600"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                value={values.title}
                placeholder="Enter title"
                onChange={handleChange}
                className="border-gray-400 border-[1px] p-2 rounded-md text-gray-800 focus:outline-none"
              />
              <p className="text-sm text-rose-600">{errors && errors.title}</p>
            </div>
            <div className="flex flex-col w-full gap-1">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-600"
              >
                Type
              </label>
              <select
                name="type"
                value={values.type}
                placeholder="Enter title"
                onChange={handleChange}
                className="border-gray-400 border-[1px] p-2 rounded-md text-gray-800 focus:outline-none"
              >
                <option value="">--Select Type--</option>
                <option value="+">Income</option>
                <option value="-">Expense</option>
              </select>

              <p className="text-sm text-rose-600">{errors && errors.type}</p>
            </div>

            <div className="flex flex-col w-full gap-1">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-600"
              >
                Date
              </label>
              <input
                type="date"
                name="date"
                value={values.date}
                onChange={handleChange}
                className="border-gray-400 border-[1px] p-2 rounded-md text-gray-800 focus:outline-none"
              />
              <p className="text-sm text-rose-600">{errors && errors.date}</p>
            </div>

            <div className="flex gap-4 ml-auto">
              <button
                type="button"
                onClick={handleModelClose}
                className="w-full bg-action text-gray-50 py-2 px-4 text-lg rounded-md drop-shadow-xl hover:contrast-200 duration-200 font-medium active:scale-105"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full bg-action text-gray-50 py-2 px-4 text-lg rounded-md drop-shadow-xl hover:contrast-200 duration-200 font-medium active:scale-105"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddNew;
