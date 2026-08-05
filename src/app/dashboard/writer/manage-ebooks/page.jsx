import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ManageEbooksTable from "@/components/dashboard/writer/ManageEbooksTable";
export const metadata = {
    title: "Manage Ebooks",
};

export default async function ManageEbookPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return <div>Please login.</div>;
    }

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/writers/${session.user.id}/ebooks`,
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
