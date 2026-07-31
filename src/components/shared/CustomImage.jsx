"use client";

import Image from "next/image";

export default function CustomImage({
    src,
    alt,
    width = 100,
    height = 100,
    className = "",
}) {
    return (
        <Image
            src={src || "/placeholder.png"}
            alt={alt}
            width={width}
            height={height}
            className={className}
        />
    );
}
