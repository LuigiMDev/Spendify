import { getDashboard } from "../helpers/getDashboard";
import { getDate } from "../helpers/getDate";
import { getExpenses } from "../helpers/getExpenses";
import AsideAndHeader from "./components/AsideAndHeaderLayout";
import MainLayout from "./components/MainLayout";
import AsideContextAndData from "./context/Aside/AsideContextAndData";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const initalExpenses = await getExpenses({
    searchInput: "",
    page: 1,
    searchType: "",
    searchStatus: "",
    searchDueDate: "",
    searchPaymentDate: "",
  });

  const initialDashboardData = await getDashboard({
    searchDueDate: "",
    searchPaymentDate: "",
  });

  const initialDates = await getDate()

  return (
    <AsideContextAndData
      initialExpenses={initalExpenses}
      initialDashboardData={initialDashboardData}
      initialDates={initialDates}
    >
      <AsideAndHeader />
      <MainLayout>{children}</MainLayout>
    </AsideContextAndData>
  );
};

export default layout;
