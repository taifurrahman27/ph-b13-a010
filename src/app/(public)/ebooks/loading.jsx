import EbookGridSkeleton from "@/components/ebooks/EbookGridSkeleton";

export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-10">

            <h1 className="mb-8 text-4xl font-bold">
                Browse Ebooks
            </h1>

            <EbookGridSkeleton count={6} />

        </div>
    );
}
