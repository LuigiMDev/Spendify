import { ExpenseStatus, ExpenseType } from "@/generated/prisma";
import { z } from "zod";

export const ExpenseFormSchema = z.object({
  idExpense: z.string().optional(),
  titleExpense: z.string().nonempty().trim().max(60),
  descriptionExpense: z.string().trim().max(500).optional(),
  typeExpense: z.nativeEnum(ExpenseType),
  statusExpense: z.nativeEnum(ExpenseStatus),
  dueDateExpense: z.string().nonempty(),
  paymentDateExpense: z.string().optional(),
  valueExpense: z.number().max(1_000_000_000),
});

export type ExpenseZodType = z.infer<typeof ExpenseFormSchema>;
