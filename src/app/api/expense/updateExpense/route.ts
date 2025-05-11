import { ExpenseFormSchema } from "@/zod/Expense/FormExpense";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prismadb } from "../../prismaClient";
import { getUserAuthentication } from "../../helpers/auth/getUserAuthentication";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ExpenseFormSchema.safeParse(body);

    if (!parsed.success) {
      const parsedErrors = parsed.error.errors.map((err) => ({
        message: err.message,
        path: err.path,
      }));

      return NextResponse.json({ parsedErrors }, { status: 400 });
    }

    const {
      idExpense,
      titleExpense,
      descriptionExpense,
      typeExpense,
      statusExpense,
      dueDateExpense,
      paymentDateExpense,
      valueExpense,
    } = parsed.data;

    if(statusExpense === "paid" && !paymentDateExpense) {
      return NextResponse.json({message: "Data de pagamento inválida"}, {status: 400})
    }

    const { id } = (await getUserAuthentication()) as { id: string };

    const updatedExpense = await prismadb.expense.update({
      where: { id: idExpense },
      data: {
        title: titleExpense,
        description: descriptionExpense || undefined,
        type: typeExpense,
        status: statusExpense,
        dueDate: new Date(dueDateExpense),
        paymentDate: paymentDateExpense
          ? new Date(paymentDateExpense)
          : undefined,
        value: valueExpense,
        userId: id,
      },
    });
    return NextResponse.json({ ...updatedExpense }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Ocorreu um erro no servidor" },
      { status: 500 }
    );
  }
}
