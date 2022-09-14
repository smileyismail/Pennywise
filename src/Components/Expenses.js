import React, { useState } from "react";

import "./Expenses.css";
import Card from "./UI/Card";
import ExpenseList from "./ExpenseList";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesChart from "./ExpensesChart";

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState("All");

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  let filteredExpenses;

  if (filteredYear === "All") {
    filteredExpenses = props.item;
  } else {
    filteredExpenses = props.item.filter((expense) => {
      return expense.date.getFullYear().toString() === filteredYear;
    });
  }
  // const filteredExpenses = props.item.filter((expense) => {
  //   return expense.date.getFullYear().toString() === filteredYear;
  // });

  return (
    <Card className="expenses">
      <ExpensesFilter
        selected={filteredYear}
        onFilterChange={filterChangeHandler}
      />
      <ExpensesChart expenses={filteredExpenses} />
      <ExpenseList item={filteredExpenses} />
    </Card>
  );
};

export default Expenses;
