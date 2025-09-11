import React from "react";
import { motion } from "framer-motion";

import { Link } from "react-router";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";
import LuxuryRestaurant from "../LuxuryRestaurant/LuxuryRestaurant";

const  AboutUs = () => {
 
  return (
    <div className=" bg-white mt-10">
      {/* Header */}
      <motion.div
        className="bg-[#10241b] text-white text-center py-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl text-[#ffffff] font-medium"> About Us</h1>
         <p className="text-xl text-[#c09342] mt-2">
    <Link to="/" className=" text-[#c09342]">Home</Link> -  About Us
  </p>
      </motion.div>
      <LuxuryRestaurant></LuxuryRestaurant>
    <WhyChooseUs></WhyChooseUs>
    </div>
    
  );
 
};

export default AboutUs;
