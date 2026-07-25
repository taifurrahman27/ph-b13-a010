import WritersGrid from "@/components/writers/WritersGrid";

const WritersPage = async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/writers`,
        {
            cache: "no-store",
        }
    );

    const writers = await res.json();

    return (
        <section className="min-h-screen bg-slate-50 py-16 dark:bg-slate-950">
            <div className="container mx-auto px-4">

                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-black">
                        Meet Our Writers
                    </h1>

                    <p className="mt-4 text-slate-600 dark:text-slate-400">
                        Discover talented writers and explore their ebook collections.
                    </p>
                </div>

                <WritersGrid writers={writers} />

            </div>
        </section>
    );
};

export default WritersPage;