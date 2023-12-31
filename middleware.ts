// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const shouldHandleLocale = !(
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/") ||
    pathname.includes(".", pathname.lastIndexOf("/"))
  );

  if (shouldHandleLocale) {
    const countryUsingGEO = request.geo?.country ?? "en";

    const url = request.nextUrl.clone();
    url.locale = countryUsingGEO;

    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
