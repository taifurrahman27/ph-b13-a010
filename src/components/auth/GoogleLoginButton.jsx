"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiLoader } from "react-icons/fi";

export default function GoogleLoginButton() {

    const [googleLoading, setGoogleLoading] = useState(false);

    const handleGoogleLogin = async () => {
        setGoogleLoading(true);

        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (error) {
            console.error(error);
            toast.error("Google login failed");
            setGoogleLoading(false);
        }
    };

    return (
        <button
            onClick={handleGoogleLogin}
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
    );
}

