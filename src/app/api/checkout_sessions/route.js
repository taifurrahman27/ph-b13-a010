import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { ObjectId } from "mongodb";

import clientPromise from "@/lib/mongodb";
import { stripe } from "@/lib/stripe";

export async function POST(request) {
    try {
        const { ebookId, userId } = await request.json();

        if (!ebookId || !userId) {
            return NextResponse.json(
                {
                    message: "ebookId and userId are required.",
                },
                {
                    status: 400,
                }
            );
        }

        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);

        const ebook = await db.collection("ebooks").findOne({
            _id: new ObjectId(ebookId),
        });

        if (!ebook) {
            return NextResponse.json(
                {
                    message: "Ebook not found.",
                },
                {
                    status: 404,
                }
            );
        }

        if (!ebook.price || ebook.price <= 0) {
            return NextResponse.json(
                {
                    message: "Invalid ebook price.",
                },
                {
                    status: 400,
                }
            );
        }

        const headersList = await headers();

        const origin =
            headersList.get("origin") ||
            process.env.NEXT_PUBLIC_APP_URL;

        const session = await stripe.checkout.sessions.create({
            mode: "payment",

            payment_method_types: ["card"],

            line_items: [
                {
                    quantity: 1,
                    price_data: {
                        currency: "usd",
                        unit_amount: Math.round(Number(ebook.price) * 100),
                        product_data: {
                            name: ebook.title,
                            description:
                                ebook.shortDescription ||
                                ebook.description ||
                                "",
                            images: ebook.coverImage
                                ? [ebook.coverImage]
                                : [],
                        },
                    },
                },
            ],

            metadata: {
                ebookId,
                userId,
                writerId: ebook.writerId || "",
            },


            success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,

            cancel_url: `${origin}/payment/cancel`,
        });

        return NextResponse.json({
            url: session.url,
        });
    } catch (error) {
        console.error("Stripe Checkout Error:", error);

        return NextResponse.json(
            {
                message: error.message || "Unable to create checkout session.",
            },
            {
                status: 500,
            }
        );
    }
}
