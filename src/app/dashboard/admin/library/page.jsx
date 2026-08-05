import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
    HiOutlineBookOpen,
    HiOutlineArrowRight,
} from "react-icons/hi2";
import { getTokenServer } from "@/lib/getTokenServer";

export const metadata = {
    title: "Admin Library",
};

const API_URL =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    "http://localhost:5000";

async function getPurchasedBooks(userId) {
    const token = await getTokenServer();

    const res = await fetch(
        `${API_URL}/purchases/${userId}`,
        {
            cache: "no-store",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
    );

    const data = await res.json();

    if (!res.ok) {
        console.log(data);
        throw new Error(
            data.message || "Failed to load your library."
        );
    }

    return data;
}

export default async function AdminLibrary() {

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;

    if (!user) {
        return null;
    }

    const books = await getPurchasedBooks(user.id);

    return (
        <section className="space-y-8">

            <div>
                <h1 className="text-4xl font-black">
                    My Library
                </h1>

                <p className="mt-2 text-slate-500">
                    Books you have purchased are available here.
                </p>
            </div>

            {books.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center dark:border-slate-700 dark:bg-slate-900">

                    <HiOutlineBookOpen className="mx-auto mb-5 text-7xl text-violet-500" />

                    <h2 className="text-2xl font-bold">
                        Your library is empty
                    </h2>

                    <p className="mt-3 text-slate-500">
                        Purchase an ebook to start building your library.
                    </p>

                    <Link
                        href="/ebooks"
                        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
                    >
                        Browse Ebooks

                        <HiOutlineArrowRight />
                    </Link>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

                    {books.map((book) => (
                        <div
                            key={book._id}
                            className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
                        >
                            <div className="relative aspect-3/4">

                                <Image
                                    src={book.coverImage}
                                    alt={book.title}
                                    fill

                                />

                            </div>

                            <div className="space-y-4 p-5">

                                <div>

                                    <h2 className="line-clamp-2 text-xl font-bold">
                                        {book.title}
                                    </h2>

                                    <p className="mt-2 text-sm text-slate-500">
                                        by {book.writer.name}
                                    </p>

                                </div>

                                <Link
                                    href={`/dashboard/admin/read/${book._id}`}
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700"
                                >
                                    <HiOutlineBookOpen />

                                    Continue Reading
                                </Link>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
