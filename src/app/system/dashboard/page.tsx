"use client";
import DashboardFilters from "./components/DashboardFilters";
import SpendEvolution from "./components/SpendEvolution";
import StatusData from "./components/StatusData";
import TypeValueChart from "./components/TypeValueChart";

const page = () => {
  return (
    <div>
      <div className="mb-5">
        <h1 className="text-4xl mb-3">Dashboard</h1>
        <p className="text-gray-800">
          Visualize um resumo dos seus gastos. Os dados exibidos aqui são
          atualizados automaticamente com base nas suas movimentações.
        </p>
      </div>

      <DashboardFilters />

      <StatusData />
      <div className="grid grid-cols-auto-fit-320 gap-5">
        <SpendEvolution />
        <TypeValueChart />
      </div>
    </div>
  );
};

export default page;
