import Image from "next/image";
import Link from "next/link";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { FiTrendingUp } from "react-icons/fi";

import FadeUp from "@/components/animations/FadeUp";

async function getTopWriters() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/ebooks/top-writers`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("Failed to load top writers.");
    }

    return res.json();
}

export default async function TopWriters() {
    const writers = await getTopWriters();

    const rankColors = [
        "bg-amber-600",
        "bg-slate-400",
        "bg-amber-400",
    ];

    return (
        <section className="bg-slate-50 py-16 dark:bg-slate-950">
            <div className="container mx-auto px-4">

                <FadeUp>
                    <div className="mb-14 text-center">
                        <h2 className="text-4xl font-black lg:text-5xl">
                            Top Writers
                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl text-slate-500 dark:text-slate-400">
                            Meet the talented authors whose books inspire
                            thousands of readers around the world.
                        </p>
                    </div>
                </FadeUp>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                    {writers.map((writer, index) => (
                        <FadeUp
                            key={writer.id}
                            delay={index * 0.15}
                        >
                            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-violet-400 hover:shadow-2xl hover:shadow-violet-500/10 dark:border-slate-800 dark:bg-slate-900">

                                {index === 0 && (
                                    <span className="absolute right-4 top-4 rounded-full bg-purple-600 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white shadow">
                                        Top Seller
                                    </span>
                                )}

                                <div
                                    className={`mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full ${rankColors[index] || "bg-violet-600"
                                        } text-lg font-black text-white shadow-lg`}
                                >
                                    #{index + 1}
                                </div>

                                <div className="mx-auto w-fit overflow-hidden rounded-full border-4 border-violet-100 dark:border-violet-900">
                                    <Image
                                        src={writer.photo}
                                        alt={writer.name}
                                        width={220}
                                        height={220}
                                        className="h-40 w-40 object-cover transition duration-300 hover:scale-110"
                                    />
                                </div>

                                <h3 className="mt-6 text-2xl font-extrabold">
                                    {writer.name}
                                </h3>

                                <p className="mt-2 text-sm text-slate-500">
                                    Best Selling Author
                                </p>

                                <div className="mt-8 grid grid-cols-2 gap-4">

                                    <div className="rounded-2xl bg-violet-50 p-4 dark:bg-slate-800">
                                        <HiOutlineBookOpen className="mx-auto mb-2 text-2xl text-violet-600" />

                                        <p className="text-3xl font-black text-violet-600">
                                            {writer.totalBooks}
                                        </p>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Books
                                        </p>
                                    </div>

                                    <div className="rounded-2xl bg-violet-50 p-4 dark:bg-slate-800">
                                        <FiTrendingUp className="mx-auto mb-2 text-2xl text-violet-600" />

                                        <p className="text-3xl font-black text-violet-600">
                                            {writer.totalSales}
                                        </p>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Sales
                                        </p>
                                    </div>

                                </div>

                                <Link
                                    href={`/writers/${writer.id}`}
                                    className="mt-8 inline-flex items-center rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
                                >
                                    View Profile
                                </Link>

                            </div>
                        </FadeUp>
                    ))}

                </div>

            </div>
        </section>
    );
}
