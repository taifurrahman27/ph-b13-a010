export const metadata = {
    title: "Manage Transactions",
};
const API_URL =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    "http://localhost:5000";

async function getTransactions() {

    const res = await fetch(
        `${API_URL}/transactions`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("Failed to load transactions");
    }

    return res.json();
}

export default async function AllTransactionsPage() {

    const transactions = await getTransactions();

    return (

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

            <div className="hidden overflow-x-auto lg:block">
                <table className="w-full">
                    <thead className="bg-slate-100 dark:bg-slate-800">
                        <tr className="text-left">
                            <th className="px-6 py-4">Transaction ID</th>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Date</th>
                        </tr>
                    </thead>
                    <tbody>

                        {transactions.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="py-16 text-center text-slate-500"
                                >
                                    No transactions found.
                                </td>

                            </tr>

                        ) : (

                            transactions.map((transaction) => (
                                <tr
                                    key={transaction._id}
                                    className="border-t border-slate-200 dark:border-slate-800"
                                >
                                    <td className="px-4 py-4 font-mono text-xs">
                                        {transaction.paymentIntentId}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${transaction.type === "publishing_fee"
                                                ? "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300"
                                                : "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300"
                                                }`}
                                        >
                                            {transaction.type === "publishing_fee"
                                                ? "Publishing Fee"
                                                : "Purchase"}
                                        </span>

                                    </td>
                                    <td className="px-4 py-4">
                                        {transaction.customerEmail}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="rounded-full bg-green-100 px-3 py-1  font-semibold text-green-700 dark:bg-green-500/20 dark:text-green-300">
                                            ${transaction.amount}
                                        </span>

                                    </td>

                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        {new Date(transaction.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="space-y-4 p-4 lg:hidden">
                {transactions.length === 0 ? (
                    <div className="py-16 text-center text-slate-500">
                        No transactions found.
                    </div>

                ) : (
                    transactions.map((transaction) => (
                        <div
                            key={transaction._id}
                            className="rounded-xl border border-slate-200 p-4 dark:border-slate-700"
                        >
                            <div className="space-y-3">
                                <div>
                                    <p className="text-xs text-slate-500">
                                        Transaction ID
                                    </p>
                                    <p className="break-all font-mono text-xs">
                                        {transaction.paymentIntentId}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${transaction.type === "publishing_fee"
                                            ? "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300"
                                            : "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300"
                                            }`}
                                    >
                                        {transaction.type === "publishing_fee"
                                            ? "Publishing Fee"
                                            : "Purchase"}
                                    </span>

                                    <span className="rounded-full bg-green-100 px-3 py-1  font-bold text-green-700 dark:bg-green-500/20 dark:text-green-300">
                                        ${transaction.amount}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">
                                        Email
                                    </p>
                                    <p className="break-all">
                                        {transaction.customerEmail}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-500">
                                        {new Date(transaction.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}


