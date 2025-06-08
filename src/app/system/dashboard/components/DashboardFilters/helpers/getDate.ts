import { getUserAuthentication } from "@/app/api/helpers/auth/getUserAuthentication";
import { prismadb } from "@/app/api/prismaClient";

export const getDate = async () => {
  const { id } = (await getUserAuthentication()) as { id: string };

  const dates = await prismadb.expense.findMany({
    where: { userId: id },
    select: { dueDate: true, paymentDate: true },
  });

  const formatedDueDates = dates.map((obj) => {
    return obj.dueDate.toISOString().slice(0, 7);
  });

  const unicFormatedDueDates = [...new Set(formatedDueDates)];

  const formatedPaymentDates = dates
    .filter((obj) => obj.paymentDate)
    .map((obj) => obj.paymentDate!.toISOString().slice(0, 7));
  const unicFormatedPaymentDates = [...new Set(formatedPaymentDates)];

  const dueDateOption = unicFormatedDueDates.map((date: string) => {
    const [year, month] = date.split("-").map(Number);
    return {
      display: new Date(year, month - 1).toLocaleDateString("pt-BR", {
        month: "short",
        year: "numeric",
      }),
      value: date,
    };
  });

  const paymentDateOption = unicFormatedPaymentDates.map((date: string) => {
    const [year, month] = date.split("-").map(Number);
    return {
      display: new Date(year, month - 1).toLocaleDateString("pt-BR", {
        month: "short",
        year: "numeric",
      }),
      value: date,
    };
  });

  return { dueDateOption, paymentDateOption };
};
