import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import {
    HiOutlineBookOpen,
    HiOutlineDocumentPlus,
    HiOutlineShoppingBag,
    HiOutlineCurrencyDollar,
    HiOutlineStar,
    HiOutlineChartBar,
} from "react-icons/hi2";

const API_URL =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    "http://localhost:5000";

async function getAnalytics(writerId) {
    const res = await fetch(
        `${API_URL}/analytics/writer/${writerId}`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("Failed to load analytics");
    }

    return res.json();
}


export default async function WriterDashboardPage() {

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const analytics = await getAnalytics(
        session.user.id
    );


    const stats = [
        {
            title: "Total Ebooks",
            value: analytics.stats.ebooks,
            icon: HiOutlineBookOpen,
            color: "bg-violet-100 text-violet-600",
        },
        {
            title: "Total Sales",
            value: analytics.stats.sales,
            icon: HiOutlineShoppingBag,
            color: "bg-green-100 text-green-600",
        },
        {
            title: "Revenue",
            value: `$${Math.round(analytics.stats.revenue)}`,
            icon: HiOutlineCurrencyDollar,
            color: "bg-blue-100 text-blue-600",
        },
        {
            title: "Average Rating",
            value: analytics.stats.averageRating.toFixed(1),
            icon: HiOutlineStar,
            color: "bg-yellow-100 text-yellow-600",
        },
    ];



    return (
        <section className="space-y-8">

            <div className="rounded-3xl bg-linear-to-r from-violet-600 to-purple-700 p-8 text-white shadow-lg">

                <h1 className="text-3xl font-black">
                    Welcome Back 👋
                </h1>

                <p className="mt-2 max-w-2xl text-violet-100">
                    Manage your ebooks, monitor sales, track revenue,
                    and grow your audience from one place.
                </p>

            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

                {stats.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.title}
                            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                        >
                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-sm text-slate-500">
                                        {item.title}
                                    </p>

                                    <h2 className="mt-2 text-3xl font-black">
                                        {item.value}
                                    </h2>

                                </div>

                                <div className={`rounded-xl p-3 ${item.color}`}>
                                    <Icon className="text-2xl" />
                                </div>

                            </div>
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
                        href="/dashboard/writer/add-ebook"
                        className="flex items-center gap-3 rounded-xl border p-5 transition hover:border-violet-600 hover:bg-violet-50 dark:hover:bg-slate-800"
                    >
                        <HiOutlineDocumentPlus className="text-3xl text-violet-600" />

                        <div>
                            <h3 className="font-semibold">
                                Upload Ebook
                            </h3>

                            <p className="text-sm text-slate-500">
                                Publish a new ebook
                            </p>
                        </div>
                    </Link>

                    <Link
                        href="/dashboard/writer/ebooks"
                        className="flex items-center gap-3 rounded-xl border p-5 transition hover:border-violet-600 hover:bg-violet-50 dark:hover:bg-slate-800"
                    >
                        <HiOutlineBookOpen className="text-3xl text-violet-600" />

                        <div>
                            <h3 className="font-semibold">
                                My Ebooks
                            </h3>

                            <p className="text-sm text-slate-500">
                                Manage published ebooks
                            </p>
                        </div>
                    </Link>

                    <Link
                        href="/dashboard/writer/sales"
                        className="flex items-center gap-3 rounded-xl border p-5 transition hover:border-violet-600 hover:bg-violet-50 dark:hover:bg-slate-800"
                    >
                        <HiOutlineShoppingBag className="text-3xl text-violet-600" />

                        <div>
                            <h3 className="font-semibold">
                                Sales History
                            </h3>

                            <p className="text-sm text-slate-500">
                                View all purchases
                            </p>
                        </div>
                    </Link>

                    <Link
                        href="/dashboard/writer/analytics"
                        className="flex items-center gap-3 rounded-xl border p-5 transition hover:border-violet-600 hover:bg-violet-50 dark:hover:bg-slate-800"
                    >
                        <HiOutlineChartBar className="text-3xl text-violet-600" />

                        <div>
                            <h3 className="font-semibold">
                                Analytics
                            </h3>

                            <p className="text-sm text-slate-500">
                                View performance
                            </p>
                        </div>
                    </Link>

                </div>

            </div>



            <div className="grid gap-6 lg:grid-cols-2">

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

                    <h2 className="mb-4 text-xl font-bold">
                        Recent Sales
                    </h2>

                    <div className="space-y-4">
                        {analytics.recentSales.length === 0 ? (
                            <p className="text-slate-500">
                                No sales yet.
                            </p>
                        ) : (
                            analytics.recentSales.map((sale) => (
                                <div
                                    key={sale._id}
                                    className="flex items-center justify-between rounded-xl border p-4"
                                >
                                    <div>
                                        <h3 className="font-semibold">
                                            {sale.ebookTitle}
                                        </h3>

                                        <p className="text-sm text-slate-500">
                                            {sale.customerEmail}
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <p className="font-bold text-green-600">
                                            ${sale.amount}
                                        </p>

                                        <p className="text-xs text-slate-500">
                                            {new Date(
                                                sale.createdAt
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

                    <h2 className="mb-4 text-xl font-bold">
                        Top Selling Ebooks
                    </h2>

                    <div className="space-y-4">
                        {analytics.topBooks.length === 0 ? (
                            <p className="text-slate-500">
                                No ebook sales yet.
                            </p>
                        ) : (
                            analytics.topBooks.map((book) => (
                                <div
                                    key={book._id}
                                    className="flex items-center justify-between rounded-xl border p-4"
                                >
                                    <div>
                                        <h3 className="font-semibold">
                                            {book.title}
                                        </h3>

                                        <p className="text-sm text-slate-500">
                                            {book.sales} sales
                                        </p>
                                    </div>

                                    <p className="font-bold text-violet-600">
                                        ${book.revenue}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>

                </div>

            </div>

        </section>
    );
}