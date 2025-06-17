import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { AuthContext } from '../contexts/AuthContext';

const AddBook = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    book_title: '',
    cover_photo: '',
    total_page: '',
    book_author: '',
    book_category: 'Fiction',
    reading_status: 'Want-to-Read',
    book_overview: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const newBook = {
      ...formData,
      user_email: user.email, 
      user_name: user.displayName,
      upvote: 0,
    };
    const res = await fetch('http://localhost:5000/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBook),
    });
    const result = await res.json();
    if (result.insertedId) {
      Swal.fire('Success!', 'Book added successfully!', 'success');
      setFormData({
        book_title: '',
        cover_photo: '',
        total_page: '',
        book_author: '',
        book_category: 'Fiction',
        reading_status: 'Want-to-Read',
        book_overview: '',
      });
    }
  };

  return (
    <motion.div className="max-w-3xl mx-auto my-10 p-8 bg-white shadow-xl rounded-xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-center mb-6">📚 Add a New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="book_title" value={formData.book_title} onChange={handleChange} placeholder="Book Title" required className="input input-bordered w-full" />
        <input type="text" name="cover_photo" value={formData.cover_photo} onChange={handleChange} placeholder="Cover Photo URL" required className="input input-bordered w-full" />
        <input type="number" name="total_page" value={formData.total_page} onChange={handleChange} placeholder="Total Pages" required className="input input-bordered w-full" />
        <input type="text" name="book_author" value={formData.book_author} onChange={handleChange} placeholder="Author Name" required className="input input-bordered w-full" />
        <div className="grid grid-cols-2 gap-4">
          <select name="book_category" value={formData.book_category} onChange={handleChange} className="select select-bordered w-full">
            <option>Fiction</option><option>Non-Fiction</option><option>Fantasy</option>
          </select>
          <select name="reading_status" value={formData.reading_status} onChange={handleChange} className="select select-bordered w-full">
            <option>Read</option><option>Reading</option><option>Want-to-Read</option>
          </select>
        </div>
        <textarea name="book_overview" value={formData.book_overview} onChange={handleChange} placeholder="Book Overview" className="textarea textarea-bordered w-full" />
        <button type="submit" className="btn btn-primary w-full">➕ Add Book</button>
      </form>
    </motion.div>
  );
};

export default AddBook;
