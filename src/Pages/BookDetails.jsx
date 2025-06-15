import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../contexts/AuthContext";
import { useParams } from "react-router";
import Swal from "sweetalert2";

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [book, setBook] = useState(null);
  const [editReviewMode, setEditReviewMode] = useState(false);
  const [editMessage, setEditMessage] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");

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
      Swal.fire("Upvoted!", "You have upvoted this book.", "success");
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
      Swal.fire("Status Updated!", `Now: ${nextStatus}`, "success");
    }
  };

  const handleReviewSubmit = async () => {
    if (!user) return Swal.fire("Error", "Please login to post a review.", "error");
    if (!reviewMessage) return;

    const newReview = {
      user_name: user.displayName || "Anonymous",
      user_email: user.email,
      message: reviewMessage,
      date: new Date()
    };

    const res = await fetch(`http://localhost:5000/books/review/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview)
    });

    if (res.ok) {
      setBook(prev => ({ ...prev, reviews: [...(prev.reviews || []), newReview] }));
      setReviewMessage("");
      Swal.fire("Review Added!", "Thanks for your review.", "success");
    } else {
      Swal.fire("Error", "Could not add review.", "error");
    }
  };

  const handleReviewEdit = async () => {
    const res = await fetch(`http://localhost:5000/books/review/edit/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_email: user.email, updatedMessage: editMessage }),
    });

    if (res.ok) {
      const updatedReviews = book.reviews.map(r =>
        r.user_email === user.email ? { ...r, message: editMessage, date: new Date() } : r
      );
      setBook(prev => ({ ...prev, reviews: updatedReviews }));
      setEditReviewMode(false);
      Swal.fire("Review Updated!", "", "success");
    } else {
      Swal.fire("Error", "Could not update review.", "error");
    }
  };

  const handleReviewDelete = async () => {
    const res = await fetch(`http://localhost:5000/books/review/delete/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_email: user.email }),
    });

    if (res.ok) {
      const updatedReviews = book.reviews.filter(r => r.user_email !== user.email);
      setBook(prev => ({ ...prev, reviews: updatedReviews }));
      Swal.fire("Deleted!", "Your review has been deleted.", "success");
    } else {
      Swal.fire("Error", "Could not delete review.", "error");
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

          {user && user.email !== book.user_email && (
            <button
              onClick={handleUpvote}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
            >
              Upvote 👍
            </button>
          )}

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

      {/* Review Section */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-3">Reviews</h3>

        {user && !book.reviews?.some(r => r.user_email === user.email) && (
          <div className="mb-5">
            <textarea
              value={reviewMessage}
              onChange={e => setReviewMessage(e.target.value)}
              placeholder="Write your review here..."
              className="w-full p-2 border rounded mb-2"
            />
            <button
              onClick={handleReviewSubmit}
              className="bg-purple-600 text-white px-4 py-2 rounded cursor-pointer"
            >
              Submit Review
            </button>
          </div>
        )}

        {book.reviews && book.reviews.length > 0 ? (
          book.reviews.map((r, idx) => (
            <div key={idx} className="mb-4 border-b pb-2">
              <p className="font-semibold">{r.user_name}</p>
              <p className="text-sm text-gray-600">{new Date(r.date).toLocaleString()}</p>

              {user && user.email === r.user_email && editReviewMode ? (
                <>
                  <textarea
                    value={editMessage}
                    onChange={(e) => setEditMessage(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleReviewEdit}
                      className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditReviewMode(false)}
                      className="bg-gray-400 text-white px-3 py-1 rounded cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-gray-800">{r.message}</p>
              )}

              {user && user.email === r.user_email && !editReviewMode && (
                <div className="mt-2 flex gap-3 text-sm">
                  <button
                    onClick={() => {
                      setEditMessage(r.message);
                      setEditReviewMode(true);
                    }}
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={handleReviewDelete}
                    className="text-red-600 hover:underline cursor-pointer"
                  >
                    🗑️ Delete
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>
    </motion.div>
  );
};

export default BookDetails;
