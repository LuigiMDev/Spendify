import { NextRequest, NextResponse } from "next/server";
import { prismadb } from "../prismaClient";
import { getUserAuthentication } from "../helpers/getUserAuthentication";
import { getTypeChart } from "../helpers/dashboard/getTypeChart";

export async function GET(req: NextRequest) {
  try {
    const searchDueDate = req.nextUrl.searchParams.get("searchDueDate") || "";

    const regexDueDate = /^\d{4}-(0[1-9]|1[0-2])$/;
    const isValidDueDate = regexDueDate.test(searchDueDate);
    let startDate: Date | undefined;
    let endDate: Date | undefined;

    if (isValidDueDate) {
      const [year, month] = searchDueDate.split("-").map(Number);

      startDate = new Date(Date.UTC(year, month - 1, 1));
      endDate = new Date(Date.UTC(year, month, 1));
    }

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
