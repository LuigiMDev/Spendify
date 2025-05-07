"use client";
import React, { useEffect, useState } from "react";
import AddExpense from "./components/AddAndSearchExpenses/components/AddExpense";
import { Expense } from "@/generated/prisma";
import SearchExpenses from "./components/AddAndSearchExpenses/components/SearchExpenses";
import ShowExpenses from "./components/ShowExpenses";
import { toast } from "react-toastify";
import useExpenses from "./context/useExpenses";

const page = () => {
  const [error, setError] = useState(false);
  const {expenses, setExpenses} = useExpenses()
  const [isLoadingHook, setIsLoadingHook] = useState(true);

  const handleSearchExpenses = async () => {
    try {
      const response = await fetch("/api/expense/searchExpenses");

      if (response.status !== 200) {
        throw new Error("Ocorreu um erro ao buscar os dados!");
      }

      const expensesResponse = await response.json()

      setExpenses(expensesResponse.expenses);
    } catch (err) {
      setError(true);
      toast.error("Ocorreu um erro ao buscar os dados!");
      console.log(err);
    }
    setIsLoadingHook(false);
  };

  useEffect(() => {
    handleSearchExpenses();
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

      <div className="flex gap-x-5 gap-y-3 flex-wrap mb-5 ">
        <AddExpense/>
        <SearchExpenses
          setIsLoadingHook={setIsLoadingHook}
        />
      </div>

      <ShowExpenses
        error={error}
        isLoadingHook={isLoadingHook}
      />
    </div>
  );
};

export default page;
