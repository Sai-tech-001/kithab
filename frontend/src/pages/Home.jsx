import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Users, TrendingUp } from 'lucide-react';
import BookCard from '../components/BookCard';
import { booksAPI } from '../api/apiClient';

export default function Home() {
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await booksAPI.getTrending();
        setTrendingBooks(response.data.books);
      } catch (error) {
        console.error('Failed to fetch trending books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  const categories = [
    { name: 'Fiction', icon: '📖' },
    { name: 'Non-Fiction', icon: '📚' },
    { name: 'Science', icon: '🔬' },
    { name: 'History', icon: '🏛️' },
    { name: 'Biography', icon: '👤' },
    { name: 'Self-Help', icon: '🌱' },
    { name: 'Technology', icon: '💻' },
    { name: 'Education', icon: '🎓' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Buy & Sell Second-Hand Books</h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8">
              Connect with readers and sellers. Find your next favorite book at great prices.
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex gap-2 max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search books by title, author, or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none"
            />
            <Link
              to={`/books?search=${search}`}
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition flex items-center space-x-2"
            >
              <Search size={20} />
              <span>Search</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-12 text-center">
            <div>
              <p className="text-3xl font-bold">10K+</p>
              <p className="text-blue-100">Books Available</p>
            </div>
            <div>
              <p className="text-3xl font-bold">5K+</p>
              <p className="text-blue-100">Active Sellers</p>
            </div>
            <div>
              <p className="text-3xl font-bold">50K+</p>
              <p className="text-blue-100">Happy Readers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Books */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
            <TrendingUp className="text-blue-600" />
            <span>Trending Books</span>
          </h2>
          <Link to="/books" className="text-blue-600 hover:text-blue-700 font-semibold">
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-96 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}
      </section>

      {/* Categories */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/books?category=${cat.name}`}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition text-center"
              >
                <div className="text-4xl mb-2">{cat.icon}</div>
                <h3 className="font-semibold text-gray-900">{cat.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Kithab?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <BookOpen className="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Huge Selection</h3>
            <p className="text-gray-600">Browse thousands of books across all categories and find exactly what you're looking for.</p>
          </div>
          <div className="text-center">
            <Users className="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Trusted Community</h3>
            <p className="text-gray-600">Connect with genuine buyers and sellers. Read reviews and ratings for peace of mind.</p>
          </div>
          <div className="text-center">
            <TrendingUp className="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Great Prices</h3>
            <p className="text-gray-600">Save up to 50% on books. Give your books a second life and earn money.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Selling?</h2>
          <p className="text-lg mb-8">List your books today and connect with thousands of readers.</p>
          <Link
            to="/sell"
            className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition"
          >
            List Your Books
          </Link>
        </div>
      </section>
    </>
  );
}
