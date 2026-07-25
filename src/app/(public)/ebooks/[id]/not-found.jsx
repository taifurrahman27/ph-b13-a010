import Link from "next/link";

export default function NotFound() {
    return (
        <section className="flex min-h-[70vh] flex-col items-center justify-center text-center">

            <h1 className="text-5xl font-black">
                Ebook Not Found
            </h1>

            <p className="mt-4 text-slate-500">
                The ebook you are looking for does not exist or has been removed.
            </p>

            <Link
                href="/ebooks"
                className="mt-8 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700"
            >
                Browse Ebooks
            </Link>

        </section>
    );
}