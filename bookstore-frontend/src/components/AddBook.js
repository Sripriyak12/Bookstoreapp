import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './AddBook.css';

function AddBook() {
  const [book, setBook] = useState({
    title: '',
    author: '',
    isbn: '',
    price: '',
    stock: '',
    imageUrl: '',
    description: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/books', book);
      alert('✅ Book added successfully!');
      setBook({
        title: '',
        author: '',
        isbn: '',
        price: '',
        stock: '',
        imageUrl: '',
        description: '',
      });
    } catch (err) {
      console.error(err);
      alert('❌ Error adding book.');
    }
  };

  return (
    <div className="add-book-container">
      {/* Back Button */}
      <button
        type="button"
        className="btn btn-secondary mb-3"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="me-2" /> Back
      </button>

      <h2 className="add-book-title">📖 Add a New Book</h2>
      <form onSubmit={handleSubmit} className="add-book-form">
        <div className="form-group">
          <label>Title</label>
          <input name="title" className="form-control" value={book.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Author</label>
          <input name="author" className="form-control" value={book.author} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>ISBN</label>
          <input name="isbn" className="form-control" value={book.isbn} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Price (₹)</label>
          <input name="price" type="number" className="form-control" value={book.price} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Stock</label>
          <input name="stock" type="number" className="form-control" value={book.stock} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input name="imageUrl" className="form-control" value={book.imageUrl} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" className="form-control" value={book.description} onChange={handleChange} rows={3} />
        </div>
        <button className="btn btn-success mt-3" type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;
