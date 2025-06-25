import React, { useState } from 'react';
import axios from 'axios';

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

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/books', book)
      .then(() => alert('Book added successfully!'))
      .catch(() => alert('Error adding book.'));
  };

  return (
    <div className="container">
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(book).map((key) => (
          <input
            key={key}
            name={key}
            placeholder={key}
            className="form-control mb-2"
            value={book[key]}
            onChange={handleChange}
          />
        ))}
        <button className="btn btn-success">Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;
