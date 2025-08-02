import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function ManageBooks() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const fetchBooks = () => {
    axios.get('/api/books')
      .then(res => setBooks(res.data))
      .catch(err => alert('Failed to load books.'));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      axios.delete(`/api/books/${id}`)
        .then(() => {
          alert('Book deleted successfully');
          fetchBooks(); // Refresh the list
        })
        .catch(() => alert('Error deleting book'));
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="container mt-4">
      {/* Back Button */}
      <button
        type="button"
        className="btn btn-secondary mb-3"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="me-2" />
        Back
      </button>

      <h2>📚 Manage Books</h2>
      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <div className="row">
          {books.map(book => (
            <div key={book.id} className="col-md-4 mb-4">
              <div className="card h-100">
                <img src={book.imageUrl} className="card-img-top" alt={book.title} />
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">{book.author}</p>
                  <p><strong>₹{book.price}</strong></p>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-warning"
                      onClick={() => navigate(`/admin/update-book/${book.id}`)}
                    >
                      ✏️ Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(book.id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageBooks;
