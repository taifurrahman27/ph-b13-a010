import Link from "next/link";
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaXTwitter,
} from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { HiBookOpen } from "react-icons/hi2";
import { Button, Input } from "@heroui/react";

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-slate-950">
            <div className="container mx-auto px-4 py-10">

                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

                    <div>

                        <div className="flex items-center gap-3 mb-4">

                            <div className="flex h-14 w-14 items-center justify-center rounded-none bg-violet-100 dark:bg-violet-900">

                                <HiBookOpen className="text-4xl text-violet-500" />

                            </div>

                            <div>

                                <h2 className="text-4xl font-extrabold">

                                    <span className="text-violet-500">
                                        Fable
                                    </span>

                                </h2>

                                <p className="text-xs bg-white dark:bg-slate-950">
                                    Discover • Read • Share
                                </p>

                            </div>

                        </div>

                        <p className="text-sm leading-7 bg-white dark:bg-slate-950">
                            Fable is a modern ebook sharing platform where
                            readers discover original ebooks, writers publish
                            their work, and stories connect people around the
                            world.
                        </p>

                    </div>

                    <div>

                        <h3 className="mb-5 text-xl font-semibold ">
                            Quick Links
                        </h3>

                        <ul className="space-y-3">

                            <li>
                                <Link
                                    href="/about"
                                    className="transition hover:text-violet-500"
                                >
                                    About
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/contact"
                                    className="transition hover:text-violet-500"
                                >
                                    Contact
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/privacy-policy"
                                    className="transition hover:text-violet-500"
                                >
                                    Privacy Policy
                                </Link>
                            </li>

                        </ul>

                    </div>

                    <div>

                        <h3 className="mb-5 text-xl font-semibold ">
                            Contact
                        </h3>

                        <div className="space-y-4">

                            <div className="flex items-center gap-3">

                                <MdEmail className="text-xl text-violet-500" />

                                <span>support@fable.com</span>

                            </div>

                            <p className="text-sm leading-6 bg-white dark:bg-slate-950">
                                Have questions or feedback?
                                <br />
                                We&apos;d love to hear from you.
                            </p>

                        </div>

                    </div>

                    <div>

                        <h3 className="mb-5 text-xl font-semibold ">
                            Stay Updated
                        </h3>

                        <p className="mb-4 text-sm bg-white dark:bg-slate-950">
                            Subscribe to receive new ebook releases, featured
                            writers, and platform updates.
                        </p>

                        <div className="space-y-3">

                            <Input
                                type="email"
                                placeholder="Enter your email"
                            />

                            <Button className="w-full bg-violet-600 text-white hover:bg-violet-700">
                                Subscribe
                            </Button>

                        </div>

                        <div className="mt-6 flex gap-3">

                            <Link
                                href="#"
                                className="rounded-full border-2 p-3 transition hover:bg-blue-600 hover:text-white"
                            >
                                <FaFacebookF />
                            </Link>

                            <Link
                                href="#"
                                className="rounded-full border-2 p-3 transition hover:bg-black hover:text-white"
                            >
                                <FaXTwitter />
                            </Link>

                            <Link
                                href="#"
                                className="rounded-full border-2 p-3 transition hover:bg-blue-700 hover:text-white"
                            >
                                <FaLinkedinIn />
                            </Link>

                            <Link
                                href="#"
                                className="rounded-full border-2 p-3 transition hover:bg-pink-600 hover:text-white"
                            >
                                <FaInstagram />
                            </Link>

                        </div>

                    </div>

                </div>


                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800 pt-6 md:flex-row">

                    <p className="text-center text-sm bg-white dark:bg-slate-950 md:text-left">
                        © {new Date().getFullYear()} Fable. All rights reserved.
                    </p>

                    <div className="flex gap-6 text-sm bg-white dark:bg-slate-950">

                        <Link
                            href="/about"
                            className="transition hover:text-violet-500"
                        >
                            About
                        </Link>

                        <Link
                            href="/contact"
                            className="transition hover:text-violet-500"
                        >
                            Contact
                        </Link>

                        <Link
                            href="/privacy-policy"
                            className="transition hover:text-violet-500"
                        >
                            Privacy Policy
                        </Link>

                    </div>

                </div>

            </div>
        </footer>
    );
};

export default Footer;
