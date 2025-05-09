import { NextRequest, NextResponse } from "next/server";
import { prismadb } from "../prismaClient";
import { getUserAuthentication } from "../helpers/getUserAuthentication";
import { getTypeChart } from "../helpers/dashboard/getTypeChart";
import { validateDueDate } from "../helpers/validateDueDate";

export async function GET(req: NextRequest) {
  try {
    const searchDueDate = req.nextUrl.searchParams.get("searchDueDate") || "";

    const {isValidDueDate, startDate, endDate} = validateDueDate(searchDueDate)

    const {id} = await getUserAuthentication() as {id: string}

    const data = await prismadb.expense.findMany({
      where: {
        userId: id,
        ...(isValidDueDate && {
          dueDate: {
            gte: startDate,
            lt: endDate,
          },
        }),
      },
    });

    const typeChart = getTypeChart(data)

    return NextResponse.json({ typeChart }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Ocorreu um erro ao carregar os gastos!" },
      { status: 500 }
    );
  }
}
