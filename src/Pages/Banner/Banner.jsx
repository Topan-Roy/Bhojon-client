import React from "react";
import { motion } from "framer-motion";
import { FaYoutube } from "react-icons/fa";

const Banner = () => {
  return (
    <section className="relative bg-[#081d1c] w-full h-[90vh] bg-cover bg-center flex items-center mt-10">

      <div className="absolute inset-0 bg-[#081d1c]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="text-[#ffffff] md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-medium mb-4 font-montserrat mt-40 md:mt-5">
            Delicious food & wonderful eating experience
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Discover bold flavors and unforgettable dishes in a place where every craving is satisfied with the perfect bite, crafted just for you.
          </p>

          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="bg-[#c09342] hover:bg-[#c09342] px-6 py-3 rounded-lg font-semibold shadow-lg cursor-pointer"
            >
             <a href="/reservation" className="">
               Reservation
              </a>
              
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="px-6 py-2 rounded-lg border-1  border-[#c09342] hover:bg-[#c09342]   font-semibold cursor-pointer"
            >
              <a href="/manu" className="">
               Open Menu
              </a>
             
            </motion.button>
          </div>
        </div>
  
        <div className="relative md:w-1/2 grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <img
              src="https://i.ibb.co.com/N6gTK7xF/H.png"
              alt="Dish 1"
              className="rounded-lg object-cover h-[45%]"
            />
            <img
              src="https://i.ibb.co.com/HDY1824n/H1.png"
              alt="Dish 2"
              className="rounded-lg object-cover h-[45%]"
            />
          </div>
          <div className="relative rounded-lg overflow-hidden">
            <img
              src="https://i.ibb.co.com/VWfYQBDR/H2.png"
              alt="Dish 3"
              className="w-full h-full object-cover"
            />
          </div>
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            rel="noreferrer"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#c09342] text-7xl bg-black/20 hover:bg-amber-500/50 p-6 rounded-full flex items-center justify-center z-20"
          >
            <FaYoutube />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Banner;
