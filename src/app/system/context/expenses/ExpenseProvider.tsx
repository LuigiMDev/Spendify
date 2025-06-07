"use client";
import { Expense } from "@/generated/prisma";
import React, { createContext, useCallback, useEffect, useState } from "react";
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
  searchPaymentDate: string;
  setSearchPaymentDate: React.Dispatch<React.SetStateAction<string>>;
  isLoadingHook: boolean;
  setIsLoadingHook: React.Dispatch<React.SetStateAction<boolean>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
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
  const [searchPaymentDate, setSearchPaymentDate] = useState("");
  const [isLoadingHook, setIsLoadingHook] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [initialLoad, setInitialLoad] = useState(true);

  const handleSearchExpenses = useCallback(
    async (e?: React.FormEvent<HTMLFormElement>) => {
      try {
        e?.preventDefault();
        setIsLoadingHook(true);
        const response = await fetch(
          `/api/expense/searchExpenses?searchInput=${searchInput}&searchStatus=${searchStatus}&searchType=${searchType}&searchDueDate=${searchDueDate}&searchPaymentDate=${searchPaymentDate}&page=${page}`
        );

        if (response.status !== 200) {
          throw new Error("Ocorreu um erro ao buscar os dados!");
        }

        const expenseJson = await response.json();

        setExpenses(expenseJson.expenses);
        setTotalPages(expenseJson.totalPages || 1);
      } catch (err) {
        setError(true);
        toast.error("Ocorreu um erro ao buscar os dados!");
        console.log(err);
      }
      setIsLoadingHook(false);
    },
    [
      searchInput,
      searchType,
      searchStatus,
      searchDueDate,
      searchPaymentDate,
      page,
    ]
  );

  useEffect(() => {
    if (!initialLoad) {
      setPage(1);
      handleSearchExpenses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    searchType,
    searchStatus,
    searchDueDate,
    searchPaymentDate,
    handleSearchExpenses,
  ]);

  useEffect(() => {
    if (!initialLoad) {
      handleSearchExpenses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, handleSearchExpenses]);

  useEffect(() => {
    setInitialLoad(false)
  }, [])

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
        searchPaymentDate,
        setSearchPaymentDate,
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
