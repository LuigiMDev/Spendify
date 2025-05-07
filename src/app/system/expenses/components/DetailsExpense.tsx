import { AnimatePresence, motion } from "framer-motion";
import { CircleX, Info } from "lucide-react";
import React, { useState } from "react";
import { Expense } from "@/generated/prisma";
import { TranslateStatusExpense, TranslateTypeExpense } from "../../helpers/translateExpense";

type props = {
  expense: Expense;
};

const DetailsExpense = ({ expense }: props) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button
        className="flex h-fit p-2 bg-gray-50 hover:bg-primary group rounded-lg transition-all"
        onClick={() => setOpenModal(true)}
        title="Excluir"
      >
        <Info className="flex flex-shrink-0 w-5 h-5 group-hover:text-white transition-all" />
      </button>

      <AnimatePresence>
        {openModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed z-30 bg-black h-[100dvh] top-0 w-screen opacity-30 left-0"
              onClick={() => setOpenModal(false)}
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, top: "60%" }}
              animate={{ opacity: 1, top: "50%" }}
              exit={{ opacity: 0, top: "60%" }}
              transition={{ duration: 0.2 }}
              className="fixed shadow-header z-40 px-5 py-10 rounded-xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[90%] max-w-[700px] "
            >
              <div className="flex justify-between mb-5">
                <h2 className="text-3xl font-bold opacity-80 ">
                  {expense.title}
                </h2>
                <button onClick={() => setOpenModal(false)}>
                  <CircleX />
                </button>
              </div>

              <div className="relative">
                <dl className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6">
                  {expense.description && (
                    <div className="col-span-full">
                      <dt className="text-lg font-medium text-gray-700">
                        Descrição
                      </dt>
                      <dd className="text-gray-900">{expense.description}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-sm font-semibold text-gray-500">
                      Tipo de gasto
                    </dt>
                    <dd className="text-gray-900">{TranslateTypeExpense[expense.type]}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-gray-500">
                      Status
                    </dt>
                    <dd className="text-gray-900">{TranslateStatusExpense[expense.status]}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-gray-500">
                      Data de vencimento
                    </dt>
                    <dd className="text-gray-900">
                      {new Date(expense.dueDate).toLocaleDateString()}
                    </dd>
                  </div>
                  {expense.paymentDate && (
                    <div>
                      <dt className="text-sm font-semibold text-gray-500">
                        Data de Pagamento
                      </dt>
                      <dd className="text-gray-900">
                        {new Date(expense.paymentDate).toLocaleDateString()}
                      </dd>
                    </div>
                  )}
                  <div className="col-span-full">
                    <dt className="text-sm font-semibold text-gray-500">
                      Valor
                    </dt>
                    <dd className="text-lg font-bold text-red-500">
                      {expense.value.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="flex justify-end"></div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default DetailsExpense;
