import EbookGrid from "@/components/ebooks/EbookGrid";
import EbookSearch from "@/components/ebooks/EbookSearch";

async function getEbooks(search = "") {

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/ebooks?search=${search}`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("Failed to load ebooks");
    }

    return res.json();
}


const EbookPage = async ({ searchParams }) => {
    const params = await searchParams;
    const search = params?.search || "";
    const ebooks = await getEbooks(search);

    return (
        <section className="min-h-screen bg-slate-50 py-16 dark:bg-slate-950">

            <div className="container mx-auto px-4">

                <div className="mb-12 text-center">

                    <h1 className="text-5xl font-black">
                        Browse E-books
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl text-slate-500 dark:text-slate-400">
                        Discover inspiring stories, educational books,
                        programming guides, and much more from talented
                        writers around the world.
                    </p>

                    <p className="text-lg py-2 font-semibold text-slate-700 dark:text-slate-300">
                        Total ebooks: {ebooks.length}
                    </p>

                </div>
                <EbookSearch />
                <EbookGrid ebooks={ebooks} />

            </div>

        </section>
    );
};

export default EbookPage;
