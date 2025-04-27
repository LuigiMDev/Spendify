import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../prismaClient";

export async function POST(req: NextRequest) {

        const {name, email, password} = await req.json()

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        })

        return NextResponse.json(newUser, {status: 201})
  
}