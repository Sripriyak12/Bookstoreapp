import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetchCart();
    } else {
      setLoading(false);
    }
  }, [userId]);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`/api/cart/${userId}`);
      setCartItems(response.data);
    } catch (error) {
      console.error('❌ Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (cartItemId, newQuantity) => {
  if (newQuantity < 1) {
    // Optionally, confirm removal
    await removeItem(cartItemId);
    return;
  }

  try {
    await axios.put(`/api/cart/update`, null, {
      params: { cartItemId, quantity: newQuantity },
    });
    setCartItems(prev =>
      prev.map(item =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  } catch (error) {
    console.error('❌ Error updating quantity:', error);
  }
};


  const removeItem = async (id) => {
    try {
      await axios.delete(`/api/cart/remove/${id}`);
      setCartItems(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('❌ Error removing item:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + item.quantity * (item.book?.price || 0),
      0
    );
  };

  const handleCheckout = async () => {
    try {
      const totalAmount = calculateTotal();
      const response = await axios.post(`/api/orders/place`, null, {
        params: { userId, totalAmount },
      });

      if (response.status === 200 || response.status === 201) {
        alert('✅ Order placed successfully!');
        setCartItems([]);
        navigate('/orders');
      }
    } catch (error) {
      console.error('❌ Checkout failed:', error);
      alert('Checkout failed. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading cart...</p>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="text-center my-5">
        <p className="text-muted">⚠️ Please <a href="/login">log in</a> to view your cart.</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-muted">Your cart is empty.</p>
      ) : (
        <>
          <div className="row g-4">
            {cartItems.map(item => (
              <div key={item.id} className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm">
                  <div className="d-flex gap-3 p-3">
                    <img
                      src={item.book?.imageUrl || '/default-book.jpg'}
                      alt={item.book?.title}
                      className="rounded"
                      style={{ width: '80px', height: '110px', objectFit: 'cover' }}
                    />
                    <div className="flex-grow-1 d-flex flex-column justify-content-between">
                      <div>
                        <h5 className="card-title mb-1">{item.book?.title}</h5>
                        <p className="mb-1 text-muted">Price: ₹{item.book?.price}</p>
                        <p className="mb-1 text-muted">
                          Subtotal: ₹{item.quantity * (item.book?.price || 0)}
                        </p>
                      </div>
                      <div>
                        <div className="d-flex align-items-center gap-2 mt-2">
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="btn btn-outline-danger btn-sm mt-2"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 text-end">
            <h5><strong>Total: ₹{calculateTotal().toFixed(2)}</strong></h5>
            <button
              className="btn btn-success btn-lg px-5 mt-2"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
