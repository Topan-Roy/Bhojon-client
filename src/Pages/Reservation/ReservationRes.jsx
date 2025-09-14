import React from "react";
import { motion } from "framer-motion";

import { Link } from "react-router";
import Reservation from "./Reservation";
import GallerySlider from "../GallerySlider/GallerySlider";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";
import ExpertChefs from "../ExpertChefs/ExpertChefs";
import ScrollToTopButton from "../ScrollToTopButton/ScrollToTopButton";

const ReservationRes = () => {
 
  return (
    <div className=" bg-white mt-10">
      {/* Header */}
      <motion.div
        className="bg-[#10241b] text-white text-center py-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl text-[#ffffff] font-medium">Reservation</h1>
         <p className="text-xl text-[#c09342] mt-2">
    <Link to="/" className=" text-[#c09342]">Home</Link> - Reservation
  </p>
      </motion.div>
      <Reservation></Reservation>
            <GallerySlider></GallerySlider>
            <WhyChooseUs></WhyChooseUs>
            <ExpertChefs></ExpertChefs>
             <ScrollToTopButton></ScrollToTopButton>
    </div>
  );
};

export default ReservationRes;
