import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import { HiArrowRight, HiCheckCircle, HiEnvelope } from "react-icons/hi2";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function Success({ searchParams }) {

    const { session_id } = await searchParams;

    if (!session_id) {
        throw new Error(
            "Please provide a valid session_id (`cs_test_...`)"
        );
    }

    const session = await stripe.checkout.sessions.retrieve(
        session_id
    );

    const client = await clientPromise;

    const db = client.db("fable");


    const {
        status,
        customer_details,
        metadata = {},
    } = session;

    const {
        userId,
        ebookId,
    } = metadata;

    if (status !== "complete") {
        return redirect("/");
    }

    const user = await db.collection("user").findOne({
        _id: new ObjectId(userId),
    });

    const role = user?.role || "reader";

    const dashboardLink = {
        reader: "/dashboard/reader/library",
        writer: "/dashboard/writer/library",
        admin: "/dashboard/admin/library",
    }[role];


    const customerEmail =
        customer_details?.email || "your email";


    const ebook = await db.collection("ebooks").findOne({
        _id: new ObjectId(ebookId),
    });

    if (!ebook) {
        throw new Error("Ebook not found.");
    }

    const purchaseCollection =
        db.collection("purchases");

    const purchaseData = {
        sessionId: session_id,
        paymentIntentId: session.payment_intent,
        type: "purchase",
        paymentStatus:
            session.payment_status === "paid"
                ? "Paid"
                : session.payment_status,
        amount: Number(session.amount_total / 100),
        currency: (session.currency || "usd").toUpperCase(),
        customerName:
            customer_details?.name || "",
        customerEmail,
        userId,
        ebookId,
        ebookTitle: ebook.title,
        ebookSlug: ebook.slug,
        ebookCover: ebook.coverImage,
        writerId: ebook.writer.id,
        writerName: ebook.writer.name,
        writerEmail: ebook.writer.email,
        writerPhoto: ebook.writer.photo,
        createdAt: new Date(session.created * 1000),
    };


    const result = await purchaseCollection.updateOne(
        {
            sessionId: session_id,
        },
        {
            $setOnInsert: purchaseData,
        },
        {
            upsert: true,
        }
    );

    if (result.upsertedCount > 0) {
        await db.collection("ebooks").updateOne(
            {
                _id: new ObjectId(ebookId),
            },
            {
                $inc: {
                    totalSales: 1,
                    totalRevenue: purchaseData.amount,
                },
            }
        );
    }

    console.log("Purchase saved successfully");

    if (result.upsertedCount > 0) {
        await db.collection("ebooks").updateOne(
            {
                _id: new ObjectId(ebookId),
            },
            {
                $inc: {
                    totalSales: 1,
                },
            }
        );
    };




    return (

        <main
            className="
            min-h-screen 
            flex 
            items-center 
            justify-center 
            bg-linear-to-br 
            from-[#120024] 
            via-[#2b0a4d] 
            to-[#4c1d95]
            px-5
            "
        >

            <section className="relative max-w-xl w-full">


                <div
                    className="
                    absolute 
                    inset-0 
                    bg-purple-500/20 
                    blur-3xl 
                    rounded-full
                    "
                />

                <div
                    className="
                    relative
                    bg-white/10
                    backdrop-blur-xl
                    border
                    border-white/20
                    rounded-3xl
                    shadow-2xl
                    p-8
                    md:p-12
                    text-center
                    text-white
                    "
                >


                    <div className="flex justify-center mb-6">

                        <div
                            className="
                            bg-green-500/20
                            p-5
                            rounded-full
                            "
                        >

                            <HiCheckCircle
                                className="
                                text-green-400
                                text-7xl
                                "
                            />
                        </div>
                    </div>

                    <h1
                        className="
                        text-4xl
                        md:text-5xl
                        font-black
                        mb-4
                        "
                    >
                        Payment Successful 🎉
                    </h1>

                    <p
                        className="
                        text-white/70
                        text-lg
                        leading-relaxed
                        "
                    >
                        Thank you for purchasing{" "}
                        <span
                            className="
                            font-bold
                            text-purple-300
                            "
                        >
                            {ebook.title}
                        </span>

                        {" "}from{" "}

                        <span
                            className="
                            font-bold
                            text-purple-300
                            "
                        >
                            Fable
                        </span>

                        .

                    </p>


                    <div
                        className="
                        mt-8
                        bg-white/10
                        border
                        border-white/10
                        rounded-2xl
                        p-5
                        flex
                        items-center
                        gap-4
                        text-left
                        "
                    >

                        <div
                            className="
                            bg-purple-600/30
                            p-3
                            rounded-xl
                            "
                        >

                            <HiEnvelope
                                className="
                                text-2xl
                                text-purple-200
                                "
                            />

                        </div>

                        <div>

                            <p
                                className="
                                text-sm
                                text-white/70
                                "
                            >
                                Confirmation email sent to
                            </p>

                            <p
                                className="
                                font-semibold
                                break-all
                                "
                            >
                                {customerEmail}
                            </p>
                        </div>

                    </div>



                    <Link
                        href={dashboardLink}
                        className="
                        mt-8
                        inline-flex
                        items-center
                        gap-2
                        bg-white
                        text-purple-700
                        font-bold
                        px-7
                        py-3
                        rounded-full
                        hover:bg-purple-100
                        transition-all
                        duration-300
                        shadow-lg
                        "

                    >

                        Continue Reading
                        <HiArrowRight />
                    </Link>




                    <p
                        className="
                        mt-6
                        text-sm
                        text-white/50
                        "
                    >

                        Need help? Contact{" "}

                        <a
                            href="mailto:orders@example.com"
                            className="
                            text-purple-300
                            hover:underline
                            "
                        >
                            orders@example.com
                        </a>
                    </p>
                </div>
            </section>
        </main>
    );
}

