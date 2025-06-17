// components/Audience/AudienceConcentration.tsx
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import Card from "../../ui/Card";

const concentrationData = [
  { name: "Urban", value: 75 },
  { name: "Rural", value: 25 },
];

const COLORS = ["#6D6DFA", "#E5E7EB"]; // Dashboard-style palette

export default function AudienceConcentration() {
  return (
    <Card classNames="p-4" style={{ backgroundColor: "#ffffff" }}>
      <h3 className="text-gray-900 text-sm font-medium mb-2">Audience Concentration</h3>
      <div className="h-48">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={concentrationData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={60}
              paddingAngle={5}
              dataKey="value"
            >
              {concentrationData.map((entry, index) => (
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
