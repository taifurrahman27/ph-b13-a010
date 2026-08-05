import ChangeStatusSelect from "@/components/dashboard/admin/ChangeStatusSelect";
import DeleteEbookButton from "@/components/dashboard/admin/DeleteEbookButton";
import CustomImage from "@/components/shared/CustomImage";

export const metadata = {
    title: "Manage Ebooks",
};

const API =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

async function getEbooks() {
    const res = await fetch(`${API}/ebooks/admin`, {
        cache: "no-store",
    });


    if (!res.ok) {
        throw new Error("Failed to load ebooks");
    }

    return res.json();
}

export default async function EbookManagePage() {
    const ebooks = await getEbooks();

    return (
        <section className="space-y-8">

            <div>
                <h1 className="text-4xl font-black">
                    Manage Ebooks
                </h1>

                <p className="mt-2 text-slate-500">
                    Publish, unpublish and manage all ebooks.
                </p>
            </div>


            <div className="hidden overflow-hidden rounded-2xl border bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 md:block">

                <table className="w-full">

                    <thead className="bg-slate-100 dark:bg-slate-800">

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
                                Status
                            </th>

                            <th className="px-6 py-4 text-left">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {ebooks.map((ebook) => (

                            <tr
                                key={ebook._id}
                                className="border-t dark:border-slate-800"
                            >

                                <td className="px-6 py-4">

                                    <div className="flex items-center gap-3">

                                        <CustomImage
                                            src={ebook.coverImage}
                                            alt={ebook.title}
                                            width={80}
                                            height={100}
                                            className="h-25 w-20 rounded-lg object-cover"
                                        />

                                        <div>

                                            <h3 className="font-semibold">
                                                {ebook.title}
                                            </h3>

                                            <p className="text-sm text-slate-500">
                                                {ebook.genre}
                                            </p>

                                        </div>

                                    </div>

                                </td>

                                <td className="px-6 py-4">
                                    {ebook.writer?.name}
                                </td>

                                <td className="px-6 py-4">
                                    ${ebook.price}
                                </td>

                                <td className="px-6 py-4">

                                    <div className="flex items-center gap-3">

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${ebook.status === "Available"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {ebook.status}
                                        </span>

                                        <ChangeStatusSelect
                                            id={ebook._id}
                                            currentStatus={ebook.status}
                                        />

                                    </div>

                                </td>

                                <td className="px-6 py-4">

                                    <DeleteEbookButton
                                        id={ebook._id}
                                    />

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>


            <div className="grid gap-5 md:hidden">

                {ebooks.map((ebook) => (

                    <div
                        key={ebook._id}
                        className="rounded-2xl border bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                    >

                        <div className="flex gap-4">

                            <CustomImage
                                src={ebook.coverImage}
                                alt={ebook.title}
                                width={80}
                                height={100}
                                className="h-25 w-20 rounded-lg object-cover"
                            />

                            <div className="flex-1">

                                <h3 className="font-bold">
                                    {ebook.title}
                                </h3>

                                <p className="text-sm text-slate-500">
                                    {ebook.writer?.name}
                                </p>

                                <p className="mt-1 font-semibold text-violet-600">
                                    ${ebook.price}
                                </p>

                                <span
                                    className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${ebook.status === "Available"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {ebook.status}
                                </span>

                            </div>

                        </div>

                        <div className="mt-5 flex items-center justify-between">

                            <ChangeStatusSelect
                                id={ebook._id}
                                currentStatus={ebook.status}
                            />


                            <DeleteEbookButton
                                id={ebook._id}
                            />

                        </div>

                    </div>

                ))}

            </div>

        </section>
    );
}

