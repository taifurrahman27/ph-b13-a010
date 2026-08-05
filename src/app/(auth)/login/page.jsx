import LoginForm from "@/components/forms/LoginForm";

export const metadata = {
    title: "Login",
};

const LoginPage = () => {
    return (
        <section className="min-h-screen bg-slate-50 py-16 transition-colors dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-lg">
                    <LoginForm />
                </div>
            </div>
        </section>
    );
};

export default LoginPage;