import React from "react";
import ExpenseProvider from "../context/expenses/ExpenseProvider";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <ExpenseProvider>{children}</ExpenseProvider>;
};

export default layout;
