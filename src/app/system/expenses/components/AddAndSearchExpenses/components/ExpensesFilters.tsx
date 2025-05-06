import React from "react";

type props = {
  searchStatus: string;
  setSearchStatus: React.Dispatch<React.SetStateAction<string>>;
  className?: string
};

const ExpensesFilters = ({ searchStatus, setSearchStatus, className }: props) => {
  return (
    <div className={className}>
      <select
        className="outline-primary rounded-lg border-2 border-gray-150 p-2 w-fit block"
        onChange={(e) => setSearchStatus(e.target.value)}
        value={searchStatus}
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
