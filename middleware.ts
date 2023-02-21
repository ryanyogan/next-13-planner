import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

async function verifyJWT(jwt: any) {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );

  return payload;
}

export default async function middleware(req: NextRequest, _res: NextResponse) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/signin") ||
    pathname.startsWith("/register") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (!process.env.COOKIE_NAME) {
    throw new Error("COOKIE_NAME must be set.");
  }

  const jwt = req.cookies.get(process.env.COOKIE_NAME);

  if (!jwt) {
    req.nextUrl.pathname = "/signin";
    return NextResponse.redirect(req.nextUrl);
  }

  try {
    await verifyJWT(jwt.value);
    return NextResponse.next();
  } catch (error) {
    console.error(error);
    req.nextUrl.password = "/signin";
    return NextResponse.redirect(req.nextUrl);
  }
}
