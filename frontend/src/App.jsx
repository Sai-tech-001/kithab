import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

import Home from './pages/Home';
import Books from './pages/Books';
import BookDetail from './pages/BookDetail';
import SellBook from './pages/SellBook';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import MyBooks from './pages/MyBooks';

function AppContent() {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/book/:id" element={<BookDetail />} />
            <Route path="/sell" element={<SellBook />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile/:id" element={<UserProfile />} />
            <Route path="/my-books" element={<MyBooks />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
