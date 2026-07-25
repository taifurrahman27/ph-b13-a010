// app/dashboard/page.jsx

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function DashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/login");
    }

    switch (session.user.role) {
        case "reader":
            redirect("/dashboard/reader");

        case "writer":
            redirect("/dashboard/writer");

        case "admin":
            redirect("/dashboard/admin");

        default:
            redirect("/");
    }
}