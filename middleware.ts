// middleware.ts
import { NextRequest, NextFetchEvent, NextResponse } from "next/server";

export async function middleware(request: NextRequest, _next: NextFetchEvent) {
  const res = NextResponse.next();
  const countryUsingGEO = request.geo?.country ?? "";

  const countryusingCFIpcountry = request.headers.get("cf-ipcountry") ?? "";

  res.cookies.set("countryUsingGEO", countryUsingGEO);
  res.cookies.set("countryusingCFIpcountry", countryusingCFIpcountry);

  //   if(RESTRICTED_COUNTRIES.includes(country)){
  //     return NextResponse.rewrite(new URL("/restricted", request.url))
  //   }
  return res;
}
