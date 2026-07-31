import TableRowSkeleton from "@/components/dashboard/TableRowSkeleton";

export default function Loading() {

    return (
        <section className="space-y-8">

            <div>
                <div className="h-10 w-56 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                <div className="mt-3 h-4 w-80 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            </div>


            <div className="grid gap-6 md:grid-cols-3">

                {
                    Array.from({ length: 3 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-32 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800"
                        />
                    ))
                }

            </div>


            <div className="overflow-hidden rounded-2xl border bg-white shadow dark:border-slate-800 dark:bg-slate-900">

                <table className="w-full">

                    <tbody>
                        <TableRowSkeleton rows={8} />
                    </tbody>

                </table>

            </div>

        </section>
    );
}
