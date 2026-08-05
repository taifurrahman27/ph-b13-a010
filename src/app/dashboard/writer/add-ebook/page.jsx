import AddEbookForm from "@/components/dashboard/writer/AddEbookForm";

export const metadata = {
    title: "Add Ebook",
};

export default function AddEbookPage() {
    return (
        <section className="mx-auto max-w-5xl space-y-8">

            <div>
                <h1 className="text-4xl font-black">
                    Add New Ebook
                </h1>

                <p className="mt-3 text-slate-500">
                    Publish your ebook and make it available for readers
                    around the world.
                </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">

                <AddEbookForm />

            </div>

        </section>
    );
}