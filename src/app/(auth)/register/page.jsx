import RegisterForm from "@/components/forms/RegisterForm";

export const metadata = {
    title: "Register",
};

export default function RegisterPage() {
    return (
        <section className="container mx-auto px-4 py-16">
            <div className="mx-auto max-w-lg text-center">

                <RegisterForm />
            </div>
        </section>
    );
}
