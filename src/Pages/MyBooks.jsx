import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Link } from 'react-router';


const MyBooks = () => {
  const { user, loading } = useContext(AuthContext);

  const [books, setBooks] = useState([]);
  console.log('books',books)
console.log('user',user.email);

 useEffect(() => {
  if (!loading && user?.email) {
    fetch(`http://localhost:5000/user/books?email=${encodeURIComponent(user.email)}`)
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(error => console.error("Error fetching user's books:", error));
  }
}, [user, loading]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this book!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/books/${id}`, {
          method: 'DELETE',
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              Swal.fire('Deleted!', 'Book has been deleted.', 'success');
              setBooks(prev => prev.filter(book => book._id !== id));
            } else {
              Swal.fire('Failed!', 'Could not delete the book.', 'error');
            }
          });
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-sky-600">📚 My Books</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {books.map(book => (
          <div key={book._id} className="bg-white shadow-xl rounded-xl p-4 border relative">
            <h3 className="text-xl font-semibold mb-2 text-indigo-600">{book.book_title}</h3>
            <p className="text-sm text-gray-500 mb-1">✍️ Author: {book.book_author}</p>
            <p className="text-sm text-gray-500 mb-1">📘 Category: {book.book_category}</p>
            <p className="text-sm text-gray-500 mb-1">📖 Status: {book.reading_status}</p>
            <div className="absolute top-2 right-2 flex gap-2">
              <Link to={`/update/${book._id}`} className="btn btn-sm btn-info text-white">
                <FaEdit />
              </Link>
              <button onClick={() => handleDelete(book._id)} className="btn btn-sm btn-error text-white">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBooks;
