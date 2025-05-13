"use client";
import React, { createContext, useEffect, useState } from "react";
import {
  spendEvolution,
  statusData,
  typeChartData,
} from "../../types/dashboard";
import { toast } from "react-toastify";

type contextProp = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  statusData: statusData | undefined;
  searchDueDate: string;
  setSearchDueDate: React.Dispatch<React.SetStateAction<string>>;
  searchPaymentDate: string;
  setSearchPaymentDate: React.Dispatch<React.SetStateAction<string>>;
  setStatusData: React.Dispatch<React.SetStateAction<statusData | undefined>>;
  typeChartData: typeChartData | undefined;
  setTypeChartData: React.Dispatch<
    React.SetStateAction<typeChartData | undefined>
  >;
  spendEvolutionData: spendEvolution | undefined;
  setSpendEvolutionData: React.Dispatch<
    React.SetStateAction<spendEvolution | undefined>
  >;
};

export const dashboardContext = createContext<contextProp | null>(null);

const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [statusData, setStatusData] = useState<statusData>();
  const [spendEvolutionData, setSpendEvolutionData] = useState<spendEvolution>(
  );
  const [typeChartData, setTypeChartData] = useState<typeChartData>();
  const [searchDueDate, setSearchDueDate] = useState("");
  const [searchPaymentDate, setSearchPaymentDate] = useState("");

  const handleSearchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/dashboard?searchDueDate=${searchDueDate}&searchPaymentDate=${searchPaymentDate}`
      );
      if (!response.ok) {
        throw new Error("Ocorreu um erro ao carregar os dados");
      }
      const data = await response.json();
      setTypeChartData(data.typeChart);
      setStatusData(data.statusData);
      setSpendEvolutionData(data.spendEvolution);
    } catch (err) {
      console.log(err);
      setError(true);
      toast.error("Ocorreu um erro ao carregar os dados!");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleSearchData();
  }, [searchDueDate, searchPaymentDate]);

  return (
    <dashboardContext.Provider
      value={{
        isLoading,
        setIsLoading,
        error,
        setError,
        statusData,
        searchDueDate,
        setSearchDueDate,
        searchPaymentDate,
        setSearchPaymentDate,
        setStatusData,
        spendEvolutionData,
        setSpendEvolutionData,
        typeChartData,
        setTypeChartData,
      }}
    >
      {children}
    </dashboardContext.Provider>
  );
};

export default DashboardProvider;
