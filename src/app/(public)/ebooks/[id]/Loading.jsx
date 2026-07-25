export default function Loading() {
    return (
        <section className="container mx-auto py-16">
            <div className="grid animate-pulse gap-10 lg:grid-cols-2">

                <div className="aspect-3/4 rounded-3xl bg-slate-200 dark:bg-slate-800" />

                <div className="space-y-5">

                    <div className="h-8 w-28 rounded bg-slate-200 dark:bg-slate-800" />

                    <div className="h-14 rounded bg-slate-200 dark:bg-slate-800" />

                    <div className="h-6 w-52 rounded bg-slate-200 dark:bg-slate-800" />

                    <div className="h-40 rounded bg-slate-200 dark:bg-slate-800" />

                    <div className="h-14 rounded bg-slate-200 dark:bg-slate-800" />

                </div>

            </div>
        </section>
    );
}
