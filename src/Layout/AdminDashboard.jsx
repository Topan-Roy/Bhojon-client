import React, { useState, useEffect, useContext } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router";
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
    FaSignOutAlt,
    FaEdit,
    FaBell,
} from "react-icons/fa";
import { AuthContext } from "../Contexts/Context";
import axios from "axios";
import BhojonNext from "../Shared/BhojonNext/BhojonNext";

const AdminDashboard = () => {
    const { user, logoutUser } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [role, setRole] = useState(null);
    const [stats, setStats] = useState(null);
    const [latestOrders, setLatestOrders] = useState([]);
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [openMenu, setOpenMenu] = useState(null); // dropdown toggle

    const location = useLocation();
    const navigate = useNavigate();
    const toggleSidebar = () => setIsOpen(!isOpen);

    // Fetch user profile
    const fetchProfile = async () => {
        if (user?.email) {
            try {
                const res = await axios.get(`http://localhost:3000/users/${user.email}`);
                setProfile(res.data);
                setRole(res.data.role);
            } catch (err) {
                console.error(err);
            }
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [user]);

    // Fetch stats
    useEffect(() => {
        fetch("http://localhost:3000/api/admin/stats")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) setStats(data.stats);
            })
            .catch((err) => console.error(err));
    }, []);

    // Fetch latest orders
    useEffect(() => {
        fetch("http://localhost:3000/api/admin/latest-orders")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) setLatestOrders(data.latestOrders);
            })
            .catch((err) => console.error(err));
    }, []);

    const menuItems = [
        { icon: <FaTachometerAlt />, text: "Dashboard", path: "/dashboard" },

        {
            icon: <FaClipboardList />,
            text: "Manage Order",
            children: [
                { text: "All Orders", path: "/dashboard/manageorder" },
                { text: "Completed Orders", path: "/dashboard/completedbookings" },
                { text: "pending Orders", path: "/dashboard/pendingbookings" },
            ],
        },

        { icon: <FaCalendarAlt />, text: "Reservation", path: "/dashboard/reservation" },
        { icon: <FaShoppingCart />, text: "Purchase Manage", path: "/dashboard/purchase" },
        { icon: <FaUtensils />, text: "Food Management", path: "/dashboard/food" },
        { icon: <FaUsers />, text: "Human Resource", path: "/dashboard/users" },
        { icon: <FaFileAlt />, text: "Report", path: "/dashboard/report" },
        { icon: <FaCog />, text: "Settings", path: "/dashboard/settings" },
    ];

    const isDashboardPage = location.pathname === "/dashboard";

    // Profile edit handlers
    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        try {
            const { _id, ...updateData } = profile;
            await axios.put(`http://localhost:3000/users/${_id}`, updateData);

            setIsEditing(false);
            fetchProfile();
            alert("Profile updated successfully");
        } catch (err) {
            console.error(err);
            alert("Failed to update profile");
        }
    };

    const handleLogout = async () => {
        try {
            await logoutUser();
            navigate("/");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    const toggleMenu = (i) => {
        setOpenMenu(openMenu === i ? null : i);
    };

    return (
        <div className="flex">
            {/* Sidebar overlay for mobile */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity md:hidden ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                onClick={() => setIsOpen(false)}
            ></div>

            {/* Sidebar */}
            <aside
                className={`fixed md:static top-0 left-0 h-full w-64 bg-gray-900 text-white transform transition-transform duration-300 z-50 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                    }`}
            >
                {/* Profile */}
                <div className="p-6 text-center border-b border-gray-700">
                    <BhojonNext />
                    {profile && !isEditing && (
                        <>
                            <img
                                src={profile.picture || "/default-admin.png"}
                                alt={profile.name || "Admin"}
                                className="w-20 h-20 rounded-full mx-auto mb-2 object-cover"
                            />
                            <h2 className="text-2xl font-bold text-[#198754]">{profile.name}</h2>
                            <p className="mt-1">{role === "admin" ? "Admin" : "User"}</p>
                            <span className="text-[#198754] text-sm">● Active</span>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="mt-2 w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white"
                            >
                                <FaEdit /> Edit Profile
                            </button>
                        </>
                    )}

                    {profile && isEditing && (
                        <form onSubmit={handleProfileSubmit} className="space-y-2 text-left">
                            <input
                                type="text"
                                name="name"
                                value={profile.name}
                                onChange={handleProfileChange}
                                placeholder="Name"
                                className="w-full px-2 py-1 rounded bg-gray-800 text-white"
                            />
                            <input
                                type="text"
                                name="phone"
                                value={profile.phone}
                                onChange={handleProfileChange}
                                placeholder="Phone"
                                className="w-full px-2 py-1 rounded bg-gray-800 text-white"
                            />
                            <input
                                type="text"
                                name="address"
                                value={profile.address}
                                onChange={handleProfileChange}
                                placeholder="Address"
                                className="w-full px-2 py-1 rounded bg-gray-800 text-white"
                            />
                            <input
                                type="text"
                                name="picture"
                                value={profile.picture}
                                onChange={handleProfileChange}
                                placeholder="Picture URL"
                                className="w-full px-2 py-1 rounded bg-gray-800 text-white"
                            />
                            <div className="flex justify-between mt-2">
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 bg-[#198754] px-3 py-1 rounded text-white"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="flex items-center gap-2 bg-gray-500 px-3 py-1 rounded text-white"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                {/* Menu */}
                <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map((item, i) =>
                        item.children ? (
                            <div key={i}>
                                <button
                                    onClick={() => toggleMenu(i)}
                                    className="w-full flex items-center justify-between gap-3 p-3 rounded-lg bg-gray-800 text-white hover:bg-gray-700"
                                >
                                    <span className="flex items-center gap-3">
                                        <span className="text-lg">{item.icon}</span>
                                        <span>{item.text}</span>
                                    </span>
                                    <span>{openMenu === i ? "▲" : "▼"}</span>
                                </button>
                                {openMenu === i && (
                                    <div className="ml-8 mt-1 space-y-1">
                                        {item.children.map((sub, j) => (
                                            <NavLink
                                                key={j}
                                                to={sub.path}
                                                className={({ isActive }) =>
                                                    `block p-2 rounded-md transition ${isActive
                                                        ? "bg-green-600 text-white"
                                                        : "hover:bg-gray-700"
                                                    }`
                                                }
                                            >
                                                {sub.text}
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <NavLink
                                key={i}
                                to={item.path}
                                end={item.path === "/dashboard"}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 p-3 rounded-lg transition ${isActive
                                        ? "bg-green-600 text-white"
                                        : "hover:bg-gray-700"
                                    }`
                                }
                            >
                                <span className="text-lg">{item.icon}</span>
                                <span>{item.text}</span>
                            </NavLink>
                        )
                    )}
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 p-4 md:p-6">
                {/* Top Navbar */}
                <div className="flex items-center justify-between mb-6">
                    {/* Left: menu + title */}
                    <div className="flex items-center gap-4">
                        <button onClick={toggleSidebar} className="md:hidden text-2xl text-white">
                            {isOpen ? <FaTimes /> : <FaBars />}
                        </button>
                        <h1 className="text-xl md:text-2xl font-bold text-white">Dashboard</h1>
                    </div>

                    {/* Right: notification + logout */}
                    <div className="flex items-center gap-4">
                        <button className="relative text-white hover:text-yellow-400">
                            <FaBell className="w-6 h-6" />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white px-1 rounded-full">
                                3
                            </span>
                        </button>
                        <button
                            onClick={handleLogout}
                            className="group relative flex items-center gap-2 bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white"
                        >
                            <FaSignOutAlt />
                            <span className="absolute left-1/2 -translate-x-1/2 -bottom-8 opacity-0 group-hover:opacity-100 transition bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                                Logout
                            </span>
                        </button>
                    </div>
                </div>

                {/* Stats */}
                {isDashboardPage && stats && (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="p-5 rounded-xl shadow text-white bg-indigo-500">
                            <h3 className="text-3xl font-bold">{stats.lifetimeOrders}</h3>
                            <p className="text-sm mt-1">Lifetime Orders</p>
                        </div>
                        <div className="p-5 rounded-xl shadow text-white bg-[#198754]">
                            <h3 className="text-3xl font-bold">{stats.todayOrders}</h3>
                            <p className="text-sm mt-1">Today Orders</p>
                        </div>
                        <div className="p-5 rounded-xl shadow text-white bg-yellow-500">
                            <h3 className="text-3xl font-bold">{stats.todaySales}</h3>
                            <p className="text-sm mt-1">Today Sale</p>
                        </div>
                        <div className="p-5 rounded-xl shadow text-white bg-pink-500">
                            <h3 className="text-3xl font-bold">{stats.totalCustomers}</h3>
                            <p className="text-sm mt-1">Total Customers</p>
                        </div>
                    </div>
                )}

                {/* Latest Orders */}
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
                                        <tr key={i} className="border-t hover:bg-gray-50">
                                            <td className="p-3">{order.userEmail || order.name}</td>
                                            <td className="p-3 text-green-600">{order._id}</td>
                                            <td className="p-3">
                                                {new Date(order.createdAt).toLocaleTimeString()}
                                            </td>
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
