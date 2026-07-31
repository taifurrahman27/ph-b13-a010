"use client";

import Link from "next/link";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
    HiOutlineBookOpen,
    HiOutlineDocumentPlus,
    HiOutlinePencilSquare,
    HiOutlineTrash,
    HiOutlineEye,
    HiOutlineEyeSlash,
} from "react-icons/hi2";

export default function ManageEbooksTable({ ebooks }) {



    const router = useRouter();

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this ebook?"
        );

        if (!confirmed) return;

        try {
            const res = await fetch(
                `http://localhost:5000/ebooks/${id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            toast.success(data.message);

            router.refresh();

        } catch (error) {
            console.error(error);
            toast.error(error.message || "Failed to delete ebook.");
        }
    };



    const handleToggleStatus = async (id, currentStatus) => {
        const newStatus =
            currentStatus === "Published"
                ? "Unpublished"
                : "Published";

        try {
            const res = await fetch(
                `http://localhost:5000/ebooks/${id}/status`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        status: newStatus,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            toast.success(data.message);

            router.refresh();

        } catch (error) {
            console.error(error);
            toast.error(error.message || "Failed to update ebook status.");
        }
    };


    return (
        <section className="space-y-8">

            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

                <div>
                    <h1 className="text-3xl font-black">
                        Manage Ebooks
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Manage your published and unpublished ebooks.
                    </p>
                </div>

                <Link
                    href="/dashboard/writer/add-ebook"
                    className="inline-flex items-center max-w-80 gap-2 rounded-xl bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-700"
                >
                    <HiOutlineDocumentPlus className="text-xl" />
                    Add New Ebook
                </Link>

            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

                    <div className="hidden lg:block">
                        <table className="w-full">
                            <thead className="bg-slate-50 dark:bg-slate-800">
                                <tr className="text-left">
                                    <th className="px-6 py-4">Cover</th>
                                    <th className="px-6 py-4">Title</th>
                                    <th className="px-6 py-4">Genre</th>
                                    <th className="px-6 py-4">Price</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-center">Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {ebooks.length > 0 ? (

                                    ebooks.map((ebook) => (

                                        <tr
                                            key={ebook._id}
                                            className="border-t border-slate-200 dark:border-slate-800"
                                        >

                                            <td className="px-6 py-4">

                                                <Image
                                                    src={ebook.coverImage}
                                                    alt={ebook.title}
                                                    width={48}
                                                    height={64}
                                                    className="h-16 w-12 rounded-lg object-cover"
                                                    unoptimized
                                                />

                                            </td>

                                            <td className="px-3 py-4 font-semibold">
                                                {ebook.title}
                                            </td>

                                            <td className="px-2 py-4">
                                                {ebook.genre}
                                            </td>

                                            <td className="px-4 py-4">
                                                ${Number(ebook.price).toFixed(2)}
                                            </td>

                                            <td className="px-6 py-4">

                                                <span
                                                    className={`rounded-full px-3 py-1 text-sm font-medium ${ebook.status === "Published"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200"
                                                        }`}
                                                >
                                                    {ebook.status}
                                                </span>

                                            </td>

                                            <td className="px-6 py-4">

                                                <div className="flex justify-center gap-2">

                                                    <Link
                                                        href={`/dashboard/writer/edit-ebook/${ebook._id}`}
                                                        className="rounded-lg bg-blue-100 p-2 text-blue-600 hover:bg-blue-200"
                                                    >
                                                        <HiOutlinePencilSquare className="text-xl" />
                                                    </Link>

                                                    <button
                                                        onClick={() =>
                                                            handleToggleStatus(
                                                                ebook._id,
                                                                ebook.status
                                                            )
                                                        }
                                                        className={`rounded-lg p-2 ${ebook.status === "Published"
                                                            ? "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                                                            : "bg-green-100 text-green-600 hover:bg-green-200"
                                                            }`}
                                                    >
                                                        {ebook.status === "Published" ? (
                                                            <HiOutlineEyeSlash className="text-xl" />
                                                        ) : (
                                                            <HiOutlineEye className="text-xl" />
                                                        )}
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(ebook._id)
                                                        }
                                                        className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200"
                                                    >
                                                        <HiOutlineTrash className="text-xl" />
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan={6}
                                            className="py-16 text-center text-slate-500"
                                        >
                                            No ebooks found.
                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                    <div className="space-y-4 p-4 lg:hidden">

                        {ebooks.length > 0 ? (
                            ebooks.map((ebook) => (
                                <div
                                    key={ebook._id}
                                    className="rounded-xl border border-slate-200 p-4 dark:border-slate-700"
                                >
                                    <div className="flex gap-4">
                                        <Image
                                            src={ebook.coverImage}
                                            alt={ebook.title}
                                            width={70}
                                            height={95}
                                            className="rounded-lg object-cover"
                                            unoptimized
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-bold">
                                                {ebook.title}
                                            </h3>
                                            <p className="mt-1 text-sm text-slate-500">
                                                {ebook.genre}
                                            </p>
                                            <p className="mt-1 font-semibold text-violet-600">
                                                ${Number(ebook.price).toFixed(2)}
                                            </p>
                                            <span
                                                className={`mt-2 inline-block rounded-full px-3 py-1 text-xs ${ebook.status === "Published"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200"
                                                    }`}
                                            >
                                                {ebook.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-end gap-2">
                                        <Link
                                            href={`/dashboard/writer/edit-ebook/${ebook._id}`}
                                            className="rounded-lg bg-blue-100 p-2 text-blue-600"
                                        >
                                            <HiOutlinePencilSquare />
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleToggleStatus(
                                                    ebook._id,
                                                    ebook.status
                                                )
                                            }
                                            className={`rounded-lg p-2 ${ebook.status === "Published"
                                                ? "bg-yellow-100 text-yellow-600"
                                                : "bg-green-100 text-green-600"
                                                }`}
                                        >
                                            {ebook.status === "Published" ? (
                                                <HiOutlineEyeSlash />
                                            ) : (
                                                <HiOutlineEye />
                                            )}
                                        </button>

                                        <button
                                            onClick={() => handleDelete(ebook._id)}
                                            className="rounded-lg bg-red-100 p-2 text-red-600"
                                        >
                                            <HiOutlineTrash />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-12 text-center text-slate-500">
                                No ebooks found.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="hidden rounded-2xl border-2 border-dashed border-slate-300 bg-white py-16 text-center dark:border-slate-700 dark:bg-slate-900">

                <HiOutlineBookOpen className="mx-auto mb-4 text-6xl text-slate-400" />

                <h2 className="text-2xl font-bold">
                    No Ebooks Found
                </h2>

                <p className="mt-2 text-slate-500">
                    Start publishing your first ebook.
                </p>

                <Link
                    href="/dashboard/writer/add-ebook"
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-white transition hover:bg-violet-700"
                >
                    <HiOutlineDocumentPlus className="text-xl" />
                    Add Ebook
                </Link>

            </div>

        </section>
    );
}
