import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Expense } from "@/generated/prisma";
import ExpensesFilters from "./ExpensesFilters";

type props = {
  setIsLoadingHook: React.Dispatch<React.SetStateAction<boolean>>;
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
};

const SearchExpenses = ({ setIsLoadingHook, setExpenses }: props) => {
  const [searchType, setSearchType] = useState("")
  const [searchStatus, setSearchStatus] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const handleSearchSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e && e.preventDefault();
    setIsLoadingHook(true);

    const expensesSearched = await fetch(
      `/api/expense/searchExpenses?searchInput=${searchInput}&searchStatus=${searchStatus}&searchType=${searchType}`
    ).then((res) => res.json());

    setExpenses(expensesSearched.expenses);
    setIsLoadingHook(false);
  };

  useEffect(() => {
    handleSearchSubmit();
  }, [searchType, searchStatus]);

  return (
    <>
      <ExpensesFilters
        searchStatus={searchStatus}
        searchType={searchType}
        setSearchType={setSearchType}
        setSearchStatus={setSearchStatus}
        className="flex items-start gap-3"
      />
      <form onSubmit={(e) => handleSearchSubmit(e)} className="flex">
        <div className="w-30 sm:w-80 relative h-fit">
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
    </>
  );
};

export default SearchExpenses;
