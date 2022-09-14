import React, { useState } from "react";

import "./App.css";

import Expenses from "./Components/Expenses";
import NewExpenseForm from "./Components/NewExpenseForm";

const dummyExpenses = [
  {
    id: 1,
    title: "Recharge",
    amount: 199,
    date: new Date(2022, 3, 15),
  },
  {
    id: 2,
    title: "Recharge",
    amount: 600,
    date: new Date(2021, 6, 15),
  },
  {
    id: 3,
    title: "Recharge",
    amount: 129,
    date: new Date(2020, 1, 15),
  },
  {
    id: 8,
    title: "Recharge",
    amount: 799,
    date: new Date(2029, 4, 15),
  },
  {
    id: 9,
    title: "Recharge",
    amount: 1009,
    date: new Date(2017, 0, 15),
  },
];

const App = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [expenses, setExpenses] = useState(dummyExpenses);

  const addExpenseHandler = (expenses) => {
    setExpenses((prevExpenses) => {
      return [expenses, ...prevExpenses];
    });
  };

  const addExpenseBtnHandler = () => {
    setIsEditing(true);
  };

  const cancelEditingHandler = (cancelBtn) => {
    setIsEditing(false);
  };

  return (
    <div>
      <div className="add_expense">
        {isEditing === false ? (
          <button
            type="button"
            className="add_expense_btn"
            onClick={addExpenseBtnHandler}
          >
            Add New Expense
          </button>
        ) : (
          <NewExpenseForm
            onAddExpense={addExpenseHandler}
            cancelBtn={cancelEditingHandler}
          />
        )}
      </div>
      <Expenses item={expenses} />
    </div>
  );
};

export default App;
