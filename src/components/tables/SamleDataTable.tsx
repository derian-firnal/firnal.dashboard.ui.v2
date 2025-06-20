import React, { useEffect, useState } from "react";
import audienceService from "../../services/AudienceService";

export default function SampleDataTable({ uploadId }: { uploadId: number }) {
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    const fetchSample = async () => {
      if (!uploadId) return;
      try {
        const data = await audienceService.getSampleData(uploadId);
        setRows(data);
      } catch (err) {
        console.error("Error fetching sample data", err);
        setRows([]);
      }
    };

    fetchSample();
  }, [uploadId]);

  if (rows.length === 0) {
    return <div className="text-gray-400 text-sm mt-4">No sample data available.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left text-gray-800">
        <thead className="bg-gray-100 text-gray-500 text-xs uppercase">
          <tr>
            <th className="px-4 py-2">First Name</th>
            <th className="px-4 py-2">Last Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Gender</th>
            <th className="px-4 py-2">Age Range</th>
            <th className="px-4 py-2">Income Range</th>
            <th className="px-4 py-2">State</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="px-4 py-2">{row.firstName}</td>
              <td className="px-4 py-2">{row.lastName}</td>
              <td className="px-4 py-2">{row.email}</td>
              <td className="px-4 py-2">{row.gender}</td>
              <td className="px-4 py-2">{row.ageRange}</td>
              <td className="px-4 py-2">{row.incomeRange}</td>
              <td className="px-4 py-2">{row.state}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
