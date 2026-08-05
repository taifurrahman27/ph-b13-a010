import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import { HiArrowRight, HiCheckCircle, HiEnvelope } from "react-icons/hi2";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { sendEmail } from "@/lib/sendEmail";

export const metadata = {
    title: "Payment Successful",
};

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


        try {
            await sendEmail({
                to: customerEmail,
                subject: "📚 Your Fable Purchase is Confirmed",
                html:
                    `
            <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
</head>
<body style="margin:0;padding:0;background:#f5f3ff;font-family:Arial,Helvetica,sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center" style="padding:40px 20px;">

                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.08);">

                    <tr>
                        <td align="center" style="background:#6d28d9;padding:30px;">
                            <h1 style="margin:0;color:#fff;font-size:34px;">
                                📚 Fable
                            </h1>

                            <p style="margin:8px 0 0;color:#ede9fe;">
                                Your reading journey begins here
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:40px;">

                            <h2 style="margin-top:0;color:#111827;">
                                🎉 Purchase Successful
                            </h2>

                            <p style="font-size:16px;color:#374151;">
                              Hi <strong>${customer_details?.name || "Reader"}</strong>
                            </p>

                            <p style="font-size:16px;color:#374151;line-height:1.8;">
                                Thank you for purchasing
                                <strong>${ebook.title}</strong>.
                                Your payment has been received successfully.
                            </p>

                            <table width="100%" cellpadding="12" cellspacing="0" style="margin:30px 0;background:#faf5ff;border:1px solid #ddd6fe;border-radius:12px;">
                                <tr>
                                    <td><strong>Ebook</strong></td>
                                    <td align="right">${ebook.title}</td>
                                </tr>

                                <tr>
                                    <td><strong>Amount Paid</strong></td>
                                    <td align="right">$${purchaseData.amount.toFixed(2)}</td>
                                </tr>

                                <tr>
                                    <td><strong>Status</strong></td>
                                    <td align="right" style="color:#16a34a;font-weight:bold;">
                                        Paid ✔
                                    </td>
                                </tr>
                            </table>

                            <div style="text-align:center;margin:35px 0;">
                                <a
                                    href="${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/dashboard/reader/library"
                                    style="
                                        background:#6d28d9;
                                        color:#fff;
                                        text-decoration:none;
                                        padding:14px 30px;
                                        border-radius:10px;
                                        display:inline-block;
                                        font-weight:bold;
                                    "
                                >
                                    Start Reading →
                                </a>
                            </div>

                            <p style="font-size:15px;color:#6b7280;line-height:1.7;">
                                Your ebook is now available in your
                                <strong>Library</strong>.
                                We hope you enjoy reading on <strong>Fable</strong>.
                            </p>

                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="background:#f8fafc;padding:24px;color:#6b7280;font-size:14px;">
                            © 2026 <strong>Fable</strong><br>
                            Happy Reading 📖
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>
</html>
`
                ,
            });
        } catch (error) {
            console.error("Email failed:", error);
        }


        console.log(`Confirmation email is prepared for ${customerEmail}.`);
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

