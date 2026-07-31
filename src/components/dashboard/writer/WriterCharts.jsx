"use client";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    BarChart,
    Bar,
} from "recharts";

export default function WriterCharts({
    salesData,
    ebookData,
}) {
    return (
        <div className="grid gap-6 xl:grid-cols-2">

            <div className="rounded-2xl border bg-white p-6 dark:bg-slate-900">
                <h2 className="mb-6 text-2xl font-bold">
                    Monthly Revenue
                </h2>

                <div className="h-80">
                    <ResponsiveContainer>
                        <LineChart data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                dataKey="revenue"
                                stroke="#8b5cf6"
                                strokeWidth={3}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="rounded-2xl border bg-white p-6 dark:bg-slate-900">
                <h2 className="mb-6 text-2xl font-bold">
                    Best Selling Ebooks
                </h2>

                <div className="h-80">
                    <ResponsiveContainer>
                        <BarChart data={ebookData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="title" />
                            <YAxis />
                            <Tooltip />
                            <Bar
                                dataKey="sales"
                                fill="#8b5cf6"
                                radius={[8, 8, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
}
