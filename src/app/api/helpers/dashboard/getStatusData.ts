import { Expense, ExpenseStatus } from "@/generated/prisma";

export const getStatusData = (data: Expense[]) => {
    return data.reduce((acc, expense) => {
        const status = expense.status
        acc[status] = (acc[status] | 0) + expense.value
        return acc
    }, {} as Record<ExpenseStatus, number>)
}