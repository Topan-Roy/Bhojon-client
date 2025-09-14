import React from "react";
import { motion } from "framer-motion";

import { Link } from "react-router";

import ContactPage from "../Gallery/ContactPage";
import ScrollToTopButton from "../ScrollToTopButton/ScrollToTopButton";

const  ContactUs = () => {
 
  return (
    <div className=" bg-white mt-10">
      {/* Header */}
      <motion.div
        className="bg-[#10241b] text-white text-center py-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl text-[#ffffff] font-medium"> Contact Us</h1>
         <p className="text-xl text-[#c09342] mt-2">
    <Link to="/" className=" text-[#c09342]">Home</Link> -  Contact Us
  </p>
      </motion.div>
   <ContactPage></ContactPage>
   <ScrollToTopButton></ScrollToTopButton>
    </div>
    
  );
 
};

export default ContactUs;
