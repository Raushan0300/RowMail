import React from "react";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";

const HeroSection: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20 overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-20"></div>
      <div className="container mx-auto text-center relative z-10">
        <h1 className="text-5xl font-bold mb-6">Welcome to RowMail</h1>
        <p className="text-xl mb-8">
          Schedule emails, send personalized emails to multiple recipients, and
          more.
        </p>
        <p className="text-lg font-semibold mb-8 flex justify-center items-center gap-2">
          Now only supports
          <span className="flex items-center gap-1">
            <FcGoogle size={36} />
            {/* <span className="text-blue-600">G</span>
            <span className="text-red-600">o</span>
            <span className="text-yellow-600">o</span>
            <span className="text-blue-600">g</span>
            <span className="text-green-600">l</span>
            <span className="text-red-600">e</span> */}
          </span>
          Account sign-in
        </p>
        <a
          href="/api/auth"
          className="relative inline-block px-8 py-3 font-semibold text-blue-600 bg-white rounded-full shadow-lg transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Login with Google
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-green-500 opacity-50 blur-lg"></span>
        </a>
      </div>
    </motion.section>
  );
};

export default HeroSection;
