import React from "react";
import { motion } from "framer-motion";

const menu = {
  Desserts: [
    ["Black Truffle Tagliatelle", 30],
    ["Ice Strawberry Cream", 100],
    ["Butter Queen Vanilla", 200],
    ["Masala Tea", 15],
    ["Green Tea Special", 20],
    ["Mineral Water", 20],
  ],
  Sides: [
    ["Black Truffle Tagliatelle", 30],
    ["Special Wonton", 30],
    ["Chicken Fry and French Fries", 60],
    ["Beef Shawarma", 150],
    ["Chicken Shawarma Roll", 100],
    ["Vegetable Pizza", 100],
  ],
  Mains: [
    ["Chicken Fry and French Fries", 60],
    ["Cheese Lover Pizza", 150],
    ["Vegetable Shawarma", 120],
    ["Vegetarian Curry", 300],
  ],
  "Soups & Salads": [
    ["Minestrone Soup", 100],
    ["Creamy Potato Soup", 150],
    ["Black Truffle Tagliatelle", 30],
    ["Vegetable Beef soup with Noodles", 120],
  ],
  Starters: [
    ["Tawa Naan", 35],
    ["Egg Sandwich and cold drinks", 80],
    ["Spring Rolls", 70],
    ["Chicken Chowmein", 50],
    ["Mixed Chowmein and Cold Drinks", 100],
    ["Garlic naan", 20],
  ],
  "Signature Cocktails": [
    ["Orange juice", 25],
    ["Special Summer", 100],
    ["Lemon And Honey Tea", 30],
    ["Beef Patty Burger", 130],
    ["Chicken BBQ Burger", 140],
    ["Chicken Nug Sauce Burger", 150],
    ["Chicken Sub Sandwich", 100],
    ["Special Sub Sandwich", 200],
    ["Sparkling water", 20],
  ],
  "From the Grill": [
    ["Tomahawk Steak (for 2)", 20],
    ["Chicken Angara", 250],
    ["Mutton Seekh Kebab", 400],
    ["Prime Angus Ribeye (300g)", 45],
    ["Chicken Patty Burger with double cheese", 120],
  ],
  "From the Sea": [
    ["Kerala Fried Prawns with special sauce", 40],
    ["Fish Fry", 700],
    ["Squid Fry", 400],
    ["Atlantic Salmon with Sauce", 50],
  ],
  "Pasta & Risotto": [
    ["Burger+Potato Fries", 50],
    ["Black Truffle Tagliatelle", 30],
    ["Pasta Full Pack", 500],
    ["Ice Cream Ship", 600],
    ["Free-Range Chicken Supreme", 110],
  ],
};

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
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const ChefSelection = () => {
  return (
    <section className="bg-[#0f2220] text-white py-20 px-4">
      <motion.div
        className="text-center mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.p
          className="text-yellow-600 uppercase text-sm mb-2"
          variants={fadeUp}
          custom={1}
        >
          Tasty Menu Today
        </motion.p>
        <motion.h2
          className="text-4xl md:text-5xl font-bold tracking-wide"
          variants={fadeUp}
          custom={2}
        >
          Chef Selection
        </motion.h2>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {Object.entries(menu).map(([category, items], index) => (
          <motion.div
            key={category}
            className="bg-[#18312e] p-4 rounded shadow hover:shadow-lg transition"
            variants={scaleUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={index + 1}
          >
            <h3 className="text-yellow-600 font-semibold mb-3">{category}</h3>
            <ul className="space-y-2 text-sm">
              {items.map(([item, price], i) => (
                <motion.li
                  key={i}
                  className="flex justify-between border-b border-dotted border-gray-600 pb-1"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.1}
                >
                  <span>{item}</span>
                  <span className="text-[#c09342] font-semibold">
                    ${price.toFixed(2)}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ChefSelection;
