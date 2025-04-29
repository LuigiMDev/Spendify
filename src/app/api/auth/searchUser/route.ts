import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken"
import { prismadb } from "../../prismaClient";

export async function GET(res: NextRequest) {
    const token = (await cookies()).get("token")

    if(!token) {
        return NextResponse.json({message: "O token não está presente"}, {status: 401})
    }

    const JWT_SECRET = process.env.JWT_SECRET

    if (!JWT_SECRET) {
        return NextResponse.json({message: "O JWT_SECRET não foi definido!"}, {status: 500})
    }

    const decoded = jwt.verify(token.value, JWT_SECRET) as JwtPayload

   try{
        const user = await prismadb.user.findUnique({where: {id: decoded.id}})
        return NextResponse.json({...user}, {status: 200})
    
   } catch {
        return NextResponse.json({message: "Ocorreu um problema ao processar o usuário!"}, {status: 500})
   }
}