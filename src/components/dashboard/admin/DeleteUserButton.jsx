"use client";

import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { HiOutlineTrash } from "react-icons/hi2";
import toast from "react-hot-toast";

const API_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export default function DeleteUserButton({ id }) {
    const router = useRouter();

    const handleDelete = async () => {
        const result = await Swal.fire({
            title: "Delete User?",
            text: "This action is permanent and cannot be undone.",
            icon: "warning",
            background: "#312e81",
            color: "#ffffff",
            iconColor: "#fbbf24",
            showCancelButton: true,
            confirmButtonText: "Delete User",
            cancelButtonText: "Keep User",
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#7c3aed",
            reverseButtons: true,
            focusCancel: true,
        });

        if (!result.isConfirmed) return;

        try {
            const res = await fetch(`${API_URL}/users/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }



            await Swal.fire({
                icon: "success",
                title: "User Deleted",
                text: "The user has been deleted successfully.",
                background: "#1e1b4b",
                color: "#ffffff",
                iconColor: "#22c55e",
                timer: 1800,
                showConfirmButton: false,
            });

            router.refresh();
        } catch (error) {
            toast.error(error.message || "Failed to delete user.");
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="rounded-lg bg-red-500 p-2 text-white transition hover:bg-red-600"
        >
            <HiOutlineTrash className="text-xl" />
        </button>
    );
}
