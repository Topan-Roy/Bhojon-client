import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  AiOutlineUser,
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiOutlinePhone,
} from "react-icons/ai";
import { Link } from "react-router";

const Reservation = () => {
  const [form, setForm] = useState({
    totalPerson: "",
    date: new Date().toISOString().split("T")[0],
    time: "",
    contact: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert("Reservation submitted!");
  };

  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <div className="min-h-screen bg-white ">
      {/* Header */}
      

      {/* Main Section */}
      <div className="container mx-auto px-4 py-12 grid md:grid-cols-2 gap-10 items-center">
        {/* Image */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://i.ibb.co.com/LVTXVtv/T.png"
            alt="Reserved Table"
            className="rounded-3xl shadow-lg w-[350px] h-auto object-cover"
          />
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-5 max-w-md w-full mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <motion.p variants={fadeUp} custom={1} className="text-xl text-[#c09342] mt-2">
            Reservation
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={2}
            className="text-4xl font-extrabold text-[#112a2a]"
          >
            BOOK YOUR TABLE
          </motion.h2>

          {/* Total Person */}
          <motion.div variants={fadeUp} custom={3} className="relative">
            <AiOutlineUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
            <input
              type="number"
              name="totalPerson"
              value={form.totalPerson}
              onChange={handleChange}
              placeholder="Total Person"
              className="w-full pl-12 pr-4 py-3 text-[#000] border border-gray-300 rounded bg-gray-100"
              required
            />
          </motion.div>

          {/* Date */}
          <motion.div variants={fadeUp} custom={4} className="relative">
            <AiOutlineCalendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 text-[#000] border border-gray-300 rounded bg-gray-100"
              required
            />
          </motion.div>

          {/* Time */}
          <motion.div variants={fadeUp} custom={5} className="relative">
            <AiOutlineClockCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 text-[#000] border border-gray-300 rounded bg-gray-100"
              required
            />
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeUp} custom={6} className="relative">
            <AiOutlinePhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
            <input
              type="tel"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              placeholder="Contact No."
              className="w-full pl-12 pr-4 py-3 text-[#000] border border-gray-300 rounded bg-gray-100"
              required
            />
          </motion.div>

          {/* Button */}
          <motion.button
            variants={fadeUp}
            custom={7}
            type="submit"
            className="w-full bg-[#c09342] text-white py-3 rounded font-bold hover:bg-[#c09342] cursor-pointer"
          >
            BOOK TABLE
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
};

export default Reservation;
