import React from "react";

import { PieChart, Pie, Cell } from "recharts";

import { AiTwotoneCheckSquare } from "react-icons/ai";

const COLORS = ["#059669", "#e11d48"];

const Chart = ({ expenses }) => {
  const incomes = expenses.map((expense) => {
    if (expense.type === "+") {
      return expense.amount;
    } else {
      return 0;
    }
  });

  const spends = expenses.map((expense) => {
    if (expense.type === "-") {
      return expense.amount;
    } else {
      return 0;
    }
  });

  let totalIncomes = 0;
  let totalSpends = 0;

  for (let i = 0; i < incomes.length; i++) {
    totalIncomes += parseInt(incomes[i]);
  }

  for (let i = 0; i < spends.length; i++) {
    totalSpends += parseInt(spends[i]);
  }

  const data = [
    { name: "incomes", value: totalIncomes },
    { name: "spends", value: totalSpends },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-evenly items-center gap-1 bg-secondary rounded-md font-roboto text-blackDark p-2">
      <div className=" flex justify-center items-center">
        <PieChart width={200} height={170}>
          <Pie
            data={data}
            cx={90}
            cy={79}
            innerRadius={50}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
        <div className="text-sm text-blackMedium">
          <div className="flex justify-start items-center">
            <AiTwotoneCheckSquare className="text-xs text-emerald-600" />
            Incomes
          </div>
          <div className="flex justify-start items-center">
            <AiTwotoneCheckSquare className="text-xs text-rose-600" />
            <span>Expenses</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-start  p-2 bg-primary rounded-md text-lg">
        <table>
          <tbody>
            <tr>
              <td className="font-medium">Total Income</td>
              <td>:</td>
              <td className="text-emerald-600 font-semibold">
                +{totalIncomes}
              </td>
            </tr>
            <tr>
              <td className="font-medium">Total Expense</td>
              <td>:</td>
              <td className="text-rose-600 font-semibold">-{totalSpends}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Chart;
