"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function DashboardHeader() {
    const { data: session } = authClient.useSession();

    return (
        <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8 dark:border-slate-800 dark:bg-slate-900">

            <div>

                <h1 className="text-3xl font-black">
                    Reader Dashboard
                </h1>

                <p className="text-slate-500">
                    Welcome back!
                </p>

            </div>

            <div className="flex items-center gap-3">

                <Image
                    src={
                        session?.user?.image ||
                        "/default-avatar.png"
                    }
                    alt={session?.user?.name || "User"}
                    width={44}
                    height={44}
                    className="rounded-full object-cover"
                />

                <div>

                    <h3 className="font-semibold">
                        {session?.user?.name}
                    </h3>

                    <p className="text-sm text-slate-500">
                        {session?.user?.role}
                    </p>

                </div>

            </div>

        </header>
    );
}