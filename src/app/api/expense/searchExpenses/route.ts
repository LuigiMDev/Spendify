import { NextRequest, NextResponse } from "next/server";
import { prismadb } from "../../prismaClient";
import { ExpenseStatus, ExpenseType } from "@/generated/prisma";
import { getUserAuthentication } from "../../helpers/auth/getUserAuthentication";

export async function GET(req: NextRequest) {
  try {
    const searchInput = req.nextUrl.searchParams.get("searchInput") || "";
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1");
    const limit = 30;
    const searchType = req.nextUrl.searchParams.get("searchType") || "";
    const searchStatus = req.nextUrl.searchParams.get("searchStatus") || "";
    const searchDueDate = req.nextUrl.searchParams.get("searchDueDate") || "";

    const isValidType = Object.values(ExpenseType).includes(
      searchType as ExpenseType
    );

    const isValidStatus = Object.values(ExpenseStatus).includes(
      searchStatus as ExpenseStatus
    );

    const regexDueDate = /^\d{4}-(0[1-9]|1[0-2])$/;
    const isValidDueDate = regexDueDate.test(searchDueDate);
    let startDate: Date | undefined;
    let endDate: Date | undefined;

    if (isValidDueDate) {
      const [year, month] = searchDueDate.split("-").map(Number);

      startDate = new Date(Date.UTC(year, month - 1, 1));
      endDate = new Date(Date.UTC(year, month, 1));
    }

    const { id } = (await getUserAuthentication()) as { id: string };

    const totalExpenses = await prismadb.expense.count({
      where: {
        userId: id,
        OR: [
          {
            title: {
              contains: searchInput,
            },
          },
          {
            description: {
              contains: searchInput,
            },
          },
        ],
        ...(isValidType && {
          type: searchType as ExpenseType,
        }),
        ...(isValidStatus && {
          status: searchStatus as ExpenseStatus,
        }),
        ...(isValidDueDate && {
          dueDate: {
            gte: startDate,
            lt: endDate,
          },
        }),
      },
    });

    const totalPages = Math.ceil(totalExpenses / limit);

    const expenses = await prismadb.expense.findMany({
      where: {
        userId: id,
        OR: [
          {
            title: {
              contains: searchInput,
            },
          },
          {
            description: {
              contains: searchInput,
            },
          },
        ],
        ...(isValidType && {
          type: searchType as ExpenseType,
        }),
        ...(isValidStatus && {
          status: searchStatus as ExpenseStatus,
        }),
        ...(isValidDueDate && {
          dueDate: {
            gte: startDate,
            lt: endDate,
          },
        }),
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    });

    return NextResponse.json({ expenses, totalPages }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Ocorreu um erro ao carregar os gastos!" },
      { status: 500 }
    );
  }
}
