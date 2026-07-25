import WriterCard from "./WriterCard";

const WritersGrid = ({ writers }) => {
    return (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {writers.map((writer) => (
                <WriterCard
                    key={writer.id}
                    writer={writer}
                />
            ))}
        </div>
    );
};

export default WritersGrid;