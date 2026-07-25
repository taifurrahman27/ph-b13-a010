import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function getEbook(id) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/ebooks/${id}`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        return null;
    }

    return res.json();
}

const EbookDetailsPage = async ({ params }) => {
    const { id } = await params;

    const ebook = await getEbook(id);

    if (!ebook) {
        notFound();
    }

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;

    const alreadyPurchased = false;
    const isWriter = user?.id === ebook.writerId;

    return (
        <section className="min-h-screen bg-slate-50 py-14 dark:bg-slate-950">

            <div className="container mx-auto px-4">

                <div className="grid gap-10 lg:grid-cols-2">


                    <div className="overflow-hidden rounded-3xl bg-white shadow-xl dark:bg-slate-900">

                        {/* // Ebook cover image will be displayed here */}


                    </div>

                    {/* Information */}

                    <div>

                        <span className="rounded-full bg-violet-100 px-4 py-1 text-sm font-semibold text-violet-700 dark:bg-violet-900 dark:text-violet-300">
                            {ebook.genre}
                        </span>

                        <h1 className="mt-5 text-5xl font-black">
                            {ebook.title}
                        </h1>

                        <div className="flex items-center gap-3">
                            {/* writer photo will be displayed here */}

                            <div>
                                <Link
                                    href={`/writers/${ebook.writer.id}`}
                                    className="font-semibold text-violet-600 hover:underline"
                                >
                                    {ebook.writer.name}
                                </Link>

                                <p className="text-xs text-slate-500">
                                    Writer
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-3">

                            <span className="rounded-lg bg-slate-200 px-4 py-2 dark:bg-slate-800">
                                ${ebook.price}
                            </span>

                            <span
                                className={`rounded-lg px-4 py-2 font-semibold ${ebook.status === "Available"
                                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                    : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                                    }`}
                            >
                                {ebook.status}
                            </span>

                        </div>

                        <p className="mt-8 leading-8 text-slate-600 dark:text-slate-300">
                            {ebook.description}
                        </p>

                        <div className="mt-10 space-y-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">

                            <div className="flex justify-between">

                                <span>Genre</span>

                                <span className="font-semibold">
                                    {ebook.genre}
                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span>Status</span>

                                <span className="font-semibold">
                                    {ebook.status}
                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span>Uploaded</span>

                                <span className="font-semibold">
                                    {new Date(
                                        ebook.dateUploaded
                                    ).toLocaleDateString()}
                                </span>

                            </div>

                        </div>

                        {/* Buttons */}

                        <div className="mt-10 flex flex-wrap gap-4">

                            {alreadyPurchased ? (
                                <button
                                    disabled
                                    className="rounded-xl bg-green-600 px-8 py-3 font-semibold text-white"
                                >
                                    Already Purchased
                                </button>
                            ) : (
                                <button
                                    disabled={isWriter}
                                    className={`rounded-xl px-8 py-3 font-semibold text-white transition ${isWriter
                                        ? "cursor-not-allowed bg-slate-400"
                                        : "bg-violet-600 hover:bg-violet-700"
                                        }`}
                                >
                                    {isWriter
                                        ? "Your Ebook"
                                        : "Purchase Ebook"}
                                </button>
                            )}

                            <button className="rounded-xl border border-violet-600 px-8 py-3 font-semibold text-violet-600 transition hover:bg-violet-600 hover:text-white">
                                Bookmark
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default EbookDetailsPage;