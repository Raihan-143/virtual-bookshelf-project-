import React from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import errorAnimation from '../assets/lottie/404-error.json';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-red-50 to-white">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-80 h-80"
      >
        <Lottie animationData={errorAnimation} loop={true} />
      </motion.div>

      <motion.p 
        className="mt-4 text-2xl text-red-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Oops! Page not found.
      </motion.p>
      
      <motion.div 
        className="mt-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <a href="/" className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:bg-red-600 transition">
          Go Back Home
        </a>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
