import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BookList.css';
import { useNavigate } from 'react-router-dom';

function BookList() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/books')
      .then(res => setBooks(res.data))
      .catch(() => alert("Failed to load books"));
  }, []);

  const addToCart = async (bookId) => {
    const userId = localStorage.getItem("userId");

    if (!userId || userId === "undefined" || userId === "null") {
      alert("Please log in to add books to your cart.");
      navigate('/login');
      return;
    }

    try {
      await axios.post('/api/cart/add', null, {
        params: {
          userId,
          bookId,
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
    <div className="container mt-4">
      <h2>📚 Discover Your Next Favorite Read</h2>
      <p style={{ fontStyle: 'italic', color: '#555', marginBottom: '1rem' }}>
        Find top picks, explore genres, and add exciting reads to your cart in just a click!
      </p>

      <div className="row">
        {books.length === 0 ? (
          <p className="text-center text-muted">No books available</p>
        ) : (
          books.map(book => (
            <div className="col-md-3 mb-4" key={book.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={book.imageUrl || 'https://via.placeholder.com/150'}
                  className="card-img-top"
                  alt={book.title}
                  style={{ height: '250px', objectFit: 'contain' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text text-muted">{book.author}</p>
                  <p className="card-text fw-bold">₹{parseFloat(book.price).toFixed(2)}</p>
                  <button
                    className="btn btn-primary mt-auto"
                    onClick={() => addToCart(book.id)}
                  >
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BookList;
