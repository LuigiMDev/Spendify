"use client";
import { CirclePlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import AddExpense from "./components/AddExpense";
import { Expense } from "@/generated/prisma";
import HookContext from "../context/HookContext";
import { TranslateTypeExpense } from "../helpers/translateExpense";

const page = () => {
  const [add, setAdd] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const { openAside } = HookContext();

  useEffect(() => {
    const handleFetchExpenses = async () => {
      try {
        const fetchExpenses = await fetch("/api/expense/searchExpenses");

        if (fetchExpenses.ok) {
          const expensesJson = await fetchExpenses.json();
          setExpenses(expensesJson.expenses);
        } else {
          console.error(
            "Ocorreu um erro ao buscar os dados!",
            fetchExpenses.status
          );
        }
      } catch {
        console.error("Ocorreu um erro ao buscar os dados!");
      }
    };

    handleFetchExpenses();
  }, []);

  return (
    <div className="">
      <div className="mb-5">
        <h1 className="text-4xl mb-3">Gastos</h1>
        <p className="text-gray-800">
          Adicione, altere e exclua seus gastos. Suas alterações irão refletir
          nos gráficos do dashboard
        </p>
      </div>

      <section>
        <div className="mb-5">
          <button
            className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all"
            onClick={() => setAdd(true)}
          >
            <CirclePlus className="flex flex-shrink-0 w-6 h-6" />
            <span className={`ml-3 w-full overflow-hidden text-nowrap`}>
              Adicionar gasto
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"></div>
      </section>
      <AddExpense add={add} setAdd={setAdd} setExpenses={setExpenses} expenses={expenses} />

      <div
        className={`grid gap-5 transition-all grid-cols-1 sm:grid-cols-2 ${
          openAside
            ? "md:grid-cols-2 lg:grid-cols-3"
            : "md:grid-cols-3 lg:grid-cols-4"
        }`}
      >
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="bg-white shadow-lg w-full h-40 rounded-lg p-5 overflow-hidden border border-e-gray-300"
          >
            <h3 className="text-lg truncate">{expense.title}</h3>
            <p className="text-red-500 font-semibold">{expense.value.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL"
            })}</p>
            <p><span className="font-semibold">Tipo:</span> {TranslateTypeExpense[expense.type]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
