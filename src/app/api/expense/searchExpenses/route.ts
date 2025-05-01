import { NextResponse } from "next/server";
import { prismadb } from "../../prismaClient";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"

export async function GET() {
    try {

        const cookieToken = (await cookies()).get("token")

        if(!cookieToken) {
            return NextResponse.json({message: "Token inválido ou não definido!"}, {status: 401})
        }

        const JWT_SECRET = process.env.JWT_SECRET

        if(!JWT_SECRET) {
            return NextResponse.json({message: "JWT_SECRET não definido!"}, {status: 500})
        }

        const payload = jwt.verify(cookieToken.value, JWT_SECRET)
        const {id} = payload as {id: string}

        const expenses = await prismadb.expense.findMany({where: {userId: id}})

        return NextResponse.json({expenses}, {status: 200})
    } catch (err) {
        return NextResponse.json({message: "Ocorreu um erro ao carregar os gastos!"}, {status: 500})
    }
}