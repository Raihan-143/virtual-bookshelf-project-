import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/books/${id}`)
      .then(res => res.json())
      .then(data => setFormData(data));
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/books/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const result = await res.json();
    if (result.modifiedCount > 0) {
      Swal.fire('Updated!', 'Book updated successfully!', 'success');
      navigate('/my-books');
    }
  };

  if (!formData) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto my-10 p-8 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-6">📝 Update Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="book_title" value={formData.book_title} onChange={handleChange} required className="input input-bordered w-full" />
        <input type="text" name="cover_photo" value={formData.cover_photo} onChange={handleChange} required className="input input-bordered w-full" />
        <input type="number" name="total_page" value={formData.total_page} onChange={handleChange} required className="input input-bordered w-full" />
        <input type="text" name="book_author" value={formData.book_author} onChange={handleChange} required className="input input-bordered w-full" />
        <select name="book_category" value={formData.book_category} onChange={handleChange} className="select select-bordered w-full">
          <option>Fiction</option><option>Non-Fiction</option><option>Fantasy</option>
        </select>
        <select name="reading_status" value={formData.reading_status} onChange={handleChange} className="select select-bordered w-full">
          <option>Read</option><option>Reading</option><option>Want-to-Read</option>
        </select>
        <textarea name="book_overview" value={formData.book_overview} onChange={handleChange} className="textarea textarea-bordered w-full" />
        <button type="submit" className="btn btn-success w-full">✅ Update Book</button>
      </form>
    </div>
  );
};

export default UpdateBook;
