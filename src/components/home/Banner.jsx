"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";

import { Swiper, SwiperSlide } from "swiper/react";
import {
    Pagination,
    Navigation,
    Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
    {
        id: 1,
        image: "/images/fable_banner1.jpg",
        title: "Discover & Read Original Ebooks",
        description:
            "Explore thousands of original ebooks from talented writers around the world. Read anytime, anywhere, on any device.",
        button: "Browse Ebooks",
        link: "/ebooks",
    },
    {
        id: 2,
        image: "/images/fable_banner2.jpg",
        title: "Share Your Stories With The World",
        description:
            "Publish your ebooks, build your audience, and grow your career as a writer through Fable.",
        button: "Become a Writer",
        link: "/register",
    },
    {
        id: 3,
        image: "/images/fable_banner3.jpg",
        title: "One Platform For Every Book Lover",
        description:
            "Discover new genres, bookmark favorites, purchase securely, and enjoy an immersive reading experience.",
        button: "Explore Collection",
        link: "/ebooks",
    },
];

const Banner = () => {
    return (
        <section className="relative">
            <Swiper
                modules={[
                    Navigation,
                    Pagination,
                    Autoplay,
                ]}
                navigation
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: true,
                }}
                loop
                className="h-[85vh]"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative h-[85vh] w-full">

                            <Image
                                src={slide.image}
                                alt={slide.title}
                                fill
                                priority={slide.id === 1}
                                className="object-cover"
                            />

                            <div className="absolute inset-0 bg-black/60" />

                            <div className="absolute inset-0 flex items-center">
                                <div className="container mx-auto px-4">

                                    <div className="max-w-3xl">

                                        <h1 className="mb-6 text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-7xl">
                                            {slide.title}
                                        </h1>

                                        <p className="mb-8 text-lg leading-8 text-slate-200 md:text-xl">
                                            {slide.description}
                                        </p>

                                        <Link href={slide.link}>
                                            <Button
                                                size="lg"
                                                className="rounded-none bg-violet-600 px-8 text-white hover:bg-violet-700"
                                            >
                                                {slide.button}
                                            </Button>
                                        </Link>

                                    </div>

                                </div>
                            </div>

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Banner;
