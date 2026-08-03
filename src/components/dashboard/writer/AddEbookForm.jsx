"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import ImageUploader from "@/components/shared/ImageUploader";
import { GENRES } from "@/constants/genres";



const languages = [
    "English",
    "Bangla",
    "Spanish",
    "French",
    "German",
    "Arabic",
];

export default function AddEbookForm({
    mode = "add",
    ebook = null,
}) {
    const [loading, setLoading] = useState(false);
    const { data: session } = authClient.useSession();
    const [coverImage, setCoverImage] = useState(
        ebook?.coverImage || ""
    );
    const [formData, setFormData] = useState({
        title: ebook?.title || "",
        slug: ebook?.slug || "",
        coverImage: ebook?.coverImage || "",
        description: ebook?.description || "",
        price: ebook?.price || "",
        genre: ebook?.genre || "",
        language: ebook?.language || "English",
        pages: ebook?.pages || "",
        fileUrl: ebook?.fileUrl || "",
    });

    const createSlug = (value) => {
        return value
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "title") {
            setFormData((prev) => ({
                ...prev,
                title: value,
                slug: createSlug(value),
            }));

            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!session?.user) {
            toast.error("Please login first.");
            return;
        }

        setLoading(true);

        const ebookData = {
            ...formData,
            coverImage,
            price: Number(formData.price),
            pages: Number(formData.pages),

            writer: {
                id: session.user.id,
                name: session.user.name,
                email: session.user.email,
                photo: session.user.image,
            },
        };

        try {

            const { data: tokenData } = await authClient.token();
            const endpoint =
                mode === "edit"
                    ? `http://localhost:5000/ebooks/${ebook._id}`
                    : "http://localhost:5000/ebooks";

            const method =
                mode === "edit"
                    ? "PATCH"
                    : "POST";


            const res = await fetch(endpoint, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokenData.token}`
                },
                body: JSON.stringify(ebookData),
            });

            if (!coverImage) {
                toast.error("Please upload a cover image.");
                return;
            }

            if (!formData.fileUrl) {
                toast.error("Please provide your ebook PDF.");
                return;
            }

            const data = await res.json();
            if (!coverImage) {
                toast.error("Please upload a cover image.");
                return;
            }

            if (!formData.fileUrl) {
                toast.error("Please provide your ebook PDF.");
                return;
            }

            if (!res.ok) {
                throw new Error(data.message);
            }

            toast.success(
                mode === "edit"
                    ? "Ebook updated successfully!"
                    : "Ebook published successfully!"

            );
            setTimeout(() => {
                router.push("/dashboard/writer/manage-ebooks");
            }, 1000);



            setFormData({
                title: "",
                slug: "",
                coverImage: "",
                description: "",
                price: "",
                genre: "",
                language: "English",
                pages: "",
                fileUrl: "",
            });
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Failed to upload ebook.");
        } finally {
            setLoading(false);
        }
    };

    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-8"
        >

            <div>

                <h2 className="mb-5 text-xl font-bold">
                    Basic Information
                </h2>

                <div className="grid gap-6 md:grid-cols-2">

                    <div>
                        <label className="mb-2 block text-sm font-semibold">
                            Ebook Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            required
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Mastering React"
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-violet-600"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold">
                            Slug
                        </label>

                        <input
                            type="text"
                            name="slug"
                            required
                            value={formData.slug}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-slate-300 bg-slate-200 px-4 py-3 outline-none dark:bg-slate-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold">
                            Genre
                        </label>

                        <select
                            name="genre"
                            required
                            value={formData.genre}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-violet-600 dark:text-slate-100 dark:bg-slate-500"
                        >
                            <option value="">All Genres</option>

                            {GENRES.map((genre) => (
                                <option key={genre} value={genre}>
                                    {genre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold">
                            Language
                        </label>

                        <select
                            name="language"
                            value={formData.language}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-violet-600 dark:text-slate-100 dark:bg-slate-500"
                        >
                            {languages.map((language) => (
                                <option
                                    key={language}
                                    value={language}
                                >
                                    {language}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold">
                            Price ($)
                        </label>

                        <input
                            type="number"
                            step="0.01"
                            name="price"
                            min="1"
                            required
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="19.99"
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-violet-600"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold">
                            Total Pages
                        </label>

                        <input
                            type="number"
                            name="pages"
                            min="1"
                            required
                            value={formData.pages}
                            onChange={handleChange}
                            placeholder="250"
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-violet-600"
                        />
                    </div>

                </div>

            </div>


            <div>

                <h2 className="mb-5 text-xl font-bold">
                    Media
                </h2>

                <div className="grid gap-6 lg:grid-cols-3">

                    <div className="space-y-6 lg:col-span-2">

                        <div className="rounded-2xl border border-violet-200 bg-linear-to-br from-violet-50 to-white p-1 shadow-sm dark:border-violet-500/30 dark:from-slate-900 dark:to-slate-950">

                            <ImageUploader
                                label="Ebook Cover"
                                value={coverImage}
                                onUpload={setCoverImage}
                            />

                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold">
                                Ebook PDF URL
                            </label>

                            <input
                                type="url"
                                name="fileUrl"
                                required
                                value={formData.fileUrl}
                                onChange={handleChange}
                                placeholder="https://..."
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-violet-600"
                            />
                        </div>

                    </div>

                </div>

            </div>


            <div>

                <label className="mb-2 block text-sm font-semibold">
                    Description
                </label>

                <textarea
                    name="description"
                    required
                    rows={8}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Write a short description about your ebook..."
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-violet-600"
                />

            </div>


            <div className="flex flex-col justify-end gap-4 border-t border-slate-200 pt-6 sm:flex-row">

                <Button
                    type="button"
                    variant="secondary"
                    size="lg"
                    onPress={() => router.back()}
                >
                    Cancel
                </Button>

                <Button type="submit"
                >
                    {loading
                        ? mode === "edit"
                            ? "Updating..."
                            : "Publishing..."
                        : mode === "edit"
                            ? "Update Ebook"
                            : "Publish Ebook"}
                </Button>

            </div>

        </form>
    );
}

