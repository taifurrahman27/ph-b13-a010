import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const WriterDetailsPage = async ({ params }) => {
    const { id } = await params;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/writers/${id}`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        notFound();
    }

    const { writer, ebooks } = await res.json();

    return (
        <section className="min-h-screen bg-slate-50 py-16 dark:bg-slate-950">
            <div className="container mx-auto px-4">


                <div className="mb-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-900">

                    <div className="flex flex-col items-center gap-8 md:flex-row">

                        <Image
                            src={writer.photo || "/placeholder.png"}
                            alt={writer.name}
                            height={300}
                            width={400}
                            className="object-cover rounded-2xl"

                        />
                        <div className="flex-1">

                            <h1 className="text-4xl font-black">
                                {writer.name}
                            </h1>

                            <p className="mt-2 text-slate-500 dark:text-slate-400">
                                {writer.email}
                            </p>

                            <div className="mt-8 grid grid-cols-3 gap-5">

                                <div className="rounded-2xl bg-violet-50 p-5 text-center dark:bg-violet-900/30">

                                    <h2 className="text-3xl font-black text-violet-600">
                                        {writer.totalBooks}
                                    </h2>

                                    <p className="mt-2 text-sm text-slate-500">
                                        Ebooks
                                    </p>

                                </div>

                                <div className="rounded-2xl bg-violet-50 p-5 text-center dark:bg-violet-900/30">

                                    <h2 className="text-3xl font-black text-violet-600">
                                        {writer.totalSales}
                                    </h2>

                                    <p className="mt-2 text-sm text-slate-500">
                                        Sales
                                    </p>

                                </div>

                                <div className="rounded-2xl bg-violet-50 p-5 text-center dark:bg-violet-900/30">

                                    <h2 className="text-3xl font-black text-violet-600">
                                        ⭐ {writer.averageRating}
                                    </h2>

                                    <p className="mt-2 text-sm text-slate-500">
                                        Rating
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                <div className="mb-8">

                    <h2 className="text-3xl font-black">
                        Books by {writer.name}
                    </h2>

                    <p className="mt-2 text-slate-500 dark:text-slate-400">
                        Explore all ebooks written by this author.
                    </p>

                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                    {ebooks.map((ebook) => (

                        <div
                            key={ebook._id}
                            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
                        >

                            <div className="relative h-80 w-full overflow-hidden">
                                <Image
                                    src={ebook.coverImage || "/placeholder.png"}
                                    alt={ebook.title}
                                    fill
                                    className="h-80 w-60 object-cover"
                                />

                            </div>

                            <div className="space-y-4 p-5">

                                <span className="inline-block rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-900 dark:text-violet-300">
                                    {ebook.genre}
                                </span>

                                <h3 className="line-clamp-2 text-xl font-bold">
                                    {ebook.title}
                                </h3>

                                <p className="line-clamp-3 text-sm text-slate-500 dark:text-slate-400">
                                    {ebook.description}
                                </p>

                                <div className="flex items-center justify-between">

                                    <span className="text-2xl font-black text-violet-600">
                                        ${ebook.price}
                                    </span>

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

                    ))}

                </div>

            </div>
        </section>
    );
};

export default WriterDetailsPage;

