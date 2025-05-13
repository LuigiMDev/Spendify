"use client";
import DashboardContent from "./components/DashboardContent";
import DashboardFilters from "./components/DashboardFilters";

const Page = () => {
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

      <DashboardContent />
    </div>
  );
};

export default Page;
