"use client";
import React from "react";
import StatusData from "./StatusData";
import SpendEvolution from "./SpendEvolution";
import TypeValueChart from "./TypeValueChart";
import useDashboard from "../../context/dashboard/useDashboard";

const DashboardContent = () => {
  const { error } = useDashboard();

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
