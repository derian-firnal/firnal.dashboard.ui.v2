// components/Audience/IncomeDistribution.tsx
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import Card from "../../ui/Card";

const incomeData = [
  { range: "<50K", value: 20 },
  { range: "50-100K", value: 45 },
  { range: "100-150K", value: 65 },
  { range: "150K+", value: 35 },
];

export default function IncomeDistribution() {
  return (
    <Card classNames="p-4" style={{ backgroundColor: "#ffffff" }}>
      <h3 className="text-gray-900 text-sm font-medium mb-2">Income Distribution</h3>
      <div className="h-48">
        <ResponsiveContainer>
          <AreaChart data={incomeData}>
            <defs>
              <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6D6DFA" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="range" stroke="#CBD5E1" />
            <YAxis stroke="#CBD5E1" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#6D6DFA"
              fill="url(#incomeFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
