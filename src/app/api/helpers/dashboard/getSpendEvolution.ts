import { Expense } from "@/generated/prisma";
import {
  generateDays,
  generateMonths,
} from "./helpers/getSpendEvolution.ts/generateMonthsAndDays";

export const getSpendEvolution = (data: Expense[]) => {
  const paidExpenses = data.filter((expense) => expense.paymentDate);

  if (paidExpenses.length === 0) return [];

  const sorted = paidExpenses.sort(
    (a, b) =>
      new Date(a.paymentDate!).getTime() - new Date(b.paymentDate!).getTime()
  );

  const firstDate = new Date(sorted[0].paymentDate!)
    .toISOString()
    .slice(0,7)
    .split("-")[1];
  const lastDate = new Date(sorted[sorted.length - 1].paymentDate!)
    .toISOString()
    .slice(0,7)
    .split("-")[1];

  console.log(firstDate, lastDate)

  const groupByMonth = firstDate !== lastDate;
  const sliceEnd = groupByMonth ? 7 : 10;

  const allDates = groupByMonth
    ? generateMonths()
    : generateDays(paidExpenses[0].paymentDate!);

  const grouped = paidExpenses.reduce((acc, expense) => {
    const date = expense.paymentDate;
    if (date) {
      const formatedDate = new Date(date).toISOString().slice(0, sliceEnd);
      acc[formatedDate] = (acc[formatedDate] || 0) + expense.value;
    }
    return acc;
  }, {} as Record<string, number>);

  return {
    allDatesGrouped: allDates.map((date) => {
      return {
        date,
        value: grouped[date] || 0,
      };
    }),
    groupByMonth,
  };
};
