import { NextResponse, userAgent } from "next/server";

export function middleware(request) {
  const url = request.nextUrl;
  const { device } = userAgent(request);
  const isDesktop = !["mobile", "tablet"].includes(device.type);
  url.searchParams.set("isDesktop", isDesktop);
  return NextResponse.rewrite(url);
}
