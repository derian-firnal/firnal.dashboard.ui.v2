import { useState, useEffect, useRef } from "react";
import { HiMiniUsers, HiMiniCube } from "react-icons/hi2";
import { BiLineChart } from "react-icons/bi";
import { PiClockCounterClockwiseFill } from "react-icons/pi";
import { HiMiniTableCells } from 'react-icons/hi2';
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import Card from "../ui/Card"
import Dropdown from "../ui/Dropdown";
import DashboardStat from "../components/cards/DashboardStat";
import DashboardTable from "../components/DashboardTable";
import FeaturedProductImage from '../assets/images/products/product-10.jpg'
import AppleWatchImage from '../assets/images/products/product-9.jpg'
import PagesTitle from "../components/PagesTitle";
import SalesChart from "../components/charts/SalesChart";
import RevenueChart from "../components/charts/RevenueChart";
import SalesAnalyticsChart from "../components/charts/SalesAnalyticsChart";
import CustomersChart from "../components/charts/CustomersChart";
import TablePagination from '../components/TablePagination';
import AudienceStatusPopup from "../components/AudienceStatusPopup";
import UploadAudiencePopup from "../components/UploadAudiencePopup";
import audienceService from "../services/AudienceService";
import DashboardTile from "../components/DashboardTile";
import { BiBarChartAlt2 } from "react-icons/bi";
import { GiBrain, GiArcheryTarget } from "react-icons/gi";
import { FaPuzzlePiece } from "react-icons/fa6"; // more modern look
import { useNavigate } from "react-router-dom";
import AudienceTable from "../components/tables/AudienceTable";

const Dashboard = () => {
  const [uploadPopupOpen, setUploadPopupOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [audienceRows, setAudienceRows] = useState([]);
  const [fileCount, setFileCount] = useState([]);
  const [dashboardStats, setDashboardStats] = useState([]);
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



  useEffect(() => {
    const getStatsData = async () => {
      try {
        const fileCount = await audienceService.getUploadedFilecount();
        const uniqueUsers = await audienceService.getUniqueRecordsCount();

        setDashboardStats([
          {
            title: 'Audiences Uploaded',
            value: fileCount || 0,
            icon: { img: <HiMiniUsers />, bg: '#8280FF' },
            growth: {
              name: 'progress',
              rate: 8.5,
              time: 'yesterday'
            }
          },
          {
            title: 'Average Match Rate',
            value: '57%',
            icon: { img: <BiLineChart />, bg: '#FEC53D' },
            growth: {
              name: 'progress',
              rate: 1.3,
              time: 'past week'
            }
          },
          {
            title: 'Unique Records',
            value: uniqueUsers || 0,
            icon: { img: <HiMiniTableCells />, bg: '#4AD991' },
            growth: {
              name: 'regress',
              rate: 4.3,
              time: 'yesterday'
            }
          },
          {
            title: 'Intent Signals',
            value: 130,
            icon: { img: <PiClockCounterClockwiseFill />, bg: '#FF9066' },
            growth: {
              name: 'progress',
              rate: 1.8,
              time: 'yesterday'
            }
          }
        ]);
      } catch (err) {
        console.error("❌ Failed to fetch file counts", err);
      }

    }

    getStatsData();
  }, []);

  const handleUpload = (file) => {
    console.log("Uploaded file:", file.name);
    setPopupOpen(false);
  };

  const handleRowClick = (row) => {
    navigate('/audiences', { state: { fileName: row.name } });
  };

  return (
    <div className="p-6 space-y-6 text-gray-900 min-h-screen">
      <PagesTitle />

      {/* {dashboardStats.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-5">
          {dashboardStats.map((stat, index) => (
            <DashboardStat key={index} stat={stat} />
          ))}
        </div>
      )} */}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mt-8">
            <DashboardTile icon={<BiBarChartAlt2 className="text-[#6D6DFA]" />} label="View Insights" onClick={() => navigate('/audiences')} />
            <DashboardTile icon={<GiBrain className="text-[#F472B6]" />} label="Build Your ICP" onClick={() => navigate('/buildIcp')} />
            <DashboardTile icon={<GiArcheryTarget className="text-[#FB923C]" />} label="Search for intent" onClick={() => navigate('/intentSearch')} />
            <DashboardTile icon={<HiMiniUsers className="text-[#60A5FA]" />} label="Search Businesses" onClick={() => navigate('/searchB2B')} />
            <DashboardTile icon={<FaPuzzlePiece className="text-[#34D399]" />} label="Enrich Audiences" onClick={() => navigate('/audiences')} />
      </div>


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




      {/* <div className="mt-5">
        <SalesChart />
      </div> */}

      {/* <Card classNames={'px-4 py-5 sm:p-6'} style={{ backgroundColor: '#fff', marginTop: '20px' }}>
        <span className="flex items-center justify-between  mb-5">
          <h3 className="text-brand-primary-black text-[1.125rem] font-semibold">Deals Details</h3>
          <Dropdown />
        </span>
        <DashboardTable header={['image', 'product name', 'location', 'date - time', 'piece', 'amount', 'status']} data={dashboardData[1]?.products || []} />
      </Card> */}

      {/* <div className="mt-5">
        <RevenueChart />
      </div> */}

      {/* <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
        <CustomersChart />

        <Card classNames={'px-4 py-5 sm:p-6'} style={{ backgroundColor: '#fff' }}>
          <h3 className="text-brand-primary-black text-[22px] font-semibold">Featured Product</h3>
          <span className="relative">
            <img src={FeaturedProductImage} alt="Feature Product" className="m-auto h-40" />
            <span className="absolute top-1/2 left-0 right-0 flex items-center justify-between transform -translate-y-1/2">
              <IoChevronBackOutline className="bg-[rgba(226,234,248,0.8)] text-[#626262] rounded-full p-2 h-8 w-8 flex items-center justify-center cursor-pointer" />
              <IoChevronForwardOutline className="bg-[rgba(226,234,248,0.8)] text-[#626262] rounded-full p-2 h-8 w-8 flex items-center justify-center cursor-pointer" />
            </span>
          </span>
          <span className="text-center mt-5">
            <p className="text-[#282D32] font-medium text-[1.125rem]">Sony 4k Screen</p>
            <p className="text-brand-primary-blue">$1750</p>
          </span>
        </Card>

        <SalesAnalyticsChart />
      </div> */}
    </div>
  )
}

export default Dashboard