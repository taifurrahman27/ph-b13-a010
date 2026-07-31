"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@heroui/react";

import {
    BookOpen,
    LogOut,
} from "lucide-react";

import {
    HiOutlineMenuAlt3,
    HiX,
} from "react-icons/hi";

import MyNavLink from "./MyNavLink";
import ThemeToggle from "./ThemeToggle";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();
    if (isPending) {
        return null;
    }

    const user = session?.user;

    const handleLogout = async () => {
        const { error } = await authClient.signOut();

        if (error) {
            toast.error(error.message);
            return;
        }

        toast.success("Logged out successfully");

        router.push("/");
        router.refresh();
    };

    const publicNavItems = [
        {
            path: "/",
            text: "Home",
        },
        {
            path: "/ebooks",
            text: "Browse Ebooks",
        },
        {
            path: "/writers",
            text: "Browse Writers",
        },
    ];

    const privateNavItems = [
        {
            path: "/",
            text: "Home",
        },
        {
            path: "/ebooks",
            text: "Browse Ebooks",
        },
        {
            path: "/dashboard",
            text: "Dashboard",
        },
    ];

    const navItems = user ? privateNavItems : publicNavItems;


    return (

        <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
            <div className="container mx-auto px-4">

                <div className="flex h-20 items-center justify-between">


                    <Link
                        href="/"
                        className="flex items-center gap-3"
                    >

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-500 transition hover:bg-violet-200  dark:bg-violet-900 dark:text-violet-200 dark:hover:bg-violet-800">

                            <BookOpen
                                className="text-violet-600 dark:text-violet-200"
                                size={28}
                            />

                        </div>

                        <div>

                            <h1 className="text-2xl font-extrabold">

                                <span className="text-violet-600 dark:text-violet-500">
                                    Fable
                                </span>

                            </h1>

                            <p className="text-xs bg-white dark:bg-slate-950">

                                Discover • Read • Share

                            </p>

                        </div>

                    </Link>


                    <ul className="hidden lg:flex items-center gap-2">

                        {navItems.map((item) => (

                            <MyNavLink
                                key={item.path}
                                href={item.path}
                            >
                                {item.text}
                            </MyNavLink>

                        ))}

                    </ul>


                    <div className="hidden lg:flex items-center gap-3">

                        <ThemeToggle />
                        <span
                            className={`inline-block rounded-full px-4 py-1 text-sm font-semibold capitalize ${user?.role === "admin"
                                ? "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300"
                                : user?.role === "writer"
                                    ? "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300"
                                    : "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
                                }`}
                        >
                            {user?.role}
                        </span>

                        {!user ? (
                            <>

                                <Link href="/login">

                                    <Button
                                        className="bg-violet-600 text-white rounded-none"
                                    >
                                        Login
                                    </Button>

                                </Link>

                                <Link href="/register">

                                    <Button
                                        variant="bordered"
                                        className="rounded-none dark:border-slate-700 dark:hover:bg-slate-600"
                                    >
                                        Register
                                    </Button>

                                </Link>

                            </>
                        ) : (

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => {
                                        router.push("/profile");
                                    }}
                                    className="flex w-full items-center gap-3 px-4 py-2 font-bold text-stone-600 hover:bg-slate-50 dark:text-stone-200 dark:hover:bg-slate-800"
                                >
                                    {user.name}
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-3 px-4 py-2 font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </button>
                            </div>
                        )}

                    </div>

                    <div className="flex items-center lg:hidden gap-4 px-4 py-2">
                        <ThemeToggle />

                        <div>
                            <span
                                className={`inline-block rounded-full px-4 py-1 text-sm font-semibold capitalize ${user?.role === "admin"
                                    ? "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300"
                                    : user?.role === "writer"
                                        ? "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300"
                                        : "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
                                    }`}
                            >{user?.role}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="rounded-lg p-2 transition hover:bg-slate-100 dark:hover:bg-slate-700 lg:hidden"
                    >
                        {mobileOpen ? (
                            <HiX className="text-3xl" />
                        ) : (
                            <HiOutlineMenuAlt3 className="text-3xl" />
                        )}
                    </button>


                    {mobileOpen && (


                        <div className="absolute top-full left-0 w-full border-t lg:hidden">

                            <ul className="space-y-4 left-0 w-full bg-white dark:bg-slate-950 p-2 shadow-lg">

                                {navItems.map((item) => (
                                    <li
                                        key={item.path}
                                        onClick={() =>
                                            setMobileOpen(false)
                                        }
                                    >

                                        <MyNavLink href={item.path}>
                                            {item.text}
                                        </MyNavLink>
                                    </li>

                                ))}
                            </ul>

                            <div className="space-y-3 left-0 w-full bg-white dark:bg-slate-950 p-4 shadow-lg">
                                {!user ? (

                                    <div className="space-y-3">

                                        <Link
                                            href="/login"
                                            onClick={() =>
                                                setMobileOpen(false)
                                            }
                                        >
                                            <Button className="w-full rounded-none bg-violet-600 text-white">
                                                Login
                                            </Button>
                                        </Link>

                                        <Link
                                            href="/register"
                                            onClick={() =>
                                                setMobileOpen(false)
                                            }
                                        >
                                            <Button
                                                variant="bordered"
                                                className="w-full rounded-none"
                                            >
                                                Register
                                            </Button>
                                        </Link>

                                    </div>

                                ) : (

                                    <div className="space-y-3">
                                        <button
                                            onClick={() => {
                                                setMobileOpen(false);
                                                router.push("/profile");
                                            }}
                                            className="bg-white dark:bg-slate-950 font-bold px-4 py-2 flex w-full items-center hover:bg-slate-150 dark:hover:bg-slate-600"
                                        >
                                            {user.name}
                                        </button>

                                        <button
                                            onClick={handleLogout}
                                            className="flex w-full items-center gap-2 px-4 py-2 font-bold text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900"
                                        >
                                            <LogOut size={18} />
                                            Logout
                                        </button>
                                    </div>

                                )}

                            </div>

                        </div>
                    )}

                </div>
            </div>
        </nav>
    );
};

export default Navbar;

