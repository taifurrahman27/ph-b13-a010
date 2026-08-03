"use client";

import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BookmarkButton({ ebookId }) {

    const [bookmarked, setBookmarked] = useState(false);
    const [loading, setLoading] = useState(false);
    const { data: session } = authClient.useSession();
    const router = useRouter();


    const API_URL =
        process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

    useEffect(() => {

        if (!session?.user?.id) return;

        const API_URL =
            process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

        const checkBookmark = async () => {

            try {

                const res = await fetch(
                    `${API_URL}/bookmarks/check?userId=${session.user.id}&ebookId=${ebookId}`
                );

                const data = await res.json();
                setBookmarked(data.bookmarked);

            } catch (error) {

                console.log(error);
            }
        };
        checkBookmark();
    }, [session, ebookId]);

    const handleBookmark = async () => {

        if (!session) {
            toast.error("Please login first.");
            setTimeout(() => {
                router.push("/login");
            }, 1000);
            return;
        }

        if (bookmarked) return;

        setLoading(true);

        try {
            const { data: tokenData } = await authClient.token();

            console.log(tokenData, "token data from book mark button");

            const res = await fetch(`${API_URL}/bookmarks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokenData.token}`
                },
                body: JSON.stringify({
                    userId: session.user.id,
                    ebookId,
                }),

            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }
            setBookmarked(true);
            toast.success("Added to bookmarks!");

        } catch (error) {
            toast.error(
                error.message || "Failed to bookmark ebook."
            );
        } finally {
            setLoading(false);
        }
    };

    return (

        <button
            onClick={handleBookmark}
            disabled={loading || bookmarked}

            className={`rounded-xl px-8 py-3 font-semibold transition-all duration-200 disabled:cursor-not-allowed ${bookmarked
                ? "bg-green-600 text-white border border-green-600"
                : "border border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white"
                }`}
        >

            {
                loading
                    ? "Checking..."
                    : bookmarked
                        ? "✓ Bookmarked"
                        : "Bookmark"
            }

        </button>
    );
}
