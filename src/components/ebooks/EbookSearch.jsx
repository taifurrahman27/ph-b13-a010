"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

export default function EbookSearch() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(
        searchParams.get("search") || ""
    );

    const handleSearch = (e) => {
        e.preventDefault();

        const value = search.trim();

        if (value) {
            router.push(`/ebooks?search=${encodeURIComponent(value)}`);
        } else {
            router.push("/ebooks");
        }
    };

    return (
        <form
            onSubmit={handleSearch}
            className="mb-8"
        >
            <div className="flex flex-col gap-3 sm:flex-row">

                <input
                    type="text"
                    placeholder="Search ebooks by title or writer..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="flex-1 rounded-xl border border-slate-300 bg-white px-5 py-3 outline-none transition focus:border-violet-500 dark:border-slate-700 dark:bg-slate-900"
                />

                <button
                    type="submit"
                    className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
                >
                    <Search size={20} />
                    Search
                </button>

            </div>
        </form>
    );
}
