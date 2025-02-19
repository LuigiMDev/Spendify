import React from "react";
import Header from "@/components/Header";
import Aside from "@/components/Aside/Aside";

const layout = ({ children }: { children: React.ReactNode }) => {

  return (
    <>
      <Header />
      <Aside />
      {children}
    </>
  );
};

export default layout;
