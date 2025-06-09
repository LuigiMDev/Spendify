"use client";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import ExpensesFilters from "./ExpensesFilters";
import { useExpense } from "@/app/ZustandContext/expenses";
import { useShallow } from "zustand/shallow";

const SearchExpenses = () => {
  const [
    searchInput,
    setSearchInput,
    handleSearchExpenses,
    searchDueDate,
    searchPaymentDate,
    searchStatus,
    searchType,
    setIsLoadingHook,
  ] = useExpense(
    useShallow((state) => [
      state.searchInput,
      state.setSearchInput,
      state.handleSearchExpenses,
      state.searchDueDate,
      state.searchPaymentDate,
      state.searchStatus,
      state.searchType,
      state.setIsLoadingHook,
    ])
  );

  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (!firstLoad) {
      handleSearchExpenses();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    searchDueDate,
    searchPaymentDate,
    searchStatus,
    searchType,
    handleSearchExpenses,
  ]);

  useEffect(() => {
    setFirstLoad(false);
    setIsLoadingHook(false);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => handleSearchExpenses(e)}
        className="flex w-full md:w-80"
      >
        <div className="w-full relative h-fit">
          <input
            type="text"
            placeholder="Buscar"
            className="outline-primary rounded-lg border-2 border-gray-150 p-2 w-full"
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
          />
          <Search className="absolute right-0 top-1/2 -translate-y-1/2 bg-white pointer-events-none h-10 mr-2 text-gray-700" />
        </div>
      </form>
      <ExpensesFilters />
    </>
  );
};

export default SearchExpenses;
