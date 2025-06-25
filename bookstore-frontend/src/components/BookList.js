import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BookList.css';
import { useNavigate } from 'react-router-dom';

function BookList() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId"); // Dynamically pulled from storage

  useEffect(() => {
    axios.get('/api/books')
      .then(res => setBooks(res.data))
      .catch(() => alert("Failed to load books"));
  }, []);

  const addToCart = async (bookId) => {
  const storedUserId = localStorage.getItem("userId");

  if (!storedUserId || storedUserId === "undefined" || storedUserId === "null") {
    alert("Please log in to add books to your cart.");
    navigate('/login');
    return;
  }

  try {
    await axios.post('/api/cart/add', null, {
      params: {
        userId: storedUserId,
        bookId: bookId,
        quantity: 1
      }
    });
    alert('Book added to cart!');
  } catch (err) {
    console.error("Add to Cart Error:", err);
    alert('Failed to add book to cart.');
  }
};

  return (
    <div className="book-grid-container">
      <h2 className="mb-4">📚 Browse Books</h2>
      <div className="book-grid">
        {books.map(book => (
          <div className="book-card" key={book.id}>
            <img
              src={book.imageUrl || 'https://via.placeholder.com/150'}
              alt={book.title}
              className="book-img"
            />
            <h5 className="book-title">{book.title}</h5>
            <p className="book-author">{book.author}</p>
            <p className="book-price">₹{book.price.toFixed(2)}</p>
            <button className="btn btn-primary" onClick={() => addToCart(book.id)}>
              🛒 Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;
