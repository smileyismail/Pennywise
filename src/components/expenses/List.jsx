import React, { useEffect, useState } from "react";

import { useAuthContext } from "../../context/AuthContext";
import { onValue, ref, remove, update } from "firebase/database";
import { db } from "../../config/firebase";

import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import dummyExpenses from "../../data/dummyExpenses";

const List = () => {
  const [values, setValues] = useState({
    amount: "",
    title: "",
    type: "",
    date: "",
  });
  const [expenses, setExpenses] = useState([]);
  const [errors, setErrors] = useState({});
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      onValue(ref(db, `${user.uid}`), (snapshot) => {
        setExpenses([]);
        const data = snapshot.val();
        if (data !== null) {
          Object.values(data).map((expense) =>
            setExpenses((prevState) => [...prevState, expense])
          );
        }
      });
    }
  }, [user]);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  function handleEditModalOpen(item) {
    setEditModal(true);
    setSelectedId(item.id);
    setValues({
      ...values,
      amount: item.amount,
      title: item.title,
      type: item.type,
      date: item.date,
    });
  }
  function handleDeleteModalOpen(item) {
    setDeleteModal(true);
    setSelectedId(item.id);
  }
  function handleEditModalClose() {
    setEditModal(false);
  }
  function handleDeleteModalClose() {
    setDeleteModal(false);
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

  function handleEditSubmit(e) {
    e.preventDefault();
    if (validate()) {
      update(ref(db, `${user.uid}/${selectedId}`), { ...values });
      setEditModal(false);
    }
  }

  function handleDeleteSubmit(e) {
    e.preventDefault();
    remove(ref(db, `/${user.uid}/${selectedId}`));
    setDeleteModal(false);
  }
  return (
    <>
      <ul className="bg-secondary px-2 rounded-md font-roboto">
        {expenses.map((item) => (
          <li
            key={item.id}
            className="bg-primary p-2 rounded-md flex justify-between my-2"
          >
            <div className="flex justify-center items-center gap-4">
              <div className="bg-blackLight min-w-[5rem] md:min-w-[6rem] min-h-[5rem] md:min-h-[6rem] text-primary font-medium rounded-md p-2 flex justify-center items-center flex-col text-base">
                <p>{new Date(item.date).getDate()}</p>
                <p>
                  {new Date(item.date).toLocaleString("default", {
                    month: "long",
                  })}
                </p>
                <p>{new Date(item.date).getFullYear()}</p>
              </div>
              <h5 className="text-xl md:text-3xl max-w-[60%] mr-auto font-bold text-blackMedium ">
                {item.title}
              </h5>
            </div>

            <div className="flex flex-col justify-center items-end gap-2">
              <h5 className="p-2 text-xl  md:text-2xl bg-secondary rounded-md font-bold text-blackDark whitespace-nowrap">
                <span
                  className={`${
                    item.type === "-" ? "text-rose-600" : "text-emerald-600"
                  }`}
                >
                  {item.type}&nbsp;
                </span>
                {item.amount} ₹
              </h5>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleEditModalOpen(item)}
                  className="bg-action p-1 rounded-md drop-shadow-xl hover:contrast-200 duration-200 font-medium active:scale-105"
                >
                  <MdOutlineEdit className="text-primary text-md md:text-xl" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteModalOpen(item)}
                  className="bg-action p-1 rounded-md drop-shadow-xl hover:contrast-200 duration-200 font-medium active:scale-105"
                >
                  <MdOutlineDelete className="text-rose-400 text-md md:text-xl" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* edit Modal */}
      {editModal && (
        <div className="absolute z-50 top-0 left-0 w-screen h-screen bg-black/[0.7] flex justify-center items-center p-4">
          <form
            onSubmit={handleEditSubmit}
            className="flex flex-col justify-center items-center gap-6 bg-white w-full max-w-lg mx-auto rounded-lg drop-shadow-2xl p-5 md:p-10 font-roboto text-gray-800"
          >
            <h4 className="text-2xl font-bold text-gray-800">Edit Expense</h4>
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
                onClick={handleEditModalClose}
                className="w-full bg-action text-gray-50 py-2 px-4 text-lg rounded-md drop-shadow-xl hover:contrast-200 duration-200 font-medium active:scale-105"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full bg-action text-gray-50 py-2 px-4 text-lg rounded-md drop-shadow-xl hover:contrast-200 duration-200 font-medium active:scale-105"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {deleteModal && (
        <div className="absolute z-50 top-0 left-0 w-screen h-screen bg-black/[0.7] flex justify-center items-center p-4">
          <form
            onSubmit={handleDeleteSubmit}
            className="flex flex-col justify-center items-center gap-6 bg-white w-full max-w-lg mx-auto rounded-lg drop-shadow-2xl p-5 md:p-10 font-roboto text-gray-800"
          >
            <h4 className="text-2xl font-bold text-gray-800">
              Confirm delete?
            </h4>

            <div className="flex gap-4 ml-auto">
              <button
                type="button"
                onClick={handleDeleteModalClose}
                className="w-full bg-action text-gray-50 py-2 px-4 text-lg rounded-md drop-shadow-xl hover:contrast-200 duration-200 font-medium active:scale-105"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full bg-action text-rose-500 py-2 px-4 text-lg rounded-md drop-shadow-xl hover:contrast-200 duration-200 font-medium active:scale-105"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default List;
