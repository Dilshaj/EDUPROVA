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
        if (pathname === "/dashboard" || pathname === "/dashboard/" || pathname.startsWith("/dashboard/")) {
            if (!isAuth) {
                return NextResponse.redirect(new URL("/login", req.url));
            }

            // Redirect base /dashboard or /dashboard/ to appropriate role dashboard
            if (pathname === "/dashboard" || pathname === "/dashboard/") {
                const dashboardMap: Record<string, string> = {
                    SUPER_ADMIN: "/dashboard/admin",
                    ADMIN: "/dashboard/admin",
                    TEACHER: "/dashboard/teacher",
                    MONITOR: "/dashboard/monitor",
                    STUDENT: "/dashboard/home",
                };
                const target = dashboardMap[userRole || "STUDENT"] || "/dashboard/home";
                return NextResponse.redirect(new URL(target, req.url));
            }

            // Check if user is accessing someone else's dashboard
            // SUPER_ADMIN has access to everything
            if (userRole === "SUPER_ADMIN") {
                return NextResponse.next();
            }

            const dashboardMap: Record<string, string> = {
                ADMIN: "/dashboard/admin",
                TEACHER: "/dashboard/teacher",
                MONITOR: "/dashboard/monitor",
                STUDENT: "/dashboard/home",
            };
            const ownDashboard = dashboardMap[userRole || "STUDENT"] || "/dashboard/home";

            if (pathname.startsWith("/dashboard/admin") && userRole !== "ADMIN") {
                return NextResponse.redirect(new URL(ownDashboard, req.url));
            }
            if (pathname.startsWith("/dashboard/teacher") && userRole !== "TEACHER") {
                return NextResponse.redirect(new URL(ownDashboard, req.url));
            }
            if (pathname.startsWith("/dashboard/monitor") && userRole !== "MONITOR") {
                return NextResponse.redirect(new URL(ownDashboard, req.url));
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
