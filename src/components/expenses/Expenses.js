import React from "react";
import AddNew from "./AddNew";
import Chart from "./Chart";
import List from "./List";

const Expenses = () => {
  return (
    <div className="max-w-5xl flex flex-col gap-2 mx-auto p-4">
      <AddNew />
      <Chart />
      <List />
    </div>
  );
};

export default Expenses;
