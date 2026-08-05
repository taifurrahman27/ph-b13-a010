import { auth } from "@/lib/auth";
import { headers } from "next/headers";
export const metadata = {
    title: "Writer Sales",
};

const API_URL =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    "http://localhost:5000";

async function getSales(writerId) {

    const res = await fetch(
        `${API_URL}/sales/${writerId}`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("Failed to load sales.");
    }

    return res.json();
}

export default async function WriterSalesPage() {

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const sales = await getSales(
        session.user.id
    );

    const totalRevenue = sales.reduce(
        (sum, sale) => sum + Number(sale.amount),
        0
    );

    return (
        <section className="space-y-8">

            <div>

                <h1 className="text-4xl font-black">
                    My Sales
                </h1>

                <p className="mt-2 text-slate-500">
                    View every purchase made for your ebooks.
                </p>

            </div>

            <div className="grid gap-6 md:grid-cols-3">

                <div className="rounded-2xl bg-white p-6 shadow dark:bg-slate-900">
                    <p className="text-sm text-slate-500">
                        Total Sales
                    </p>

                    <h2 className="mt-2 text-3xl font-black">
                        {sales.length}
                    </h2>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow dark:bg-slate-900">
                    <p className="text-sm text-slate-500">
                        Revenue
                    </p>

                    <h2 className="mt-2 text-3xl font-black">
                        ${totalRevenue}
                    </h2>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow dark:bg-slate-900">
                    <p className="text-sm text-slate-500">
                        Average Sale
                    </p>

                    <h2 className="mt-2 text-3xl font-black">
                        $
                        {sales.length
                            ? Math.round(
                                totalRevenue /
                                sales.length
                            )
                            : 0}
                    </h2>
                </div>

            </div>

            <div className="overflow-hidden my-10 rounded-2xl border border-slate-200 bg-white shadow dark:border-slate-800 dark:bg-slate-900">

                <table className="w-full table-auto">

                    <thead className="bg-slate-100 dark:bg-slate-800">

                        <tr>

                            <th className="px-3 py-4 text-left text-xs font-semibold md:px-6 md:text-sm">
                                Ebook
                            </th>

                            <th className="px-3 py-4 text-left text-xs font-semibold md:px-6 md:text-sm">
                                Buyer
                            </th>

                            <th className="px-3 py-4 text-left text-xs font-semibold md:px-6 md:text-sm">
                                Amount
                            </th>

                            <th className="px-3 py-4 text-left text-xs font-semibold md:px-6 md:text-sm">
                                Status
                            </th>

                            <th className="px-3 py-4 text-left text-xs font-semibold md:px-6 md:text-sm">
                                Date
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {sales.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={5}
                                    className="py-16 text-center text-slate-500"
                                >
                                    No sales yet.
                                </td>

                            </tr>

                        ) : (

                            sales.map((sale) => (

                                <tr
                                    key={sale._id}
                                    className="border-t border-slate-200 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/40"
                                >

                                    <td className="px-3 py-4 md:px-6">
                                        <p className="font-semibold text-sm wrap-break-word">
                                            {sale.ebookTitle}
                                        </p>
                                    </td>

                                    <td className="px-3 py-4 md:px-6">
                                        <p className="text-sm text-slate-600 break-all dark:text-slate-300">
                                            {sale.customerEmail}
                                        </p>
                                    </td>

                                    <td className="px-3 py-4 text-sm font-semibold text-green-600 md:px-6">
                                        ${sale.amount}
                                    </td>

                                    <td className="px-3 py-4 md:px-6">
                                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700 dark:bg-green-500/20 dark:text-green-300">
                                            {sale.paymentStatus}
                                        </span>
                                    </td>

                                    <td className="px-3 py-4 text-xs text-slate-500 md:px-6 md:text-sm">
                                        {new Date(sale.createdAt).toLocaleDateString()}
                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </section>
    );
}
