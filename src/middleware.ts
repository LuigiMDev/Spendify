
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const cookies = req.cookies
    const token = cookies.get("authToken")?.value

    if(!token) {
        return NextResponse.redirect(new URL("/login", req.url))
    }

    try {
        const response = await fetch(`${req.nextUrl.origin}/api/verify-token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({token})
        })

        const data = await response.json()

        if (!data.success) {
            throw new Error("Token inválido")
        }

        const url = new URL(req.url)
        const pathname = url.pathname
        if(pathname === "/system" || pathname === "/system/") {
            return NextResponse.redirect(new URL("/system/dashboard", req.url))
        }

        return NextResponse.next();
    } catch (error) {
        return NextResponse.redirect(new URL("/login", req.url))
    }
}

export const config = {
    matcher: '/system/:path*'
}