import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export const getUserAuthentication = async () => {
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
        return payload
}