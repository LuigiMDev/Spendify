import { Expense, ExpenseType } from "@/generated/prisma";

export const getTypeChart = (data: Expense[]) => {
  const typeChart = data.reduce((acc, expense) => {
    const type = expense.type;
    if(expense.status === "paid") {
      acc[type] = (acc[type] | 0) + expense.value;
    }
    return acc;
  }, {} as Record<ExpenseType, number>);


  return typeChart;
};
