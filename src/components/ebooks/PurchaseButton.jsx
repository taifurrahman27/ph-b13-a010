"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function PurchaseButton({
    ebookId,
    userId,
    disabled = false,
}) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handlePurchase = async () => {
        if (disabled || loading) return;

        if (!userId) {
            toast.error("Please login first.");
            setTimeout(() => {
                router.push("/login");
            }, 800);
            return;
        }

        try {
            setLoading(true);

            const res = await fetch("/api/checkout_sessions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ebookId,
                    userId,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data.message || "Unable to create checkout session."
                );
            }

            if (!data.url) {
                throw new Error("Stripe checkout URL not received.");
            }

            window.location.href = data.url;
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handlePurchase}
            disabled={disabled || loading}
            className={`rounded-xl px-8 py-3 font-semibold text-white transition ${disabled
                    ? "cursor-not-allowed bg-slate-400"
                    : loading
                        ? "cursor-wait bg-violet-400"
                        : "bg-violet-600 hover:bg-violet-700"
                }`}
        >
            {disabled
                ? "Your Ebook"
                : loading
                    ? "Redirecting..."
                    : "Purchase Ebook"}
        </button>
    );
}
