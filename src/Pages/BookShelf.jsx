import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const Bookshelf = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/books')
      .then(res => res.json())
      .then(data => setBooks(data));
  }, []);

  const filteredBooks = books.filter(book => {
    const matchTitle = book.book_title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchAuthor = book.book_author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter ? book.reading_status === statusFilter : true;
    return (matchTitle || matchAuthor) && matchStatus;
  });

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">📚 Favourites Books</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center">
        <input
          type="text"
          placeholder="Book or Write Author Name..."
          className="border p-2 rounded w-full md:w-1/2"
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select
          className="border p-2 rounded w-full md:w-1/4"
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Read">Read</option>
          <option value="Reading">Reading</option>
          <option value="Want-to-Read">Want-to-Read</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredBooks.map((book, index) => (
          <motion.div
            key={book._id}
            className="bg-white rounded shadow p-4 hover:shadow-lg transition-all"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link to={`/books/${book._id}`}>
              <img
                src={book.cover_photo}
                alt={book.book_title}
                className="h-60 w-full object-cover rounded mb-4"
              />
              <h2 className="text-xl font-semibold mb-1">{book.book_title}</h2>
              <p className="text-sm text-gray-600">✍️ {book.book_author}</p>
              <p className="text-sm">📚 {book.book_category}</p>
              <p className="text-sm">📖 {book.reading_status}</p>
              <p className="text-sm">🔼 Upvotes: {book.upvote}</p>
            </Link>
            <Link to={`/books/${book._id}`}>
              <button className="mt-3 bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700 transition cursor-pointer">
                See Details
              </button>
            </Link>

          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Bookshelf;
