import Image from "next/image";
import Link from "next/link";

const WriterCard = ({ writer }) => {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">

            <div className="flex flex-col items-center p-6">

                <Image
                    src={writer.photo || "/placeholder.png"}
                    alt={writer.name}
                    height={300}
                    width={400}
                    unoptimized
                />
                <h2 className="mt-5 text-xl font-bold">
                    {writer.name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    {writer.email}
                </p>

                <div className="mt-4 flex gap-6 text-center">

                    <div>
                        <p className="text-2xl font-black text-violet-600">
                            {writer.totalBooks}
                        </p>

                        <p className="text-xs text-slate-500">
                            Ebooks
                        </p>
                    </div>

                    <div>
                        <p className="text-2xl font-black text-violet-600">
                            {writer.totalSales}
                        </p>

                        <p className="text-xs text-slate-500">
                            Sales
                        </p>
                    </div>

                </div>

                <Link
                    href={`/writers/${writer.id}`}
                    className="mt-6 rounded-xl bg-violet-600 px-5 py-2 font-semibold text-white transition hover:bg-violet-700"
                >
                    View Profile
                </Link>

            </div>

        </div>
    );
};

export default WriterCard;