import React from "react";
import { Link } from "react-router"; 

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 py-12">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-[#C1985B]">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mt-4">Page Not Found</h2>
        <p className="text-gray-600 mt-2 mb-6">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-[#C1985B] hover:bg-[#a87c3d] text-white px-6 py-3 rounded-md transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
