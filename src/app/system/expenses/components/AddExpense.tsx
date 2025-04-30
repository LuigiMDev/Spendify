import { CircleX, Send } from "lucide-react";
import React, { ChangeEvent, ReactElement } from "react";
import { motion, AnimatePresence } from "framer-motion";

type props = {
  add: boolean;
  setAdd: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddExpense = ({ add, setAdd }: props) => {
  return (
    <AnimatePresence>
      {add && (
        <>
          <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 0.3}}
          exit={{opacity: 0}}
          transition={{duration: 0.2}}
          className="absolute z-30 bg-black h-screen top-0 w-screen opacity-30 left-0"></motion.div>
          <motion.div
            initial={{ opacity: 0, top: "60%" }}
            animate={{ opacity: 1, top: "50%"  }}
            exit={{ opacity: 0, top: "60%"  }}
            transition={{ duration: 0.2 }}
            className="absolute shadow-header z-40 px-5 py-10 rounded-xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[90%] max-w-[700px]"
          >
            <div className="flex justify-between mb-5">
              <h2 className="text-3xl font-bold opacity-80 ">
                Adicionar gasto
              </h2>
              <button onClick={() => setAdd(false)}>
                <CircleX />
              </button>
            </div>
            <form className="flex flex-col gap-4 w-full">
              <div className="relative">
                <span className="mb-2 block">Título</span>
                <input
                  type="text"
                  placeholder="Escreva o título do seu gasto"
                  className="outline-primary rounded-lg border-2 border-gray-150 p-2 w-full"
                  required
                />
              </div>
              <div className="relative">
                <span className="mb-2 block">Tipo de gasto</span>
                <input
                  type="text"
                  placeholder="Escreva o tipo de gasto"
                  className="outline-primary rounded-lg border-2 border-gray-150 p-2 w-full"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="text-white font-semibold px-4 py-2 bg-primary rounded-xl flex gap-1"
                >
                  Enviar
                  <Send />
                </button>
              </div>
            </form>
          </motion.div>
          </>
      )}
    </AnimatePresence>
  );
};

export default AddExpense;
