import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Michael Hill",
    text: "Bhojon makes running my restaurant stress-free. The POS is super smooth, and managing online orders is now effortless.",
    image: "https://i.ibb.co.com/0Rc9jMQT/P3.png",
  },
  {
    name: "Olive Machy",
    text: "The flexibility is amazing. I can manage my whole restaurant from one system. Customers love the fast service!",
    image: "https://i.ibb.co.com/cXyFygJd/P.png",
  },
  {
    name: "James Peter",
    text: "I run two restaurants, and Bhojon keeps everything organized—from inventory to HR. Couldn’t be happier!",
    image: "https://i.ibb.co.com/ksLhG8jD/P1.png",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
  }),
};

const Testimonials = () => {
  return (
    <div className="bg-[#081E1F] text-white py-20 px-4 md:px-12">
      <div className="max-w-7xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-[#c09342] text-lg mb-2"
        >
          Testimonials
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-semibold mb-16 leading-tight"
        >
          What Our Customers Say
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <div className="flex justify-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full border-4 border-white shadow-md z-10 relative"
                />
              </div>
              <div className="bg-white text-gray-700 mt-[-40px] pt-12 px-6 pb-6 rounded-tl-[60px] rounded-tr-[10px] rounded-bl-[10px] rounded-br-[60px] shadow-xl">
                <p className="text-[17px]  font-normal italic leading-relaxed mb-4">
                  “{testimonial.text}”
                </p>

                <div className="flex justify-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-[#FBBF24] fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.564-.955L10 0l2.948 5.955 6.564.955-4.756 4.635 1.122 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[#c09342] font-medium">{testimonial.name}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-2 mt-10"
        >
          <span className="w-3 h-3 rounded-full bg-[#C1985B]"></span>
          <span className="w-3 h-3 rounded-full bg-gray-600"></span>
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;
