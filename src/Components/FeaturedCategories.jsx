import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FeaturedCategories = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);

  useEffect(() => {
    fetch('/features.json')
      .then((res) => res.json())
      .then((data) => {
        const uniqueCategories = [];
        const categoryMap = new Map();

        for (const book of data) {
          if (!categoryMap.has(book.book_category) && uniqueCategories.length < 4) {
            categoryMap.set(book.book_category, true);
            uniqueCategories.push(book);
          }
        }

        setFeaturedBooks(uniqueCategories);
      });
  }, []);

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          🎯 Featured Book Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredBooks.map((book, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-blue-300 transition-all duration-300 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <img
                src={book.cover_photo}
                alt={book.book_title}
                className="h-52 w-full object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-blue-700">{book.book_category}</h3>
                <p className="text-gray-700 font-medium mt-1">{book.book_title}</p>
                <p className="text-gray-500 text-sm mb-4">by {book.book_author}</p>
                <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  Browse {book.book_category}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
