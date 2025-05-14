"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [ExpensesList, SetExpensesListState] = useState([]);
  const [IncomeList, SetIncomeListState] = useState([]);

  const [DescriptionValue, SetDescriptionValue] = useState("");
  const [AmountValue, SetAmountValue] = useState(0);

  const [RemainingBalance, SetRemainingBalance] = useState(0);

  function AddExpense() {
    if (DescriptionValue != "") {
      SetExpensesListState((state) => [
        ...state,
        { amount: parseInt(AmountValue), desc: DescriptionValue },
      ]);
    }
  }
  function DeleteExpense(indexToRemove) {
    SetExpensesListState((state) => [
      ...state.filter((expense, index) => index != indexToRemove),
    ]);
  }

  function AddIncome() {
    if (DescriptionValue != "") {
      SetIncomeListState((state) => [
        ...state,
        { amount: parseInt(AmountValue), desc: DescriptionValue },
      ]);
    }
  }
  function DeleteIncome(indexToRemove) {
    SetIncomeListState((state) => [
      ...state.filter((income, index) => index != indexToRemove),
    ]);
  }

  function CalculateRemainingBalance() {
    let balance = 0;
    balance +=
      IncomeList.reduce((prev, curr) => prev + curr.amount, 0) -
      ExpensesList.reduce((prev, curr) => prev + curr.amount, 0);

    SetRemainingBalance(balance);
  }

  useEffect(() => {
    CalculateRemainingBalance();
  }, [IncomeList, ExpensesList]);

  return (
    <div className="flex flex-col gap-4 m-auto w-full md:w-2/3 lg:w-1/2 h-full p-2 bg-slate-200 rounded-lg">
      <div className="flex gap-1 w-full bg-slate-100">
        <div className="w-full h-full bg-white rounded-lg p-2 min-h-32 md:min-h-96 text-center">
          {ExpensesList.map((expense, index) => (
            <div
              key={`expense_${index}`}
              className="text-red-500 md:text-lg font-medium hover:line-through hover:cursor-pointer"
              onClick={() => DeleteExpense(index)}
            >
              -${expense.amount} | {expense.desc}
            </div>
          ))}
        </div>
        <div className="w-full h-full bg-white rounded-lg p-2 min-h-32 md:min-h-96 text-center">
          {IncomeList.map((income, index) => (
            <div
              key={`income_${index}`}
              className="text-green-500 md:text-lg font-medium hover:line-through hover:cursor-pointer"
              onClick={() => DeleteIncome(index)}
            >
              +${income.amount} | {income.desc}
            </div>
          ))}
        </div>
      </div>

      <h1 className="text-black text-center text-2xl border-b-2 border-black pb-4">
        Balance: ${RemainingBalance}
      </h1>

      <div className="flex flex-col md:flex-row gap-2 w-full justify-center items-center">
        <div className="flex flex-col">
          <label className="text-black text-sm text-center" htmlFor="desc">
            Description
          </label>
          <input
            id="desc"
            type="text"
            placeholder="Rent"
            onChange={(e) => SetDescriptionValue(e.target.value)}
            className="text-gray-950 p-3 border-black border-2 rounded-lg"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-black text-sm text-center" htmlFor="amount">
            Amount
          </label>
          <input
            id="amount"
            type="number"
            placeholder="400"
            onChange={(e) => SetAmountValue(e.target.value)}
            className="text-gray-950 p-3 border-black border-2 rounded-lg"
          />
        </div>
      </div>

      <div className="flex gap-2 justify-center items-center">
        <button
          className="text-lg text-red-900 p-2 w-30 bg-red-400 rounded hover:cursor-pointer hover:text-white"
          onClick={AddExpense}
        >
          Expense
        </button>
        <button
          className="text-lg text-green-900 p-2 w-30 bg-green-400 rounded hover:cursor-pointer hover:text-white"
          onClick={AddIncome}
        >
          Income
        </button>
      </div>
    </div>
  );
}
