import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ManageEbooksTable from "@/components/dashboard/writer/ManageEbooksTable";

export default async function ManageEbookPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return <div>Please login.</div>;
    }

    const res = await fetch(
        `http://localhost:5000/writers/${session.user.id}/ebooks`,
        {
            cache: "no-store",
        }
    );

    const { ebooks } = await res.json();

    return (
        <section>
            <ManageEbooksTable ebooks={ebooks} />
        </section>
    );
}
