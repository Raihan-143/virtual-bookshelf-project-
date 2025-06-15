import React from 'react';
import { motion } from 'framer-motion';

const TopAuthors = () => {
  const authors = [
    {
      name: 'Paulo Coelho',
      photo: 'https://images3.penguinrandomhouse.com/author/5234',
      books: 'The Alchemist, Brida, Eleven Minutes'
    },
    {
      name: 'Sally Rooney',
      photo: 'https://cdn.britannica.com/45/236745-050-6FB7333F/Irish-author-Sally-Rooney-2020.jpg',
      books: 'Normal People, Conversations with Friends'
    },
    {
      name: 'Malcolm Gladwell',
      photo: 'https://images.squarespace-cdn.com/content/v1/5f7671d12c27e40b67ce4400/1612310624540-I2MOA2OD09FU602AYPWS/MalcolmGladwell.jpg',
      books: 'Outliers, Blink, The Tipping Point'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-indigo-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">🖋️ Meet The Authors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {authors.map((author, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-xl shadow hover:shadow-indigo-300 p-6 text-center"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <img src={author.photo} alt={author.name} className="w-24 h-24 rounded-full mx-auto object-cover mb-4 border-4 border-indigo-200" />
              <h3 className="text-xl font-semibold text-indigo-700">{author.name}</h3>
              <p className="text-sm text-gray-600 mt-2">Famous Books: <br /> <span className="italic">{author.books}</span></p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopAuthors;

