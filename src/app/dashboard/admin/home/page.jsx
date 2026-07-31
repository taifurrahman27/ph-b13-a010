import AdminCharts from "@/components/dashboard/admin/AdminCharts";
import {
    HiOutlineUsers,
    HiOutlinePencilSquare,
    HiOutlineShoppingBag,
    HiOutlineCurrencyDollar,
} from "react-icons/hi2";



const API_URL =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    "http://localhost:5000";

async function getAnalytics() {
    const res = await fetch(
        `${API_URL}/analytics/admin`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        const error = await res.text();
        console.log(error);

        throw new Error(error);
    }

    return res.json();
}

export default async function AdminHomePage() {

    const analytics = await getAnalytics();

    const stats = [
        {
            title: "Total Users",
            value: analytics.stats.users,
            icon: HiOutlineUsers,
            color: "bg-blue-100 text-blue-600",
        },
        {
            title: "Total Writers",
            value: analytics.stats.writers,
            icon: HiOutlinePencilSquare,
            color: "bg-violet-100 text-violet-600",
        },
        {
            title: "Total Ebooks Sold",
            value: analytics.stats.ebooksSold,
            icon: HiOutlineShoppingBag,
            color: "bg-green-100 text-green-600",
        },
        {
            title: "Total Revenue",
            value: `$${analytics.stats.revenue}`,
            icon: HiOutlineCurrencyDollar,
            color: "bg-yellow-100 text-yellow-600",
        },
    ];

    return (


        <section className="space-y-8">

            <div className="rounded-3xl bg-slate-100 p-8 shadow-lg dark:bg-linear-to-r dark:from-slate-900 dark:to-slate-800 dark:text-white">

                <h1 className="text-4xl font-black">
                    Admin Dashboard
                </h1>

                <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-300">
                    Welcome back! Monitor platform performance, user activity,
                    ebook sales, and revenue from one place.
                </p>

            </div>


            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.title}
                            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                        >
                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-sm text-slate-500">
                                        {stat.title}
                                    </p>

                                    <h2 className="mt-2 text-3xl font-black">
                                        {stat.value}
                                    </h2>

                                </div>

                                <div className={`rounded-xl p-3 ${stat.color}`}>
                                    <Icon className="text-3xl" />
                                </div>

                            </div>

                        </div>
                    );
                })}

            </div>

            <AdminCharts
                salesData={analytics.salesData}
                genreData={analytics.genreData}
            />

        </section>
    );
}
