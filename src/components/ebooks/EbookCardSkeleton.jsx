export default function EbookCardSkeleton() {
    return (
        <div className="rounded-2xl border border-violet-200 bg-white p-4 shadow-sm dark:border-violet-500/30 dark:bg-slate-900 animate-pulse">

            <div className="h-72 w-full rounded-xl bg-slate-200 dark:bg-slate-800" />

            <div className="mt-5 h-5 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />

            <div className="mt-3 h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-800" />

            <div className="mt-4 space-y-2">
                <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-5/6 rounded bg-slate-200 dark:bg-slate-800" />
            </div>

            <div className="mt-5 flex items-center justify-between">
                <div className="h-6 w-20 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-9 w-24 rounded-lg bg-slate-200 dark:bg-slate-800" />
            </div>

        </div>
    );
}

