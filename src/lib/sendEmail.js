import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: process.env.ETHEREAL_USER,
        pass: process.env.ETHEREAL_PASS,
    },
});

export async function sendEmail({
    to,
    subject,
    html,
}) {
    const info = await transporter.sendMail({
        from: '"Fable" <no-reply@fable.com>',
        to,
        subject,
        html,
    });

    console.log(
        "Preview URL:",
        nodemailer.getTestMessageUrl(info)
    );
}
