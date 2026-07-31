"use client";

import Image from "next/image";
import {
    User,
    Mail,
    Shield,
    Calendar,
    BadgeCheck,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

const ProfilePage = () => {

    const router = useRouter();
    const { data, isPending } = authClient.useSession();

    const handleLogout = async () => {
        try {
            await authClient.signOut();

            toast.success("Logged out successfully");

            router.push("/");
            router.refresh();
        } catch (error) {
            toast.error("Logout failed");
        }
    };

    if (isPending) {
        return (
            <section className="min-h-screen bg-slate-50 py-16 dark:bg-slate-950">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-10 shadow-xl dark:border-slate-800 dark:bg-slate-900">
                        <p className="text-center text-lg">
                            Loading profile...
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    const user = data?.user;

    if (!user) {
        return (
            <section className="min-h-screen bg-slate-50 py-16 dark:bg-slate-950">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-xl dark:border-slate-800 dark:bg-slate-900">
                        <h2 className="mb-3 text-3xl font-bold">
                            Not Logged In
                        </h2>

                        <p className="text-slate-500 dark:text-slate-400">
                            Please login to view your profile.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-slate-50 py-16 dark:bg-slate-950">
            <div className="container mx-auto px-4">

                <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">

                    <div className="bg-violet-600 px-10 py-12 text-center text-white">

                        <div className="relative h-80">
                            <Image
                                src={user.image || "/user.jpg"}
                                alt={user.name}
                                fill
                                className="mx-auto rounded-2xl border-2 border-gray-200 object-cover"
                                unoptimized
                            />

                        </div>


                        <h1 className="mt-5 text-4xl font-bold">
                            {user.name}
                        </h1>

                        <p className="mt-2 text-violet-100">
                            {user.email}
                        </p>

                    </div>

                    <div className="grid gap-6 p-8 text-center md:grid-cols-2">

                        <div className="rounded-2xl border border-slate-200 p-5 dark:border-slate-700">
                            <div className="mb-2 flex items-center gap-3 justify-center">
                                <User className="text-violet-600" />
                                <h3 className="font-semibold">
                                    Full Name
                                </h3>
                            </div>

                            <p className="text-slate-600 dark:text-slate-300">
                                {user.name}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 p-5 dark:border-slate-700">
                            <div className="mb-2 flex items-center gap-3 justify-center">
                                <Mail className="text-violet-600" />
                                <h3 className="font-semibold">
                                    Email
                                </h3>
                            </div>

                            <p className="text-slate-600 dark:text-slate-300">
                                {user.email}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 p-5 dark:border-slate-700">
                            <div className="mb-2 flex justify-center items-center gap-3">
                                <Calendar className="text-violet-600" />
                                <h3 className="font-semibold">
                                    Joined
                                </h3>
                            </div>

                            <p className="text-slate-600 dark:text-slate-300">
                                {new Date(user.createdAt).toLocaleDateString(
                                    "en-US",
                                    {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    }
                                )}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 p-5 dark:border-slate-700">
                            <div className="mb-2 flex justify-center items-center gap-3">
                                <BadgeCheck className="text-violet-600" />
                                <h3 className="font-semibold">
                                    Email Verified
                                </h3>
                            </div>

                            <p
                                className={
                                    user.emailVerified
                                        ? "font-medium text-green-600"
                                        : "font-medium text-red-500"
                                }
                            >
                                {user.emailVerified
                                    ? "Verified"
                                    : "Not Verified"}
                            </p>
                        </div>



                        <div className="rounded-2xl border border-slate-200 p-5 dark:border-slate-700 md:col-span-2 md:text-center">
                            <div className="mb-2 flex justify-center items-center gap-3">
                                <Shield className="text-violet-600" />
                                <h3 className="font-semibold">
                                    Role
                                </h3>
                            </div>

                            <span className="rounded-full bg-violet-100 px-4 py-1 font-semibold capitalize text-violet-700 dark:bg-violet-900/40 dark:text-violet-300 text-center">
                                {user.role}
                            </span>
                        </div>


                    </div>
                    <div className="my-8 flex justify-center">
                        <Button
                            variant="danger"
                            className="rounded-xl px-8"
                            onPress={handleLogout}
                        >
                            Logout
                        </Button>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default ProfilePage;
