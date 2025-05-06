import React from "react";

type props = {
  searchStatus: string;
  setSearchStatus: React.Dispatch<React.SetStateAction<string>>;
  className?: string
};

const ExpensesFilters = ({ searchStatus, setSearchStatus, className }: props) => {
  return (
    <div className={`${className} relative group`}>
      <label htmlFor="statusFilterExpense" className="absolute left-3 -top-3 bg-white text-slate-600 group-focus-within:text-primary transition-all">
        Status
      </label>
      <select
        className=" focus:border-primary outline-primary rounded-lg border-2 border-gray-150 p-2 w-fit block transition-all"
        onChange={(e) => setSearchStatus(e.target.value)}
        value={searchStatus} id="statusFilterExpense"
      >
        <option value="">Todos</option>
        <option value="pending">Pendente</option>
        <option value="paid">Pago</option>
        <option value="cancelled">Cancelado</option>
      </select>
    </div>
  );
};

export default ExpensesFilters;
