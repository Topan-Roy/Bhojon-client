import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router";
import {
    FaBars,
    FaTimes,
    FaTachometerAlt,
    FaClipboardList,
    FaCalendarAlt,
    FaShoppingCart,
    FaUtensils,
    FaUsers,
    FaFileAlt,
    FaCog,
} from "react-icons/fa";

const AdminDashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [stats, setStats] = useState(null);
    const [latestOrders, setLatestOrders] = useState([]);
    const location = useLocation();

    const toggleSidebar = () => setIsOpen(!isOpen);

    const menuItems = [
        { icon: <FaTachometerAlt />, text: "Dashboard", path: "/dashboard" },
        { icon: <FaClipboardList />, text: "Manage Order", path: "/dashboard/manageorder" },
        { icon: <FaCalendarAlt />, text: "Reservation", path: "/dashboard/reservation" },
        { icon: <FaShoppingCart />, text: "Purchase Manage", path: "/dashboard/purchase" },
        { icon: <FaUtensils />, text: "Food Management", path: "/dashboard/food" },
        { icon: <FaUsers />, text: "Human Resource", path: "/dashboard/users" },
        { icon: <FaFileAlt />, text: "Report", path: "/dashboard/report" },
        { icon: <FaCog />, text: "Settings", path: "/dashboard/settings" },
    ];

    // Fetch stats
    useEffect(() => {
        fetch("http://localhost:3000/api/admin/stats")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) setStats(data.stats);
            })
            .catch((err) => console.error(err));
    }, []);

    
    useEffect(() => {
        fetch("http://localhost:3000/api/admin/latest-orders")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) setLatestOrders(data.latestOrders);
            })
            .catch((err) => console.error(err));
    }, []);

    const isDashboardPage = location.pathname === "/dashboard";

    return (
        <div className="drawer lg:drawer-open">
            <input id="admin-drawer" type="checkbox" className="drawer-toggle" />

            {/* Sidebar */}
            <div className="drawer-side">
                <label htmlFor="admin-drawer" className="drawer-overlay"></label>
                <aside
                    className={`fixed md:static top-0 left-0 h-full w-64 bg-gray-900 text-white transform transition-transform duration-300 z-50 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                        }`}
                >
                    <div className="p-6 text-center border-b border-gray-700">
                        <h2 className="text-2xl font-bold text-green-400">🍴 BHOJON</h2>
                        <p className="mt-2">Super Admin</p>
                        <span className="text-green-400 text-sm">● Active</span>
                    </div>

                    <nav className="flex-1 p-4 space-y-2">
                        {menuItems.map((item, i) => (
                            <NavLink
                                key={i}
                                to={item.path}
                                end={item.path === "/dashboard"} 
                                className={({ isActive }) =>
                                    `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group ${isActive ? "bg-green-600 text-white" : "hover:bg-gray-700"
                                    }`
                                }
                            >
                                <span className="text-lg group-hover:text-green-400">{item.icon}</span>
                                <span>{item.text}</span>
                            </NavLink>

                        ))}
                    </nav>
                </aside>
            </div>

            {/* Main Content */}
            <div className="drawer-content flex flex-col flex-1 p-4 md:p-6">
                {/* Top Navbar */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={toggleSidebar}
                        className="md:hidden text-2xl text-gray-700"
                    >
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                    <h1 className="text-xl md:text-2xl font-bold text-[#ffffff]">
                        Admin Dashboard
                    </h1>
                </div>

               
                {isDashboardPage && stats && (
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="p-5 rounded-xl shadow text-white bg-indigo-500 hover:scale-105 transform transition duration-200">
                            <h3 className="text-3xl font-bold">{stats.lifetimeOrders}</h3>
                            <p className="text-sm mt-1">Lifetime Orders</p>
                        </div>
                        <div className="p-5 rounded-xl shadow text-white bg-green-500 hover:scale-105 transform transition duration-200">
                            <h3 className="text-3xl font-bold">{stats.todayOrders}</h3>
                            <p className="text-sm mt-1">Today Orders</p>
                        </div>
                        <div className="p-5 rounded-xl shadow text-white bg-yellow-500 hover:scale-105 transform transition duration-200">
                            <h3 className="text-3xl font-bold">{stats.todaySales}</h3>
                            <p className="text-sm mt-1">Today Sale</p>
                        </div>
                        <div className="p-5 rounded-xl shadow text-white bg-pink-500 hover:scale-105 transform transition duration-200">
                            <h3 className="text-3xl font-bold">{stats.totalCustomers}</h3>
                            <p className="text-sm mt-1">Total Customers</p>
                        </div>
                    </div>
                )}

                {isDashboardPage && latestOrders.length > 0 && (
                    <div className="bg-white text-[#000] p-5 rounded-xl shadow mb-6">
                        <h2 className="text-lg font-semibold mb-4">Latest Orders</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="p-3">Customer</th>
                                        <th className="p-3">Order No</th>
                                        <th className="p-3">Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {latestOrders.map((order, i) => (
                                        <tr
                                            key={i}
                                            className="border-t border-[#d0d0d0] hover:bg-gray-50"
                                        >
                                            <td className="p-3">{order.userEmail || order.name}</td>
                                            <td className="p-3 text-green-600">{order._id}</td>
                                            <td className="p-3">{new Date(order.createdAt).toLocaleTimeString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

               
                <Outlet />
            </div>
        </div>
    );
};

export default AdminDashboard;
