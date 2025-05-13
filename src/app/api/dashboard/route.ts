import { NextRequest, NextResponse } from "next/server";
import { prismadb } from "../prismaClient";
import { getUserAuthentication } from "../helpers/auth/getUserAuthentication";
import { getTypeChart } from "../helpers/dashboard/getTypeChart";
import { getStatusData } from "../helpers/dashboard/getStatusData";
import { getSpendEvolution } from "../helpers/dashboard/getSpendEvolution";
import { validateDate } from "../helpers/validateDate";

export async function GET(req: NextRequest) {
  try {
    const searchDueDate = req.nextUrl.searchParams.get("searchDueDate") || "";
    const searchPaymentDate =
      req.nextUrl.searchParams.get("searchPaymentDate") || "";

    const {
      isValidDueDate,
      startDueDate,
      endDueDate,
      isValidPaymentDate,
      startPaymentDate,
      endPaymentDate,
    } = validateDate(searchDueDate, searchPaymentDate);

    const { id } = (await getUserAuthentication()) as { id: string };

    const data = await prismadb.expense.findMany({
      where: {
        userId: id,
        ...(isValidDueDate && {
          dueDate: {
            gte: startDueDate,
            lt: endDueDate,
          },
        }),
        ...(isValidPaymentDate && {
          paymentDate: {
            gte: startPaymentDate,
            lt: endPaymentDate,
          },
        }),
      },
      orderBy: { createdAt: "desc" },
    });

    const statusData = getStatusData(data);
    const spendEvolution = getSpendEvolution(data);
    const typeChart = getTypeChart(data);

    return NextResponse.json(
      { statusData, spendEvolution, typeChart },
      { status: 200 }
    );
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      { message: "Ocorreu um erro ao carregar os gastos!" },
      { status: 500 }
    );
  }
}
