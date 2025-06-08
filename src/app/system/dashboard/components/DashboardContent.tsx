"use client";
import React, { useEffect } from "react";
import StatusData from "./StatusData";
import SpendEvolution from "./SpendEvolution";
import TypeValueChart from "./TypeValueChart";
import useDashboard from "../../context/dashboard/useDashboard";
import {
  spendEvolution,
  statusData,
  typeChartData,
} from "../../types/dashboard";

type initialData = {
  initialData: {
    statusData: statusData;
    spendEvolution: spendEvolution;
    typeChart: typeChartData;
  };
};

const DashboardContent = ({ initialData }: initialData) => {
  const { error, setStatusData, setSpendEvolutionData, setTypeChartData } =
    useDashboard();

  useEffect(() => {
    setStatusData(initialData.statusData);
    setSpendEvolutionData(initialData.spendEvolution);
    setTypeChartData(initialData.typeChart);
  }, [
    initialData.statusData,
    initialData.spendEvolution,
    initialData.typeChart,
    setStatusData,
    setSpendEvolutionData,
    setTypeChartData,
  ]);

  if (error)
    return (
      <div className="flex pt-10 justify-center">
        <h3 className="text-xl">Não foi possível buscar os dados!</h3>
      </div>
    );

  return (
    <>
      <StatusData />
      <div className="grid grid-cols-auto-fit-320 gap-5">
        <SpendEvolution />
        <TypeValueChart />
      </div>
    </>
  );
};

export default DashboardContent;
