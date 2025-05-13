import { NextRequest, NextResponse } from "next/server";
import {jwtVerify} from "jose"

async function safeVerify(token: string, secret: Uint8Array) {
  try {
    return await jwtVerify(token, secret)
  } catch (err) {
    console.log(err)
    return null
  }
}

export async function middleware(req: NextRequest) {
  const cookieToken = req.cookies.get("token");

  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET || !cookieToken) {
    if(req.nextUrl.pathname.startsWith("/system")) {
      return NextResponse.redirect(new URL("/login", req.nextUrl))
    }
    return NextResponse.next()
  }

  const secret = new TextEncoder().encode(JWT_SECRET)

    const token = await safeVerify(cookieToken.value, secret);

    if (
      req.nextUrl.pathname === "/login" ||
      req.nextUrl.pathname === "/register"
    ) {
      if (token) {
        return NextResponse.redirect(new URL("/system/dashboard", req.nextUrl));
      }
    }

    if (req.nextUrl.pathname == "/system") {
      if (token) {
        return NextResponse.redirect(new URL("/system/dashboard", req.nextUrl));
      }
    }

    if (req.nextUrl.pathname.startsWith("/system")) {
      if (!token) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
      }
    }

    return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/system/:path*"],
};
