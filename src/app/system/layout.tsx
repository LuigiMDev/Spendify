"use client";
import React from "react";
import Header from "@/components/Header";
import Aside from "@/components/Aside/Aside";
import { redirect } from "next/navigation";

const layout = ({ children }: { children: React.ReactNode }) => {
  if (window.location.pathname === "/system") {
    redirect("/system/dashboard");
  }

  return (
    <>
      <Header />
      <Aside />
      {children}
    </>
  );
};

export default layout;
