"use client";

import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({ children }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="flex min-h-screen bg-slate-100 dark:bg-slate-950">
            <DashboardSidebar
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />

            <div className="flex flex-1 flex-col overflow-hidden">
                <DashboardHeader
                    setIsOpen={setIsOpen}
                />

                <main className="flex-1 p-4 md:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </section>
    );
}