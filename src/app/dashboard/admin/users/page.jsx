import ChangeRoleSelect from "@/components/dashboard/admin/ChangeRoleSelect";
import DeleteUserButton from "@/components/dashboard/admin/DeleteUserButton";
import Image from "next/image";
import {
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

            <div className="space-y-4 md:hidden">

                {users.length === 0 ? (

                    <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
                        <p className="text-slate-500">
                            No users found.
                        </p>
                    </div>

                ) : (

                    users.map((user) => (


                        <div
                            key={user._id}
                            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                        >

                            <div className="flex items-center gap-4">

                                {user.image ? (
                                    <Image
                                        src={user.image}
                                        alt={user.name}
                                        width={56}
                                        height={56}
                                        className="rounded-full"

                                    />
                                ) : (
                                    <HiOutlineUserCircle className="text-6xl text-slate-400" />
                                )}

                                <div className="min-w-0 flex-1">

                                    <h2 className="truncate font-bold">
                                        {user.name}
                                    </h2>

                                    <p className="truncate text-sm text-slate-500">
                                        {user.email}
                                    </p>

                                </div>

                            </div>

                            <div className="mt-5 flex items-center justify-between">

                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${user.role === "admin"
                                        ? "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300"
                                        : user.role === "writer"
                                            ? "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300"
                                            : "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
                                        }`}
                                >
                                    {user.role.charAt(0).toUpperCase() +
                                        user.role.slice(1)}
                                </span>

                                <DeleteUserButton id={user._id} />

                            </div>

                            <div className="mt-4">
                                <ChangeRoleSelect
                                    id={user._id}
                                    currentRole={user.role}
                                />
                            </div>

                        </div>

                    ))

                )}

            </div>


            <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 md:block">

                <table className="w-full">

                    <thead className="bg-slate-100 dark:bg-slate-800">

                        <tr className="text-left">

                            <th className="px-6 py-4">User</th>

                            <th className="px-6 py-4">Email</th>

                            <th className="px-6 py-4">
                                Role{" "}
                                <span className="text-purple-500">
                                    (Change Role)
                                </span>
                            </th>

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
                                                    width={56}
                                                    height={56}
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

                                        <div className="flex items-center gap-3">

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${user.role === "admin"
                                                    ? "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300"
                                                    : user.role === "writer"
                                                        ? "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300"
                                                        : "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
                                                    }`}
                                            >
                                                {user.role.charAt(0).toUpperCase() +
                                                    user.role.slice(1)}
                                            </span>

                                            <ChangeRoleSelect
                                                id={user._id}
                                                currentRole={user.role}
                                            />

                                        </div>

                                    </td>

                                    <td className="px-6 py-4">
                                        <DeleteUserButton id={user._id} />
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

