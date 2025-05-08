import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useExpenses from "../../../context/useExpenses";
import { ChevronLeft, ChevronRight } from "lucide-react";

type props = {
  searchStatus: string;
  setSearchStatus: React.Dispatch<React.SetStateAction<string>>;
  searchType: string;
  setSearchType: React.Dispatch<React.SetStateAction<string>>;
  searchDueDate: string;
  setSearchDueDate: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
};

type dateOption = {
  display: string;
  value: string;
};

const ExpensesFilters = ({
  searchStatus,
  setSearchStatus,
  searchType,
  setSearchType,
  searchDueDate,
  setSearchDueDate,
  className,
}: props) => {
  const { expenses, page, setPage, totalPages } = useExpenses();
  const [dateOption, setDateOption] = useState<dateOption[]>([]);

  useEffect(() => {
    const getDate = async () => {
      try {
        const response = await fetch("/api/expense/searchExpenses/getDate");
        if (!response.ok) {
          throw new Error("Ocorreu um erro ao buscar o filtro de datas!");
        }
        const dates: string[] = await response
          .json()
          .then((res) => res.unicFormatedDates);

        setDateOption(
          dates.map((date) => {
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
  }, [expenses]);

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
    if(page > 1) {
      setPage(prev => prev - 1)
    }
  }

  const handleNextPage = () => {
    if(page < totalPages) {
      setPage(prev => prev + 1)
    }
  }

  return (
    <div className={`${className}`}>
      <div className="relative group">
        <label
          htmlFor="typeFilterExpense"
          className="absolute left-3 -top-[7px] bg-white text-slate-600 group-focus-within:text-primary transition-all text-xs"
        >
          Tipo
        </label>
        <select
          className=" focus:border-primary outline-primary rounded-lg border-2 border-gray-150 p-2 w-full block transition-all"
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
          className=" focus:border-primary outline-primary rounded-lg border-2 border-gray-150 p-2 block w-full transition-all"
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
          className=" focus:border-primary outline-primary rounded-lg border-2 border-gray-150 p-2 w-full block transition-all"
          onChange={(e) => setSearchDueDate(e.target.value)}
          value={searchDueDate}
          id="dueDateFilterExpense"
        >
          <option value="">Todos</option>
          {dateOption.map((date) => (
            <option key={date.value} value={date.value}>
              {date.display}
            </option>
          ))}
        </select>
      </div>
      <div className="w-fit flex gap-1">
        <button
          disabled={page === 1}
          className="flex items-center p-1 bg-gray-50 enabled:hover:bg-gray-100 rounded-lg transition-all disabled:cursor-not-allowed disabled:opacity-70"
          onClick={handlePreviewPage}
        >
          <ChevronLeft className="" />
        </button>
        {getViewPages().map((numberPage) => (
          <button key={numberPage}
          className={`flex items-center w-8 h-8 justify-center p-1 rounded-lg transition-all ${page === numberPage ? "bg-primary hover:bg-primaryHover text-white" : "bg-gray-50 hover:bg-gray-100"}`}
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
