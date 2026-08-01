import EbookGridSkeleton from "@/components/ebooks/EbookGridSkeleton";

export default function FeaturedEbooksSkeleton() {
    return (
        <section className="py-20">

            <div className="mb-10 flex flex-col items-center justify-between gap-4 md:flex-row">

                <div>
                    <div className="h-10 w-72 rounded-lg bg-slate-200 dark:bg-slate-800" />
                    <div className="mt-3 h-5 w-96 rounded bg-slate-200 dark:bg-slate-800" />
                </div>

                <div className="h-12 w-36 rounded-xl bg-slate-200 dark:bg-slate-800" />

            </div>

            <EbookGridSkeleton count={6} />

        </section>
    );
}
