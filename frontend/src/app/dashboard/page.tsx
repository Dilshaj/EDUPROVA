import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    const userRole = (session?.user as any)?.role;

    const dashboardMap: Record<string, string> = {
        SUPER_ADMIN: "/dashboard/admin",
        ADMIN: "/dashboard/admin",
        TEACHER: "/dashboard/teacher",
        MONITOR: "/dashboard/monitor",
        STUDENT: "/dashboard/home",
    };

    const target = dashboardMap[userRole || "STUDENT"] || "/dashboard/home";
    redirect(target);
}