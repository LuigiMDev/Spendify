"use client";
import React, { useState } from "react";
import AddExpense from "./components/AddExpense";
import { Expense } from "@/generated/prisma";
import useSWR from "swr";
import { LoaderCircle } from "lucide-react";
import SearchExpenses from "./components/SearchExpenses";
import ShowExpenses from "./components/ShowExpenses";

const page = () => {

  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .then((res) => res.expenses);

  const { data, error, mutate, isLoading } = useSWR<Expense[]>(
    "/api/expense/searchExpenses",
    fetcher
  );

  const [isLoadingHook, setIsLoadingHook] = useState(false);

  return (
    <div className="">
      <div className="mb-5">
        <h1 className="text-4xl mb-3">Gastos</h1>
        <p className="text-gray-800">
          Adicione, altere e exclua seus gastos. Suas alterações irão refletir
          nos gráficos do dashboard
        </p>
      </div>

      <div className="flex justify-between">
        <AddExpense mutate={mutate} dataSWR={data} />
        <SearchExpenses setIsLoadingHook={setIsLoadingHook} mutate={mutate} />
      </div>

    <ShowExpenses data={data} mutate={mutate} isLoading={isLoading} error={error} isLoadingHook={isLoadingHook} />
      
    </div>
  );
};

export default page;
