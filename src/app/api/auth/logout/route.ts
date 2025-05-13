import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        (await cookies()).set("token", "", {
            httpOnly: true,
            path: "/",
            expires: new Date(0)
        })

        return NextResponse.json({message: "Logou realizado"}, {status: 200})
    } catch (err) {
        console.log(err)
        return NextResponse.json({message: "Ocorreu um problema no servidor!"}, {status: 500})
    }
}