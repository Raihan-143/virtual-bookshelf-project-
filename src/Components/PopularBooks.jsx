import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const PopularBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/books') // 👈 এখানে তোমার API URL বসাও
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
      });
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
          📚 Popular Books
        </h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-indigo-200 transition-shadow duration-300"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <img
                src={book.cover_photo}
                alt={book.book_title}
                className="w-full h-64 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800">
                  {book.book_title}
                </h3>
                <p className="text-sm text-gray-500 mb-1">by {book.book_author}</p>
                <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                  {book.book_overview}
                </p>
                <div className="flex justify-between items-center text-sm">
                  <span className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded">
                    {book.book_category}
                  </span>
                  <span className="text-gray-500">{book.total_page} pages</span>
                </div>
                <div className="mt-3 text-right text-sm text-yellow-600 font-medium">
                  👍 {book.upvote} upvotes
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularBooks;