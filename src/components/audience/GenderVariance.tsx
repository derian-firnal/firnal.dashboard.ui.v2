import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import Card from "../../ui/Card";
import audienceService from "../../services/AudienceService";

const COLORS = ["#6D6DFA", "#A78BFA", "#C4B5FD", "#EDE9FE"];


export default function GenderVariance({ uploadId }: { uploadId: number }) {
  const [genderData, setGenderData] = useState<{ name: string; value: number; percent: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await audienceService.getGenderVariance(uploadId);
        const chartData = data.map((item: any) => ({
          name: item.gender,
          value: item.count,
          percent: item.percent,
        }));
        setGenderData(chartData);
      } catch (err) {
        console.error("Error fetching gender variance", err);
        setGenderData([]);
      }
    };

    if (uploadId) fetchData();
  }, [uploadId]);

  return (
    <Card classNames="p-4" style={{ backgroundColor: "#ffffff" }}>
      <h3 className="text-gray-900 text-sm font-medium mb-2">Gender Variance</h3>
      <div className="h-48">
        {genderData.length > 0 ? (
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
                label={({ payload }) => `${payload.name} (${payload.percent}%)`}
              >
                {genderData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string, props: any) => {
                  const percent = props.payload.percent;
                  return [`${value} (${percent}%)`, name];
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-sm text-gray-400">
            No gender data available
          </div>
        )}
      </div>
    </Card>
  );
}
