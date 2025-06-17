// components/Audience/GenderVariance.tsx
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import Card from "../../ui/Card";

const genderData = [
  { name: "Male", value: 60 },
  { name: "Female", value: 85 },
];

const COLORS = ["#6D6DFA", "#E5E7EB"]; // Dashboard-friendly colors

export default function GenderVariance() {
  return (
    <Card classNames="p-4" style={{ backgroundColor: "#ffffff" }}>
      <h3 className="text-gray-900 text-sm font-medium mb-2">Gender Variance</h3>
      <div className="h-48">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={genderData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={60}
              paddingAngle={5}
              dataKey="value"
            >
              {genderData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
