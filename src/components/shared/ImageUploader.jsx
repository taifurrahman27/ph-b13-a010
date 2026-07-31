"use client";

import { useState } from "react";
import Image from "next/image";
import { uploadImage } from "@/lib/uploadImage";

export default function ImageUploader({
    label = "Upload Image",
    value,
    onUpload,
}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleChange(e) {
        const file = e.target.files?.[0];

        if (!file) return;

        setError("");

        if (!file.type.startsWith("image/")) {
            setError("Please select a valid image.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError("Image size must be less than 5MB.");
            return;
        }

        try {
            setLoading(true);

            const imageUrl = await uploadImage(file);

            onUpload(imageUrl);
        } catch (err) {
            console.error(err);
            setError("Failed to upload image. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                {label}
            </label>

            <input
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="block w-full cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-violet-600 file:px-4 file:py-2 file:font-medium file:text-white hover:file:bg-violet-700 dark:border-slate-700 dark:bg-slate-900"
            />

            {loading && (
                <div className="flex items-center gap-2 text-sm text-violet-600">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-violet-600 border-t-transparent"></div>
                    Uploading image...
                </div>
            )}

            {error && (
                <p className="text-sm font-medium text-red-500">
                    {error}
                </p>
            )}

            {value && (
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
                    <div className="relative aspect-3/4 w-full">
                        <Image
                            src={value}
                            alt="Image Preview"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
