// pages/audiences/index.tsx
import { useEffect, useState } from "react";

import GenderVariance from "../components/audience/GenderVariance";
import AgeDistribution from "../components/audience/AgeDistribution";
import AudienceConcentration from "../components/audience/AudienceConcentration";
import IncomeDistribution from "../components/audience/IncomeDistribution";
import SampleDataTable from "../components/tables/SamleDataTable";
import AudienceSelector from "../components/audience/AudienceSelector";
import ICPPreview from "../components/audience/IcpPreview";
import StatCard from "../components/audience/StatCard";
import audienceService from "../services/AudienceService";

export default function AudiencesPage() {
    const [audiences, setAudiences] = useState<any[]>([]);
    const [selectedAudience, setSelectedAudience] = useState<any>(null);
    const [averageIncome, setAverageIncome] = useState<number | null>(null);

    useEffect(() => {
        const fetchAudiences = async () => {
            try {
                const data = await audienceService.getAudiences();
                setAudiences(data);
                if (data.length > 0) setSelectedAudience(data[0]);
            } catch (error) {
                console.error("Failed to fetch audiences", error);
            }
        };

        fetchAudiences();
    }, []);

    useEffect(() => {
        const fetchAverageIncome = async () => {
            if (!selectedAudience?.id) return;
            try {
                const income = await audienceService.getAverageIncome(selectedAudience.id);
                console.log("avg income", income)
                setAverageIncome(income);
            } catch (error) {
                console.error("Failed to fetch average income", error);
                setAverageIncome(null);
            }
        };

        fetchAverageIncome();
    }, [selectedAudience]);


    return (
        <div className="p-6 space-y-6 text-gray-900 min-h-screen">
            <h1 className="text-2xl font-semibold">Audiences</h1>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <StatCard
                    title="Toggle Selected Audiences"
                    value={
                        <AudienceSelector
                            options={audiences.map((a) => a.fileName)}
                            selected={selectedAudience?.fileName}
                            onChange={(name) =>
                                setSelectedAudience(audiences.find((a) => a.fileName === name))
                            }
                        />
                    }
                />
                <StatCard title="Audience Size" value={selectedAudience?.rowCount ?? "—"} highlight />
                <StatCard title="Appended Records Found" value="2,254" />
                <StatCard
                    title="Average Income"
                    value={averageIncome != null ? `$${averageIncome.toLocaleString()}` : "—"}
                />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <GenderVariance uploadId={selectedAudience?.id} />
                <AgeDistribution uploadId={selectedAudience?.id} />
                <AudienceConcentration uploadId={selectedAudience?.id} />
                <IncomeDistribution uploadId={selectedAudience?.id} />
            </div>

            {/* ICP Cards */}
            {/* <ICPPreview /> */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
                {/* Ideal Customer Profile */}
                <div className="mt-4 rounded-2xl shadow-md flex overflow-hidden h-24 bg-white text-gray-900 w-full">
                    <div className="flex-1 p-4 flex flex-col justify-center">
                        <h3 className="text-base font-semibold">Ideal Customer Profile</h3>
                        <p className="text-sm text-gray-600">
                            Based on your highest aligned traits, discover your ideal customer profile.
                        </p>
                    </div>
                    <button className="w-32 bg-[#6D6DFA] text-white font-semibold text-sm hover:bg-[#8181ff] transition">
                        Coming Soon
                    </button>
                </div>

                {/* Find Similar Audiences */}
                <div className="mt-4 rounded-2xl shadow-md flex overflow-hidden h-24 bg-white text-gray-900 w-full">
                    <div className="flex-1 p-4 flex flex-col justify-center">
                        <h3 className="text-base font-semibold">Enrich Audience List</h3>
                        <p className="text-sm text-gray-600">
                            Based on your highest aligned traits, discover your ideal customer profile.
                        </p>
                    </div>
                    <button className="w-32 bg-[#6D6DFA] text-white font-semibold text-sm hover:bg-[#8181ff] transition">
                        Search
                    </button>
                </div>
            </div>

            {/* Table */}
            <div>
                <h2 className="text-lg font-semibold mt-6 mb-2">Appended Sample Data</h2>
                <SampleDataTable uploadId={selectedAudience?.id} />
            </div>
        </div>
    );
}
