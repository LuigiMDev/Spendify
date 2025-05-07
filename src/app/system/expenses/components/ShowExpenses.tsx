import React from "react";
import UpdateExpense from "./UpdateExpense";
import ExcludeExpense from "./ExcludeExpense";
import { TranslateTypeExpense } from "../../helpers/translateExpense";
import { Expense } from "@/generated/prisma";
import { LoaderCircle } from "lucide-react";
import DetailsExpense from "./DetailsExpense";

type props = {
  isLoadingHook: boolean;
  error: boolean;
  expenses: Expense[]
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>
};

const ShowExpenses = ({
  isLoadingHook,
  error,
  expenses,
  setExpenses
}: props) => {
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

  if (isLoadingHook)
    return (
      <div className="flex items-center justify-center h-100vh-260px">
        <LoaderCircle className="text-primary animate-spin h-10 w-10" />
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-100vh-260px">
        <h3 className="text-xl">Não foi possível buscar os dados!</h3>
      </div>
    );

  return (
    <>
      {expenses.length > 0 ? (
        <section
          className={`grid grid-cols-auto-fit-320 gap-5 transition-all `}
        >
          {expenses.map((expense: Expense) => (
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
                      {new Date(expense.paymentDate).toLocaleDateString(
                        "pt-BR"
                      )}
                    </p>
                  )}
                </div>
                <div>
                  <DetailsExpense expense={expense} />
                  <UpdateExpense
                    expense={expense}
                    setExpenses={setExpenses}
                  />
                  <ExcludeExpense id={expense.id} setExpenses={setExpenses} />
                </div>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <div className="flex items-center justify-center h-100vh-260px">
          <h3 className="text-3xl">Não foram encontrados gastos!</h3>
        </div>
      )}
    </>
  );
};

export default ShowExpenses;
