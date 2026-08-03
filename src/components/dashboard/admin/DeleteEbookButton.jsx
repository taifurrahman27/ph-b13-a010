"use client";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { HiOutlineTrash } from "react-icons/hi2";

const API_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export default function DeleteEbookButton({ id }) {

    const router = useRouter();


    const handleDelete = async () => {

        const result = await Swal.fire({
            title: "Delete Ebook?",
            text: "This action cannot be undone.",

            icon: "warning",

            background: "#312e81",
            color: "#ffffff",
            iconColor: "#fbbf24",

            showCancelButton: true,

            confirmButtonText: "Yes, Delete",
            cancelButtonText: "Cancel",

            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#64748b",

            reverseButtons: true,
            focusCancel: true,
        });



        if (!result.isConfirmed) return;


        try {

            const { data: tokenData } = await authClient.token();
            const res = await fetch(
                `${API_URL}/ebooks/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${tokenData.token}`
                    },
                }
            );


            const data = await res.json();


            if (!res.ok) {

                throw new Error(
                    data.message || "Failed to delete ebook"
                );

            }


            await Swal.fire({
                icon: "success",
                title: "Ebook Deleted",
                text: "The ebook has been removed successfully.",

                background: "#1e293b",
                color: "#f8fafc",

                iconColor: "#22c55e",

                timer: 1800,
                showConfirmButton: false,

                customClass: {
                    popup: "rounded-3xl shadow-2xl",
                },
            });



            router.refresh();


        } catch (error) {

            toast.error(
                error.message || "Failed to delete ebook."
            );

        }

    };


    return (

        <button
            onClick={handleDelete}
            className="
                rounded-lg
                bg-red-500
                p-2
                text-white
                transition
                hover:bg-red-600
            "
            title="Delete Ebook"
        >

            <HiOutlineTrash className="text-xl" />

        </button>

    );
}
