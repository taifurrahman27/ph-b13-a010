import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Reader Dashboard",
};

export default async function ReaderDashboard() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/login");
    }

    if (session.user.role !== "reader") {
        redirect("/");
    }

    redirect("/dashboard/reader/home");
}