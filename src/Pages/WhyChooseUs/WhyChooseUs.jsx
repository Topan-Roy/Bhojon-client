import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const fadeRight = {
  hidden: { opacity: 0, x: -50 },
  visible: (i = 1) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: 50 },
  visible: (i = 1) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const WhyChooseUs = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <motion.div
          className="grid grid-cols-2 gap-4"
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="space-y-4">
            <motion.img
              src="https://i.ibb.co.com/G3v7pndz/W1.png"
              alt="food"
              className="rounded-lg object-cover w-full h-60"
              variants={fadeUp}
              custom={1}
            />
            <motion.img
              src="https://i.ibb.co.com/svMcy54X/W2.png"
              alt="restaurant"
              className="rounded-lg object-cover w-full h-60"
              variants={fadeUp}
              custom={2}
            />
          </div>
          <motion.div
            className="flex items-center h-full"
            variants={fadeUp}
            custom={3}
          >
            <img
              src="https://i.ibb.co.com/tMPYN0qS/W.png"
              alt="chef"
              className="rounded-lg object-cover w-full h-[500px]"
            />
          </motion.div>
        </motion.div>
        <motion.div
          className="text-left"
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p
            className="text-yellow-600 text-lg mb-2"
            variants={fadeUp}
            custom={1}
          >
            Why choose us?
          </motion.p>

          <motion.h2
            className="text-4xl text-[#3a3a3a] md:text-5xl font-bold mb-6 leading-tight"
            variants={fadeUp}
            custom={2}
          >
            Enjoying the <br /> beautiful things
          </motion.h2>

          <motion.p
            className="text-[#3a3a3a] mb-6 max-w-lg"
            variants={fadeUp}
            custom={3}
          >
            Discover bold flavors and unforgettable dishes in a place where
            every craving is satisfied with the perfect bite, crafted just for
            you.
          </motion.p>

          {/* List */}
          <motion.ul
            className="space-y-3 mb-8 text-gray-700"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              "She sushi here is always fresh & beautifully",
              "We invite everyone to see how our products",
              "We invite everyone to see how our products",
            ].map((text, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-2"
                variants={fadeUp}
                custom={i + 4}
              >
                <FaCheckCircle className="text-black mt-1" />
                <span>{text}</span>
              </motion.li>
            ))}
          </motion.ul>
          <motion.div
            className="flex gap-4"
            variants={fadeUp}
            custom={7}
          >
            <button className="bg-[#c09342] text-white px-6 py-3 rounded hover:bg-[#a67c2d] transition cursor-pointer">
             <a href="/reservation" className="">
               Reservation
              </a>
            </button>
            <button className="border border-yellow-700 text-[#3a3a3a] px-6 py-3 rounded hover:bg-[#c09342] hover:text-white transition cursor-pointer">
             <a href="/manu" className="">
                Open Menu
              </a>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
