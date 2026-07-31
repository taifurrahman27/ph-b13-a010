"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Search, X } from "lucide-react";
import { GENRES } from "@/constants/genres";

export default function EbookSearch() {

    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(
        searchParams.get("search") || ""
    );

    const [genre, setGenre] = useState(
        searchParams.get("genre") || ""
    );

    const [minPrice, setMinPrice] = useState(
        searchParams.get("minPrice") || ""
    );

    const [maxPrice, setMaxPrice] = useState(
        searchParams.get("maxPrice") || ""
    );

    const handleSearch = (e) => {
        e.preventDefault();

        const params = new URLSearchParams();

        if (search.trim()) {
            params.set("search", search.trim());
        }
        if (genre) {
            params.set("genre", genre);
        }

        if (minPrice) {
            params.set("minPrice", minPrice);
        }

        if (maxPrice) {
            params.set("maxPrice", maxPrice);
        }

        router.push(`/ebooks?${params.toString()}`);
    };

    const clearSearch = () => {
        setSearch("");
        setGenre("");
        setMinPrice("");
        setMaxPrice("");

        router.push("/ebooks");
    };


    return (
        <form
            onSubmit={handleSearch}
            className="mb-8"
        >
            <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">

                    <input
                        type="text"
                        placeholder="Search ebooks by title or writer..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3 pr-12 outline-none transition focus:border-violet-500 dark:border-slate-700 dark:bg-slate-900"
                    />

                    {search && (
                        <button
                            type="button"
                            onClick={clearSearch}
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-red-500 dark:hover:bg-slate-800"
                            aria-label="Clear search"
                        >
                            <X size={20} />
                        </button>
                    )}

                </div>

                <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="rounded-xl border border-slate-300 bg-white px-2 py-3 outline-none transition focus:border-violet-500 dark:border-slate-700 dark:bg-slate-900"
                >
                    <option value="">All Genres</option>

                    {GENRES.map((genre) => (
                        <option key={genre} value={genre}>
                            {genre}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    placeholder="Min $"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-28 rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-violet-500 dark:border-slate-700 dark:bg-slate-900"
                />

                <input
                    type="number"
                    placeholder="Max $"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-28 rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-violet-500 dark:border-slate-700 dark:bg-slate-900"
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
