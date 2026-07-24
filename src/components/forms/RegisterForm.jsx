"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FiLoader } from "react-icons/fi";


const RegisterForm = () => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setIsLoading(true);

        try {
            const { data, error } = await supabase.auth.signUp({
                email: formData.get("email"),
                password,
            });

            if (error) {
                toast.error(error.message);
                return;
            }

            const role = formData.get("role");

            console.log({
                user: data?.user,
                role,
            });

            toast.success("Account created successfully!");

            router.push("/");
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        setGoogleLoading(true);

        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (error) {
            toast.error("Google sign up failed");
            setGoogleLoading(false);
        }
    };

    return (
        <div className="w-full border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900">

            <div className="mb-8 text-center">

                <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                    Create Your Account
                </h2>

                <p className="mt-2 text-slate-500 dark:text-slate-400">
                    Join Fable and discover amazing ebooks.
                </p>

            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                <div>
                    <label className="mb-2 block text-sm font-semibold">
                        Full Name
                    </label>

                    <input
                        name="name"
                        type="text"
                        required
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-violet-600 dark:border-slate-700 dark:bg-slate-950"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold">
                        Email Address
                    </label>

                    <input
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-violet-600 dark:border-slate-700 dark:bg-slate-950"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold">
                        Password
                    </label>

                    <input
                        name="password"
                        type="password"
                        required
                        minLength={6}
                        placeholder="••••••••"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-violet-600 dark:border-slate-700 dark:bg-slate-950"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold">
                        Confirm Password
                    </label>

                    <input
                        name="confirmPassword"
                        type="password"
                        required
                        minLength={6}
                        placeholder="••••••••"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-violet-600 dark:border-slate-700 dark:bg-slate-950"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold">
                        Select Your Role
                    </label>

                    <select
                        name="role"
                        defaultValue="user"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-violet-600 dark:border-slate-700 dark:bg-slate-950"
                    >
                        <option value="user">
                            Reader
                        </option>

                        <option value="writer">
                            Writer
                        </option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 px-4 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:opacity-70"
                >
                    {isLoading ? (
                        <>
                            <FiLoader className="animate-spin" />
                            Creating Account...
                        </>
                    ) : (
                        "Create Account"
                    )}
                </button>

            </form>

            <div className="my-6 flex items-center">

                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />

                <span className="px-4 text-sm text-slate-400">
                    OR
                </span>

                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />

            </div>

            <button
                onClick={handleGoogleSignUp}
                disabled={googleLoading}
                className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-300 bg-white px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-70 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-800"
            >
                {googleLoading ? (
                    <>
                        <FiLoader className="animate-spin" />
                        Connecting...
                    </>
                ) : (
                    <>
                        <FcGoogle className="text-2xl" />
                        Continue with Google
                    </>
                )}
            </button>

            <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="font-semibold text-violet-600 hover:underline"
                >
                    Login
                </Link>
            </p>

        </div>
    );
};

export default RegisterForm;
