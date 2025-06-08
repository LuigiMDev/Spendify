import { getDashboard } from "@/app/helpers/getDashboard";
import DashboardContent from "./components/DashboardContent";
import DashboardFilters from "./components/DashboardFilters/DashboardFilters";
import { dashboardSearchParams } from "@/app/system/types/dashboardSearchParams";
import { getDate } from "./components/DashboardFilters/helpers/getDate";

const Page = async (searchParams: dashboardSearchParams) => {
  const { searchDueDate, searchPaymentDate } = searchParams;
  const initialData = await getDashboard({ searchDueDate, searchPaymentDate });
  const filters = await getDate();

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-4xl mb-3">Dashboard</h1>
        <p className="text-gray-800">
          Visualize um resumo dos seus gastos. Os dados exibidos aqui são
          atualizados automaticamente com base nas suas movimentações.
        </p>
      </div>

      <DashboardFilters filters={filters} />

      <DashboardContent initialData={initialData} />
    </div>
  );
};

export default Page;
