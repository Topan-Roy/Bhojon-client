import React from "react";
import { motion } from "framer-motion";

const LuxuryRestaurant = () => {
  const features = [
    {
      icon: "https://i.ibb.co.com/Nd7Kn9XH/i3.png",
      title: "Fresh Ingredients",
      description: "We use best freshest ingredients to make every dish perfect.",
    },
    {
      icon: "https://i.ibb.co.com/VWjtRGgD/i2.png",
      title: "Friendly Service",
      description: "Dedicated to ensuring seamless service with available.",
    },
    {
      icon: "https://i.ibb.co.com/Mx5wYWX8/i1.png",
      title: "Relaxing",
      description: "Enjoy your meal in a cozy and welcoming environment.",
    },
    {
      icon: "https://i.ibb.co.com/s93mtGw4/i.png",
      title: "Delicious Food",
      description: "Our dishes are full of fresh, bold flavors that you'll love.",
    },
  ];

  const fadeDown = {
    hidden: { opacity: 0, y: -50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeInOut" },
    }),
  };

  return (
    <section className="text-center bg-white w-full px-4 py-16 md:py-24 mt-35 md:mt-0">
      <div className="max-w-6xl mx-auto">
        <motion.h5
          className="text-[#c09342] text-lg mb-2 tracking-wide"
          variants={fadeDown}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          Welcome To Our Luxury Restaurant
        </motion.h5>

        <motion.h1
          className="text-4xl text-[#3a3a3a] md:text-5xl font-bold mb-6"
          variants={fadeDown}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
        >
          Serve Quality Food & Thing
        </motion.h1>

        <motion.p
          className="max-w-3xl mx-auto text-gray-600 mb-12 leading-relaxed"
          variants={fadeDown}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
        >
          Exercitation photo booth stumptown tote bag Banksy, elit small batch
          freegan sed. Craft beer elit seitan exercitation, photo booth et 8-bit
          kale chips proident chillwave deep v laborum. Aliquip veniam delectus,
          Marfa eiusmod Pinterest in do umami readymade swag.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="text-center"
              variants={fadeDown}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={index + 3} 
            >
              <div className="flex justify-center mb-4">
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="h-12 w-12 object-contain"
                />
              </div>
              <h3 className="text-lg text-[#000] font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="flex justify-center gap-4"
          variants={fadeDown}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={7} 
        >
          <button className="bg-[#c09342] text-white px-6 py-3 rounded hover:bg-[#c09342] transition duration-200 cursor-pointer">
           <a href="/reservation" className="">
               Reservation
              </a>
          </button>
          <button className="border border-[#c09342] text-[#000]  px-6 py-3 rounded hover:bg-[#c09342] hover:text-[#ffffff] transition duration-200 cursor-pointer">
           <a href="/manu" className="">
               Open Menu
              </a>
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default LuxuryRestaurant;
