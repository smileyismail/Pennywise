import React, { useEffect, useState } from "react";

import { useAuthContext } from "../../context/AuthContext";
import { onValue, ref } from "firebase/database";
import { db } from "../../config/firebase";

import AddNew from "./AddNew";
import Chart from "./Chart";
import List from "./List";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
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

  return (
    <div className="max-w-5xl flex flex-col gap-2 mx-auto p-4">
      <AddNew />
      <Chart expenses={expenses} />
      <List expenses={expenses} />
    </div>
  );
};

export default Expenses;
