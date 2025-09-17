import React from "react";
import { motion } from "framer-motion";

const chefs = [
  {
    name: "Chef Alessandro Bianchi",
    image: "https://i.ibb.co.com/Zzscm5kD/C8.png",
  },
  {
    name: "Chef Jonathan Lee",
    image: "https://i.ibb.co.com/8gYrNFFq/C7.png",
  },
  {
    name: "Chef Maria Gomez",
    image: "https://i.ibb.co.com/4njgrkFj/C6.png",
  },
  {
    name: "Chef Marco Rossi",
    image: "https://i.ibb.co.com/BVYqWJbH/C5.png",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i = 1) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
  }),
};

const ExpertChefs = () => {
  return (
    <section className="py-16 bg-white text-center">
     
      <motion.p
        className="text-lg text-yellow-600 font-medium mb-2"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0}
      >
        Professional
      </motion.p>

      <motion.h2
        className="text-5xl font-serif text-[#000] font-medium mb-12"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={1}
      >
        OUR EXPERT CHEFS
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 max-w-7xl mx-auto">
        {chefs.map((chef, index) => (
          <motion.div
            key={index}
            className="bg-gray-100 rounded-2xl p-6 flex flex-col items-center"
            variants={scaleUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={index + 2}
          >
            <img
              src={chef.image}
              alt={chef.name}
              className="w-40 h-40 object-cover rounded-full mb-4"
            />
            <h3 className="text-lg text-[#000] font-serif">{chef.name}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ExpertChefs;
