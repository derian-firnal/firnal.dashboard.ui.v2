import { useState, useEffect, useRef } from "react";
import { HiMiniUsers } from "react-icons/hi2";
import PagesTitle from "../components/PagesTitle";
import UploadAudiencePopup from "../components/UploadAudiencePopup";
import audienceService from "../services/AudienceService";
import DashboardTile from "../components/DashboardTile";
import { BiBarChartAlt2 } from "react-icons/bi";
import { GiBrain, GiArcheryTarget } from "react-icons/gi";
import { FaPuzzlePiece } from "react-icons/fa6"; // more modern look
import { useNavigate } from "react-router-dom";
import AudienceTable from "../components/tables/AudienceTable";

const AudiencesPage = () => {
  const [uploadPopupOpen, setUploadPopupOpen] = useState(false);
  const [audienceRows, setAudienceRows] = useState([]);
  const pollingRef = useRef(null);

  const navigate = useNavigate();

  const startPolling = () => {
    if (pollingRef.current) return;
    console.log("📡 Starting polling...");
    pollingRef.current = setInterval(() => {
      console.log("🔁 Polling...");
      fetchUploads();
    }, 3000);
  };

  const fetchUploads = async () => {
    try {
      const data = await audienceService.getAudienceUploadDetails();

      const transformed = data.map((item) => {
        const rawStatus = item.status?.toString().toLowerCase() || 'processing';
        const normalizedStatus =
          rawStatus === 'completed' ? 'Completed' :
            rawStatus === 'failed' ? 'Failed' :
              'Processing';

        return {
          id: item.id,
          name: item.audienceName || item.fileName,
          records: item.records || item.rowCount || 0,
          date: new Date(item.uploadedAt).toLocaleDateString(),
          isEnriched: item.isEnriched || false,
          status: normalizedStatus,
        };
      });

      setAudienceRows(transformed);

      const hasInProgress = transformed.some(
        row => row.status?.toLowerCase?.() === 'processing' || row.status?.toLowerCase?.() === 'inprogress'
      );

      if (!hasInProgress) {
        // Delay stopping polling by one more round, to allow new entries to show up
        setTimeout(() => {
          if (pollingRef.current && !audienceRows.some(row =>
            row.status === 'Processing' || row.status === 'InProgress')) {
            clearInterval(pollingRef.current);
            pollingRef.current = null;
          }
        }, 3000); // 3s grace period
      }

    } catch (err) {
      console.error("❌ Failed to fetch upload details", err);
    }
  };


  useEffect(() => {
    fetchUploads();
    startPolling();

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
    };
  }, []);

  const handleUpload = (file) => {
    console.log("Uploaded file:", file.name);
    setPopupOpen(false);
  };

  const handleRowClick = (row) => {
    const key = "audienceSubmenus";
    const existing = JSON.parse(localStorage.getItem(key) || "[]");

    const updated = Array.from(new Set([row.name, ...existing])); // ensure unique
    localStorage.setItem(key, JSON.stringify(updated));

    // Notify other components that submenu has changed
    window.dispatchEvent(new CustomEvent("audienceSubmenuUpdated"));

    // Navigate
    navigate('/audiences', { state: { fileName: row.name } });
  };


  return (
    <div className="p-6 space-y-6 text-gray-900 min-h-screen">
      <PagesTitle />

      <div className="flex flex-wrap items-center justify-between mt-8 gap-4">
        <button onClick={() => setUploadPopupOpen(true)}
          className="bg-[#6D6DFA] text-white font-semibold px-5 py-2 rounded-md">
          Upload New Audience
        </button>
        <div className="flex flex-wrap gap-3 items-center">
          <button className="bg-[#2E2F42] text-white px-4 py-2 rounded-md">Filter By</button>
          <button className="bg-[#2E2F42] text-white px-4 py-2 rounded-md">Upload Date</button>
          <button className="bg-[#2E2F42] text-white px-4 py-2 rounded-md">Audience Size</button>
          <button className="bg-[#2E2F42] text-white px-4 py-2 rounded-md">Dataset Status</button>
          <button className="text-[#F97316] font-medium">Reset Filter</button>
        </div>
      </div>

      <AudienceTable rows={audienceRows} rowsPerPage={5} onRowClick={handleRowClick} />

      <div className="mt-4 overflow-x-auto rounded-xl shadow-md bg-white">

        <UploadAudiencePopup
          open={uploadPopupOpen}
          onClose={() => setUploadPopupOpen(false)}
          onFileUpload={handleUpload}
          onUploadComplete={() => {
            setUploadPopupOpen(false);
            setAudienceRows(prev => [
              {
                id: `temp-${Date.now()}`,
                name: 'Uploading...',
                records: 0,
                date: new Date().toLocaleDateString(),
                match: '-',
                status: 'Processing',
              },
              ...prev,
            ]);
            startPolling(); // restart immediately
          }}
        />
      </div>
    </div>
  )
}

export default AudiencesPage;