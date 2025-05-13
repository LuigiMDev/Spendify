import { Search } from "lucide-react";
import React from "react";
import ExpensesFilters from "./ExpensesFilters";
import useExpenses from "@/app/system/context/expenses/useExpenses";

const SearchExpenses = () => {
  const { searchInput, setSearchInput, handleSearchExpenses } = useExpenses();

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
