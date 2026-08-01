import Link from "next/link";
import EbookGrid from "@/components/ebooks/EbookGrid";

const API_URL =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    "http://localhost:5000";

async function getFeaturedEbooks() {
    const res = await fetch(
        `${API_URL}/ebooks/featured`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("Failed to load featured ebooks.");
    }

    return res.json();
}

export default async function FeaturedEbooks() {

    const ebooks = await getFeaturedEbooks();

    return (
        <section className="py-15 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            <div className="mb-10 flex flex-col items-center justify-between gap-4 md:flex-row">

                <div>

                    <h2 className="text-4xl font-black">
                        Featured E-books
                    </h2>

                    <p className="mt-3 text-slate-500">
                        Discover hand-picked books from talented writers.
                    </p>

                </div>

                <Link
                    href="/ebooks"
                    className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
                >
                    View All →
                </Link>

            </div>

            <EbookGrid ebooks={ebooks} />

        </section>
    );
}
