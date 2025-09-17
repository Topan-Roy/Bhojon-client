
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";

const images = [
  "https://i.ibb.co.com/zTFr3G0y/res.jpg",
  "https://i.ibb.co.com/zW5Z0Cxj/res2.jpg",
  "https://i.ibb.co.com/LdKkBtcV/res4.jpg",
  "https://i.ibb.co.com/0yyR3Zwb/res5.jpg",
  "https://i.ibb.co.com/0yyR3Zwb/res5.jpg",
  "https://i.ibb.co.com/zW5Z0Cxj/res2.jpg",
];


const fadeDown = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const fadeUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i = 1) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const GallerySlider = () => {
  return (
    <div className="bg-[#0c221c] py-16">
      <motion.div
        className="text-center mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeDown}
      >
        <p className="text-[#c09342] text-xl">Our Gallery</p>
        <h2 className="text-[#ffff] text-4xl font-serif font-semibold">
          Restaurant Photo Gallery
        </h2>
      </motion.div>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Pagination, Autoplay]}
        className="max-w-7xl mx-auto px-4"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <motion.div
              className="rounded-2xl overflow-hidden shadow-md group relative"
              variants={fadeUp}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <img
                src={img}
                alt={`Gallery ${index + 1}`}
                className="w-full h-[500px] object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 text-white text-lg font-semibold">
                Our Gallery
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GallerySlider;
