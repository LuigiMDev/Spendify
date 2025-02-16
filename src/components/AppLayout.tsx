import React from "react";
import Header from "./Header";
import Aside from "./Aside";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <Aside />
      

    </>
  );
};

export default AppLayout;
