
import React from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-100 to-white">
      <motion.div
        className="relative w-32 h-32"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
      >
        <div className="absolute inset-0 rounded-full border-8 border-t-indigo-500 border-b-transparent border-l-indigo-300 border-r-transparent animate-spin-slow"></div>
      </motion.div>
      <motion.p
        className="ml-8 text-2xl font-semibold text-indigo-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Loading...
      </motion.p>
    </div>
  );
};

export default Loading;
