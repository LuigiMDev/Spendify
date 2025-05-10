import { CirclePlus, CircleX, LoaderCircle, Pencil } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NumericFormat } from "react-number-format";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExpenseFormSchema, ExpenseZodType } from "@/zod/Expense/FormExpense";
import { Expense } from "@/generated/prisma";
import { toast } from "react-toastify";
import useExpenses from "../../context/expenses/useExpenses";

type props = {
  expense: Expense;
};

const UpdateExpense = ({ expense }: props) => {
  const {setExpenses} = useExpenses()
  const [openModal, setOpenModal] = useState(false);
  const [paid, setPaid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, control, watch } = useForm<ExpenseZodType>({
    resolver: zodResolver(ExpenseFormSchema),
    defaultValues: {
      titleExpense: expense.title,
      descriptionExpense: expense.description || "",
      typeExpense: expense.type,
      statusExpense: expense.status,
      dueDateExpense: new Date(expense.dueDate).toISOString().slice(0, 10),
      paymentDateExpense: expense.paymentDate
        ? new Date(expense.paymentDate).toISOString().slice(0, 10)
        : "",
      valueExpense: expense.value,
    },
  });

  const statusValue = watch("statusExpense");

  useEffect(() => {
    setPaid(statusValue === "paid" ? true : false);
  }, [statusValue]);

  const handleAddExpense = async (data: ExpenseZodType) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/expense/updateExpense", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idExpense: expense.id, ...data }),
      });

      if (response.status !== 200) {
        throw new Error("Ocorreu um erro ao atualizar seu gasto!");
      }

      const updatedExpense = await response.json();

      console.log(updatedExpense);
      setExpenses(prevData => prevData.map((prevExpense) => prevExpense.id === updatedExpense.id ? updatedExpense : prevExpense))
      setOpenModal(false);
      toast.success("Gasto atualizado com sucesso!");
    } catch (err) {
      console.error(err);
      toast.error("Ocorreu um erro ao atualizar o gasto!");
    }
    setIsLoading(false);
  };

  return (
    <>
      <button
        className="flex h-fit p-2 bg-gray-50 hover:bg-orange-400 group rounded-lg transition-all"
        onClick={() => setOpenModal(true)}
        title="Atualizar"
      >
        <Pencil className="flex flex-shrink-0 w-5 h-5 group-hover:text-white transition-all" />
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
              className="fixed shadow-header z-40 px-5 py-10 rounded-xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[90%] max-w-[700px] max-h-[430px]"
            >
              <div className="flex justify-between mb-5">
                <h2 className="text-3xl font-bold opacity-80 ">
                  Atualizar gasto
                </h2>
                <button onClick={() => setOpenModal(false)}>
                  <CircleX />
                </button>
              </div>

              <form
                onSubmit={handleSubmit(handleAddExpense)}
                className="flex flex-col gap-4 w-full overflow-y-auto h-[310px] pr-4"
              >
                <div className="relative">
                  <label htmlFor="titleExpense" className="mb-2 inline-block">
                    Título <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Escreva o título do seu gasto"
                    className="outline-primary rounded-lg border-2 border-gray-150 p-2 w-full"
                    required
                    id="titleExpense"
                    maxLength={60}
                    {...register("titleExpense")}
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="descriptionExpense"
                    className="mb-2 inline-block"
                  >
                    Descrição
                  </label>
                  <textarea
                    className="outline-primary rounded-lg border-2 border-gray-150 p-2 w-full block h-20"
                    maxLength={500}
                    placeholder="Escreva a descrição do seu gasto"
                    id="descriptionExpense"
                    {...register("descriptionExpense")}
                  />
                </div>
                <div className="relative">
                  <label htmlFor="typeExpense" className="mb-2 inline-block">
                    Tipo de gasto <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="typeExpense"
                    className="outline-primary rounded-lg border-2 border-gray-150 p-2 w-full block"
                    required
                    {...register("typeExpense")}
                    defaultValue=""
                  >
                    <option value="" disabled hidden>
                      Selecione o tipo de gasto
                    </option>
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
                <div className="relative">
                  <label htmlFor="statusExpense" className="mb-2 inline-block">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="statusExpense"
                    className="outline-primary rounded-lg border-2 border-gray-150 p-2 w-full block"
                    required
                    {...register("statusExpense")}
                    defaultValue=""
                  >
                    <option value="" disabled hidden>
                      Selecione o tipo de gasto
                    </option>
                    <option value="pending">Pendente</option>
                    <option value="paid">Pago</option>
                    <option value="cancelled">Cancelado</option>
                  </select>
                </div>

                <div className="relative flex gap-4 flex-wrap">
                  <div className="flex-1">
                    <label
                      htmlFor="dueDateExpense"
                      className="mb-2 inline-block"
                    >
                      Data de vencimento <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="dueDateExpense"
                      className="outline-primary rounded-lg border-2 border-gray-150 p-2 w-full block"
                      {...register("dueDateExpense")}
                    />
                  </div>
                  <div
                    className={`flex-1 ${
                      !paid && "opacity-40 cursor-not-allowed"
                    }`}
                  >
                    <label
                      htmlFor="paymentDateExpense"
                      className={`mb-2 inline-block ${
                        !paid && "cursor-not-allowed"
                      }`}
                    >
                      Data de pagamento <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      disabled={!paid}
                      id="paymentDateExpense"
                      {...(paid && register("paymentDateExpense"))}
                      className={`outline-primary rounded-lg border-2 border-gray-150 p-2 w-full block disabled:group:opacity-40 ${
                        !paid && "cursor-not-allowed"
                      }`}
                    />
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="valueExpense" className="mb-2 inline-block">
                    Valor <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="valueExpense"
                    control={control}
                    render={({ field }) => (
                      <NumericFormat
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix="R$"
                        decimalScale={2}
                        allowNegative={false}
                        fixedDecimalScale
                        placeholder="R$ 0,00"
                        maxLength={17}
                        className="outline-primary rounded-lg border-2 border-gray-150 p-2 w-full"
                        required
                        id="valueExpense"
                        onValueChange={(values) => {
                          field.onChange(values.floatValue);
                        }}
                        value={field.value}
                      />
                    )}
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="text-white font-semibold px-4 py-2 bg-primary rounded-xl flex gap-1"
                  >
                    Atualizar
                    {isLoading ? (
                      <LoaderCircle className="animate-spin text-white" />
                    ) : (
                      <Pencil className="text-white" />
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default UpdateExpense;
