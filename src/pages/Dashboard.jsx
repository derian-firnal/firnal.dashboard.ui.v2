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

const dashboardData = [
  {
    stats: [
      {
        title: 'Audiences Uploaded',
        value: 40689,
        icon: {
          img: <HiMiniUsers />,
          bg: '#8280FF'
        },
        growth: {
          name: 'progress',
          rate: 8.5,
          time: 'yesterday'
        }
      },
      {
        title: 'Average Match Rate',
        value: 10293,
        icon: {
          img: <BiLineChart />,
          bg: '#FEC53D'
        },
        growth: {
          name: 'progress',
          rate: 1.3,
          time: 'pass week'
        }
      },
      {
        title: 'Unique Records',
        value: 89000,
        icon: {
          img: <HiMiniTableCells />,
          bg: '#4AD991'
        },
        growth: {
          name: 'regress',
          rate: 4.3,
          time: 'yesterday'
        }
      },
      {
        title: 'Intent Signals',
        value: 2040,
        icon: {
          img: <PiClockCounterClockwiseFill />,
          bg: '#FF9066'
        },
        growth: {
          name: 'progress',
          rate: 1.8,
          time: 'yesterday'
        }
      },
    ]
  },
  {
    products: [
      {
        image: AppleWatchImage,
        productName: 'apple watch',
        location: '6096 marjolaine landing',
        datetime: '12.09.2019 - 12.53 PM',
        piece: 423,
        amount: 34295,
        status: 'delivered'
      },
    ]
  },
]

const audienceRows = [
  { id: 1, name: "Users since 3/25", records: 3223, date: "14 Feb 2019", match: "92%", status: "Downloaded" },
  { id: 2, name: "Userbase Pre 3/25", records: 9663, date: "14 Feb 2019", match: "92%", status: "Processing" },
  { id: 3, name: "Low Retention", records: 755, date: "14 Feb 2019", match: "92%", status: "Completed" },
  { id: 4, name: "Top Users", records: 915, date: "14 Feb 2019", match: "92%", status: "Completed" },
  { id: 5, name: "IG Funnel", records: 6633, date: "14 Feb 2019", match: "92%", status: "Processing" },
  { id: 6, name: "FB Funnel", records: 7784, date: "14 Feb 2019", match: "92%", status: "Completed" },
];


const Dashboard = () => {
  return (
    <>
      <PagesTitle />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-5">
        {dashboardData[0].stats.map((stat, index) => (
          <DashboardStat key={index} stat={stat} />
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Ideal Customer Profile */}
        <div className="rounded-2xl shadow-md flex overflow-hidden h-24 bg-white text-gray-900">
          <div className="flex-1 p-4 flex flex-col justify-center">
            <h3 className="text-base font-semibold">Ideal Customer Profile</h3>
            <p className="text-sm text-gray-600">
              Based on your highest aligned traits, discover your ideal customer profile.
            </p>
          </div>
          <button className="w-32 bg-[#6D6DFA] text-white font-semibold text-sm hover:bg-[#8181ff] transition">
            Build ICP
          </button>
        </div>

        {/* Find Similar Audiences */}
        <div className="rounded-2xl shadow-md flex overflow-hidden h-24 bg-white text-gray-900">
          <div className="flex-1 p-4 flex flex-col justify-center">
            <h3 className="text-base font-semibold">Find Similar Audiences</h3>
            <p className="text-sm text-gray-600">
              Based on your highest aligned traits, discover your ideal customer profile.
            </p>
          </div>
          <button className="w-32 bg-[#6D6DFA] text-white font-semibold text-sm hover:bg-[#8181ff] transition">
            Search
          </button>
        </div>
      </div>


      <div className="flex flex-wrap items-center justify-between mt-8 gap-4">
        <button className="bg-[#6D6DFA] text-white font-semibold px-5 py-2 rounded-md">
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

      <div className="mt-4 overflow-x-auto rounded-xl shadow-md bg-white">
        <table className="min-w-full text-sm text-gray-800">
          <thead className="text-left text-xs uppercase bg-gray-100 text-gray-500">
            <tr>
              <th className="px-4 py-3">Audience Name</th>
              <th className="px-4 py-3">Records</th>
              <th className="px-4 py-3">Date Uploaded</th>
              <th className="px-4 py-3">Match Rate</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {audienceRows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3">{row.name}</td>
                <td className="px-4 py-3">{row.records}</td>
                <td className="px-4 py-3">{row.date}</td>
                <td className="px-4 py-3">{row.match}</td>
                <td className="px-4 py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${row.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      row.status === 'Downloaded' ? 'bg-purple-100 text-purple-800' :
                        'bg-orange-100 text-orange-800'
                    }`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="px-4">
          <TablePagination />
        </div>
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
    </>
  )
}

export default Dashboard