import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import BookList from './components/BookList';
import Cart from './components/Cart';
import Orders from './components/Orders';
import OwnerLogin from './components/OwnerLogin';
import AddBook from './components/AddBook';
import ManageBooks from './components/ManageBooks';
import Login from './components/Login'; // path to your Login.js file
import Register from './components/Register';
import UpdateBook from './components/UpdateBook'; // or correct path based on your folder structure

function App() {
  return (
    <Router>
      <Header />
      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/owner/login" element={<OwnerLogin />} />
          <Route path="/admin/add-book" element={<AddBook />} />
          <Route path="/admin/manage-books" element={<ManageBooks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/update-book/:id" element={<UpdateBook />} />


        </Routes>
      </main>
    </Router>
  );
}

export default App;
