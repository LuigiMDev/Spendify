import { NextRequest, NextResponse } from "next/server";
import { prismadb } from "@/app/api/prismaClient";
import { getUserAuthentication } from "@/app/api/helpers/auth/getUserAuthentication";

export async function GET(req: NextRequest) {
  try {
    const { id } = (await getUserAuthentication()) as { id: string };

    const dates = await prismadb.expense.findMany({
      where: { userId: id },
      select: { dueDate: true },
    });

    const formatedDates = dates.map((obj) => {
      return obj.dueDate.toISOString().slice(0, 7);
    });

    const unicFormatedDates = [...new Set(formatedDates)];

    return NextResponse.json({ unicFormatedDates }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Ocorreu um erro ao recuperar as datas!" },
      { status: 500 }
    );
  }
}
