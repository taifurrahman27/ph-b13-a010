"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const MyNavLink = ({ href, children }) => {
    const pathname = usePathname();

    const active =
        href === "/"
            ? pathname === "/"
            : pathname.startsWith(href);

    return (
        <Link
            href={href}
            className={`rounded-lg px-4 py-2 font-medium transition-all duration-200 ${active
                ? "bg-violet-100 text-violet-700"
                : "text-slate-700 hover:bg-slate-100 hover:text-violet-600"
                }`}
        >
            {children}
        </Link>
    );
};

export default MyNavLink;