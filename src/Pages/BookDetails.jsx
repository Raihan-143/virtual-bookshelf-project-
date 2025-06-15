import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../contexts/AuthContext";
import { useParams } from "react-router";

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext); // To get logged-in user
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/books/${id}`)
      .then(res => res.json())
      .then(data => setBook(data));
  }, [id]);

  const handleUpvote = async () => {
    if (!user || user.email === book.user_email) return;
    const res = await fetch(`http://localhost:5000/books/upvote/${id}`, {
      method: "PATCH",
    });
    if (res.ok) {
      setBook(prev => ({ ...prev, upvote: prev.upvote + 1 }));
    }
  };

  const handleStatusUpdate = async () => {
    const nextStatus =
      book.reading_status === "Want-to-Read"
        ? "Reading"
        : book.reading_status === "Reading"
        ? "Read"
        : null;

    if (!nextStatus) return;

    const res = await fetch(`http://localhost:5000/books/status/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reading_status: nextStatus }),
    });
    if (res.ok) {
      setBook(prev => ({ ...prev, reading_status: nextStatus }));
    }
  };

  if (!book) return <div className="text-center mt-20">Loading...</div>;

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 bg-white shadow rounded mt-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="grid md:grid-cols-2 gap-6">
        <img
          src={book.cover_photo}
          alt={book.book_title}
          className="w-full h-96 object-cover rounded"
        />
        <div>
          <h2 className="text-3xl font-bold mb-2">{book.book_title}</h2>
          <p className="text-gray-700 mb-1">✍️ Author: {book.book_author}</p>
          <p className="mb-1">📚 Category: {book.book_category}</p>
          <p className="mb-1">📖 Total Pages: {book.total_page}</p>
          <p className="mb-1">🔼 Upvotes: {book.upvote}</p>
          <p className="mb-1">📘 Reading Status: {book.reading_status}</p>
          <p className="text-gray-600 mt-3">{book.book_overview}</p>
          <p className="mt-4 text-sm text-gray-400">
            📩 Added by: {book.user_name} ({book.user_email})
          </p>

          {/* Upvote button */}
          {user && user.email !== book.user_email && (
            <button
              onClick={handleUpvote}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
            >
              Upvote 👍
            </button>
          )}

          {/* Status update for book owner */}
          {user && user.email === book.user_email && (
            <button
              onClick={handleStatusUpdate}
              className="mt-4 ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Update Status 🔁
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BookDetails;
