import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Disable Supabase middleware karena ada masalah konfigurasi
// import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

// Middleware function untuk proteksi route
export function middleware(request: NextRequest) {
  // Tidak perlu memproses asset statis atau API routes
  if (
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/api") ||
    request.nextUrl.pathname.startsWith("/images") ||
    request.nextUrl.pathname === "/"
  ) {
    return NextResponse.next();
  }

  // Untuk pengembangan, kita izinkan semua rute tanpa autentikasi
  // Di produksi, anda harus mengimplementasikan proteksi yang lebih baik
  return NextResponse.next();
}

// Configure which routes this middleware applies to
export const config = {
  matcher: [
    // Hanya jalankan middleware pada rute tertentu
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
