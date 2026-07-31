export default function SiteSettingPage() {
    return (
        <section className="space-y-8">

            <div>
                <h1 className="text-4xl font-black">
                    Site Settings
                </h1>

                <p className="mt-2 text-slate-500">
                    General information about the Fable platform.
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">

                {/* Platform */}

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

                    <h2 className="text-xl font-bold">
                        Platform
                    </h2>

                    <div className="mt-5 space-y-4">

                        <SettingItem
                            label="Application"
                            value="Fable"
                        />

                        <SettingItem
                            label="Version"
                            value="1.0.0"
                        />

                        <SettingItem
                            label="Environment"
                            value="Production"
                        />

                    </div>

                </div>

                {/* Features */}

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

                    <h2 className="text-xl font-bold">
                        Enabled Features
                    </h2>

                    <div className="mt-5 space-y-4">

                        <FeatureItem
                            title="Authentication"
                        />

                        <FeatureItem
                            title="Google Login"
                        />

                        <FeatureItem
                            title="Stripe Payments"
                        />

                        <FeatureItem
                            title="Role Management"
                        />

                        <FeatureItem
                            title="Ebook Management"
                        />

                    </div>

                </div>

            </div>

            {/* Admin Information */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

                <h2 className="text-xl font-bold">
                    Administrator Notes
                </h2>

                <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
                    This dashboard allows administrators to manage users,
                    ebooks, publishing requests, purchases and transactions.
                    Configuration values are intentionally read-only because
                    they are managed through environment variables and the
                    application configuration.
                </p>

            </div>

        </section>
    );
}

function SettingItem({ label, value }) {
    return (
        <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4 dark:border-slate-700">

            <span className="text-slate-500">
                {label}
            </span>

            <span className="font-semibold">
                {value}
            </span>

        </div>
    );
}

function FeatureItem({ title }) {
    return (
        <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4 dark:border-slate-700">

            <span>{title}</span>

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-500/20 dark:text-green-300">
                Enabled
            </span>

        </div>
    );
}