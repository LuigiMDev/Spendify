import { Expense, ExpenseType } from "@/generated/prisma";

export const getTypeChart = (data: Expense[]) => {
  const typeChartWithoutTotal = data.reduce((acc, expense) => {
    const type = expense.type;
    acc[type] = (acc[type] | 0) + expense.value;
    return acc;
  }, {} as Record<ExpenseType, number>);

  const totalValue = Object.values(typeChartWithoutTotal).reduce(
    (acc, value) => acc + value,
    0
  );

  return { ...typeChartWithoutTotal, totalValue };
};
