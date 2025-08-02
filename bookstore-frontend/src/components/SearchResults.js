import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BookList.css'; // Optional - reuse your existing CSS

function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('q')?.toLowerCase() || '';

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/books')
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert('Failed to load books');
        setLoading(false);
      });
  }, []);

  const filteredBooks = searchTerm
    ? books.filter(book => book.title.toLowerCase().includes(searchTerm))
    : books;

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
      <h2 className="mb-4">
        {searchTerm ? `🔍 Search Results for "${searchTerm}"` : '📚 All Books'}
      </h2>

      {loading ? (
        <p>Loading books...</p>
      ) : filteredBooks.length > 0 ? (
        <div className="row">
          {filteredBooks.map((book) => (
            <div className="col-md-4 mb-4" key={book.id}>
              <div className="card h-100 shadow-sm">
                {book.imageUrl || book.coverImage ? (
                  <img
                    src={book.imageUrl || book.coverImage}
                    className="card-img-top"
                    alt={book.title}
                    style={{ height: '250px', objectFit: 'contain' }}
                  />
                ) : (
                  <div
                    className="card-img-top bg-secondary d-flex align-items-center justify-content-center text-white"
                    style={{ height: '250px' }}
                  >
                    No Image
                  </div>
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">by {book.author}</p>
                  <p className="card-text text-success"><strong>₹{book.price.toFixed(2)}</strong></p>
                  <button
                    className="btn btn-primary mt-auto"
                    onClick={() => addToCart(book.id)}
                  >
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No books found.</p>
      )}
    </div>
  );
}

export default SearchResults;
