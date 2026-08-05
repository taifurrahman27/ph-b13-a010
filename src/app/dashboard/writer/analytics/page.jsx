import WriterCharts from "@/components/dashboard/writer/WriterCharts";
import {
    HiOutlineBookOpen,
    HiOutlineCurrencyDollar,
    HiOutlineShoppingBag,
    HiOutlineStar,
} from "react-icons/hi2";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const metadata = {
    title: "Writer Analytics",
};

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
        const error = await res.json();
        console.log(error);
        throw new Error(error.message);
    }

    return res.json();
}

export default async function WriterAnalyticsPage() {
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
            iconBg:
                "bg-violet-100 dark:bg-violet-500/20",
            iconColor:
                "text-violet-600 dark:text-violet-400",
        },
        {
            title: "Total Sales",
            value: analytics.stats.sales,
            icon: HiOutlineShoppingBag,
            iconBg:
                "bg-green-100 dark:bg-green-500/20",
            iconColor:
                "text-green-600 dark:text-green-400",
        },
        {
            title: "Revenue",
            value: `$${Math.round(
                analytics.stats.revenue
            )}`,
            icon: HiOutlineCurrencyDollar,
            iconBg:
                "bg-blue-100 dark:bg-blue-500/20",
            iconColor:
                "text-blue-600 dark:text-blue-400",
        },
        {
            title: "Average Rating",
            value: analytics.stats.averageRating.toFixed(1),
            icon: HiOutlineStar,
            iconBg: "bg-yellow-100 dark:bg-yellow-500/20",
            iconColor: "text-yellow-600 dark:text-yellow-400",
        }
    ];

    return (
        <section className="space-y-8">
            <div>
                <h1 className="text-4xl font-black">
                    Analytics
                </h1>

                <p className="mt-2 text-slate-500">
                    Track your ebook performance,
                    revenue, and sales.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.title}
                            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                        >
                            <div
                                className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconBg}`}
                            >
                                <Icon
                                    className={`text-2xl ${stat.iconColor}`}
                                />
                            </div>

                            <p className="text-sm text-slate-500">
                                {stat.title}
                            </p>

                            <h2 className="mt-2 text-3xl font-black">
                                {stat.value}
                            </h2>
                        </div>
                    );
                })}
            </div>

            <WriterCharts
                salesData={analytics.salesData}
                ebookData={analytics.ebookData}
            />
        </section>
    );
}
