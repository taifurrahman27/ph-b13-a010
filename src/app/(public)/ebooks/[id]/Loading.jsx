export default function EbookDetailsLoading() {
    return (
        <section className="min-h-screen bg-slate-50 py-14 dark:bg-slate-950">
            <div className="container mx-auto px-4 animate-pulse">

                <div className="grid gap-10 lg:grid-cols-2">

                    <div className="aspect-2/3 rounded-3xl bg-slate-200 shadow-xl dark:bg-slate-800" />

                    <div className="space-y-6">

                        <div className="h-7 w-28 rounded-full bg-slate-200 dark:bg-slate-800" />

                        <div className="space-y-3">
                            <div className="h-12 w-4/5 rounded bg-slate-200 dark:bg-slate-800" />
                            <div className="h-12 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />
                        </div>

                        <div className="space-y-2">
                            <div className="h-5 w-40 rounded bg-slate-200 dark:bg-slate-800" />
                            <div className="h-4 w-20 rounded bg-slate-200 dark:bg-slate-800" />
                        </div>

                        <div className="flex gap-3">
                            <div className="h-10 w-24 rounded-lg bg-slate-200 dark:bg-slate-800" />
                            <div className="h-10 w-32 rounded-lg bg-slate-200 dark:bg-slate-800" />
                        </div>

                        <div className="space-y-3 pt-3">
                            <div className="h-4 rounded bg-slate-200 dark:bg-slate-800" />
                            <div className="h-4 rounded bg-slate-200 dark:bg-slate-800" />
                            <div className="h-4 w-5/6 rounded bg-slate-200 dark:bg-slate-800" />
                            <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
                        </div>

                        <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">

                            <div className="flex justify-between">
                                <div className="h-4 w-20 rounded bg-slate-200 dark:bg-slate-800" />
                                <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-800" />
                            </div>

                            <div className="flex justify-between">
                                <div className="h-4 w-20 rounded bg-slate-200 dark:bg-slate-800" />
                                <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-800" />
                            </div>

                            <div className="flex justify-between">
                                <div className="h-4 w-20 rounded bg-slate-200 dark:bg-slate-800" />
                                <div className="h-4 w-28 rounded bg-slate-200 dark:bg-slate-800" />
                            </div>

                        </div>

                        <div className="flex gap-4 pt-3">

                            <div className="h-12 w-44 rounded-xl bg-slate-200 dark:bg-slate-800" />

                            <div className="h-12 w-36 rounded-xl bg-slate-200 dark:bg-slate-800" />

                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
