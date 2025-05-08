"use client";
import { Expense } from "@/generated/prisma";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

type ContextType = {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  searchType: string;
  setSearchType: React.Dispatch<React.SetStateAction<string>>;
  searchStatus: string;
  setSearchStatus: React.Dispatch<React.SetStateAction<string>>;
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  searchDueDate: string;
  setSearchDueDate: React.Dispatch<React.SetStateAction<string>>;
  isLoadingHook: boolean;
  setIsLoadingHook: React.Dispatch<React.SetStateAction<boolean>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number,
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  handleSearchExpenses: (e?: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

export const expenseContext = createContext<ContextType | null>(null);

const ExpenseProvider = ({ children }: { children: React.ReactNode }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [searchType, setSearchType] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchDueDate, setSearchDueDate] = useState("");
  const [isLoadingHook, setIsLoadingHook] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const handleSearchExpenses = async (e?: React.FormEvent<HTMLFormElement>) => {
    try {
      e?.preventDefault()
      setIsLoadingHook(true)
      const response = await fetch(
        `/api/expense/searchExpenses?searchInput=${searchInput}&searchStatus=${searchStatus}&searchType=${searchType}&searchDueDate=${searchDueDate}&page=${page}`
      );

      if (response.status !== 200) {
        throw new Error("Ocorreu um erro ao buscar os dados!");
      }

      const expensesResponse = await response.json();

      setExpenses(expensesResponse.expenses);
      setTotalPages(expensesResponse.totalPages)
    } catch (err) {
      setError(true);
      toast.error("Ocorreu um erro ao buscar os dados!");
      console.log(err);
    }
    setIsLoadingHook(false);
  };

  useEffect(() => {
    handleSearchExpenses();
  }, [searchType, searchStatus, searchDueDate, page]);

  return (
    <expenseContext.Provider
      value={{
        expenses,
        setExpenses,
        searchType,
        setSearchType,
        searchStatus,
        setSearchStatus,
        searchInput,
        setSearchInput,
        searchDueDate,
        setSearchDueDate,
        isLoadingHook,
        setIsLoadingHook,
        page,
        setPage,
        totalPages,
        setTotalPages,
        error,
        setError,
        handleSearchExpenses,
      }}
    >
      {children}
    </expenseContext.Provider>
  );
};

export default ExpenseProvider;
