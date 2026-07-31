export default function Loading() {

    return (
        <section className="space-y-8 animate-pulse">

            <div>
                <div className="h-10 w-64 rounded bg-slate-200 dark:bg-slate-800" />

                <div className="mt-3 h-4 w-96 rounded bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="space-y-4 md:hidden">

                {
                    Array.from({ length: 5 }).map((_, index) => (
                        <div
                            key={index}
                            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                        >
                            <div className="flex items-center gap-4">

                                <div className="h-14 w-14 rounded-full bg-slate-200 dark:bg-slate-800" />
                                <div className="flex-1 space-y-2">

                                    <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800" />

                                    <div className="h-3 w-44 rounded bg-slate-200 dark:bg-slate-800" />
                                </div>
                            </div>

                            <div className="mt-5 flex items-center justify-between">

                                <div className="h-6 w-20 rounded-full bg-slate-200 dark:bg-slate-800" />


                                <div className="h-9 w-20 rounded-lg bg-slate-200 dark:bg-slate-800" />

                            </div>


                            <div className="mt-4 h-10 w-full rounded-lg bg-slate-200 dark:bg-slate-800" />

                        </div>
                    ))

                }

            </div>



            <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 md:block">

                <table className="w-full">

                    <thead className="bg-slate-100 dark:bg-slate-800">

                        <tr>
                            <th className="px-6 py-4 text-left">
                                User
                            </th>
                            <th className="px-6 py-4 text-left">
                                Email
                            </th>
                            <th className="px-6 py-4 text-left">
                                Role
                            </th>
                            <th className="px-6 py-4 text-left">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>

                        {
                            Array.from({ length: 8 }).map((_, index) => (

                                <tr
                                    key={index}
                                    className="border-t border-slate-200 dark:border-slate-800"
                                >
                                    <td className="px-6 py-4">

                                        <div className="flex items-center gap-3">

                                            <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-800" />

                                            <div className="h-4 w-28 rounded bg-slate-200 dark:bg-slate-800" />

                                        </div>

                                    </td>
                                    <td className="px-6 py-4">

                                        <div className="h-4 w-48 rounded bg-slate-200 dark:bg-slate-800" />

                                    </td>
                                    <td className="px-6 py-4">

                                        <div className="flex items-center gap-3">

                                            <div className="h-6 w-20 rounded-full bg-slate-200 dark:bg-slate-800" />

                                            <div className="h-10 w-36 rounded-lg bg-slate-200 dark:bg-slate-800" />

                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="h-9 w-20 rounded-lg bg-slate-200 dark:bg-slate-800" />

                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>

            </div>


        </section>
    );
}
