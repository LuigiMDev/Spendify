import { Expense } from "@/generated/prisma";
import { create } from "zustand";
import {
  spendEvolution,
  statusData,
  typeChartData,
} from "../system/types/dashboard";

type ContextType = {
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
  setIsLoadingHook: (state: boolean) => void;
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  setTotalPages: (pages: number) => void;
  error: boolean;
  setError: (err: boolean) => void;
  handleSearchExpenses: (e?: React.FormEvent<HTMLFormElement>) => Promise<void>;

  // Dashboard
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  dashboardError: boolean;
  setDashboardError: (err: boolean) => void;
  statusData?: statusData;
  setStatusData: (data: statusData) => void;
  typeChartData?: typeChartData;
  setTypeChartData: (data: typeChartData) => void;
  spendEvolutionData?: spendEvolution;
  setSpendEvolutionData: (data: spendEvolution) => void;
  handleSearchData: () => Promise<void>;
};

export const useSystem = create<ContextType>((set, get) => ({
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
    try {
      e?.preventDefault();
      set({ isLoadingHook: true });

      const {
        searchInput,
        searchStatus,
        searchType,
        searchDueDate,
        searchPaymentDate,
        page,
      } = get();

      const res = await fetch(
        `/api/expense/searchExpenses?searchInput=${searchInput}&searchStatus=${searchStatus}&searchType=${searchType}&searchDueDate=${searchDueDate}&searchPaymentDate=${searchPaymentDate}&page=${page}`
      );

      if (!res.ok) throw new Error("Erro ao buscar despesas");

      const json = await res.json();
      set({
        expenses: json.expenses,
        totalPages: json.totalPages || 1,
        error: false,
      });
    } catch (err) {
      console.log(err);
      set({ error: true });
    } finally {
      set({ isLoadingHook: false });
    }
  },

  // Dashboard
  isLoading: true,
  setIsLoading: (isLoading) => set({ isLoading }),
  dashboardError: false,
  setDashboardError: (dashboardError) => set({ dashboardError }),
  statusData: undefined,
  setStatusData: (statusData) => set({ statusData }),
  typeChartData: undefined,
  setTypeChartData: (typeChartData) => set({ typeChartData }),
  spendEvolutionData: undefined,
  setSpendEvolutionData: (spendEvolutionData) => set({ spendEvolutionData }),
  handleSearchData: async () => {
    try {
      set({ isLoading: true });
      const { searchDueDate, searchPaymentDate } = get();

      const res = await fetch(
        `/api/dashboard?searchDueDate=${searchDueDate}&searchPaymentDate=${searchPaymentDate}`
      );

      if (!res.ok) throw new Error("Erro ao carregar dashboard");

      const data = await res.json();
      set({
        typeChartData: data.typeChart,
        statusData: data.statusData,
        spendEvolutionData: data.spendEvolution,
        dashboardError: false,
      });
    } catch (err) {
      console.log(err);
      set({ dashboardError: true });
    } finally {
      set({ isLoading: false });
    }
  },
}));
