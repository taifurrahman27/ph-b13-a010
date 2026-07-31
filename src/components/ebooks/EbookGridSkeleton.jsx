import EbookCardSkeleton from "./EbookCardSkeleton";

export default function EbookGridSkeleton({ count = 6 }) {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {
                Array.from({ length: count }).map((_, index) => (
                    <EbookCardSkeleton key={index} />
                ))
            }
        </div>
    );
}
