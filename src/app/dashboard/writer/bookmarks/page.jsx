"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

import {
    HiOutlineBookOpen,
    HiOutlineStar,
    HiOutlineTrash,
} from "react-icons/hi2";


export default function WriterBookmarkPage() {

    const { data: session, isPending } = authClient.useSession();

    const userId = session?.user?.id;

    const API_URL =
        process.env.NEXT_PUBLIC_SERVER_URL ||
        "http://localhost:5000";


    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {

        if (!userId) return;


        const fetchBookmarks = async () => {

            try {

                const res = await fetch(
                    `${API_URL}/bookmarks/user/${userId}`,
                    {
                        cache: "no-store",
                    }
                );


                const data = await res.json();



                if (!res.ok) {

                    throw new Error(
                        data.message ||
                        "Failed to load bookmarks"
                    );

                }


                setBookmarks(data);


            } catch (error) {

                console.error(error);

                toast.error(
                    error.message ||
                    "Failed to load bookmarks"
                );


            } finally {

                setLoading(false);

            }

        };


        fetchBookmarks();


    }, [userId, API_URL]);





    const handleRemoveBookmark = async (ebookId) => {


        if (!userId) return;



        const confirmed = window.confirm(
            "Remove this ebook from your bookmarks?"
        );


        if (!confirmed) return;



        try {


            const res = await fetch(
                `${API_URL}/bookmarks`,
                {

                    method: "DELETE",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        userId,
                        ebookId,
                    }),

                }
            );



            const data = await res.json();



            if (!res.ok) {

                throw new Error(
                    data.message ||
                    "Failed to remove bookmark"
                );

            }



            toast.success(
                "Bookmark removed"
            );



            setBookmarks((prev) =>
                prev.filter((item) => {

                    const id =
                        item.ebook?._id ||
                        item._id;


                    return id !== ebookId;

                })
            );



        } catch (error) {

            console.error(error);


            toast.error(
                error.message ||
                "Failed to remove bookmark"
            );

        }

    };







    if (isPending || loading) {

        return (

            <section className="flex h-80 items-center justify-center">

                <p className="text-slate-500">
                    Loading bookmarks...
                </p>

            </section>

        );

    }





    if (!session) {

        return (

            <section className="flex h-80 items-center justify-center">

                <p className="text-slate-500">
                    Please login to view bookmarks.
                </p>

            </section>

        );

    }







    return (

        <section className="space-y-8">


            <div>

                <h1 className="text-3xl font-black">
                    My Bookmarked Ebooks
                </h1>


                <p className="mt-2 text-slate-500">
                    All ebooks you saved for later reading.
                </p>

            </div>






            {
                bookmarks.length === 0 ? (

                    <div className="flex h-96 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900">


                        <HiOutlineBookOpen
                            className="text-6xl text-slate-300"
                        />


                        <h2 className="mt-5 text-2xl font-bold">
                            No Bookmarks Yet
                        </h2>


                        <p className="mt-2 text-slate-500">
                            Bookmark ebooks to access them quickly.
                        </p>



                        <Link
                            href="/ebooks"
                            className="mt-6 rounded-xl bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-700"
                        >
                            Browse Ebooks
                        </Link>


                    </div>


                ) : (


                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">


                        {
                            bookmarks.map((item) => {


                                const ebook =
                                    item.ebook || item;



                                return (

                                    <article
                                        key={ebook._id}
                                        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                                    >


                                        <div className="relative h-72">


                                            <Image

                                                src={
                                                    ebook.coverImage ||
                                                    "/placeholder-book.png"
                                                }

                                                alt={
                                                    ebook.title ||
                                                    "ebook cover"
                                                }

                                                fill

                                                className="object-cover"

                                            />


                                        </div>





                                        <div className="space-y-4 p-5">


                                            <div>

                                                <h2 className="line-clamp-1 text-xl font-bold">
                                                    {ebook.title}
                                                </h2>


                                                <p className="mt-1 text-sm text-slate-500">

                                                    {
                                                        ebook.writer?.name ||
                                                        "Unknown Writer"
                                                    }

                                                </p>


                                            </div>





                                            <div className="flex items-center justify-between">


                                                <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">

                                                    {ebook.genre}

                                                </span>



                                                <span className="font-bold text-violet-600">

                                                    ${ebook.price}

                                                </span>


                                            </div>





                                            <div className="flex items-center justify-between text-sm text-slate-500">


                                                <span>
                                                    {ebook.pages || 0} Pages
                                                </span>



                                                <span className="flex items-center gap-1">

                                                    <HiOutlineStar className="text-yellow-500" />

                                                    {
                                                        ebook.rating || 0
                                                    }

                                                </span>


                                            </div>





                                            <div className="flex gap-3">


                                                <Link
                                                    href={`/ebooks/${ebook._id}`}
                                                    className="flex-1 rounded-xl bg-violet-600 py-3 text-center font-medium text-white transition hover:bg-violet-700"
                                                >
                                                    View Details
                                                </Link>



                                                <button
                                                    onClick={() =>
                                                        handleRemoveBookmark(
                                                            ebook._id
                                                        )
                                                    }
                                                    className="rounded-xl border border-red-200 p-3 text-red-600 transition hover:bg-red-50 dark:border-red-700 dark:hover:bg-red-900/20"
                                                    title="Remove Bookmark"
                                                >

                                                    <HiOutlineTrash className="text-xl" />

                                                </button>
                                            </div>

                                        </div>
                                    </article>

                                );
                            })
                        }
                    </div>
                )
            }

        </section>

    );

}