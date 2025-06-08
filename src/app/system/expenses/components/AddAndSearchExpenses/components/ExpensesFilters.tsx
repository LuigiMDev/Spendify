"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { dateOption, Dates } from "@/app/system/types/dates";
import { useExpense } from "@/app/ZustandContext/expenses";
import {useShallow} from "zustand/shallow"

const ExpensesFilters = ({ dates }: Dates) => {
  const [
    expenses,
    page,
    setPage,
    totalPages,
    searchType,
    setSearchType,
    searchStatus,
    setSearchStatus,
    searchDueDate,
    setSearchDueDate,
    searchPaymentDate,
    setSearchPaymentDate,
  ] = useExpense(useShallow((state) => [
    state.expenses,
    state.page,
    state.setPage,
    state.totalPages,
    state.searchType,
    state.setSearchType,
    state.searchStatus,
    state.setSearchStatus,
    state.searchDueDate,
    state.setSearchDueDate,
    state.searchPaymentDate,
    state.setSearchPaymentDate,
  ]));
  const [dueDateOption, setDueDateOption] = useState<dateOption[]>([]);
  const [paymentDateOption, setPaymentDateOption] = useState<dateOption[]>([]);

  useEffect(() => {
    setDueDateOption(dates.dueDateOption);
    setPaymentDateOption(dates.paymentDateOption);
  }, [
    expenses,
    setDueDateOption,
    setPaymentDateOption,
    dates.dueDateOption,
    dates.paymentDateOption,
  ]);

  const getViewPages = () => {
    if (totalPages <= 3)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    const viewPages = [];

    if (page === 1) {
      viewPages.push(1, 2, 3);
    } else if (page === totalPages) {
      viewPages.push(page - 2, page - 1, page);
    } else {
      viewPages.push(page - 1, page, page + 1);
    }

    return viewPages;
  };

  const handlePreviewPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center w-full gap-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full md:w-fit items-center gap-3">
        <div className="relative group">
          <label
            htmlFor="typeFilterExpense"
            className="absolute left-3 -top-[7px] bg-white text-slate-600 group-focus-within:text-primary transition-all text-xs"
          >
            Tipo
          </label>
          <select
            className=" focus:border-primary outline-primary rounded-lg border-2 border-gray-150 p-2 w-full block transition-all bg-white"
            onChange={(e) => setSearchType(e.target.value)}
            value={searchType}
            id="typeFilterExpense"
          >
            <option value="">Todos</option>
            <option value="food">Alimentação</option>
            <option value="transport">Transporte</option>
            <option value="entertainment">Entretenimento</option>
            <option value="bills">Contas</option>
            <option value="rent">Aluguel</option>
            <option value="health">Saúde</option>
            <option value="shopping">Compras</option>
            <option value="other">Outros</option>
          </select>
        </div>
        <div className="relative group">
          <label
            htmlFor="statusFilterExpense"
            className="absolute left-3 -top-[7px] bg-white text-slate-600 group-focus-within:text-primary transition-all text-xs"
          >
            Status
          </label>
          <select
            className=" focus:border-primary outline-primary rounded-lg border-2 border-gray-150 p-2 block w-full transition-all bg-white"
            onChange={(e) => setSearchStatus(e.target.value)}
            value={searchStatus}
            id="statusFilterExpense"
          >
            <option value="">Todos</option>
            <option value="pending">Pendente</option>
            <option value="paid">Pago</option>
            <option value="cancelled">Cancelado</option>
          </select>
        </div>
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
      <div className="flex gap-1 justify-center">
        <button
          disabled={page === 1}
          className="flex items-center p-1 bg-gray-50 enabled:hover:bg-gray-100 rounded-lg transition-all disabled:cursor-not-allowed disabled:opacity-70"
          onClick={handlePreviewPage}
        >
          <ChevronLeft className="" />
        </button>
        {getViewPages().map((numberPage) => (
          <button
            key={numberPage}
            className={`flex items-center w-8 h-8 justify-center p-1 rounded-lg transition-all ${
              page === numberPage
                ? "bg-primary hover:bg-primaryHover text-white"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
            onClick={() => setPage(numberPage)}
          >
            {numberPage}
          </button>
        ))}
        <button
          disabled={page === totalPages}
          className="flex items-center p-1 bg-gray-50 enabled:hover:bg-gray-100 rounded-lg transition-all disabled:cursor-not-allowed disabled:opacity-70"
          onClick={handleNextPage}
        >
          <ChevronRight className="" />
        </button>
      </div>
    </div>
  );
};

export default ExpensesFilters;
