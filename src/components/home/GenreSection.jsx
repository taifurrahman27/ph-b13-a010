import Link from "next/link";
import FadeUp from "@/components/animations/FadeUp";
import { GENRE_CONFIG } from "@/constants/genreConfig";

export default function GenreSection() {
    return (
        <section className="max-w-7xl mx-auto bg-white py-16 dark:bg-slate-900">
            <div className="container mx-auto px-4">

                <FadeUp>
                    <div className="mx-auto mb-14 max-w-2xl text-center">
                        <h2 className="text-4xl font-black lg:text-5xl">
                            Browse E-books by Genre
                        </h2>

                        <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">
                            Discover your next favorite read by exploring our
                            diverse collection of genres.
                        </p>
                    </div>
                </FadeUp>

                <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">

                    {GENRE_CONFIG.map((genre, index) => {
                        const Icon = genre.icon;

                        return (
                            <FadeUp
                                key={genre.name}
                                delay={index * 0.05}
                            >
                                <Link
                                    href={`/ebooks?genre=${encodeURIComponent(
                                        genre.name
                                    )}`}
                                    className="group flex flex-col items-center rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:border-violet-500 hover:shadow-2xl hover:shadow-violet-500/10 dark:border-slate-700 dark:bg-slate-800"
                                >
                                    <div
                                        className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl ${genre.color} text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}
                                    >
                                        <Icon size={30} />
                                    </div>

                                    <h3 className="font-bold text-slate-900 transition group-hover:text-violet-600 dark:text-white">
                                        {genre.name}
                                    </h3>

                                    <p className="mt-2 text-sm text-slate-500">
                                        Explore Books
                                    </p>
                                </Link>
                            </FadeUp>
                        );
                    })}

                </div>

            </div>
        </section>
    );
}