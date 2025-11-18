import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { booksAPI } from '../api/apiClient';
import { Edit2, Trash2 } from 'lucide-react';

export default function MyBooks() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchUserBooks = async () => {
      try {
        const response = await booksAPI.getAllBooks({ limit: 100 });
        const userBooks = response.data.books.filter(book => book.seller._id === user.id);
        setBooks(userBooks);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBooks();
  }, [user, navigate]);

  const handleDelete = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await booksAPI.deleteBook(bookId);
        setBooks(books.filter(book => book._id !== bookId));
      } catch (error) {
        console.error('Failed to delete book:', error);
      }
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">My Books</h1>
        <Link
          to="/sell"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          List New Book
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-200 h-96 rounded-lg animate-pulse"></div>
          ))}
        </div>
      ) : books.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <div key={book._id} className="bg-white rounded-lg shadow-md overflow-hidden group">
              {/* Image */}
              <div className="relative h-64 bg-gradient-to-b from-gray-300 to-gray-200 overflow-hidden">
                <img
                  src={book.images?.[0] || 'https://via.placeholder.com/400x600?text=Book+Cover&bgColor=%23e5e7eb'}
                  alt={book.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x600?text=Book+Cover&bgColor=%23e5e7eb';
                  }}
                />
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center space-x-4">
                  <Link
                    to={`/book/${book._id}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center space-x-1"
                  >
                    <Trash2 size={18} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 truncate">{book.title}</h3>
                <p className="text-sm text-gray-600 truncate">{book.author}</p>
                <p className="text-lg font-bold text-blue-600 mt-2">₹{book.price}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    book.isSold ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {book.isSold ? 'Sold' : 'Available'}
                  </span>
                  <span className="text-xs text-gray-600">{book.views} views</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-4">You haven't listed any books yet</p>
          <Link
            to="/sell"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            List Your First Book
          </Link>
        </div>
      )}
    </div>
  );
}
