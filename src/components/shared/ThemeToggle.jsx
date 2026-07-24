"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

function useMounted() {
    return useSyncExternalStore(
        () => () => { },
        () => true,
        () => false
    );
}

export default function ThemeToggle() {
    const mounted = useMounted();
    const { theme, setTheme } = useTheme();

    if (!mounted) {
        return <div className="h-10 w-10" />;
    }

    return (
        <button
            onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
            }
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-600"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? (
                <HiOutlineSun className="text-xl text-yellow-400" />
            ) : (
                <HiOutlineMoon className="text-xl text-slate-700 dark:text-slate-200" />
            )}
        </button>
    );
}
