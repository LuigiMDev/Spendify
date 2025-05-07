import React from "react";

type props = {
  searchStatus: string;
  setSearchStatus: React.Dispatch<React.SetStateAction<string>>;
  searchType: string;
  setSearchType: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
};

const ExpensesFilters = ({
  searchStatus,
  setSearchStatus,
  searchType,
  setSearchType,
  className,
}: props) => {
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
          className=" focus:border-primary outline-primary rounded-lg border-2 border-gray-150 p-2 w-fit block transition-all"
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
          className=" focus:border-primary outline-primary rounded-lg border-2 border-gray-150 p-2 w-fit block transition-all"
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
    </div>
  );
};

export default ExpensesFilters;
