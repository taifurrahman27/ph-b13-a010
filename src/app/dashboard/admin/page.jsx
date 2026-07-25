import Link from "next/link";
import {
    HiOutlineUsers,
    HiOutlineBookOpen,
    HiOutlineShoppingBag,
    HiOutlineCurrencyDollar,
    HiOutlineShieldCheck,
    HiOutlineChartBar,
    HiOutlineCog6Tooth,
    HiOutlineDocumentText,
} from "react-icons/hi2";

const stats = [
    {
        title: "Total Users",
        value: "1,245",
        icon: HiOutlineUsers,
        color: "bg-blue-100 text-blue-600",
    },
    {
        title: "Published Ebooks",
        value: "356",
        icon: HiOutlineBookOpen,
        color: "bg-violet-100 text-violet-600",
    },
    {
        title: "Total Orders",
        value: "894",
        icon: HiOutlineShoppingBag,
        color: "bg-green-100 text-green-600",
    },
    {
        title: "Revenue",
        value: "$12,480",
        icon: HiOutlineCurrencyDollar,
        color: "bg-yellow-100 text-yellow-600",
    },
];

export default function AdminPage() {
    return (
        <section className="space-y-8">

            <div className="rounded-3xl bg-slate-100 dark:bg-linear-to-r from-slate-900 to-slate-700 p-8 dark:text-white shadow-lg">

                <h1 className="text-3xl font-black">
                    Admin Dashboard
                </h1>

                <p className="mt-2 max-w-3xl dark:text-slate-300">
                    Monitor platform activity, manage users and ebooks,
                    review transactions, and keep Fable running smoothly.
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
                        href="/dashboard/admin/users"
                        className="flex items-center gap-3 rounded-xl border p-5 transition hover:border-violet-600 hover:bg-violet-50 dark:hover:bg-slate-800"
                    >
                        <HiOutlineUsers className="text-3xl text-violet-600" />

                        <div>
                            <h3 className="font-semibold">
                                Manage Users
                            </h3>

                            <p className="text-sm text-slate-500">
                                View and manage readers & writers
                            </p>
                        </div>
                    </Link>

                    <Link
                        href="/dashboard/admin/ebooks"
                        className="flex items-center gap-3 rounded-xl border p-5 transition hover:border-violet-600 hover:bg-violet-50 dark:hover:bg-slate-800"
                    >
                        <HiOutlineBookOpen className="text-3xl text-violet-600" />

                        <div>
                            <h3 className="font-semibold">
                                Manage Ebooks
                            </h3>

                            <p className="text-sm text-slate-500">
                                Review all published ebooks
                            </p>
                        </div>
                    </Link>

                    <Link
                        href="/dashboard/admin/orders"
                        className="flex items-center gap-3 rounded-xl border p-5 transition hover:border-violet-600 hover:bg-violet-50 dark:hover:bg-slate-800"
                    >
                        <HiOutlineDocumentText className="text-3xl text-violet-600" />

                        <div>
                            <h3 className="font-semibold">
                                Transactions
                            </h3>

                            <p className="text-sm text-slate-500">
                                Review purchases and payments
                            </p>
                        </div>
                    </Link>

                    <Link
                        href="/dashboard/admin/settings"
                        className="flex items-center gap-3 rounded-xl border p-5 transition hover:border-violet-600 hover:bg-violet-50 dark:hover:bg-slate-800"
                    >
                        <HiOutlineCog6Tooth className="text-3xl text-violet-600" />

                        <div>
                            <h3 className="font-semibold">
                                Site Settings
                            </h3>

                            <p className="text-sm text-slate-500">
                                Configure platform settings
                            </p>
                        </div>
                    </Link>

                </div>

            </div>

            <div className="grid gap-6 lg:grid-cols-2">

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

                    <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                        <HiOutlineChartBar />
                        Platform Analytics
                    </h2>

                    <div className="flex h-60 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 text-slate-500 dark:border-slate-700">
                        Analytics charts will appear here.
                    </div>

                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

                    <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                        <HiOutlineShieldCheck />
                        Recent Activity
                    </h2>

                    <div className="flex h-60 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 text-slate-500 dark:border-slate-700">
                        Recent user registrations, ebook uploads, and purchases will appear here.
                    </div>

                </div>

            </div>

        </section>
    );
}
