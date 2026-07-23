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

const Navbar = () => {

    const router = useRouter();

    const user = {
        name: "John Doe",
        email: "john.doe@example.com",
        image: "/path/to/image.jpg"
    };

    const [mobileOpen, setMobileOpen] = useState(false);

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
            path: "/writer",
            text: "Browse Writers",
        },
    ];

    const privateNavItems = [
        {
            path: "/",
            text: "Home",
        },
        {
            path: "/browse",
            text: "Browse Ebooks",
        },
        {
            path: "/dashboard",
            text: "Dashboard",
        },
    ];

    const navItems = user ? privateNavItems : publicNavItems;


    return (

        <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl shadow-sm">

            <div className="container mx-auto px-4">

                <div className="flex h-20 items-center justify-between">


                    <Link
                        href="/"
                        className="flex items-center gap-3"
                    >

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100">

                            <BookOpen
                                className="text-violet-600"
                                size={28}
                            />

                        </div>

                        <div>

                            <h1 className="text-2xl font-extrabold">

                                <span className="text-violet-700">
                                    Fable
                                </span>

                            </h1>

                            <p className="text-xs text-slate-500">

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
                                        className="rounded-none"
                                    >
                                        Register
                                    </Button>

                                </Link>

                            </>
                        ) : (

                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        router.push("/profile");
                                    }}
                                    className="flex w-full items-center hover:bg-slate-50"
                                >
                                    <p className="font-bold text-slate-800">
                                        {user.name}
                                    </p>
                                </button>

                                <button
                                    className="flex w-full items-center gap-3 px-4 py-2 font-bold text-red-500 hover:bg-red-50"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </button>
                            </div>
                        )}

                    </div>

                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="rounded-lg p-2 transition hover:bg-slate-100 lg:hidden"
                    >
                        {mobileOpen ? (
                            <HiX className="text-3xl" />
                        ) : (
                            <HiOutlineMenuAlt3 className="text-3xl" />
                        )}
                    </button>


                    {mobileOpen && (
                        <div className="absolute top-full left-0 w-full border-t py-5 lg:hidden">

                            <ul className="space-y-2 left-0 w-full bg-white p-4 shadow-lg">

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

                            <div className="mt-6">

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
                                                router.push("/profile");
                                            }}
                                            className="text-slate-800 font-bold px-4 py-2 flex w-full items-center hover:bg-slate-50"
                                        >
                                            {user.name}
                                        </button>

                                        <button
                                            className="flex w-full items-center gap-2 px-4 py-2 font-bold text-red-500 hover:bg-red-50"
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
