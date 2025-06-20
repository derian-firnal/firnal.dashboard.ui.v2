import React, { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from "recharts";
import Card from "../../ui/Card";
import audienceService from "../../services/AudienceService";

const COLORS = ["#6D6DFA", "#A78BFA", "#C4B5FD", "#EDE9FE", "#DDD6FE", "#CABFFD", "#BDB2FF", "#D8B4FE", "#E9D5FF", "#F3E8FF"];

export default function AudienceConcentration({ uploadId }: { uploadId: number }) {
  const [locationData, setLocationData] = useState<{ location: string; count: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!uploadId) return;
      try {
        const data = await audienceService.getAudienceConcentration(uploadId);
        setLocationData(data);
      } catch (err) {
        console.error("Error fetching audience concentration", err);
        setLocationData([]);
      }
    };

    fetchData();
  }, [uploadId]);

  return (
    <Card classNames="p-4" style={{ backgroundColor: "#ffffff" }}>
      <h3 className="text-gray-900 text-sm font-medium mb-2">Audience Concentration</h3>
      <div className="h-48">
        {locationData.length > 0 ? (
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={locationData}
                cx="50%"
                cy="50%"
                outerRadius={60}
                dataKey="count"
                label={({ payload, percent }) =>
                  `${payload.location} (${(percent * 100).toFixed(0)}%)`
                }
                nameKey="location"
              >
                {locationData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string, props: any) => {
                  return [`${value}`, props.payload.location];
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-sm text-gray-400">
            No concentration data available
          </div>
        )}
      </div>
    </Card>
  );
}
