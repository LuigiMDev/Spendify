import { getDashboard } from "@/app/helpers/getDashboard";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchDueDate = req.nextUrl.searchParams.get("searchDueDate") || "";
    const searchPaymentDate =
      req.nextUrl.searchParams.get("searchPaymentDate") || "";

      const {statusData, spendEvolution, typeChart} = await getDashboard({searchDueDate, searchPaymentDate})

    return NextResponse.json(
      { statusData, spendEvolution, typeChart },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Ocorreu um erro ao carregar os gastos!" },
      { status: 500 }
    );
  }
}
