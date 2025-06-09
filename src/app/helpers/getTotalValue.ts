import { Expense } from "@prisma/client";

export const getTotalValue = (data: Expense[]) => {
    return data.reduce((acc, expense) => acc += expense.value, 0)
}