// pages/audiences/index.tsx
import { useState } from "react";

import GenderVariance from "../components/audience/GenderVariance";
import AgeDistribution from "../components/audience/AgeDistribution";
import AudienceConcentration from "../components/audience/AudienceConcentration";
import IncomeDistribution from "../components/audience/IncomeDistribution";
import SampleDataTable from "../components/tables/SamleDataTable";
import AudienceSelector from "../components/audience/AudienceSelector";
import ICPPreview from "../components/audience/IcpPreview";
import StatCard from "../components/audience/StatCard";

export default function AudiencesPage() {
  const [selectedAudience, setSelectedAudience] = useState("Audience A");

  const audienceOptions = ["Audience A", "Audience B", "Audience C"];

  return (
    <div className="p-6 space-y-6 text-gray-900 min-h-screen">
      <h1 className="text-2xl font-semibold">Audiences</h1>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <StatCard title="Audience Size" value="44" highlight />
        <StatCard title="Appended Records Found" value="2,254" />
        <StatCard title="Average Income" value="$89,451" />
        <StatCard
          title="Toggle Selected Audiences"
          value={
            <AudienceSelector
              options={audienceOptions}
              selected={selectedAudience}
              onChange={setSelectedAudience}
            />
          }
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <GenderVariance />
        <AgeDistribution />
        <AudienceConcentration />
        <IncomeDistribution />
      </div>

      {/* ICP Cards */}
      <ICPPreview />

      {/* Table */}
      <div>
        <h2 className="text-lg font-semibold mt-6 mb-2">Appended Sample Data</h2>
        <SampleDataTable />
      </div>
    </div>
  );
}
