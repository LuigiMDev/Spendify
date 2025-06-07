import { getExpenses } from "@/app/helpers/getExpenses";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchInput = req.nextUrl.searchParams.get("searchInput") || "";
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1");
    const searchType = req.nextUrl.searchParams.get("searchType") || "";
    const searchStatus = req.nextUrl.searchParams.get("searchStatus") || "";
    const searchDueDate = req.nextUrl.searchParams.get("searchDueDate") || "";
    const searchPaymentDate =
      req.nextUrl.searchParams.get("searchPaymentDate") || "";

    const expenses = await getExpenses({
      searchInput,
      page,
      searchType,
      searchStatus,
      searchDueDate,
      searchPaymentDate,
    });
    return NextResponse.json(expenses, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Ocorreu um erro ao carregar os gastos!" },
      { status: 500 }
    );
  }
}
