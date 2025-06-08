"use client";
import { useExpense } from "@/app/ZustandContext/expenses";
import { $Enums, Expense } from "@/generated/prisma";
import React, { createContext, useEffect, useState } from "react";
import { spendEvolution, statusData } from "../../types/dashboard";
import { useDashboard } from "@/app/ZustandContext/dashboard";
import { useShallow } from "zustand/shallow";

type contextType = {
  openAside: boolean;
  setOpenAside: React.Dispatch<React.SetStateAction<boolean>>;
};

type initialExpensesData = {
  expenses: Expense[];
  totalPages: number;
};

type initialDashboardData = {
  statusData: statusData;
  spendEvolution: spendEvolution;
  typeChart: Record<$Enums.ExpenseType, number>;
};

type props = {
  children: React.ReactNode;
  initialExpenses: initialExpensesData;
  initialDashboardData: initialDashboardData;
};

export const asideAndDataContext = createContext<contextType | null>(null);

const AsideContextAndData = ({
  children,
  initialExpenses,
  initialDashboardData,
}: props) => {
  const [openAside, setOpenAside] = useState(true);

  // Expenses
  const [setExpenses, setTotalPages, setExpenseLoading] = useExpense(
    useShallow((state) => [state.setExpenses, state.setTotalPages, state.setIsLoadingHook])
  );

  // Dashboard
  const [setStatusData, setSpendEvolutionData, setTypeChartData, setDashboardLoading] = useDashboard(
    useShallow((state) => [
      state.setStatusData,
      state.setSpendEvolutionData,
      state.setTypeChartData,
      state.setIsLoading
    ])
  );

  useEffect(() => {
    setExpenses(initialExpenses.expenses);
    setTotalPages(initialExpenses.totalPages);
    setStatusData(initialDashboardData.statusData);
    setSpendEvolutionData(initialDashboardData.spendEvolution);
    setTypeChartData(initialDashboardData.typeChart);
    setDashboardLoading(false)
    setExpenseLoading(false)
  }, [
    setExpenses,
    initialExpenses.expenses,
    setTotalPages,
    initialExpenses.totalPages,
    setStatusData,
    initialDashboardData.statusData,
    setSpendEvolutionData,
    initialDashboardData.spendEvolution,
    setTypeChartData,
    initialDashboardData.typeChart,
    setDashboardLoading,
    setExpenseLoading
  ]);

  return (
    <asideAndDataContext.Provider value={{ openAside, setOpenAside }}>
      {children}
    </asideAndDataContext.Provider>
  );
};

export default AsideContextAndData;
