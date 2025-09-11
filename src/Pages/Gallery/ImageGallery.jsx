import React from "react";

const ImageGallery = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Row 1 */}
        <div className="rounded-xl overflow-hidden h-[250px]">
          <img
            src="https://i.ibb.co/B5fpnYJn/G5.png"
            alt="chairs"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="rounded-xl overflow-hidden h-[250px]">
          <img
            src="https://i.ibb.co/KxG9C1dv/G4.png"
            alt="chefs"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Row 2 */}
        <div className="md:col-span-2 rounded-xl overflow-hidden h-[300px]">
          <img
            src="https://i.ibb.co/zhNKmtRz/G3.png"
            alt="chef"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Row 3 */}
        <div className="rounded-xl overflow-hidden h-[250px]">
          <img
            src="https://i.ibb.co/zhxTc3XJ/G2.png"
            alt="dining"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="rounded-xl overflow-hidden h-[250px]">
          <img
            src="https://i.ibb.co/0pD2kTSp/G1.png"
            alt="dish"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Row 4 */}
        <div className="md:col-span-2 rounded-xl overflow-hidden h-[300px]">
          <img
            src="https://i.ibb.co/Dff76SCd/G.png"
            alt="restaurant"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
