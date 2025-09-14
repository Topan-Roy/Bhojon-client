import React from "react";
import { motion } from "framer-motion";

import { Link } from "react-router";

import ExpertChefs from "../ExpertChefs/ExpertChefs";
import ScrollToTopButton from "../ScrollToTopButton/ScrollToTopButton";
import ProductCard from "./ProductCard/ProductCard";

const OnlineOrder = () => {
 
  return (
    <div className=" bg-white mt-10">
      {/* Header */}
      <motion.div
        className="bg-[#10241b] text-white text-center py-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl text-[#ffffff] font-medium"> Team</h1>
         <p className="text-xl text-[#c09342] mt-2">
    <Link to="/" className=" text-[#c09342]">Home</Link> -  OnlineOrder
  </p>
      </motion.div>
    <ProductCard></ProductCard>
      <ScrollToTopButton></ScrollToTopButton>
    </div>
    
  );
 
};

export default OnlineOrder;
