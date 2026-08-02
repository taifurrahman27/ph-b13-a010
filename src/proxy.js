import { NextResponse } from "next/server";

export async function proxy(request) {
    const { pathname } = request.nextUrl;

    const publicRoutes = [
        "/",
        "/login",
        "/register",
        "/ebooks",
        "/about",
        "/contact",
    ];

    if (
        publicRoutes.includes(pathname) ||
        pathname.startsWith("/ebooks/") ||
        pathname.startsWith("/api/auth")
    ) {
        return NextResponse.next();
    }

    const session =
        request.cookies.get("better-auth.session_token") ||
        request.cookies.get("__Secure-better-auth.session_token");

    if (!session) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/profile/:path*",
        "/library/:path*",
        "/payment/:path*",
    ],
};

