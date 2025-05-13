import { NextResponse } from "next/server";
import { prismadb } from "@/app/api/prismaClient";
import { getUserAuthentication } from "@/app/api/helpers/auth/getUserAuthentication";

export async function GET() {
  try {
    const { id } = (await getUserAuthentication()) as { id: string };

    const dates = await prismadb.expense.findMany({
      where: { userId: id },
      select: { dueDate: true, paymentDate: true },
    });

    const formatedDueDates = dates.map((obj) => {
      return obj.dueDate.toISOString().slice(0, 7);
    });

    const unicFormatedDueDates = [...new Set(formatedDueDates)];

    const formatedPaymentDates = dates
      .filter((obj) => obj.paymentDate)
      .map((obj) => obj.paymentDate!.toISOString().slice(0, 7));
    const unicFormatedPaymentDates = [...new Set(formatedPaymentDates)];

    return NextResponse.json(
      { unicFormatedDueDates, unicFormatedPaymentDates },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Ocorreu um erro ao recuperar as datas!" },
      { status: 500 }
    );
  }
}
