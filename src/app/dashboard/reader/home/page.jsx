import Link from "next/link";
import {
    HiOutlineBookOpen,
    HiOutlineShoppingBag,
    HiOutlineCurrencyDollar,
    HiOutlineStar,
    HiOutlineMagnifyingGlass,
    HiOutlineClock,
    HiOutlineHeart,
} from "react-icons/hi2";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const metadata = {
    title: "Reader Dashboard",
};

const API_URL =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    "http://localhost:5000";

async function getReaderAnalytics(userId) {
    const res = await fetch(
        `${API_URL}/analytics/reader/${userId}`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("Failed to load reader analytics");
    }

    return res.json();
}

export default async function ReaderDashboardPage() {

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const analytics = await getReaderAnalytics(
        session.user.id
    );



    const stats = [
        {
            title: "Purchased Ebooks",
            value: analytics.stats.purchasedBooks,
            icon: HiOutlineBookOpen,
            iconBg:
                "bg-violet-100 dark:bg-violet-500/20",
            iconColor:
                "text-violet-600 dark:text-violet-400",
        },
        {
            title: "Purchases",
            value: analytics.stats.purchases,
            icon: HiOutlineShoppingBag,
            iconBg:
                "bg-green-100 dark:bg-green-500/20",
            iconColor:
                "text-green-600 dark:text-green-400",
        },
        {
            title: "Total Spent",
            value: `$${Number(analytics.stats.totalSpent || 0).toFixed(0)}`,
            icon: HiOutlineCurrencyDollar,
            iconBg:
                "bg-sky-100 dark:bg-sky-500/20",
            iconColor:
                "text-sky-600 dark:text-sky-400",
        },
        {
            title: "Reading Progress",
            value: "0%",
            icon: HiOutlineStar,
            iconBg:
                "bg-yellow-100 dark:bg-yellow-500/20",
            iconColor:
                "text-yellow-600 dark:text-yellow-400",
        },
    ];

    return (

        <section className="space-y-8">
            <div className="rounded-3xl bg-linear-to-r from-violet-600 to-purple-700 p-8 text-white shadow-lg">

                <h1 className="text-3xl font-black">
                    Welcome Back 👋
                </h1>

                <p className="mt-2 max-w-2xl text-violet-100">
                    Continue reading your favorite ebooks,
                    manage your library, and discover new
                    stories on Fable.
                </p>

            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.title}
                            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                        >
                            <div
                                className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconBg}`}
                            >
                                <Icon
                                    className={`text-2xl ${stat.iconColor}`}
                                />
                            </div>

                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                {stat.title}
                            </p>

                            <h2 className="mt-2 text-3xl font-black dark:text-white">
                                {stat.value}
                            </h2>

                        </div>
                    );
                })}

            </div>


            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

                <h2 className="mb-6 text-2xl font-bold">
                    Quick Actions
                </h2>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

                    <Link
                        href="/ebooks"
                        className="flex items-center gap-3 rounded-xl border p-5 transition hover:border-violet-600 hover:bg-violet-50 dark:hover:bg-slate-800"
                    >
                        <HiOutlineMagnifyingGlass className="text-3xl text-violet-600" />

                        <div>
                            <h3 className="font-semibold">
                                Browse Ebooks
                            </h3>

                            <p className="text-sm text-slate-500">
                                Discover new ebooks
                            </p>
                        </div>
                    </Link>

                    <Link
                        href="/dashboard/reader/library"
                        className="flex items-center gap-3 rounded-xl border p-5 transition hover:border-violet-600 hover:bg-violet-50 dark:hover:bg-slate-800"
                    >
                        <HiOutlineBookOpen className="text-3xl text-violet-600" />

                        <div>
                            <h3 className="font-semibold">
                                My Library
                            </h3>

                            <p className="text-sm text-slate-500">
                                Read purchased ebooks
                            </p>
                        </div>
                    </Link>

                    <Link
                        href="/dashboard/reader/purchases"
                        className="flex items-center gap-3 rounded-xl border p-5 transition hover:border-violet-600 hover:bg-violet-50 dark:hover:bg-slate-800"
                    >
                        <HiOutlineShoppingBag className="text-3xl text-violet-600" />

                        <div>
                            <h3 className="font-semibold">
                                Purchase History
                            </h3>

                            <p className="text-sm text-slate-500">
                                View your purchases
                            </p>
                        </div>
                    </Link>

                    <Link
                        href="/dashboard/reader/profile"
                        className="flex items-center gap-3 rounded-xl border p-5 transition hover:border-violet-600 hover:bg-violet-50 dark:hover:bg-slate-800"
                    >
                        <HiOutlineHeart className="text-3xl text-violet-600" />

                        <div>
                            <h3 className="font-semibold">
                                My Profile
                            </h3>

                            <p className="text-sm text-slate-500">
                                Manage account
                            </p>
                        </div>
                    </Link>

                </div>

            </div>


            <div className="grid gap-6 lg:grid-cols-2">

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

                    <h2 className="mb-4 text-xl font-bold">
                        Continue Reading
                    </h2>

                    <div className="flex h-56 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 text-slate-500 dark:border-slate-700">
                        Continue reading feature coming soon.
                    </div>

                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

                    <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                        <HiOutlineClock />
                        Recent Purchases
                    </h2>

                    <div className="space-y-3">

                        {analytics.recentPurchases.length === 0 ? (

                            <div className="flex h-48 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 text-slate-500 dark:border-slate-700">
                                No purchases yet.
                            </div>

                        ) : (

                            analytics.recentPurchases.map((purchase) => (
                                <div
                                    key={purchase._id}
                                    className="flex items-center justify-between rounded-xl border p-4"
                                >
                                    <div>
                                        <h3 className="font-semibold">
                                            {purchase.ebookTitle}
                                        </h3>

                                        <p className="text-sm text-slate-500">
                                            {new Date(
                                                purchase.createdAt
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <span className="font-bold text-violet-600">
                                        ${purchase.amount}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
