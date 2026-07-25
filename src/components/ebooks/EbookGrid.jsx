import EbookCard from "./EbookCard";

const EbookGrid = ({ ebooks }) => {

    console.log("Ebooks in EbookGrid:", ebooks); // Debugging line to check the ebooks prop
    return (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {ebooks.map((ebook) => (
                <EbookCard
                    key={ebook._id}
                    ebook={ebook}
                />
            ))}
        </div>
    );
};

export default EbookGrid;