import EbookGrid from "@/components/ebooks/EbookGrid";
import EbookPagination from "@/components/ebooks/EbookPagination";
import EbookSearch from "@/components/ebooks/EbookSearch";

async function getEbooks(
    search = "",
    genre = "",
    minPrice = "",
    maxPrice = "",
    page = 1
) {
    const params = new URLSearchParams();

    if (search) {
        params.set("search", search);
    }

    if (genre) {
        params.set("genre", genre);
    }

    if (minPrice) {
        params.set("minPrice", minPrice);
    }

    if (maxPrice) {
        params.set("maxPrice", maxPrice);
    }
    params.set("page", page);

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/ebooks?${params.toString()}`,
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
    const search = params.search || "";
    const genre = params.genre || "";
    const minPrice = params.minPrice || "";
    const maxPrice = params.maxPrice || "";
    const page = Number(params.page || 1);

    const data = await getEbooks(
        search,
        genre,
        minPrice,
        maxPrice,
        page
    );

    return (

        <section className="min-h-screen bg-slate-50 py-10 dark:bg-slate-950">

            <div className="container mx-auto px-4">

                <div className="mb-8 text-center lg:flex lg:justify-between">

                    <h1 className="text-5xl font-black">
                        Browse E-books
                    </h1>

                    <p className="text-lg py-2 font-semibold text-violet-900 dark:text-violet-400">
                        Total E-books: {data.total}
                    </p>

                </div>

                <EbookSearch />
                <EbookGrid ebooks={data.ebooks} />

                <EbookPagination
                    currentPage={data.currentPage}
                    totalPages={data.totalPages}
                />

            </div>

        </section>
    );
};

export default EbookPage;
