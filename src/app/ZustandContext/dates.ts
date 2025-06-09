import { create } from "zustand";
import { dateOption } from "../system/types/dates";
import { toast } from "react-toastify";

type DatesContext = {
  dueDateOption: dateOption[];
  setDueDateOption: (options: dateOption[]) => void;
  paymentDateOption: dateOption[];
  setPaymentDateOption: (option: dateOption[]) => void;
  handleGetDate: () => void;
};

export const useDates = create<DatesContext>((set, get) => ({
  dueDateOption: [],
  setDueDateOption: (dueDateOption) => set({ dueDateOption }),
  paymentDateOption: [],
  setPaymentDateOption: (paymentDateOption) => set({ paymentDateOption }),
  handleGetDate: async () => {
    try {
      const res = await fetch("/api/getDate");

      if (!res.ok) {
        throw new Error("Ocorreu um erro ao buscar as datas!");
      }

      const dates = await res.json();

      const { setDueDateOption, setPaymentDateOption } = get();

      setDueDateOption(dates.dueDateOption);
      setPaymentDateOption(dates.paymentDateOption);
    } catch {
      toast.error("Ocorreu um erro ao buscar as datas!");
    }
  },
}));
