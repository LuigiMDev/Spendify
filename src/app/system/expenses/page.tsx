"use client";
import React from "react";
import AddExpense from "./components/AddExpense";
import { Expense } from "@/generated/prisma";
import { TranslateTypeExpense } from "../helpers/translateExpense";
import useSWR from "swr";
import { LoaderCircle, Trash } from "lucide-react";
import ExcludeExpense from "./components/ExcludeExpense";
import UpdateExpense from "./components/UpdateExpense";

const page = () => {
  const getStatusBg = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-orange-400";
      case "paid":
        return "bg-primary";
      case "cancelled":
        return "bg-red-500";
    }
  };

  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .then((res) => res.expenses);

  const { data, error, mutate, isLoading } = useSWR<Expense[]>(
    "/api/expense/searchExpenses",
    fetcher
  );

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-100vh-96px">
        <LoaderCircle className="text-primary animate-spin h-10 w-10" />
      </div>
    );

  if (!data || error) return <div>
    <p>Não foi possível buscar os dados!</p>
  </div>;

  return (
    <div className="">
      <div className="mb-5">
        <h1 className="text-4xl mb-3">Gastos</h1>
        <p className="text-gray-800">
          Adicione, altere e exclua seus gastos. Suas alterações irão refletir
          nos gráficos do dashboard
        </p>
      </div>

      <AddExpense mutate={mutate} dataSWR={data} />

      <section className={`grid grid-cols-auto-fit-320 gap-5 transition-all `}>
        {data.map((expense: Expense) => (
          <div
            key={expense.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden border border-e-gray-300"
          >
            <div className={`h-2 w-full ${getStatusBg(expense.status)}`} />
            <div className="p-5 flex justify-between w-full">
              <div className="w-[80%]">
              <h3 className="text-lg truncate">{expense.title}</h3>
              <p className="text-red-500 font-semibold">
                -
                {expense.value.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
              <p>
                <span className="font-semibold">Tipo:</span>{" "}
                {TranslateTypeExpense[expense.type]}
              </p>
              <p>
                <span className="font-semibold">Vencimento:</span>{" "}
                {new Date(expense.dueDate).toLocaleDateString("pt-BR")}
              </p>
              {expense.status === "paid" && expense.paymentDate && (
                <p>
                  <span className="font-semibold">Pagamento:</span>{" "}
                  {new Date(expense.paymentDate).toLocaleDateString("pt-BR")}
                </p>
              )}
              </div>
              <div>
              <UpdateExpense expense={expense} dataSWR={data} mutate={mutate} />
              <ExcludeExpense id={expense.id} mutate={mutate} />
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default page;
