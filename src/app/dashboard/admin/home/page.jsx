import {
    HiOutlineUsers,
    HiOutlinePencilSquare,
    HiOutlineShoppingBag,
    HiOutlineCurrencyDollar,
    HiOutlineChartBar,
} from "react-icons/hi2";

const stats = [
    {
        title: "Total Users",
        value: "1,245",
        icon: HiOutlineUsers,
        color: "bg-blue-100 text-blue-600",
    },
    {
        title: "Total Writers",
        value: "186",
        icon: HiOutlinePencilSquare,
        color: "bg-violet-100 text-violet-600",
    },
    {
        title: "Total Ebooks Sold",
        value: "894",
        icon: HiOutlineShoppingBag,
        color: "bg-green-100 text-green-600",
    },
    {
        title: "Total Revenue",
        value: "$12,480",
        icon: HiOutlineCurrencyDollar,
        color: "bg-yellow-100 text-yellow-600",
    },
];

export default function AdminHomePage() {
    return (
        <section className="space-y-8">

            {/* Hero */}
            <div className="rounded-3xl bg-slate-100 p-8 shadow-lg dark:bg-linear-to-r dark:from-slate-900 dark:to-slate-800 dark:text-white">

                <h1 className="text-4xl font-black">
                    Admin Dashboard
                </h1>

                <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-300">
                    Welcome back! Monitor platform performance, user activity,
                    ebook sales, and revenue from one place.
                </p>

            </div>

            {/* Analytics Cards */}

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

            {/* Charts */}

            <div className="grid gap-6 xl:grid-cols-2">

                {/* Monthly Sales */}

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

                    <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
                        <HiOutlineChartBar />
                        Monthly Sales
                    </h2>

                    <div className="flex h-80 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 text-slate-500 dark:border-slate-700">
                        Monthly Sales Chart
                    </div>

                </div>

                {/* Genre Pie Chart */}

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

                    <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
                        <HiOutlineChartBar />
                        Ebooks by Genre
                    </h2>

                    <div className="flex h-80 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 text-slate-500 dark:border-slate-700">
                        Genre Pie Chart
                    </div>

                </div>

            </div>

        </section>
    );
}