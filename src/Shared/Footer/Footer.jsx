import logo from '../../assets/p2.png'; 
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-[#112a2a] text-gray-300 pt-12 ">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          {/* <h3 className="text-white text-lg font-semibold mb-4">About Us</h3> */}
        <img src={logo} alt=""  />
          <p className="text-sm leading-6 ">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard.
          </p>
          {/* Social Icons */}
          <div className="flex space-x-3 mt-5">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-500 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-500 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-500 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-500 transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
         

        {/* Get In Touch */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Get In Touch</h3>
          <ul className="space-y-2 text-sm">
            <li>570 8th Ave, New York, NY 10018 United States</li>
            <li>📞 +1715 222 333</li>
            <li>📧 support@bhojondemo.com</li>
          </ul>
          <div className="mt-5">
             <h3 className="text-white text-lg font-semibold mb-4">Book A Table</h3>
          <p className="text-sm mb-4">📞 0123456789</p>

          </div>
        </div>

        {/* Book A Table + Pages */}
        <div>
         
          <h3 className="text-white text-lg font-semibold mb-4">Pages</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="">
                 Home
              </a>
            </li>
            <li>
              <a href="/reservation" className="">
                Reservation
              </a>
            </li>
            <li>
              <a href="/menu" className="">
                Menu
              </a>
            </li>
            <li>
              <a href="/aboutus" className="">
                About Us
              </a>
            </li>
            <li>
              <a href="/contactus" className="">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/gallery" className="">
                Gallery
              </a>
            </li>
            <li>
              <a href="/team" className="">
                Team
              </a>
            </li>
             <li>
              <a href="/privacy" className="">
                Privacy Policy
              </a>
            </li>
           
          </ul>
        </div>

        {/* Opening Hours */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Available On</h3>
          <ul className="space-y-2 text-sm">
            <li>Saturday: 08:00 - 23:00</li>
            <li>Sunday: 08:00 - 20:00</li>
            <li>Monday: 08:00 - 20:00</li>
            <li>Tuesday: 08:00 - 20:00</li>
            <li>Wednesday: 08:00 - 20:00</li>
            <li>Thursday: 08:00 - 20:00</li>
            <li>Friday: Closed</li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-10 border-t border-gray-700 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Bhojon Demo. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
