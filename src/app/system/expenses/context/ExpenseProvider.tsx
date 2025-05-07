'use client'
import { Expense } from "@/generated/prisma";
import React, { createContext, useState } from "react";

type ContextType = {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
};

export const expenseContext = createContext<ContextType | null>(null);

const ExpenseProvider = ({ children }: { children: React.ReactNode }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  return (
    <expenseContext.Provider value={{ expenses, setExpenses }}>
      {children}
    </expenseContext.Provider>
  );
};

export default ExpenseProvider;
