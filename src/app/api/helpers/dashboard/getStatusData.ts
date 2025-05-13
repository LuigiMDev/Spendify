import { Expense, ExpenseStatus } from "@/generated/prisma";
import { getTotalValue } from "./getTotalValue";

export const getStatusData = (data: Expense[]) => {
    const statusData =  data.reduce((acc, expense) => {
        const status = expense.status
        acc[status] = (acc[status] | 0) + expense.value
        return acc
    }, {} as Record<ExpenseStatus, number>)

    const total = getTotalValue(data)

    return {...statusData, total}
}