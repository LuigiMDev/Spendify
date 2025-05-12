import { Expense } from "@/generated/prisma";

export const getSpendEvolution = (data: Expense[]) => {
  const paidExpenses = data.filter((expense) => expense.paymentDate);

  if (paidExpenses.length === 0) return [];

  const sorted = paidExpenses.sort(
    (a, b) =>
      new Date(a.paymentDate!).getTime() - new Date(b.paymentDate!).getTime()
  );

  const startDate = new Date(sorted[0].paymentDate!);
  const endDate = new Date(sorted[sorted.length - 1].paymentDate!);

  let allDates = [];

  while (startDate <= endDate) {
    allDates.push(new Date(startDate).toISOString().slice(0, 10));
    startDate.setUTCDate(startDate.getUTCDate() + 1);
  }

  const groupByMonth = allDates.length > 31;

  if (groupByMonth) {
    const currentYear = new Date().getFullYear();
    allDates = Array.from({ length: 12 }, (_, i) => {
      const month = (i + 1).toString().padStart(2, "0");
      return `${currentYear}-${month}`;
    });
  }

  const sliceEnd = allDates.length < 31 ? 10 : 7;

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
