import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Ayesha Rahman',
      feedback: 'This site has completely changed my reading habits. I love the recommendations!',
      photo: 'https://randomuser.me/api/portraits/women/79.jpg'
    },
    {
      name: 'Tanvir Hasan',
      feedback: 'The featured categories are exactly what I needed to find books I love.',
      photo: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      name: 'Fatima Jahan',
      feedback: 'Very clean UI, smooth experience and helpful book reviews. Loved it!',
      photo: 'https://randomuser.me/api/portraits/women/43.jpg'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12 text-indigo-700">💬 What Readers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              className="bg-indigo-50 rounded-xl shadow p-6 relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <FaQuoteLeft className="text-indigo-300 text-3xl absolute -top-4 -left-4" />
              <img src={t.photo} alt={t.name} className="w-16 h-16 mx-auto rounded-full mb-4 border-2 border-indigo-400" />
              <p className="text-gray-700 italic">"{t.feedback}"</p>
              <h4 className="mt-4 font-semibold text-indigo-600">{t.name}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
