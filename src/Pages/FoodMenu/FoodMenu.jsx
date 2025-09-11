import React from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { motion } from "framer-motion";

const menuItems = [
  {
    image: "https://i.ibb.co.com/0RrNz25T/Chicken-Angara-Kabab.png",
    title: "Chicken Angara(Chicken Angara Kabab)",
    description:
      "Our dishes are full of taste, you must love it. its a new item in our menu.",
    price: 250.0,
  },
  {
    image: "https://i.ibb.co.com/39MdKLcc/King-Prawns.png",
    title: "Kerala Fried Prawns with special sauce(1:2)",
    description:
      "Our dishes are full of taste, you must love it. its a new item in our menu.",
    price: 40.0,
  },
  {
    image: "https://i.ibb.co.com/1YyVGmbN/Fish-Fry1.png",
    title: "Fish Fry(Salmon Fish Fry-500gm)",
    description:
      "Our dishes are full of taste, you must love it. its a new item in our menu.",
    price: 700.0,
  },
  {
    image: "https://i.ibb.co.com/TDZZ6znb/Chicken-Patty-Burger.png",
    title: "Chicken Patty Burger with double cheese(regular)",
    description:
      "Our dishes are full of taste, you must love it. its a new item in our menu.",
    price: 120.0,
  },
  {
    image: "https://i.ibb.co.com/hvRz940/Egg-Sandwich.png",
    title: "Egg Sandwich and cold drinks(Egg Sandwich)",
    description:
      "Our dishes are full of taste, you must love it. its a new item.",
    price: 80.0,
  },
];

// Animation variants
const fadeDown = {
  hidden: { opacity: 0, y: -50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
  }),
};

const FoodMenu = () => {
  return (
    <section className="bg-[#f9f6ee] py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        {/* Specials */}
        <motion.p
          className="text-yellow-600 text-lg mb-1"
          variants={fadeDown}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          Specials
        </motion.p>

        {/* FOOD MENU */}
        <motion.h2
          className="text-4xl text-[#3a3a3a] md:text-5xl font-semibold mb-12"
          variants={fadeDown}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
        >
          FOOD MENU
        </motion.h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-sm overflow-hidden text-left border border-gray-200 hover:shadow-md transition duration-300"
              variants={scaleUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={index}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg text-[#3a3a3a] font-medium mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-[#c09342]">
                    Price : ${item.price.toFixed(2)}
                  </span>
                  <button className="flex items-center text-emerald-800 hover:underline">
                    Cart <FaArrowUpRightFromSquare className="ml-1 text-[12px]" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Text */}
        <motion.p
          className="text-3xl md:text-5xl text-gray-800 font-serif mb-6 leading-snug"
          variants={fadeDown}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={6}
        >
          We prepares and serves food and <br /> drinks to customers on the premises
        </motion.p>

        {/* View Full Menu Button */}
        <motion.button
          className="bg-[#c09342] text-white px-6 py-3 rounded hover:bg-[#c09342] transition cursor-pointer"
          variants={fadeDown}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={7}
        >
         <a href="/manu" className="">
                View Full Menu
              </a>
        </motion.button>
      </div>
    </section>
  );
};

export default FoodMenu;
