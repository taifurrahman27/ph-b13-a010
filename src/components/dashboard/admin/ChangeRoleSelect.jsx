"use client";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const API_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export default function ChangeRoleSelect({ id, currentRole }) {
    const router = useRouter();

    const handleRoleChange = async (e) => {
        const role = e.target.value;

        const result = await Swal.fire({
            title: "Change User Role?",
            text: `Change this user's role to "${role}"?`,
            icon: "question",
            background: "#312e81",
            color: "#ffffff",
            iconColor: "#a78bfa",
            showCancelButton: true,
            confirmButtonText: "Update Role",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#8b5cf6",
            cancelButtonColor: "#64748b",
            reverseButtons: true,
            focusCancel: true,
        });


        if (!result.isConfirmed) {
            e.target.value = currentRole;
            return;
        }

        try {
            const { data: tokenData } = await authClient.token();
            const res = await fetch(`${API_URL}/users/${id}/role`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokenData.token}`
                },
                body: JSON.stringify({ role }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            await Swal.fire({
                icon: "success",
                title: "Role Updated",
                text: "The user's role has been updated successfully.",
                background: "#1e293b",
                color: "#f8fafc",
                iconColor: "#8b5cf6",
                timer: 1800,
                showConfirmButton: false,
                customClass: {
                    popup: "rounded-3xl shadow-2xl",
                },
            });
            router.refresh();
        } catch (error) {
            toast.error(error.message || "Failed to update role.");

            e.target.value = currentRole;
        }
    };

    return (
        <select
            defaultValue={currentRole}
            onChange={handleRoleChange}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        >
            <option value="reader">Reader</option>
            <option value="writer">Writer</option>
            <option value="admin">Admin</option>
        </select>
    );
}

