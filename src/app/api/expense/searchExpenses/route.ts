import { NextRequest, NextResponse } from "next/server";
import { prismadb } from "../../prismaClient";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { ExpenseStatus, ExpenseType } from "@/generated/prisma";

export async function GET(req: NextRequest) {
  try {
    const cookieToken = (await cookies()).get("token");
    const searchInput = req.nextUrl.searchParams.get("searchInput") || "";
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1");
    const limit = 15;
    const searchType = req.nextUrl.searchParams.get("searchType") || "";
    const searchStatus = req.nextUrl.searchParams.get("searchStatus") || "";

    const isValidType = Object.values(ExpenseType).includes(
      searchType as ExpenseType
    );

    const isValidStatus = Object.values(ExpenseStatus).includes(
      searchStatus as ExpenseStatus
    );

    if (!cookieToken) {
      return NextResponse.json(
        { message: "Token inválido ou não definido!" },
        { status: 401 }
      );
    }

    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) {
      return NextResponse.json(
        { message: "JWT_SECRET não definido!" },
        { status: 500 }
      );
    }

    const payload = jwt.verify(cookieToken.value, JWT_SECRET);
    const { id } = payload as { id: string };

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
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ expenses }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Ocorreu um erro ao carregar os gastos!" },
      { status: 500 }
    );
  }
}
