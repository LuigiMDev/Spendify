import { NextRequest, NextResponse } from "next/server";
import { prismadb } from "../prismaClient";
import { getUserAuthentication } from "../helpers/auth/getUserAuthentication";
import { getTypeChart } from "../helpers/dashboard/getTypeChart";
import { validateDueDate } from "../helpers/validateDueDate";
import { getStatusData } from "../helpers/dashboard/getStatusData";
import { getSpendEvolution } from "../helpers/dashboard/getSpendEvolution";

export async function GET(req: NextRequest) {
  try {
    const searchDueDate = req.nextUrl.searchParams.get("searchDueDate") || "";

    const { isValidDueDate, startDate, endDate } =
      validateDueDate(searchDueDate);

    const { id } = (await getUserAuthentication()) as { id: string };

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
      orderBy: {createdAt: "desc"}
    });

    const statusData = getStatusData(data)
    const spendEvolution = getSpendEvolution(data)
    const typeChart = getTypeChart(data);

    return NextResponse.json({ statusData, spendEvolution, typeChart }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Ocorreu um erro ao carregar os gastos!" },
      { status: 500 }
    );
  }
}
