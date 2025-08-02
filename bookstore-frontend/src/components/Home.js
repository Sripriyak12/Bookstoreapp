import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BookList.css';
import { useNavigate } from 'react-router-dom';

function BookList() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('/api/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
        alert("Error fetching books. Check backend connection.");
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = async (bookId) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Please log in to add to cart.');
      navigate('/login');
      return;
    }

    try {
      await axios.post('/api/cart/add', null, {
        params: { userId, bookId, quantity: 1 },
      });
      alert('Book added to cart!');
    } catch (err) {
      console.error('Cart error:', err);
      alert('Could not add to cart.');
    }
  };

  return (
    <div className="book-grid-container">
      <h2>📚 Browse Books</h2>
      <input
        type="text"
        placeholder="🔍 Search by book name"
        className="form-control my-3"
        value={searchTerm}
        onChange={handleSearch}
      />
      {filteredBooks.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <div className="book-grid">
          {filteredBooks.map(book => (
            <div key={book.id} className="book-card">
              <img
                src={book.imageUrl || 'https://via.placeholder.com/150'}
                alt={book.title}
                className="book-img"
              />
              <h5>{book.title}</h5>
              <p>{book.author}</p>
              <p>₹{book.price?.toFixed(2)}</p>
              <button className="btn btn-primary" onClick={() => addToCart(book.id)}>
                🛒 Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookList;
