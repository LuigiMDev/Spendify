import React, { useEffect, useState } from "react";
import useDashboard from "../../context/dashboard/useDashboard";
import { toast } from "react-toastify";

type dateOption = {
  display: string;
  value: string;
};

const DashboardFilters = () => {
  const { searchDueDate, setSearchDueDate, searchPaymentDate, setSearchPaymentDate } = useDashboard();
  const [dueDateOption, setDueDateOption] = useState<dateOption[]>([]);
    const [paymentDateOption, setPaymentDateOption] = useState<dateOption[]>([]);

  useEffect(() => {
    const getDate = async () => {
      try {
        const response = await fetch("/api/expense/searchExpenses/getDate");
        if (!response.ok) {
          throw new Error("Ocorreu um erro ao buscar o filtro de datas!");
        }
        const dates = await response.json();

        setDueDateOption(
          dates.unicFormatedDueDates.map((date: string) => {
            const [year, month] = date.split("-").map(Number);
            return {
              display: new Date(year, month - 1).toLocaleDateString("pt-BR", {
                month: "short",
                year: "numeric",
              }),
              value: date,
            };
          })
        );
        setPaymentDateOption(
          dates.unicFormatedPaymentDates.map((date: string) => {
            const [year, month] = date.split("-").map(Number);
            return {
              display: new Date(year, month - 1).toLocaleDateString("pt-BR", {
                month: "short",
                year: "numeric",
              }),
              value: date,
            };
          })
        );
      } catch (err) {
        console.log(err);
        toast.error("Ocorreu um erro ao buscar o filtro de datas!");
      }
    };

    getDate();
  }, []);

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
          className=" focus:border-primary outline-primary rounded-lg border-2 border-gray-150 p-2 w-full block transition-all"
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
            className=" focus:border-primary outline-primary rounded-lg border-2 border-gray-150 p-2 w-full block transition-all"
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
