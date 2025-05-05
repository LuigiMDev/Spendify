import React from "react";
import UpdateExpense from "./UpdateExpense";
import ExcludeExpense from "./ExcludeExpense";
import { TranslateTypeExpense } from "../../helpers/translateExpense";
import { Expense } from "@/generated/prisma";
import { KeyedMutator } from "swr";
import { LoaderCircle } from "lucide-react";

type props = {
  data?: Expense[];
  mutate: KeyedMutator<Expense[]>;
  isLoading: boolean
  isLoadingHook: boolean
  error: any
};

const ShowExpenses = ({ data, mutate, isLoading, isLoadingHook, error }: props) => {
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

  if (isLoading || isLoadingHook)
    return (
      <div className="flex items-center justify-center h-100vh-260px">
        <LoaderCircle className="text-primary animate-spin h-10 w-10" />
      </div>
    );

  if (!data || error)
    return (
      <div>
        <p>Não foi possível buscar os dados!</p>
      </div>
    );

  return (
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
  );
};

export default ShowExpenses;
