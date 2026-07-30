"use client";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const API_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export default function ChangeStatusSelect({
    id,
    currentStatus,
}) {
    const router = useRouter();

    const handleStatusChange = async (e) => {
        const status = e.target.value;

        const normalizedCurrentStatus =
            currentStatus === "Available"
                ? "Published"
                : currentStatus;


        if (status === normalizedCurrentStatus) return;


        const result = await Swal.fire({
            title: "Change Ebook Status?",
            text: `Change this ebook status to "${status}"?`,
            icon: "question",

            background: "#312e81",
            color: "#ffffff",
            iconColor: "#a78bfa",

            showCancelButton: true,

            confirmButtonText: "Update Status",
            cancelButtonText: "Cancel",

            confirmButtonColor: "#8b5cf6",
            cancelButtonColor: "#64748b",

            reverseButtons: true,
            focusCancel: true,
        });


        if (!result.isConfirmed) {

            e.target.value = normalizedCurrentStatus;

            return;
        }


        try {
            const res = await fetch(
                `${API_URL}/ebooks/${id}/status`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        status,
                    }),
                }
            );


            const data = await res.json();


            if (!res.ok) {
                throw new Error(
                    data.message || "Failed to update status"
                );
            }

            await Swal.fire({
                icon: "success",
                title: "Status Updated",
                text: "The ebook status has been updated successfully.",

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
                error.message || "Something went wrong."
            );


            e.target.value = normalizedCurrentStatus;
        }
    };


    return (
        <select
            defaultValue={
                currentStatus === "Available"
                    ? "Published"
                    : currentStatus
            }
            onChange={handleStatusChange}
            className="
        rounded-lg
        border
        border-slate-300
        bg-white
        px-3
        py-2
        text-sm
        font-medium
        text-slate-700
        outline-none
        transition
        focus:border-violet-500
        dark:border-slate-700
        dark:bg-slate-900
        dark:text-white
    "
        >
            <option value="Published">
                Published
            </option>

            <option value="Unpublished">
                Unpublished
            </option>

        </select>
    );
}

