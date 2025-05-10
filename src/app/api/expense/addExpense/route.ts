import { ExpenseFormSchema } from "@/zod/Expense/FormExpense";
import { NextRequest, NextResponse } from "next/server";
import { prismadb } from "../../prismaClient";
import { getUserAuthentication } from "../../helpers/auth/getUserAuthentication";

export async function POST(req: NextRequest) {
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
      titleExpense,
      descriptionExpense,
      typeExpense,
      statusExpense,
      dueDateExpense,
      paymentDateExpense,
      valueExpense,
    } = parsed.data;

    const {id} = await getUserAuthentication() as {id: string}

    const newExpense = await prismadb.expense.create({
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

    return NextResponse.json({ ...newExpense }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Ocorreu um erro no servidor" },
      { status: 500 }
    );
  }
}
