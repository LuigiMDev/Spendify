import { ExpenseStatus, ExpenseType } from "@/generated/prisma";

export const TranslateTypeExpense: Record<ExpenseType, string> = {
    food: "Alimentação",
    transport: "Transporte",
    entertainment: "Entretenimento",
    bills: "Contas",
    rent: "Aluguel",
    health: "Saúde",
    shopping: "Compras",
    other: "Outros",
}

export const TranslateStatusExpense: Record<ExpenseStatus, string> = {
    pending: "Pendente",
    paid: "Pago",
    cancelled: "Cancelado"
}