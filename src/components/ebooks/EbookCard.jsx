import Link from "next/link";

const EbookCard = ({ ebook }) => {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">

            <Link href={`/ebooks/${ebook._id}`}>
                <div className="relative h-80 w-full overflow-hidden">
                    {/* image will be displayed here */}
                </div>
            </Link>

            <div className="space-y-4 p-5">

                <span className="inline-block rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-900 dark:text-violet-300">
                    {ebook.genre}
                </span>

                <Link href={`/ebooks/${ebook._id}`}>
                    <h2 className="line-clamp-2 text-xl font-bold transition hover:text-violet-600">
                        {ebook.title}
                    </h2>
                </Link>

                <div className="flex items-center gap-3">
                    {/* writer photo */}

                    <div>
                        <Link
                            href={`/writers/${ebook.writer.id}`}
                            className="font-semibold text-violet-600 hover:underline"
                        >
                            {ebook.writer.name}
                        </Link>

                        <p className="text-xs text-slate-500">
                            Writer
                        </p>
                    </div>
                </div>

                <p className="line-clamp-3 text-sm text-slate-500 dark:text-slate-400">
                    {ebook.description}
                </p>

                <div className="flex items-center justify-between">

                    <h3 className="text-2xl font-black text-violet-600">
                        ${ebook.price}
                    </h3>

                    <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${ebook.status === "Available"
                            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                            : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                            }`}
                    >
                        {ebook.status}
                    </span>

                </div>

                <Link
                    href={`/ebooks/${ebook._id}`}
                    className="block rounded-xl bg-violet-600 py-3 text-center font-semibold text-white transition hover:bg-violet-700"
                >
                    View Details
                </Link>

            </div>

        </div>
    );
};

export default EbookCard;
