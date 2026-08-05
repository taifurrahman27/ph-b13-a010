import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
export const metadata = {
    title: "Writer Dashboard",
};

export default async function WriterDashboard() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/login");
    }

    if (session.user.role !== "writer") {
        redirect("/");
    }

    redirect("/dashboard/writer/home");
}
