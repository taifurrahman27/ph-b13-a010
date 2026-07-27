import AddEbookForm from "./AddEbookForm";

export default function EditEbookForm({ ebook }) {
    return (

        <AddEbookForm
            mode="edit"
            ebook={ebook}
        />
    );
}