export default function TableRowSkeleton({ rows = 5 }) {
    return (
        <>
            {
                Array.from({ length: rows }).map((_, index) => (
                    <tr
                        key={index}
                        className="animate-pulse border-b border-slate-200 dark:border-slate-800"
                    >
                        <td className="px-6 py-4">
                            <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800" />
                        </td>

                        <td className="px-6 py-4">
                            <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-800" />
                        </td>

                        <td className="px-6 py-4">
                            <div className="h-4 w-20 rounded bg-slate-200 dark:bg-slate-800" />
                        </td>

                        <td className="px-6 py-4">
                            <div className="h-8 w-20 rounded-lg bg-slate-200 dark:bg-slate-800" />
                        </td>

                    </tr>
                ))
            }
        </>
    );
}
