import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const slideLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const slideRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const ContactPage = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12">
      {/* Top Contact Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {[
          {
            img: "https://i.ibb.co.com/KjGKhB2m/location.png",
            title: "Office Address",
            text: "123 Suspendis matti, Visaosang Building VST District, NY Accums, North American",
          },
          {
            img: "https://i.ibb.co.com/14nN4dr/call.png",
            title: "Call Us",
            text: "0123456789 | +1715 222 333",
          },
          {
            img: "https://i.ibb.co.com/8nbBmVvJ/email.png",
            title: "Send Message",
            text: "support@bhojondemo.com",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-gray-100 flex items-center gap-4 p-6 rounded-xl shadow-sm"
          >
            <div className="w-12 h-12 flex-shrink-0">
              <img src={item.img} alt={item.title} className="w-full h-full object-contain" />
            </div>
            <div>
              <h2 className="text-xl text-[#000] font-semibold mb-1">{item.title}</h2>
              <p className="text-sm text-[#000]">{item.text}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Left - Image */}
        <motion.div
          variants={slideLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="rounded-xl overflow-hidden"
        >
          <img
            src="https://i.ibb.co.com/QjDXs9rx/C.png"
            alt="Contact"
            className="w-full h-auto"
          />
        </motion.div>

        {/* Right - Contact Form */}
        <motion.div
          variants={slideRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border p-6 rounded-xl shadow-sm"
        >
          <h2 className="text-2xl font-semibold text-[#c09342] mb-4">Get In Touch</h2>
          <p className="text-sm text-gray-600 mb-6">
            It is a long established fact that a reader will be distracted by the readable
            content of a page when looking at its layout.
          </p>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  className="w-full p-3 text-[#000] border rounded-md focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  className="w-full p-3 text-[#000] border rounded-md focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  id="phone"
                  type="text"
                  placeholder="Phone"
                  className="w-full p-3 text-[#000] border rounded-md focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-3 text-[#000] border rounded-md focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="comments" className="block text-gray-700 mb-1">
                Write Your Comments
              </label>
              <textarea
                id="comments"
                placeholder="Write Your Comments"
                className="w-full p-3 text-[#000] border rounded-md h-28 resize-none focus:outline-none"
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-[#c09342] text-white w-full px-6 py-3 rounded-md hover:bg-[#a87a33] transition"
            >
              Send
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
