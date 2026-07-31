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
    HiOutlineChartBar,
    HiXMark,
} from "react-icons/hi2";

const sidebarMenus = {
    reader: [
        {
            title: "Dashboard",
            href: "/dashboard/reader/home",
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
            href: "/dashboard/writer/home",
            icon: HiOutlineHome,
        },
        {
            title: "My Ebooks",
            href: "/dashboard/writer/ebooks",
            icon: HiOutlineBookOpen,
        },
        {
            title: "Manage Ebooks",
            href: "/dashboard/writer/manage-ebooks",
            icon: HiOutlineBookOpen,
        },

        {
            title: "Add Ebook",
            href: "/dashboard/writer/add-ebook",
            icon: HiOutlineDocumentPlus,
        },
        {
            title: "Bookmarks",
            href: "/dashboard/writer/bookmarks",
            icon: HiOutlineBookmark,
        },
        {
            title: "Sales History",
            href: "/dashboard/writer/sales",
            icon: HiOutlineShoppingBag,
        },
        {
            title: "Analytics",
            href: "/dashboard/writer/analytics",
            icon: HiOutlineChartBar,
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
            href: "/dashboard/admin/home",
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
            title: "All Transactions",
            href: "/dashboard/admin/transactions",
            icon: HiOutlinePencilSquare,
        },

        {
            title: "Library",
            href: "/dashboard/admin/library",
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

export default function DashboardSidebar({
    isOpen,
    setIsOpen,
}) {
    const pathname = usePathname();

    const { data: session } = authClient.useSession();

    const role = session?.user?.role || "reader";

    const menuItems = sidebarMenus[role] || [];

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside
                className={`
                    fixed inset-y-0 left-0 z-50
                    flex h-screen w-72 flex-col
                    border-r border-slate-200
                    bg-white
                    transition-all duration-300
                    dark:border-slate-800 dark:bg-slate-900
                    lg:static lg:translate-x-0
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                <div className="border-b border-slate-200 p-6 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/"
                            onClick={() => setIsOpen(false)}
                            className="text-4xl font-black text-violet-600"
                        >
                            Fable
                        </Link>

                        <button
                            onClick={() => setIsOpen(false)}
                            className="rounded-lg p-2 transition hover:bg-slate-100 lg:hidden dark:hover:bg-slate-800"
                        >
                            <HiXMark className="text-2xl" />
                        </button>
                    </div>

                    <p className="mt-2 text-sm text-slate-500">
                        Discover • Read • Share
                    </p>
                </div>


                <nav className="flex-1 space-y-2 overflow-y-auto p-4">
                    {menuItems.map((item) => {
                        const Icon = item.icon;

                        const active =
                            pathname === item.href ||
                            pathname.startsWith(item.href + "/");

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${active
                                    ? "bg-violet-600 text-white shadow-md"
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
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                        <HiOutlineArrowLeft className="text-xl" />
                        Back to Home
                    </Link>
                </div>
            </aside>
        </>
    );
}
