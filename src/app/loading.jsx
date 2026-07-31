import { HiOutlineBookOpen } from "react-icons/hi2";

export default function Loading() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">

            <div className="flex flex-col items-center">

                <div className="relative flex h-24 w-24 items-center justify-center">

                    <div className="absolute h-24 w-24 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />

                    <div className="rounded-2xl bg-violet-600 p-4 shadow-xl">
                        <HiOutlineBookOpen className="text-4xl text-white" />
                    </div>

                </div>

                <h2 className="mt-8 text-3xl font-black text-slate-900 dark:text-white">
                    Fable
                </h2>

                <div className="mt-8 flex gap-2">
                    <span className="h-3 w-3 animate-bounce rounded-full bg-violet-600"></span>
                    <span
                        className="h-3 w-3 animate-bounce rounded-full bg-violet-600"
                        style={{ animationDelay: "0.15s" }}
                    ></span>
                    <span
                        className="h-3 w-3 animate-bounce rounded-full bg-violet-600"
                        style={{ animationDelay: "0.3s" }}
                    ></span>
                </div>

            </div>

        </div>
    );
}
