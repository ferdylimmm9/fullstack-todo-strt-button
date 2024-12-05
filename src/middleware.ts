import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jwt from "jsonwebtoken";
import { AuthToken } from "./repositories/auth-token";

const protectedRoutes = ["/api/tasks", "/api/auth/me"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get(AuthToken.key)?.value;
  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtected) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET as string);
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"], // Apply to all API routes
};
