import Link from "next/link";
import { BookOpen, Home, SearchX } from "lucide-react";

const NotFoundPage = () => {
    return (
        <section className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-slate-50 px-4 py-16 dark:bg-slate-950">

            <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-xl dark:border-slate-800 dark:bg-slate-900">

                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/30">
                    <SearchX
                        size={52}
                        className="text-violet-600"
                    />
                </div>

                <h1 className="mt-8 text-7xl font-black text-violet-600">
                    404
                </h1>

                <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">
                    Oops! Page Not Found
                </h2>

                <p className="mx-auto mt-4 max-w-lg text-slate-600 dark:text-slate-400">
                    The page you&apos;re looking for doesn&apos;t exist, may have been
                    moved, or the URL might be incorrect. Explore our ebook
                    collection or head back to the homepage.
                </p>

                <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
                    >
                        <Home size={20} />
                        Back to Home
                    </Link>

                    <Link
                        href="/ebooks"
                        className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:border-violet-600 hover:text-violet-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-violet-500 dark:hover:text-violet-400"
                    >
                        <BookOpen size={20} />
                        Browse Ebooks
                    </Link>

                </div>

            </div>

        </section>
    );
};

export default NotFoundPage;