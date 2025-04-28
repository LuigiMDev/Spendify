import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(req: NextRequest) {
  const cookieToken = req.cookies.get("token");

  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET || !cookieToken) {
    if(req.nextUrl.pathname.startsWith("/system")) {
      return NextResponse.redirect(new URL("/login", req.nextUrl))
    }
    return NextResponse.next()
  }

  try {
    const token = jwt.verify(cookieToken.value, JWT_SECRET);
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
  } catch (err) {
    return NextResponse.json(
      { message: "Token inválido ou expirado!" },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ["/login", "/register", "/system/:path*"],
};
