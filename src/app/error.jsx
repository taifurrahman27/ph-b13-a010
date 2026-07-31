"use client";

import { useEffect } from "react";
import {
    HiOutlineExclamationTriangle,
    HiOutlineArrowPath,
} from "react-icons/hi2";

export default function Error({
    error,
    reset,
}) {

    useEffect(() => {
        console.error(error);
    }, [error]);


    return (
        <section className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">

            <div className="max-w-lg rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-xl dark:border-slate-800 dark:bg-slate-900">

                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">

                    <HiOutlineExclamationTriangle
                        className="text-5xl text-red-600 dark:text-red-400"
                    />

                </div>

                <h1 className="mt-8 text-3xl font-black text-slate-900 dark:text-white">
                    Something went wrong.
                </h1>

                <p className="mt-4 text-slate-500 dark:text-slate-400">
                    We could not complete your request.
                    Please try again.
                </p>

                <button
                    onClick={() => reset()}
                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-7 py-3 font-semibold text-white transition hover:bg-violet-700"
                >

                    <HiOutlineArrowPath className="text-xl" />

                    Reload

                </button>

            </div>

        </section>
    );
}
