// components/audience/StatCard.tsx
import React from "react";

interface StatCardProps {
  title: string;
  value: string | number | React.ReactNode;
  highlight?: boolean;
}

export default function StatCard({ title, value, highlight = false }: StatCardProps) {
  return (
    <div
      className={`rounded-2xl shadow-md bg-white text-gray-900 p-4 ${
        highlight ? "border-2 border-[#6D6DFA]" : "border border-gray-200"
      }`}
    >
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );
}
