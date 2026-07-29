import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { HiOutlineReceiptRefund } from "react-icons/hi2";

async function getPurchaseHistory(userId) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/purchases/${userId}`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        return [];
    }

    return res.json();
}

const PurchasedHistoryPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const purchases = session?.user
        ? await getPurchaseHistory(session.user.id)
        : [];

    console.log(purchases, "Purchase history")
    return (
        <section className="space-y-8">
            <div>
                <h1 className="text-4xl font-black text-slate-900 dark:text-white">
                    Purchase History
                </h1>

                <p className="mt-2 text-slate-500 dark:text-slate-400">
                    View all of your ebook purchases and payment history.
                </p>
            </div>

            {purchases.length === 0 ? (
                <div className="flex h-80 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900">
                    <HiOutlineReceiptRefund className="text-6xl text-slate-300 dark:text-slate-600" />

                    <h2 className="mt-5 text-2xl font-bold">
                        No Purchase History
                    </h2>

                    <p className="mt-2 text-center text-slate-500">
                        You have not purchased any ebooks yet.
                    </p>

                    <Link
                        href="/ebooks"
                        className="mt-6 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
                    >
                        Browse Ebooks
                    </Link>
                </div>
            ) : (
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-violet-600 text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left">
                                        Ebook
                                    </th>

                                    <th className="px-6 py-4 text-left">
                                        Writer
                                    </th>

                                    <th className="px-6 py-4 text-left">
                                        Price
                                    </th>

                                    <th className="px-6 py-4 text-left">
                                        Purchase Date
                                    </th>

                                    <th className="px-6 py-4 text-center">
                                        Status
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {purchases.map((purchase) => (
                                    <tr
                                        key={purchase._id}
                                        className="border-t border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40"
                                    >
                                        <td className="px-6 py-5 font-semibold">
                                            {purchase.title}
                                        </td>

                                        <td className="px-6 py-5">
                                            {purchase.writer?.name || "Unknown"}
                                        </td>

                                        <td className="px-6 py-5">
                                            ${purchase.price}
                                        </td>

                                        <td className="px-6 py-5">
                                            {new Date(purchase.purchaseDate).toLocaleString()}
                                        </td>

                                        <td className="px-6 py-5 text-center">
                                            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-300">
                                                {purchase.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </section>
    );
};

export default PurchasedHistoryPage;