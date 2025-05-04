import { ExpenseStatus, ExpenseType } from "@/generated/prisma"
import { z } from "zod"

export const ExpenseFormSchema = z.object({
  idExpense: z.string().optional(),
  titleExpense: z.string().nonempty(),
  descriptionExpense: z.string().optional(),
  typeExpense: z.nativeEnum(ExpenseType),
  statusExpense: z.nativeEnum(ExpenseStatus),
  dueDateExpense: z.string().nonempty(),
  paymentDateExpense: z.string().optional(),
  valueExpense: z.number()
})

export type ExpenseZodType = z.infer<typeof ExpenseFormSchema>