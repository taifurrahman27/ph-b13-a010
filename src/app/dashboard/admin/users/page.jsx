import Image from "next/image";
import {
    HiOutlineTrash,
    HiOutlineUserCircle,
} from "react-icons/hi2";

async function getUsers() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        return [];
    }

    return res.json();
}

export default async function UserManagePage() {
    const users = await getUsers();

    return (
        <section className="space-y-8">

            <div>
                <h1 className="text-4xl font-black">
                    Manage Users
                </h1>

                <p className="mt-2 text-slate-500">
                    View all readers, writers and administrators.
                </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-slate-100 dark:bg-slate-800">

                            <tr className="text-left">

                                <th className="px-6 py-4">User</th>

                                <th className="px-6 py-4">Email</th>

                                <th className="px-6 py-4">Role</th>

                                <th className="px-6 py-4">Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {users.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan={4}
                                        className="py-16 text-center text-slate-500"
                                    >
                                        No users found.
                                    </td>

                                </tr>

                            ) : (

                                users.map((user) => (

                                    <tr
                                        key={user._id}
                                        className="border-t border-slate-200 dark:border-slate-800"
                                    >

                                        <td className="px-6 py-4">

                                            <div className="flex items-center gap-3">

                                                {user.image ? (
                                                    <Image
                                                        src={user.image}
                                                        alt={user.name}
                                                        width={48}
                                                        height={48}
                                                        className="rounded-full"
                                                    />
                                                ) : (
                                                    <HiOutlineUserCircle className="text-5xl text-slate-400" />
                                                )}

                                                <span className="font-semibold">
                                                    {user.name}
                                                </span>

                                            </div>

                                        </td>

                                        <td className="px-6 py-4">
                                            {user.email}
                                        </td>

                                        <td className="px-6 py-4">

                                            <select
                                                defaultValue={user.role}
                                                className="rounded-lg border px-3 py-2 dark:bg-slate-900"
                                            >
                                                <option value="reader">
                                                    Reader
                                                </option>

                                                <option value="writer">
                                                    Writer
                                                </option>

                                                <option value="admin">
                                                    Admin
                                                </option>

                                            </select>

                                        </td>

                                        <td className="px-6 py-4">

                                            <button className="rounded-lg bg-red-500 p-2 text-white hover:bg-red-600">

                                                <HiOutlineTrash className="text-xl" />

                                            </button>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </section>
    );
}
