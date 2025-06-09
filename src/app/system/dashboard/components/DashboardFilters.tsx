"use client";
import React, { useEffect } from "react";
import { useDashboard } from "@/app/ZustandContext/dashboard";
import { useShallow } from "zustand/shallow";
import { useDates } from "@/app/ZustandContext/dates";
import { useFirstLoad } from "@/app/ZustandContext/firstLoad";

const DashboardFilters = () => {
  const [
    searchDueDate,
    setSearchDueDate,
    searchPaymentDate,
    setSearchPaymentDate,
    handleSearchData,
  ] = useDashboard(
    useShallow((state) => [
      state.searchDueDate,
      state.setSearchDueDate,
      state.searchPaymentDate,
      state.setSearchPaymentDate,
      state.handleSearchData,
    ])
  );

  const [dueDateOption, paymentDateOption] = useDates(
    useShallow((state) => [state.dueDateOption, state.paymentDateOption])
  );

  const firstLoad = useFirstLoad((state) => state.firstLoad);

  useEffect(() => {
    if (!firstLoad) {
      handleSearchData();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDueDate, searchPaymentDate]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 w-full md:w-fit items-center gap-3 mb-5">
      <div className="relative group">
        <label
          htmlFor="dueDateFilterExpense"
          className="absolute left-3 -top-[7px] bg-white text-slate-600 group-focus-within:text-primary transition-all text-xs"
        >
          Vencimento
        </label>
        <select
          className=" focus:border-primary outline-primary rounded-lg border-2 border-gray-150 p-2 w-full block transition-all bg-white"
          onChange={(e) => setSearchDueDate(e.target.value)}
          value={searchDueDate}
          id="dueDateFilterExpense"
        >
          <option value="">Todos</option>
          {dueDateOption.map((date) => (
            <option key={date.value} value={date.value}>
              {date.display}
            </option>
          ))}
        </select>
      </div>
      <div className="relative group">
        <label
          htmlFor="dueDateFilterExpense"
          className="absolute left-3 -top-[7px] bg-white text-slate-600 group-focus-within:text-primary transition-all text-xs"
        >
          Pagamento
        </label>
        <select
          className=" focus:border-primary outline-primary rounded-lg border-2 border-gray-150 p-2 w-full block transition-all bg-white"
          onChange={(e) => setSearchPaymentDate(e.target.value)}
          value={searchPaymentDate}
          id="dueDateFilterExpense"
        >
          <option value="">Todos</option>
          {paymentDateOption.map((date) => (
            <option key={date.value} value={date.value}>
              {date.display}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DashboardFilters;
