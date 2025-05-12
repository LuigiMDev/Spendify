import { NextRequest, NextResponse } from "next/server";
import { prismadb } from "../../prismaClient";
import { ExpenseStatus, ExpenseType } from "@/generated/prisma";
import { getUserAuthentication } from "../../helpers/auth/getUserAuthentication";
import { validateDate } from "../../helpers/validateDate";

export async function GET(req: NextRequest) {
  try {
    const searchInput = req.nextUrl.searchParams.get("searchInput") || "";
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1");
    const limit = 30;
    const searchType = req.nextUrl.searchParams.get("searchType") || "";
    const searchStatus = req.nextUrl.searchParams.get("searchStatus") || "";
    const searchDueDate = req.nextUrl.searchParams.get("searchDueDate") || "";
    const searchPaymentDate =
      req.nextUrl.searchParams.get("searchPaymentDate") || "";

    const isValidType = Object.values(ExpenseType).includes(
      searchType as ExpenseType
    );

    const isValidStatus = Object.values(ExpenseStatus).includes(
      searchStatus as ExpenseStatus
    );

    const {
      isValidDueDate,
      isValidPaymentDate,
      startDueDate,
      endDueDate,
      startPaymentDate,
      endPaymentDate,
    } = validateDate(searchDueDate, searchPaymentDate);

    const { id } = (await getUserAuthentication()) as { id: string };

    const totalExpenses = await prismadb.expense.count({
      where: {
        userId: id,
        OR: [
          {
            title: {
              contains: searchInput,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: searchInput,
              mode: "insensitive",
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
    });

    const totalPages = Math.ceil(totalExpenses / limit);

    const expenses = await prismadb.expense.findMany({
      where: {
        userId: id,
        OR: [
          {
            title: {
              contains: searchInput,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: searchInput,
              mode: "insensitive",
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
