import AsideAndHeader from "./components/AsideAndHeaderLayout";
import MainLayout from "./components/MainLayout";
import AsideContext from "./context/Aside/AsideContext";
import ExpenseProvider from "./context/expenses/ExpenseProvider";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AsideContext>
      <ExpenseProvider>
        <AsideAndHeader />
        <MainLayout>{children}</MainLayout>
      </ExpenseProvider>
    </AsideContext>
  );
};

export default layout;
