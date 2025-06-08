import { create } from "zustand";
import { spendEvolution, statusData, typeChartData } from "../system/types/dashboard";
import { toast } from "react-toastify";

type DashboardState = {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;

  error: boolean;
  setError: (err: boolean) => void;

  statusData?: statusData;
  setStatusData: (data?: statusData) => void;

  typeChartData?: typeChartData;
  setTypeChartData: (data?: typeChartData) => void;

  spendEvolutionData?: spendEvolution;
  setSpendEvolutionData: (data?: spendEvolution) => void;

  searchDueDate: string;
  setSearchDueDate: (date: string) => void;

  searchPaymentDate: string;
  setSearchPaymentDate: (date: string) => void;

  handleSearchData: () => Promise<void>;

};

export const useDashboard = create<DashboardState>((set, get) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),

  error: false,
  setError: (error) => set({ error }),

  statusData: undefined,
  setStatusData: (statusData) => set({ statusData }),

  typeChartData: undefined,
  setTypeChartData: (typeChartData) => set({ typeChartData }),

  spendEvolutionData: undefined,
  setSpendEvolutionData: (spendEvolutionData) => set({ spendEvolutionData }),

  searchDueDate: "",
  setSearchDueDate: (searchDueDate) => set({ searchDueDate }),

  searchPaymentDate: "",
  setSearchPaymentDate: (searchPaymentDate) => set({ searchPaymentDate }),


  handleSearchData: async () => {
    const { searchDueDate, searchPaymentDate, setIsLoading, setError, setTypeChartData, setStatusData, setSpendEvolutionData } = get();

    setIsLoading(true);
    try {
      const response = await fetch(`/api/dashboard?searchDueDate=${searchDueDate}&searchPaymentDate=${searchPaymentDate}`);

      if (!response.ok) {
        throw new Error("Ocorreu um erro ao carregar os dados");
      }

      const data = await response.json();

      setTypeChartData(data.typeChart);
      setStatusData(data.statusData);
      setSpendEvolutionData(data.spendEvolution);
      setError(false);
    } catch (error) {
      console.error(error);
      setError(true);
      toast.error("Ocorreu um erro ao carregar os dados!");
    }
    setIsLoading(false);
  },
}));
