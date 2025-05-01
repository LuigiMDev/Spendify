import { CirclePlus, CircleX, Send } from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NumericFormat } from "react-number-format";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import {zodResolver} from "@hookform/resolvers/zod"

type props = {
  add: boolean;
  setAdd: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddExpenseSchema = z.object({
  "title-expense": z.string().nonempty(),
  "description-expense": z.string().optional(),
  "type-expense": z.string().nonempty(),
  "status-expense": z.string().nonempty(),
  "dueDate-expense": z.string().nonempty(),
  "paymentDate-expense": z.string().optional(),
  "value-expense": z.number()
})

type AddExpenseSchema = z.infer<typeof AddExpenseSchema>

const AddExpense = ({ add, setAdd }: props) => {
  const [paid, setPaid] = useState(false);

  const handlePaidExpense = (e: string) => {
    setPaid(e === "paid" ? true : false);
  };

  const { register, handleSubmit, control } = useForm<AddExpenseSchema>({
    resolver: zodResolver(AddExpenseSchema)
  });

  const handleAddExpense = (data: AddExpenseSchema) => {
    console.log(data);
  };

  return (
    <AnimatePresence>
      {add && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed z-30 bg-black h-[100dvh] top-0 w-screen opacity-30 left-0"
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, top: "60%" }}
            animate={{ opacity: 1, top: "50%" }}
            exit={{ opacity: 0, top: "60%" }}
            transition={{ duration: 0.2 }}
            className="absolute shadow-header z-40 px-5 py-10 rounded-xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[90%] max-w-[700px] max-h-[430px]"
          >
            <div className="flex justify-between mb-5">
              <h2 className="text-3xl font-bold opacity-80 ">
                Adicionar gasto
              </h2>
              <button onClick={() => setAdd(false)}>
                <CircleX />
              </button>
            </div>

            <form
              onSubmit={handleSubmit(handleAddExpense)}
              className="flex flex-col gap-4 w-full overflow-y-auto h-[310px] pr-4"
            >
              <div className="relative">
                <label htmlFor="title-expense" className="mb-2 inline-block">
                  Título <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Escreva o título do seu gasto"
                  className="outline-primary rounded-lg border-2 border-gray-150 p-2 w-full"
                  required
                  id="title-expense"
                  {...register("title-expense")}
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="description-expense"
                  className="mb-2 inline-block"
                >
                  Descrição
                </label>
                <textarea
                  className="outline-primary rounded-lg border-2 border-gray-150 p-2 w-full block h-20"
                  maxLength={1000}
                  placeholder="Escreva a descrição do seu gasto"
                  id="description-expense"
                  {...register("description-expense")}
                />
              </div>
              <div className="relative">
                <label htmlFor="type-expense" className="mb-2 inline-block">
                  Tipo de gasto <span className="text-red-500">*</span>
                </label>
                <select
                  id="type-expense"
                  className="outline-primary rounded-lg border-2 border-gray-150 p-2 w-full block"
                  required
                  {...register("type-expense")} defaultValue=""
                >
                  <option value="" disabled hidden>
                    Selecione o tipo de gasto
                  </option>
                  <option value="food">Alimentação</option>
                  <option value="transport">Transporte</option>
                  <option value="entertainment">Entretenimento</option>
                  <option value="bills">Contas</option>
                  <option value="rent">Aluguel</option>
                  <option value="helth">Saúde</option>
                  <option value="shopping">Compras</option>
                  <option value="other">Outros</option>
                </select>
              </div>
              <div className="relative">
                <label htmlFor="status-expense" className="mb-2 inline-block">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  id="status-expense"
                  className="outline-primary rounded-lg border-2 border-gray-150 p-2 w-full block"
                  required
                  {...register("status-expense")}
                  onChange={(e) => handlePaidExpense(e.target.value)} defaultValue=""
                >
                  <option value="" disabled hidden>
                    Selecione o tipo de gasto
                  </option>
                  <option value="pending">Pendente</option>
                  <option value="paid">Pago</option>
                </select>
              </div>

              <div className="relative flex gap-4 flex-wrap">
                <div className="flex-1">
                  <label
                    htmlFor="dueDate-expense"
                    className="mb-2 inline-block"
                  >
                    Data de vencimento <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="dueDate-expense"
                    className="outline-primary rounded-lg border-2 border-gray-150 p-2 w-full block"
                    {...register("dueDate-expense")}
                  />
                </div>
                <div
                  className={`flex-1 ${
                    !paid && "opacity-40 cursor-not-allowed"
                  }`}
                >
                  <label
                    htmlFor="paymentDate-expense"
                    className={`mb-2 inline-block ${
                      !paid && "cursor-not-allowed"
                    }`}
                  >
                    Data de pagamento <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    disabled={paid}
                    id="paymentDate-expense"
                    {...(paid && register("paymentDate-expense"))}
                    className={`outline-primary rounded-lg border-2 border-gray-150 p-2 w-full block disabled:group:opacity-40 ${
                      !paid && "cursor-not-allowed"
                    }`}
                  />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="value-expense" className="mb-2 inline-block">
                  Valor <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="value-expense"
                  control={control}
                  render={({ field }) => (
                    <NumericFormat
                      thousandSeparator="."
                      decimalSeparator=","
                      prefix="R$"
                      decimalScale={2}
                      fixedDecimalScale
                      placeholder="R$ 0,00"
                      className="outline-primary rounded-lg border-2 border-gray-150 p-2 w-full"
                      required
                      id="value-expense"
                      onValueChange={(values) => {
                        field.onChange(values.floatValue);
                      }}
                    />
                  )}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="text-white font-semibold px-4 py-2 bg-primary rounded-xl flex gap-1"
                >
                  Criar
                  <CirclePlus />
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
