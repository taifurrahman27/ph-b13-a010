import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import {
    HiOutlineBookOpen,
    HiOutlineStar,
    HiOutlineCalendarDays,
} from "react-icons/hi2";

export default async function PurchasedEbookPage() {

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;

    const purchasedEbooks = user
        ? await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/purchases/${user.id}`,
            {
                cache: "no-store",
            }
        ).then((res) => res.json())
        : [];

    return (
        <section className="space-y-8">

            <div>
                <h1 className="text-4xl font-black text-slate-900 dark:text-white">
                    Purchased Ebooks
                </h1>

                <p className="mt-2 text-slate-500 dark:text-slate-400">
                    Access all the ebooks you have purchased and continue reading anytime.
                </p>
            </div>

            {purchasedEbooks.length === 0 ? (

                <div className="flex h-96 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900">

                    <HiOutlineBookOpen className="text-6xl text-slate-300 dark:text-slate-600" />

                    <h2 className="mt-5 text-2xl font-bold text-slate-900 dark:text-white">
                        No Purchased Ebooks
                    </h2>

                    <p className="mt-2 max-w-md text-center text-slate-500 dark:text-slate-400">
                        You have not purchased any ebooks yet. Browse our collection and start building your personal library.
                    </p>

                    <Link
                        href="/ebooks"
                        className="mt-6 rounded-xl bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-700"
                    >
                        Browse Ebooks
                    </Link>

                </div>

            ) : (

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                    {purchasedEbooks.map((ebook) => (

                        <article
                            key={ebook._id}
                            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                        >

                            <div className="relative h-72">

                                <Image
                                    src={ebook.coverImage || "/placeholder-book.png"}
                                    alt={ebook.title}
                                    fill
                                    className="object-cover"

                                />

                            </div>

                            <div className="space-y-4 p-5">

                                <div>

                                    <h2 className="line-clamp-1 text-xl font-bold text-slate-900 dark:text-white">
                                        {ebook.title}
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        {ebook.writer?.name}
                                    </p>

                                </div>

                                <div className="flex items-center justify-between">

                                    <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-500/20 dark:text-violet-300">
                                        {ebook.genre}
                                    </span>

                                    <span className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                                        <HiOutlineStar className="text-yellow-500" />
                                        {ebook.rating || 0}
                                    </span>

                                </div>

                                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">

                                    <HiOutlineCalendarDays />

                                    Purchased on{" "}
                                    {new Date(
                                        ebook.purchaseDate
                                    ).toLocaleDateString()}

                                </div>

                                <Link
                                    href={`/dashboard/reader/read/${ebook._id}`}
                                    className="block rounded-xl bg-violet-600 py-3 text-center font-semibold text-white transition hover:bg-violet-700"
                                >
                                    Read Now
                                </Link>

                            </div>

                        </article>

                    ))}

                </div>

            )}

        </section>
    );
}