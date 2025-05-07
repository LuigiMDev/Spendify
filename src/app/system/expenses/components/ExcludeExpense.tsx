import { AnimatePresence, motion } from "framer-motion";
import { CircleX, LoaderCircle, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import useExpenses from "../context/useExpenses";

type props = {
  id: string;
};

const ExcludeExpense = ({ id }: props) => {
  const {setExpenses} = useExpenses()
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleExcludeExpense = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/expense/expenseById", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.status !== 200) {
        throw new Error("Ocorreu um erro ao excluir seu gasto!");
      }

      setExpenses((prev) => {
        if (!prev) return prev;

        return prev.filter((expense) => expense.id !== id);
      });
      toast.success("Gasto excluído com sucesso!");
    } catch (err) {
      console.log(err);
      toast.error("Ocorreu um erro ao excluir o gasto!");
    }
    setIsLoading(false);
  };

  return (
    <>
      <button
        className="flex h-fit p-2 bg-gray-50 hover:bg-red-500 group rounded-lg transition-all"
        onClick={() => setOpenModal(true)}
        title="Excluir"
      >
        <Trash2 className="flex flex-shrink-0 w-5 h-5 group-hover:text-white transition-all" />
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
                  Excluir gasto
                </h2>
                <button onClick={() => setOpenModal(false)}>
                  <CircleX />
                </button>
              </div>

              <div className="relative">
                <p>Você tem certeza que deseja excluir este gasto?</p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleExcludeExpense}
                  type="submit"
                  className="text-white font-semibold px-4 py-2 bg-red-500 rounded-xl flex gap-1"
                >
                  Excluir
                  {isLoading ? (
                    <LoaderCircle className="animate-spin text-white" />
                  ) : (
                    <Trash2 className="text-white" />
                  )}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ExcludeExpense;
