import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { prismadb } from "@/app/api/prismaClient";

export async function GET(req: NextRequest) {
  try {
    const cookieToken = (await cookies()).get("token");

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

    const dates = await prismadb.expense.findMany({where: {userId: id}, select: {dueDate: true}})

    const formatedDates = dates.map((obj) => {
        return obj.dueDate.toISOString().slice(0, 7)
    })

    const unicFormatedDates = [...new Set(formatedDates)]

    return NextResponse.json({unicFormatedDates}, {status: 200})

  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Ocorreu um erro ao recuperar as datas!" },
      { status: 500 }
    );
  }
}
