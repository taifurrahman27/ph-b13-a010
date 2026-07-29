import Link from "next/link";
import { HiOutlineBookOpen, HiOutlineSparkles } from "react-icons/hi2";

const ReadEbookPage = () => {
    return (
        <section className="flex min-h-[80vh] items-center justify-center px-4">
            <div className="max-w-2xl rounded-3xl border border-violet-200 bg-white p-10 text-center shadow-xl dark:border-violet-900 dark:bg-slate-900">

                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/40">
                    <HiOutlineBookOpen className="text-5xl text-violet-600" />
                </div>

                <h1 className="mt-8 text-4xl font-black text-slate-900 dark:text-white">
                    Your Story Is Almost Ready 📖
                </h1>

                <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
                    Thank you for purchasing this ebook on{" "}
                    <span className="font-bold text-violet-600">
                        Fable
                    </span>
                    .
                </p>

                <p className="mt-4 text-slate-500 dark:text-slate-400">
                    The digital version of this ebook is currently being prepared by
                    the author. It will be available in your library very soon.
                </p>

                <div className="mt-8 rounded-2xl bg-violet-50 p-6 dark:bg-violet-950/30">
                    <div className="flex items-center justify-center gap-2 text-violet-700 dark:text-violet-300">
                        <HiOutlineSparkles className="text-2xl" />
                        <span className="text-lg font-semibold">
                            Keep an eye on Fable!
                        </span>
                    </div>

                    <p className="mt-3 text-slate-600 dark:text-slate-400">
                        As soon as the ebook becomes available, you&apos;ll be able to
                        continue reading it anytime from your{" "}
                        <span className="font-semibold">
                            Purchased Ebooks
                        </span>{" "}
                        page.
                    </p>
                </div>

                <div className="mt-10 flex flex-wrap justify-center gap-4">
                    <Link
                        href="/dashboard/reader/library"
                        className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
                    >
                        My Library
                    </Link>

                    <Link
                        href="/ebooks"
                        className="rounded-xl border border-violet-600 px-6 py-3 font-semibold text-violet-600 transition hover:bg-violet-50 dark:hover:bg-violet-950/30"
                    >
                        Browse More Ebooks
                    </Link>
                </div>

                <p className="mt-8 text-sm italic text-slate-400">
                    &quot;Every great story is worth the wait.&quot;
                </p>
            </div>
        </section>
    );
};

export default ReadEbookPage;