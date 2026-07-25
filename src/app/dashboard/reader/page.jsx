import Link from "next/link";
import {
    HiOutlineBookOpen,
    HiOutlineBookmark,
    HiOutlineShoppingBag,
    HiOutlineMagnifyingGlass,
    HiOutlineStar,
    HiOutlineClock,
} from "react-icons/hi2";

const stats = [
    {
        title: "Purchased Ebooks",
        value: "18",
        icon: HiOutlineBookOpen,
        color: "bg-violet-100 text-violet-600",
    },
    {
        title: "Bookmarks",
        value: "12",
        icon: HiOutlineBookmark,
        color: "bg-yellow-100 text-yellow-600",
    },
    {
        title: "Purchase History",
        value: "24",
        icon: HiOutlineShoppingBag,
        color: "bg-green-100 text-green-600",
    },
    {
        title: "Reading Progress",
        value: "78%",
        icon: HiOutlineStar,
        color: "bg-blue-100 text-blue-600",
    },
];

export default function ReaderDashboardPage() {
    return (
        <section className="space-y-8">

            <div className="rounded-3xl bg-linear-to-r from-violet-600 to-purple-700 p-8 text-white shadow-lg">

                <h1 className="text-3xl font-black">
                    Welcome Back 👋
                </h1>

                <p className="mt-2 max-w-2xl text-violet-100">
                    Continue reading your favorite ebooks, manage your library,
                    and discover new stories on Fable.
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
                        href="/ebooks"
                        className="flex items-center gap-3 rounded-xl border p-5 transition hover:border-violet-600 hover:bg-violet-50 dark:hover:bg-slate-800"
                    >
                        <HiOutlineMagnifyingGlass className="text-3xl text-violet-600" />

                        <div>
                            <h3 className="font-semibold">
                                Browse Ebooks
                            </h3>

                            <p className="text-sm text-slate-500">
                                Discover new books
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
                        href="/dashboard/reader/bookmarks"
                        className="flex items-center gap-3 rounded-xl border p-5 transition hover:border-violet-600 hover:bg-violet-50 dark:hover:bg-slate-800"
                    >
                        <HiOutlineBookmark className="text-3xl text-violet-600" />

                        <div>
                            <h3 className="font-semibold">
                                Bookmarks
                            </h3>

                            <p className="text-sm text-slate-500">
                                View saved ebooks
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
                                View all purchases
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
                        Your recently opened ebooks will appear here.
                    </div>

                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

                    <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                        <HiOutlineClock />
                        Recently Purchased
                    </h2>

                    <div className="flex h-56 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 text-slate-500 dark:border-slate-700">
                        Your latest purchases will appear here.
                    </div>

                </div>

            </div>

        </section>
    );
}
