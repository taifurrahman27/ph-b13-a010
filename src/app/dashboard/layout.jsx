import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({ children }) {
    return (
        <section className="flex min-h-screen bg-slate-100 dark:bg-slate-950">

            <DashboardSidebar />

            <div className="flex flex-1 flex-col">

                <DashboardHeader />

                <main className="flex-1 p-8">
                    {children}
                </main>

            </div>

        </section>
    );
}
