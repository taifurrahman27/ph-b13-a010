import { redirect } from "next/navigation";

export default async function WriterProfilePage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/login");
    }

    redirect("/profile");
}