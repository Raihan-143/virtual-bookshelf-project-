import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const PopularBooks = () => {
  const [books, setBooks] = useState([]);

  // Refs এবং InView হুক
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true }); // একবার দেখা গেলেই চলবে

  useEffect(() => {
    fetch("/popularBooks.json")
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a, b) => b.upvotes - a.upvotes);
        const topBooks = sorted.slice(0, 9);
        setBooks(topBooks);
      });
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <section
      ref={sectionRef}
      className="py-12 bg-white dark:bg-gray-900"
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          📚 Popular Books
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((book, index) => (
            <motion.div
              key={book.id}
              className=" rounded-xl p-4 shadow-md hover:shadow-xl bg-white dark:bg-gray-800 transition duration-300"
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-60 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{book.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">by {book.author}</p>
              <p className="mt-2 text-sm text-indigo-500 font-medium">
                👍 {book.upvotes} upvotes
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularBooks;
