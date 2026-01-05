import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const { pathname } = req.nextUrl;
        const token = req.nextauth.token;
        const isAuth = !!token;
        const userRole = token?.role as string | undefined;

        const authRoutes = ["/login", "/register"];
        const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

        // 1. If user is authenticated and tries to access /login or /register, redirect to their role dashboard
        if (isAuthRoute && isAuth) {
            const dashboardMap: Record<string, string> = {
                ADMIN: "/dashboard/admin",
                TEACHER: "/dashboard/teacher",
                MONITOR: "/dashboard/monitor",
                STUDENT: "/dashboard/home",
            };
            const target = dashboardMap[userRole || "STUDENT"] || "/dashboard/home";
            return NextResponse.redirect(new URL(target, req.url));
        }

        // 2. Protect /dashboard/:role routes based on role
        if (pathname.startsWith("/dashboard/")) {
            if (!isAuth) {
                return NextResponse.redirect(new URL("/login", req.url));
            }

            // Check if user is accessing someone else's dashboard
            if (pathname.startsWith("/dashboard/admin") && userRole !== "ADMIN") {
                return NextResponse.redirect(new URL("/dashboard/home", req.url));
            }
            if (pathname.startsWith("/dashboard/teacher") && userRole !== "TEACHER") {
                return NextResponse.redirect(new URL("/dashboard/home", req.url));
            }
            if (pathname.startsWith("/dashboard/monitor") && userRole !== "MONITOR") {
                return NextResponse.redirect(new URL("/dashboard/home", req.url));
            }
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => true, // Redirect logic is handled inside the middleware function above
        },
    }
);

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/profile/:path*",
        "/admin/:path*",
        "/login",
        "/register",
    ],
};
