import React, { useEffect, useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import Card from "../../ui/Card";
import audienceService from "../../services/AudienceService";

export default function IncomeDistribution({ uploadId }: { uploadId: number }) {
  const [incomeData, setIncomeData] = useState<{ incomeRange: string; count: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!uploadId) return;
      try {
        const data = await audienceService.getIncomeDistribution(uploadId);
        setIncomeData(data);
      } catch (err) {
        console.error("Error fetching income distribution", err);
        setIncomeData([]);
      }
    };

    fetchData();
  }, [uploadId]);

  return (
    <Card classNames="p-4" style={{ backgroundColor: "#ffffff" }}>
      <h3 className="text-gray-900 text-sm font-medium mb-2">Income Distribution</h3>
      <div className="h-48">
        {incomeData.length > 0 ? (
          <ResponsiveContainer>
            <AreaChart data={incomeData}>
              <XAxis dataKey="incomeRange" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#6D6DFA"
                fill="#A78BFA"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-sm text-gray-400">
            No income data available
          </div>
        )}
      </div>
    </Card>
  );
}
