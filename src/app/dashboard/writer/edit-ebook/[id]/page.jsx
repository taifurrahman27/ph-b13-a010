import EditEbookForm from "@/components/dashboard/writer/EditEbookForm";

export default async function EditEbookPage({ params }) {
    const { id } = await params;

    const res = await fetch(
        `http://localhost:5000/ebooks/${id}`,
        {

            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        }
    );

    if (!res.ok) {
        return (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6">
                <h1 className="text-xl font-bold text-red-600">
                    Ebook not found
                </h1>
            </div>
        );
    }

    const ebook = await res.json();

    return (
        <section className="space-y-6">

            <div>
                <h1 className="text-3xl font-black">
                    Edit Ebook
                </h1>

                <p className="mt-2 text-slate-500">
                    Update your ebook information.
                </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <EditEbookForm ebook={ebook} />
            </div>

        </section>
    );
}