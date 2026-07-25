import Image from "next/image";
import Link from "next/link";

const EbookCard = ({ ebook }) => {
    console.log("Ebook in EbookCard:", ebook); // Debugging line to check the ebook prop
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">

            {/* ebook cover image will be displayed here */}

            <div className="space-y-3 p-5">

                <span className="inline-block rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-900 dark:text-violet-300">
                    {ebook.genre}
                </span>

                <h2 className="line-clamp-2 text-xl font-bold">
                    {ebook.title}
                </h2>

                <Link
                    href={`/writers/${ebook.writerId}`}
                    className="font-medium text-violet-600 hover:underline"
                >
                    {ebook.writerName}
                </Link>

                <p className="line-clamp-3 text-sm text-slate-500 dark:text-slate-400">
                    {ebook.description}
                </p>

                <div className="flex items-center justify-between pt-2">

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

            </div>

        </div>
    );
};

export default EbookCard;