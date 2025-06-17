// components/tables/SampleDataTable.tsx
import React from "react";

const sampleData = [
  { id: 1, name: "John Doe", age: 32, gender: "Male", income: "$90K" },
  { id: 2, name: "Jane Smith", age: 45, gender: "Female", income: "$120K" },
  { id: 3, name: "Mike Chen", age: 28, gender: "Male", income: "$60K" },
];

export default function SampleDataTable() {
  return (
    <div className="rounded-xl overflow-hidden bg-white text-gray-900 shadow-md">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-left text-xs uppercase text-gray-500">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Age</th>
            <th className="px-4 py-3">Gender</th>
            <th className="px-4 py-3">Income</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sampleData.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50 transition">
              <td className="px-4 py-3">{row.name}</td>
              <td className="px-4 py-3">{row.age}</td>
              <td className="px-4 py-3">{row.gender}</td>
              <td className="px-4 py-3">{row.income}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
