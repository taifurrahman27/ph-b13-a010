import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
export const metadata = {
    title: "Writer Profile",
};

export default async function WriterProfilePage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/login");
    }

    if (session.user.role !== "writer") {
        redirect("/");
    }

    redirect("/profile");
}