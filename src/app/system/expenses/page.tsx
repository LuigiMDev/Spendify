import React from "react";
import AddExpense from "./components/AddAndSearchExpenses/components/AddExpense";
import SearchExpenses from "./components/AddAndSearchExpenses/components/SearchExpenses";
import ShowExpenses from "./components/ShowExpenses";
import { expensesSearchParams } from "@/app/system/types/expensesSearchParams";
import { getExpenses } from "@/app/helpers/getExpenses";
import { getDate } from "../dashboard/components/DashboardFilters/helpers/getDate";

type PageProps = {
  searchParams: Promise<expensesSearchParams>
}

const Page = async ({searchParams}: PageProps) => {
  const {
    searchInput = "",
    page = 1,
    searchType = "",
    searchStatus = "",
    searchDueDate = "",
    searchPaymentDate = "",
  } = await searchParams;

  const initalExpenses = await getExpenses({
    searchInput,
    page,
    searchType,
    searchStatus,
    searchDueDate,
    searchPaymentDate,
  });

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

      <ShowExpenses initialExpenses={initalExpenses} />
    </div>
  );
};

export default Page;
