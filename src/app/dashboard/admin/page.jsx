import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Admin Dashboard",
};

export default async function AdminDashboard() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/login");
    }

    if (session.user.role !== "admin") {
        redirect("/");
    }

    redirect("/dashboard/admin/home");
}
