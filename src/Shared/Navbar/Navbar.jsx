import { useState, useContext, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import logo from "../../assets/p2.png";
import { NavLink } from "react-router";
import { AuthContext } from "../../Contexts/Context";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logoutUser } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/users/${user.email}`)
        .then((res) => setRole(res.data.role))
        .catch((err) => console.error(err));
    }
  }, [user]);

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-[#c09342] font-bold"
      : "text-white font-medium hover:text-[#c09342]";

  return (
    <nav className="bg-[#112a2a] shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <NavLink to="/">
              <img className="h-10 w-auto" src={logo} alt="Logo" />
            </NavLink>
          </div>

          <div className="hidden md:flex space-x-8">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/reservation" className={linkClass}>Reservation</NavLink>
            <NavLink to="/manu" className={linkClass}>Menu</NavLink>
            <NavLink to="/aboutus" className={linkClass}>About Us</NavLink>
            <NavLink to="/contactus" className={linkClass}>Contact Us</NavLink>
            <NavLink to="/gallery" className={linkClass}>Gallery</NavLink>
            <NavLink to="/team" className={linkClass}>Team</NavLink>

            {user && role === "admin" && (
              <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
            )}

            {!user && (
              <NavLink to="/login" className={linkClass}>Login</NavLink>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <NavLink to='/onlineorder'>
              <button className="bg-[#112a2a] text-white px-4 py-2 rounded-lg hover:bg-[#1f3433] transition cursor-pointer">
                Online-order
              </button>
            </NavLink>
            <button className="relative p-2 rounded-full hover:bg-[#c09342] cursor-pointer">
              <ShoppingCart className="h-6 w-6 text-[#ffffff]" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">0</span>
            </button>

            {user && (
              <button
                onClick={logoutUser}
                className="bg-[#d63384] text-white px-3 py-1 rounded hover:bg-[#d63384] transition"
              >
                Logout
              </button>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-200 hover:text-red-500 text-2xl">☰</button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#112a2a] border-t">
          <div className="flex flex-col px-4 py-2 space-y-2">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/reservation" className={linkClass}>Reservation</NavLink>
            <NavLink to="/manu" className={linkClass}>Menu</NavLink>
            <NavLink to="/aboutus" className={linkClass}>About Us</NavLink>
            <NavLink to="/contactus" className={linkClass}>Contact Us</NavLink>
            <NavLink to="/gallery" className={linkClass}>Gallery</NavLink>
            <NavLink to="/team" className={linkClass}>Team</NavLink>

            {user && role === "admin" && (
              <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
            )}
            {!user && (
              <NavLink to="/login" className={linkClass}>Login</NavLink>
            )}

            {user && (
              <button
                onClick={logoutUser}
                className="bg-[#d63384] text-white px-3 py-1 rounded hover:bg-[#d63384] transition mt-2"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
