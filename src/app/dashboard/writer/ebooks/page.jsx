import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import EbookGrid from "@/components/ebooks/EbookGrid";

export const metadata = {
    title: "My Ebooks",
};

const WritersEbookPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const writerId = session?.user?.id;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/writers/${writerId}/ebooks`,
        {
            cache: "no-store",
        }
    );

    const data = await res.json();

    return (
        <section className="space-y-8">

            <div>
                <h1 className="text-4xl font-black">
                    My Ebooks
                </h1>

                <p className="mt-2 text-slate-500">
                    Manage all the ebooks you have published.
                </p>
            </div>

            {data.ebooks.length === 0 ? (
                <div className="rounded-2xl border border-dashed p-16 text-center">
                    <h2 className="text-2xl font-bold">
                        No ebooks found
                    </h2>

                    <p className="mt-2 text-slate-500">
                        Publish your first ebook to start selling.
                    </p>
                </div>
            ) : (
                <EbookGrid ebooks={data.ebooks} />
            )}

        </section>
    );
};

export default WritersEbookPage;