"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
    HiOutlineHome,
    HiOutlineBookOpen,
    HiOutlineBookmark,
    HiOutlineUser,
    HiOutlineShoppingBag,
    HiOutlinePencilSquare,
    HiOutlineDocumentPlus,
    HiOutlineUsers,
    HiOutlineCog6Tooth,
    HiOutlineArrowLeft,
} from "react-icons/hi2";

const sidebarMenus = {
    reader: [
        {
            title: "Dashboard",
            href: "/dashboard/reader",
            icon: HiOutlineHome,
        },
        {
            title: "Purchased Ebooks",
            href: "/dashboard/reader/library",
            icon: HiOutlineBookOpen,
        },
        {
            title: "Purchase History",
            href: "/dashboard/reader/purchases",
            icon: HiOutlineShoppingBag,
        },
        {
            title: "Bookmarks",
            href: "/dashboard/reader/bookmarks",
            icon: HiOutlineBookmark,
        },
        {
            title: "Profile",
            href: "/dashboard/reader/profile",
            icon: HiOutlineUser,
        },
    ],

    writer: [
        {
            title: "Dashboard",
            href: "/dashboard/writer",
            icon: HiOutlineHome,
        },
        {
            title: "My Ebooks",
            href: "/dashboard/writer/ebooks",
            icon: HiOutlineBookOpen,
        },
        {
            title: "Add Ebook",
            href: "/dashboard/writer/add-ebook",
            icon: HiOutlineDocumentPlus,
        },
        {
            title: "Sales History",
            href: "/dashboard/writer/sales",
            icon: HiOutlineShoppingBag,
        },
        {
            title: "Profile",
            href: "/dashboard/writer/profile",
            icon: HiOutlineUser,
        },
    ],


    admin: [
        {
            title: "Dashboard",
            href: "/dashboard/admin",
            icon: HiOutlineHome,
        },

        {
            title: "Manage Users",
            href: "/dashboard/admin/users",
            icon: HiOutlineUsers,
        },

        {
            title: "Manage Ebooks",
            href: "/dashboard/admin/ebooks",
            icon: HiOutlinePencilSquare,
        },
        {
            title: "Site Settings",
            href: "/dashboard/admin/settings",
            icon: HiOutlineCog6Tooth,
        },
        {
            title: "Profile",
            href: "/dashboard/admin/profile",
            icon: HiOutlineUser,
        },
    ],
};

export default function DashboardSidebar() {
    const pathname = usePathname();

    const { data: session } = authClient.useSession();

    const role = session?.user?.role || "reader";

    const menuItems = sidebarMenus[role] || [];

    return (
        <aside className="flex w-62 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">

            <div className="border-b border-slate-200 p-6 dark:border-slate-800">

                <Link
                    href="/"
                    className="text-4xl font-black text-violet-600"
                >
                    Fable
                </Link>

                <p className="mt-1 capitalize text-sm text-slate-500">
                    Discover • Read • Share
                </p>

            </div>

            <nav className="flex-1 space-y-2 p-4">

                {menuItems.map((item) => {
                    const Icon = item.icon;

                    const active =
                        pathname === item.href ||
                        pathname.startsWith(item.href + "/");

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${active
                                ? "bg-violet-600 text-white"
                                : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                                }`}
                        >
                            <Icon className="text-xl" />
                            <span>{item.title}</span>
                        </Link>
                    );
                })}

            </nav>

            <div className="border-t border-slate-200 p-4 dark:border-slate-800">

                <Link
                    href="/"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                    <HiOutlineArrowLeft className="text-xl" />
                    Back to Home
                </Link>

            </div>

        </aside>
    );
}
