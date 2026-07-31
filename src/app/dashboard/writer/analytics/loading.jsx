export default function WriterAnalyticsLoading() {

    return (
        <section className="space-y-8 animate-pulse">
            <div>
                <div className="h-10 w-64 rounded-lg bg-slate-200 dark:bg-slate-800" />

                <div className="mt-3 h-5 w-96 rounded-lg bg-slate-200 dark:bg-slate-800" />
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                {
                    Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="
                                rounded-2xl 
                                border 
                                border-slate-200 
                                bg-white 
                                p-6 
                                shadow-sm
                                dark:border-slate-800
                                dark:bg-slate-900
                            "
                        >
                            <div className="
                                mb-5 
                                h-12 
                                w-12 
                                rounded-xl 
                                bg-slate-200 
                                dark:bg-slate-800
                            " />

                            <div className="
                                h-4 
                                w-28 
                                rounded 
                                bg-slate-200
                                dark:bg-slate-800
                            " />

                            <div className="
                                mt-3 
                                h-10 
                                w-20 
                                rounded-lg 
                                bg-slate-200
                                dark:bg-slate-800
                            " />

                        </div>
                    ))

                }

            </div>

            <div
                className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-6
                    shadow-sm
                    dark:border-slate-800
                    dark:bg-slate-900
                "
            >

                <div className="
                    h-6
                    w-40
                    rounded
                    bg-slate-200
                    dark:bg-slate-800
                " />


                <div className="
                    mt-6
                    h-72
                    w-full
                    rounded-xl
                    bg-slate-200
                    dark:bg-slate-800
                " />

            </div>


        </section>
    );
}
