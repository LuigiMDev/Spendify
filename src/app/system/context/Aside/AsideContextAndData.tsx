"use client";
import { useExpense } from "@/app/ZustandContext/expenses";
import { $Enums, Expense } from "@prisma/client";
import React, { createContext, useEffect, useState } from "react";
import { spendEvolution, statusData } from "../../types/dashboard";
import { useDashboard } from "@/app/ZustandContext/dashboard";
import { useShallow } from "zustand/shallow";
import { useDates } from "@/app/ZustandContext/dates";
import { dateOption } from "../../types/dates";
import { useFirstLoad } from "@/app/ZustandContext/firstLoad";

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

type initialDatesData = {
  dueDateOption: dateOption[];
  paymentDateOption: dateOption[];
};

type props = {
  children: React.ReactNode;
  initialExpenses: initialExpensesData;
  initialDashboardData: initialDashboardData;
  initialDates: initialDatesData;
};

export const asideAndDataContext = createContext<contextType | null>(null);

const AsideContextAndData = ({
  children,
  initialExpenses,
  initialDashboardData,
  initialDates,
}: props) => {
  const [openAside, setOpenAside] = useState(true);

  // Expenses
  const [expenses, setExpenses, setTotalPages, setExpenseLoading] = useExpense(
    useShallow((state) => [
      state.expenses,
      state.setExpenses,
      state.setTotalPages,
      state.setIsLoadingHook,
    ])
  );

  // Dashboard
  const [
    setStatusData,
    setSpendEvolutionData,
    setTypeChartData,
    setDashboardLoading,
    handleSearchData,
  ] = useDashboard(
    useShallow((state) => [
      state.setStatusData,
      state.setSpendEvolutionData,
      state.setTypeChartData,
      state.setIsLoading,
      state.handleSearchData,
    ])
  );

  // Dates

  const [setDueDateOption, setPaymentDateOption, handleGetDate] = useDates(
    useShallow((state) => [
      state.setDueDateOption,
      state.setPaymentDateOption,
      state.handleGetDate,
    ])
  );

  useEffect(() => {
    setExpenses(initialExpenses.expenses);
    setTotalPages(initialExpenses.totalPages);
    setStatusData(initialDashboardData.statusData);
    setSpendEvolutionData(initialDashboardData.spendEvolution);
    setTypeChartData(initialDashboardData.typeChart);
    setDueDateOption(initialDates.dueDateOption);
    setPaymentDateOption(initialDates.paymentDateOption);
    setDashboardLoading(false);
    setExpenseLoading(false);
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
    setDueDateOption,
    initialDates.dueDateOption,
    setPaymentDateOption,
    initialDates.paymentDateOption,
    setDashboardLoading,
    setExpenseLoading,
  ]);

  const [firstLoad, setFirstLoad] = useFirstLoad(
    useShallow((state) => [state.firstLoad, state.setFirstLoad])
  );

  useEffect(() => {
    if (!firstLoad) {
      handleSearchData();
      handleGetDate();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expenses, handleSearchData, handleGetDate]);

  useEffect(() => {
    setFirstLoad(false);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <asideAndDataContext.Provider value={{ openAside, setOpenAside }}>
      {children}
    </asideAndDataContext.Provider>
  );
};

export default AsideContextAndData;
