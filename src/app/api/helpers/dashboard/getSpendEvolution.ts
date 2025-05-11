import { Expense } from "@/generated/prisma";
import { eachDayOfInterval, format, startOfDay, endOfDay } from "date-fns";

export const getSpendEvolution = (data: Expense[]) => {
  const allDates = eachDayOfInterval({
    start: startOfDay(data[0].dueDate),
    end: data[data.length - 1].dueDate,
  });

  console.log([data[0].dueDate, data[data.length - 1].dueDate])
  console.log(startOfDay(data[0].dueDate))
  console.log(allDates)

  const grouped = data.reduce((acc, expense) => {
    const date = expense.paymentDate;
    if (date) {
      const formatedDate = format(new Date(date), "yyyy-MM-dd");
      acc[formatedDate] = (acc[formatedDate] || 0) + expense.value;
    }
    return acc;
  }, {} as Record<string, number>);

  const teste = allDates.map((date) => {
    const key = format(date, "yyyy-MM-dd");
    return {
      date: key,
      value: grouped[key] || 0,
    };
  });

  console.log(teste)
  return teste
};
