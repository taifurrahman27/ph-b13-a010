import { auth } from "@/lib/auth";
import { getTokenServer } from "@/lib/getTokenServer";
import { headers } from "next/headers";
import Link from "next/link";
import { HiOutlineReceiptRefund } from "react-icons/hi2";
export const metadata = {
    title: "Purchase History",
};

async function getPurchaseHistory(userId) {

    const token = await getTokenServer();
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/purchases/${userId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
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
                        className="mt-6 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700"
                    >
                        Browse Ebooks
                    </Link>
                </div>
            ) : (
                <>
                    <div className="hidden overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm md:block dark:border-slate-800 dark:bg-slate-900">
                        <table className="w-full">

                            <thead className="bg-violet-600 text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left">Ebook</th>
                                    <th className="px-6 py-4 text-left">Writer</th>
                                    <th className="px-6 py-4 text-left">Price</th>
                                    <th className="px-6 py-4 text-left">Purchase Date</th>
                                    <th className="px-6 py-4 text-center">Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {purchases.map((purchase) => (
                                    <tr
                                        key={purchase._id}
                                        className="border-t border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/40"
                                    >
                                        <td className="px-6 py-5 font-semibold">
                                            {purchase.title}
                                        </td>

                                        <td className="px-6 py-5">
                                            {purchase.writer?.name || "Unknown"}
                                        </td>

                                        <td className="px-6 py-5 font-semibold text-green-600">
                                            ${purchase.price}
                                        </td>

                                        <td className="px-6 py-5">
                                            {new Date(
                                                purchase.purchaseDate
                                            ).toLocaleDateString()}
                                        </td>

                                        <td className="px-6 py-5 text-center">
                                            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-300">
                                                {purchase.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>

                    <div className="space-y-4 md:hidden">
                        {purchases.map((purchase) => (
                            <div
                                key={purchase._id}
                                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                            >
                                <h3 className="text-lg font-bold">
                                    {purchase.title}
                                </h3>

                                <div className="mt-4 space-y-2 text-sm">

                                    <div className="flex justify-between">
                                        <span className="text-slate-500">
                                            Writer
                                        </span>

                                        <span className="font-medium">
                                            {purchase.writer?.name || "Unknown"}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-slate-500">
                                            Price
                                        </span>

                                        <span className="font-semibold text-green-600">
                                            ${purchase.price}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-slate-500">
                                            Purchased
                                        </span>

                                        <span>
                                            {new Date(
                                                purchase.purchaseDate
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-500">
                                            Status
                                        </span>

                                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-300">
                                            {purchase.status}
                                        </span>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

        </section>
    );
};

export default PurchasedHistoryPage;