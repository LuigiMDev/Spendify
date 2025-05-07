import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Expense } from "@/generated/prisma";
import ExpensesFilters from "./ExpensesFilters";
import useExpenses from "../../../context/useExpenses";

type props = {
  setIsLoadingHook: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchExpenses = ({ setIsLoadingHook }: props) => {
  const {setExpenses} = useExpenses()
  const [searchType, setSearchType] = useState("")
  const [searchStatus, setSearchStatus] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchDueDate, setSearchDueDate] = useState("")

  const handleSearchSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e && e.preventDefault();
    setIsLoadingHook(true);

    const expensesSearched = await fetch(
      `/api/expense/searchExpenses?searchInput=${searchInput}&searchStatus=${searchStatus}&searchType=${searchType}&searchDueDate=${searchDueDate}`
    ).then((res) => res.json());

    setExpenses(expensesSearched.expenses);
    setIsLoadingHook(false);
  };

  useEffect(() => {
    handleSearchSubmit();
  }, [searchType, searchStatus, searchDueDate]);

  return (
    <>
      <form onSubmit={(e) => handleSearchSubmit(e)} className="flex w-full md:w-80">
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
      <ExpensesFilters
        searchStatus={searchStatus}
        setSearchStatus={setSearchStatus}
        searchType={searchType}
        setSearchType={setSearchType}
        searchDueDate={searchDueDate}
        setSearchDueDate={setSearchDueDate}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full md:w-auto items-start gap-3"
      />
    </>
  );
};

export default SearchExpenses;
