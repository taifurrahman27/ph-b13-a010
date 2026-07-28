import {
    HiOutlineBookOpen,
    HiOutlineCurrencyDollar,
    HiOutlineUsers,
    HiOutlineStar,
} from "react-icons/hi2";

export default function WriterAnalyticsPage() {
    const stats = [
        {
            title: "Total Ebooks",
            value: "12",
            icon: HiOutlineBookOpen,
            iconBg: "bg-violet-100 dark:bg-violet-500/20",
            iconColor: "text-violet-600 dark:text-violet-400",
        },
        {
            title: "Total Revenue",
            value: "$2,480",
            icon: HiOutlineCurrencyDollar,
            iconBg: "bg-emerald-100 dark:bg-emerald-500/20",
            iconColor: "text-emerald-600 dark:text-emerald-400",
        },
        {
            title: "Total Readers",
            value: "1,245",
            icon: HiOutlineUsers,
            iconBg: "bg-sky-100 dark:bg-sky-500/20",
            iconColor: "text-sky-600 dark:text-sky-400",
        },
        {
            title: "Average Rating",
            value: "4.8",
            icon: HiOutlineStar,
            iconBg: "bg-amber-100 dark:bg-amber-500/20",
            iconColor: "text-amber-600 dark:text-amber-400",
        },
    ];

    return (
        <section className="space-y-8">
            <div>
                <h1 className="text-4xl font-black text-slate-900 dark:text-white">
                    Analytics
                </h1>

                <p className="mt-2 text-slate-500 dark:text-slate-400">
                    Track your ebook performance, sales, and reader engagement.
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

                            <h2 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
                                {stat.value}
                            </h2>
                        </div>
                    );
                })}
            </div>

            <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white p-16 text-center dark:border-slate-700 dark:bg-slate-900">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Charts Coming Soon
                </h3>

                <p className="mx-auto mt-3 max-w-2xl text-slate-500 dark:text-slate-400">
                    Sales trends, revenue growth, downloads, reader engagement,
                    and other insights will appear here once analytics data is
                    available.
                </p>
            </div>
        </section>
    );
}
