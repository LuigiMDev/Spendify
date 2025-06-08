import { create } from "zustand";
import { Expense } from "@/generated/prisma";
import { toast } from "react-toastify";

type ExpenseState = {
  expenses: Expense[];
  setExpenses: (expenses: Expense[]) => void;

  searchType: string;
  setSearchType: (type: string) => void;

  searchStatus: string;
  setSearchStatus: (status: string) => void;

  searchInput: string;
  setSearchInput: (input: string) => void;

  searchDueDate: string;
  setSearchDueDate: (date: string) => void;

  searchPaymentDate: string;
  setSearchPaymentDate: (date: string) => void;

  isLoadingHook: boolean;
  setIsLoadingHook: (loading: boolean) => void;

  page: number;
  setPage: (page: number) => void;

  totalPages: number;
  setTotalPages: (totalPages: number) => void;

  error: boolean;
  setError: (error: boolean) => void;

  handleSearchExpenses: (e?: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

export const useExpense = create<ExpenseState>((set, get) => ({
  expenses: [],
  setExpenses: (expenses) => set({ expenses }),

  searchType: "",
  setSearchType: (searchType) => set({ searchType }),

  searchStatus: "",
  setSearchStatus: (searchStatus) => set({ searchStatus }),

  searchInput: "",
  setSearchInput: (searchInput) => set({ searchInput }),

  searchDueDate: "",
  setSearchDueDate: (searchDueDate) => set({ searchDueDate }),

  searchPaymentDate: "",
  setSearchPaymentDate: (searchPaymentDate) => set({ searchPaymentDate }),

  isLoadingHook: true,
  setIsLoadingHook: (isLoadingHook) => set({ isLoadingHook }),

  page: 1,
  setPage: (page) => set({ page }),

  totalPages: 1,
  setTotalPages: (totalPages) => set({ totalPages }),

  error: false,
  setError: (error) => set({ error }),

  handleSearchExpenses: async (e) => {
    e?.preventDefault();
    const {
      searchInput,
      searchType,
      searchStatus,
      searchDueDate,
      searchPaymentDate,
      page,
      setIsLoadingHook,
      setExpenses,
      setTotalPages,
      setError,
    } = get();

    setIsLoadingHook(true);

    try {
      const response = await fetch(
        `/api/expense/searchExpenses?searchInput=${searchInput}&searchStatus=${searchStatus}&searchType=${searchType}&searchDueDate=${searchDueDate}&searchPaymentDate=${searchPaymentDate}&page=${page}`
      );

      if (response.status !== 200) {
        throw new Error("Erro ao buscar os dados");
      }

      const data = await response.json();

      setExpenses(data.expenses);
      setTotalPages(data.totalPages || 1);
      setError(false);
    } catch (err) {
      console.error(err);
      setError(true);
      toast.error("Ocorreu um erro ao buscar os dados!");
    }

    setIsLoadingHook(false);
  },
}));
