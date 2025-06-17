// components/Audience/AgeDistribution.tsx
import React from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import Card from "../../ui/Card";

const ageData = [
  { age: "0-30", value: 30 },
  { age: "30-40", value: 65 },
  { age: "40-50", value: 85 },
  { age: "50-60", value: 90 },
  { age: "60+", value: 70 },
];

export default function AgeDistribution() {
  return (
    <Card classNames="p-4" style={{ backgroundColor: "#ffffff" }}>
      <h3 className="text-gray-900 text-sm font-medium mb-2">Age Distribution</h3>
      <div className="h-48">
        <ResponsiveContainer>
          <AreaChart data={ageData}>
            <defs>
              <linearGradient id="ageFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6D6DFA" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="age" stroke="#CBD5E1" />
            <YAxis stroke="#CBD5E1" />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#6D6DFA" fill="url(#ageFill)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
