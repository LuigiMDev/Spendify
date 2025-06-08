import React from "react";
import AddExpense from "./components/AddAndSearchExpenses/components/AddExpense";
import SearchExpenses from "./components/AddAndSearchExpenses/components/SearchExpenses";
import ShowExpenses from "./components/ShowExpenses";
import { getDate } from "../dashboard/components/DashboardFilters/helpers/getDate";

const Page = async () => {

  const dates = await getDate();
  return (
    <div className="">
      <div className="mb-5">
        <h1 className="text-4xl mb-3">Gastos</h1>
        <p className="text-gray-800">
          Adicione, altere e exclua seus gastos. Suas alterações irão refletir
          nos gráficos do dashboard
        </p>
      </div>

      <div className="flex gap-x-5 gap-y-3 flex-wrap mb-5">
        <AddExpense />
        <SearchExpenses dates={dates} />
      </div>

      <ShowExpenses />
    </div>
  );
};

export default Page;
