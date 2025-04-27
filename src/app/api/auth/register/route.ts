import { NextRequest, NextResponse } from "next/server";
import { prismadb } from "../../prismaClient";
import { User } from "../models/User";

const user = new User();

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const newUser = await user.register(body);
    return NextResponse.json({newUser}, {status: 201})
  } catch (err) {
    console.log(err);
    NextResponse.json(
      { message: "Ocorreu um problema ao criar o usuário" },
      { status: 500 }
    );
  }
}
