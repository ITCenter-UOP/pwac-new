import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const AttendancePersentage = () => {
    const totalDays = 20;
    const workDays = 10; // fixed value
    const absentDays = totalDays - workDays;
    const percentage = ((workDays / totalDays) * 100).toFixed(1);

    const data = [
        { name: "Present", value: workDays },
        { name: "Absent", value: absentDays },
    ];

    const COLORS = ["#a855f7", "#6b21a8"]; // Purple shades

    return (
        <div className="">
            <div className="bg-gradient-to-br from-purple-700 via-purple-900 to-indigo-900 text-white rounded-2xl shadow-2xl px-8 py-4 w-full max-w-md">
                {/* Title */}
                <h1 className="text-3xl font-bold text-center mb-6">
                    Attendance Percentage
                </h1>

                {/* Stats */}
                <div className="text-center mb-6">
                    <p className="text-lg font-semibold">Total Days: {totalDays}</p>
                    <p className="text-lg font-semibold">Work Days: {workDays}</p>
                    <p className="text-2xl font-bold mt-2">{percentage}% Present</p>
                </div>

                {/* Pie Chart */}
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                innerRadius={60}
                                dataKey="value"
                                label={({ percent }) =>
                                    `${(percent * 100).toFixed(0)}%`
                                }
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                        stroke="#1e1b4b"
                                        strokeWidth={2}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#1e1b4b",
                                    borderRadius: "12px",
                                    border: "1px solid #9333ea",
                                    color: "#fff",
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AttendancePersentage;
