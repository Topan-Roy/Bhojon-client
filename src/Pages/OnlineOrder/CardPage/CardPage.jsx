import React from "react";
import { motion } from "framer-motion";

import { Link } from "react-router";



const CardPage = () => {

    return (
        <div className=" bg-white w-full">
            <motion.div
                className="bg-[#10241b] text-white text-center px-10 py-12"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-5xl text-[#ffffff] font-medium"> Card Page</h1>
                <p className="text-xl text-[#c09342] mt-2">
                    <Link to="/" className=" text-[#c09342]">Home</Link> -  Card Page
                </p>
            </motion.div>

        </div>

    );

};

export default CardPage;
