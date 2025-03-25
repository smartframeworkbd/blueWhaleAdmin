import { NextResponse } from "next/server";

export const middleware = (request) => {
  const authToken = request.cookies.get("authToken")?.value;
  const userToken = request.cookies.get("userToken")?.value;

  const url = request.nextUrl.clone();

  // Admin route protection
  if (url.pathname.startsWith("/Dashboard")) {
    if (!authToken) {
      return NextResponse.redirect(new URL("/AdminLogin", request.url));
    }
  }

  // User route protection
  if (url.pathname.startsWith("/UserDashboard")) {
    if (!userToken) {
      return NextResponse.redirect(new URL("/Login", request.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/Dashboard/:path*",
    "/UserDashboard/:path*",
  ],
};
