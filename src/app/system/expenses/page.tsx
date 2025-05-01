"use client";
import { CirclePlus, CircleX, Edit, Send, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import AddExpense from "./components/AddExpense";
import { AnimatePresence } from "framer-motion";

const page = () => {
  const [add, setAdd] = useState(false);
  const [expenses, setExpenses] = useState<any>([]);

  return (
    <div className="">
      <div className="mb-5">
        <h1 className="text-4xl mb-3">Gastos</h1>
        <p className="text-gray-800">
          Adicione, altere e exclua seus gastos. Suas alterações irão refletir
          nos gráficos do dashboard
        </p>
      </div>

      <section>
        <div className="mb-5">
          <button
            className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all"
            onClick={() => setAdd(true)}
          >
            <CirclePlus className="flex flex-shrink-0 w-6 h-6" />
            <span className={`ml-3 w-full overflow-hidden text-nowrap`}>
              Adicionar gasto
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"></div>
      </section>
      <AddExpense add={add} setAdd={setAdd} />
    </div>
  );
};

export default page;
