import { Expense } from "@/generated/prisma";

export const getTotalValue = (data: Expense[]) => {
    return data.reduce((acc, expense) => acc += expense.value, 0)
}