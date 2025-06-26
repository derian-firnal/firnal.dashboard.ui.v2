/* eslint-disable no-unused-vars */
'use client'

import { useState, useEffect } from 'react'
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
} from '@headlessui/react'
import {
    Bars3Icon,
    BellIcon,
    CalendarIcon,
    ChartPieIcon,
    Cog6ToothIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { LiaHeart, LiaListAlt, LiaGiftSolid, LiaCalendar, LiaClipboard, LiaUserFriendsSolid, LiaUserSolid, LiaTableSolid, LiaCogSolid, LiaPowerOffSolid } from "react-icons/lia";
import { SlChart } from "react-icons/sl";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { PiGridFour } from "react-icons/pi";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { PiSquareSplitVerticalBold } from "react-icons/pi";
import SearchBar from '../components/SearchBar';
import NavDrawer from '../ui/NavDrawer';
import AppLogo from '../assets/images/firnal_logo.png'
import { logoutUser } from '../services/AuthService';

const navigation = [
    { name: 'Dashboard', href: '/', icon: AiOutlineDashboard, current: false },
    { name: 'Audiences', href: '/audiences', icon: AiOutlineDashboard, current: false },
    { name: 'Search B2B', href: '/searchB2B', icon: AiOutlineDashboard, current: false },
    { name: 'Intent Search', href: '/intentSearch', icon: AiOutlineDashboard, current: false },
    // { name: 'Search B2C', href: '/searchB2C', icon: AiOutlineDashboard, current: false },
]

const pages = [
    { id: 1, name: 'Billing - Coming Soon', href: '/billing', icon: LiaGiftSolid, current: false },
]

const bottomNavigation = [
    { name: 'Settings - Coming Soon', href: '/settings', icon: LiaCogSolid, current: false },
    { name: 'Feedback', href: '#', icon: LiaPowerOffSolid, current: false },
]

export default function Layout() {
    const navigate = useNavigate();
    const [submenuItems, setSubmenuItems] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [shrinkSidebar, setShrinkSidebar] = useState(false);
    const location = useLocation();
    const [activeFileName, setActiveFileName] = useState(null);
    const [feedbackOpen, setFeedbackOpen] = useState(false);

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
    const userEmail = loggedInUser?.email || "User";

    useEffect(() => {
        const loadSubmenus = () => {
            const stored = JSON.parse(localStorage.getItem("audienceSubmenus") || "[]");
            console.log("[Layout] Caught audienceSubmenuUpdated event. Submenus:", stored);
            setSubmenuItems(stored);
        };

        loadSubmenus();
        console.log("[Layout] Listening for 'audienceSubmenuUpdated' events");
        window.addEventListener("audienceSubmenuUpdated", loadSubmenus);

        return () => {
            window.removeEventListener("audienceSubmenuUpdated", loadSubmenus);
            console.log("[Layout] Removed 'audienceSubmenuUpdated' event listener");
        };
    }, []);

    useEffect(() => {
        if (location.pathname === "/audienceDetail") {
            const params = new URLSearchParams(location.search);
            const fileName = params.get("fileName");
            if (fileName) {
                setActiveFileName(fileName);
                localStorage.setItem("activeFileName", fileName);
            }
        } else {
            const saved = localStorage.getItem("activeFileName");
            if (saved) setActiveFileName(saved);
        }
    }, [location]);



    const handleLogout = () => {
        console.log('logging out user')
        logoutUser();
        navigate('/login');
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <aside className="w-72 bg-white border-r min-h-screen p-4">
                <div className="flex items-center gap-3 mb-6">
                    <img src={AppLogo} alt="Logo" className="h-8" />
                    <h3 className="text-xl font-semibold text-gray-800">
                        <span className="text-blue-400">Firnal</span>Moonbrush
                    </h3>
                </div>

                <nav>
                    <ul className="space-y-2">
                        {navigation.map((item) => (
                            <li key={item.name}>
                                <Link
                                    to={item.href}
                                    className={`block px-3 py-2 rounded-md text-sm font-medium ${location.pathname === item.href
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-800 hover:bg-gray-100'
                                        }`}
                                >
                                    {item.name}
                                </Link>

                                {item.name === 'Audiences' && submenuItems.length > 0 && (
                                    <ul key={submenuItems.join(',')} className="ml-4 mt-1 space-y-1">
                                        {submenuItems.map((fileName) => (
                                            <li key={fileName}>
                                                <button
                                                    onClick={() => {
                                                        navigate(`/audienceDetail?fileName=${encodeURIComponent(fileName)}`);
                                                        setActiveFileName(fileName);
                                                        localStorage.setItem("activeFileName", fileName);
                                                    }}
                                                    className={`w-full text-left block px-2 py-1 rounded-md text-sm font-semibold ${location.pathname === "/audienceDetail" && new URLSearchParams(location.search).get("fileName") === fileName
                                                        ? "text-blue-700 bg-blue-50"
                                                        : "text-gray-800 hover:bg-gray-100 hover:text-blue-600"
                                                        }`}
                                                >
                                                    {fileName}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-6 pt-4 border-t">
                        <ul className="space-y-2">
                            {pages.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        to={item.href}
                                        className={`block px-3 py-2 rounded-md text-sm font-medium ${location.pathname === item.href
                                            ? 'bg-blue-600 text-white'
                                            : 'text-gray-800 hover:bg-gray-100'
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-auto pt-6 border-t">
                        <ul className="space-y-2">
                            {bottomNavigation.map((item) => (
                                <li key={item.name}>
                                    {item.name === "Feedback" ? (
                                        <>
                                            <button
                                                onClick={() => setFeedbackOpen(!feedbackOpen)}
                                                className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-100"
                                            >
                                                {item.name}
                                            </button>
                                            {feedbackOpen && (
                                                <ul className="ml-4 mt-1 space-y-1">
                                                    <li>
                                                        <Link
                                                            to="/feedback/question"
                                                            className={`block px-3 py-1 rounded-md text-sm font-semibold ${location.pathname === "/feedback/question" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`}
                                                        >
                                                            Have a Question
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            to="/feedback/bug"
                                                            className={`block px-3 py-1 rounded-md text-sm font-semibold ${location.pathname === "/feedback/bug" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`}
                                                        >
                                                            Report a Bug
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            to="/feedback/recommendations"
                                                            className={`block px-3 py-1 rounded-md text-sm font-semibold ${location.pathname === "/feedback/recommendations" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`}
                                                        >
                                                            Dashboard Recommendations
                                                        </Link>
                                                    </li>
                                                </ul>
                                            )}
                                        </>
                                    ) : item.onClick ? (
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            {item.name}
                                        </button>
                                    ) : (
                                        <Link
                                            to={item.href}
                                            className={`block px-3 py-2 rounded-md text-sm font-medium ${location.pathname === item.href
                                                ? 'bg-blue-600 text-white'
                                                : 'text-gray-800 hover:bg-gray-100'
                                                }`}
                                        >
                                            {item.name}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>

                    </div>
                </nav>
            </aside>

            {/* Right Side Layout */}
            <div className="flex flex-col flex-1">
                {/* ✅ Topbar */}
                <div className="bg-white h-16 px-6 flex items-center justify-end border-b border-gray-200">
                    <Menu as="div" className="relative inline-block text-left">
                        <MenuButton className="flex items-center gap-3 pl-1 pr-2 py-1 rounded-full hover:bg-gray-100 focus:outline-none">

                            {/* Vertical Separator */}
                            <div className="h-6 w-px bg-gray-300" />

                            {/* Avatar Circle */}
                            <div className="w-8 h-8 rounded-full bg-[#6D6DFA] flex items-center justify-center text-white font-bold text-sm">
                                {userEmail.charAt(0).toUpperCase()}
                            </div>

                            {/* Email */}
                            <span className="text-sm font-medium text-gray-800">{userEmail}</span>

                            {/* Dropdown Icon */}
                            <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                        </MenuButton>
                        <TransitionChild
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                    <MenuItem>
                                        {({ active }) => (
                                            <button
                                                onClick={handleLogout}
                                                className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                    } w-full text-left px-4 py-2 text-sm`}
                                            >
                                                Sign out
                                            </button>
                                        )}
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </TransitionChild>
                    </Menu>
                </div>

                {/* Main content below topbar */}
                <main className="flex-1 bg-[#F5F6FA] p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
