import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import {
    HiOutlineBookmark,
    HiOutlineStar,
} from "react-icons/hi2";

async function getBookmarks(userId) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookmarks/user/${userId}`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        return [];
    }

    return res.json();
}

const ReaderBookmarkPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const bookmarks = session?.user
        ? await getBookmarks(session.user.id)
        : [];

    return (
        <section className="space-y-8">
            <div>
                <h1 className="text-4xl font-black text-slate-900 dark:text-white">
                    My Bookmarked Ebooks
                </h1>

                <p className="mt-2 text-slate-500 dark:text-slate-400">
                    All ebooks you&apos;ve saved for later reading.
                </p>
            </div>

            {bookmarks.length === 0 ? (
                <div className="flex h-96 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900">
                    <HiOutlineBookmark className="text-6xl text-slate-300 dark:text-slate-600" />

                    <h2 className="mt-5 text-2xl font-bold text-slate-900 dark:text-white">
                        No Bookmarks Yet
                    </h2>

                    <p className="mt-2 max-w-md text-center text-slate-500 dark:text-slate-400">
                        Save your favorite ebooks to easily find and read them
                        later.
                    </p>

                    <Link
                        href="/ebooks"
                        className="mt-6 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
                    >
                        Browse Ebooks
                    </Link>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {bookmarks.map((ebook) => (
                        <article
                            key={ebook._id}
                            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
                        >
                            <div className="relative h-72">

                                <Image
                                    src={
                                        ebook.coverImage ||
                                        "/placeholder-book.png"
                                    }
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
                                    <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
                                        {ebook.genre}
                                    </span>

                                    <span className="flex items-center gap-1 text-sm text-slate-500">
                                        <HiOutlineStar className="text-yellow-500" />
                                        {ebook.rating}
                                    </span>
                                </div>

                                <div className="flex gap-3">
                                    <Link
                                        href={`/ebooks/${ebook._id}`}
                                        className="flex-1 rounded-xl border bg-violet-600 py-3 text-center font-semibold text-white transition hover:bg-violet-50 dark:hover:bg-violet-900/20"
                                    >
                                        Details
                                    </Link>

                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
};

export default ReaderBookmarkPage;
