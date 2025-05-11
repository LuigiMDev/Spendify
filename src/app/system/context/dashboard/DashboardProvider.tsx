"use client";
import React, { createContext, useEffect, useState } from "react";
import {
  spendEvolution,
  statusData,
  typeChartData,
} from "../../types/dashboard";

type contextProp = {
  statusData: statusData | undefined;
  setStatusData: React.Dispatch<React.SetStateAction<statusData | undefined>>;
  typeChartData: typeChartData | undefined;
  setTypeChartData: React.Dispatch<
    React.SetStateAction<typeChartData | undefined>
  >;
  spendEvolutionData: spendEvolution | [];
  setSpendEvolutionData: React.Dispatch<
    React.SetStateAction<spendEvolution | []>
  >;
};

export const dashboardContext = createContext<contextProp | null>(null);

const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  const [statusData, setStatusData] = useState<statusData>();
  const [spendEvolutionData, setSpendEvolutionData] = useState<spendEvolution>(
    []
  );
  const [typeChartData, setTypeChartData] = useState<typeChartData>();

  const handleSearchData = async () => {
    const response = await fetch("/api/dashboard");
    if (!response.ok) {
      throw new Error("Ocorreu um erro ao carregar os dados");
    }
    const data = await response.json();
    setTypeChartData(data.typeChart);
    setStatusData(data.statusData);
    setSpendEvolutionData(data.spendEvolution)
  };

  useEffect(() => {
    handleSearchData();
  }, []);

  return (
    <dashboardContext.Provider
      value={{
        statusData,
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
