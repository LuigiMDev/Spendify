import AsideAndHeader from "./components/AsideAndHeaderLayout";
import MainLayout from "./components/MainLayout";
import AsideContext from "./context/Aside/AsideContext";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AsideContext>
      <AsideAndHeader />
      <MainLayout>{children}</MainLayout>
    </AsideContext>
  );
};

export default layout;
