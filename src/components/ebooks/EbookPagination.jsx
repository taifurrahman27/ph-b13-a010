"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

export default function EbookPagination({
    currentPage,
    totalPages,
}) {
    const router = useRouter();
    const searchParams = useSearchParams();

    if (totalPages <= 1) return null;

    const changePage = (page) => {
        const params = new URLSearchParams(searchParams);

        params.set("page", page);

        router.push(`/ebooks?${params.toString()}`);
    };

    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="mt-12 flex flex-col items-center gap-5">

            <p className="text-sm text-slate-500">
                Page{" "}
                <span className="font-semibold text-violet-600">
                    {currentPage}
                </span>{" "}
                of{" "}
                <span className="font-semibold">
                    {totalPages}
                </span>
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2">

                <button
                    onClick={() => changePage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 bg-white transition hover:border-violet-600 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900"
                >
                    <HiChevronLeft className="text-xl" />
                </button>

                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => changePage(page)}
                        className={`flex h-11 w-11 items-center justify-center rounded-xl font-semibold transition ${currentPage === page
                            ? "bg-violet-600 text-white shadow-lg"
                            : "border border-slate-300 bg-white hover:border-violet-600 hover:text-violet-600 dark:border-slate-700 dark:bg-slate-900"
                            }`}
                    >
                        {page}
                    </button>
                ))}

                <button
                    onClick={() => changePage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 bg-white transition hover:border-violet-600 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900"
                >
                    <HiChevronRight className="text-xl" />
                </button>

            </div>

        </div>
    );
}

