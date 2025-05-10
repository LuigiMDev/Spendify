import AsideAndHeader from "./components/AsideAndHeaderLayout";
import MainLayout from "./components/MainLayout";
import AsideContext from "./context/Aside/AsideContext";
import DashboardProvider from "./context/dashboard/DashboardProvider";
import ExpenseProvider from "./context/expenses/ExpenseProvider";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AsideContext>
      <AsideAndHeader />
      <MainLayout>{children}</MainLayout>
    </AsideContext>
  );
};

export default layout;
