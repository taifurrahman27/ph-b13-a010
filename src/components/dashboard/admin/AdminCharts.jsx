"use client";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    PieChart,
    Pie,
    Tooltip,
    Cell,
    CartesianGrid,
    XAxis,
    YAxis,
    Legend,
} from "recharts";

const COLORS = [
    "#8b5cf6",
    "#3b82f6",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#06b6d4",
    "#ec4899",
];

export default function AdminCharts({
    salesData,
    genreData,
}) {
    return (
        <div className="grid gap-6 xl:grid-cols-2">


            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">

                <div className="mb-6">
                    <h2 className="text-2xl font-black">
                        Monthly Sales
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Revenue generated each month
                    </p>
                </div>

                <div className="h-80">

                    <ResponsiveContainer width="100%" height="100%">

                        <LineChart data={salesData}>

                            <CartesianGrid
                                strokeDasharray="4 4"
                                strokeOpacity={0.3}
                            />

                            <XAxis dataKey="month" />

                            <YAxis />

                            <Tooltip />

                            <Legend />

                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#8b5cf6"
                                strokeWidth={4}
                                dot={{
                                    r: 5,
                                    fill: "#8b5cf6",
                                }}
                                activeDot={{
                                    r: 8,
                                }}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>

            </div>


            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">

                <div className="mb-6">
                    <h2 className="text-2xl font-black">
                        Ebooks by Genre
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Distribution of ebooks by genre
                    </p>
                </div>

                <div className="h-80">

                    <ResponsiveContainer width="100%" height="100%">

                        <PieChart>

                            <Pie
                                data={genreData}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={55}
                                outerRadius={105}
                                paddingAngle={4}
                                label
                            >
                                {genreData.map((entry, index) => (
                                    <Cell
                                        key={entry.name}
                                        fill={
                                            COLORS[
                                            index %
                                            COLORS.length
                                            ]
                                        }
                                    />
                                ))}
                            </Pie>

                            <Tooltip />

                            <Legend />

                        </PieChart>

                    </ResponsiveContainer>

                </div>

            </div>

        </div>
    );
}

