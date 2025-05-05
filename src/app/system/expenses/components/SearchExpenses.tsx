import { Expense } from "@/generated/prisma";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { KeyedMutator } from "swr";

type props = {
  setIsLoadingHook: React.Dispatch<React.SetStateAction<boolean>>
  mutate: KeyedMutator<Expense[]>;
}

const SearchExpenses = ({setIsLoadingHook, mutate}: props) => {

  const [search, setSearch] = useState("")

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsLoadingHook(true)

    const expensesSearched = await fetch(`/api/expense/searchExpenses?search=${search}`).then(res => res.json())

    mutate(expensesSearched.expenses, false)
    setIsLoadingHook(false)
  }

  return (
    <form onSubmit={(e) => handleSearchSubmit(e)} className="w-80 relative h-fit">
      <input
        type="text"
        placeholder="Buscar"
        className="outline-primary rounded-lg border-2 border-gray-150 p-2 w-full"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <Search className="absolute right-0 top-1/2 -translate-y-1/2 bg-white pointer-events-none h-10 mr-2 text-gray-700"  />
    </form>
  );
};

export default SearchExpenses;
