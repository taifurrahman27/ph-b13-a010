"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import {
    HiOutlineHome,
    HiOutlineBookOpen
} from "react-icons/hi2";
import { LogOut } from "lucide-react";
import ThemeToggle from "../shared/ThemeToggle";

export default function DashboardHeader() {
    const { data: session } = authClient.useSession();

    const router = useRouter();
    const pathname = usePathname();

    const role = session?.user?.role;

    const dashboardTitle =
        role === "reader"
            ? "Reader Dashboard"
            : role === "writer"
                ? "Writer Dashboard"
                : role === "admin"
                    ? "Admin Dashboard"
                    : "Dashboard";

    const handleLogout = async () => {
        try {
            await authClient.signOut();

            toast.success("Logged out successfully");

            router.push("/");
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error("Failed to logout");
        }
    };

    return (
        <header className="flex flex-wrap items-center justify-between gap-5 border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-900">

            {/* Left Side */}
            <div>

                <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                    {dashboardTitle}
                </h1>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Welcome back{session?.user?.name ? `, ${session.user.name}` : ""}!
                </p>

            </div>

            {/* Right Side */}
            <div className="flex justify-between items-center gap-3">

                <Link
                    href="/"
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${pathname === "/"
                        ? "bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300"
                        : "text-slate-600 hover:bg-slate-100 hover:text-violet-600 dark:text-slate-300 dark:hover:bg-slate-800"
                        }`}
                >
                    <HiOutlineHome className="text-xl" />

                    <span className="hidden md:inline">
                        Home
                    </span>
                </Link>

                <Link
                    href="/ebooks"
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${pathname.startsWith("/ebooks")
                        ? "bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300"
                        : "text-slate-600 hover:bg-slate-100 hover:text-violet-600 dark:text-slate-300 dark:hover:bg-slate-800"
                        }`}
                >
                    <HiOutlineBookOpen className="text-xl" />

                    <span className="hidden md:inline">
                        Browse
                    </span>
                </Link>

                <ThemeToggle />

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                >
                    <LogOut size={18} />
                    <span className="hidden md:inline">
                        Logout
                    </span>
                </button>

            </div>

        </header>
    );
}
