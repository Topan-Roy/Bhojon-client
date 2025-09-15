import React from 'react';
import logo from "../../assets/p2.png";
import { Link } from 'react-router'; 

const BhojonNext = () => {
  return (
    <div>
      <Link to="/">
        <div className="">
          <img className=" h-10 w-30 " src={logo} alt="TourNest Logo" />
          <p className="text-3xl font-extrabold text-[#443dff] dark:text-white"></p>
        </div>
      </Link>
    </div>
  );
};

export default BhojonNext;
