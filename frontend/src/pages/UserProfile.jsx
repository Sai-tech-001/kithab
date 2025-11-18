import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Mail, Phone, MapPin } from 'lucide-react';
import BookCard from '../components/BookCard';
import { usersAPI } from '../api/apiClient';

export default function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('listed');
  const [booksListed, setBooksListed] = useState([]);
  const [booksBought, setBooksBought] = useState([]);
  const [booksSold, setBooksSold] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await usersAPI.getProfile(id);
        setUser(response.data.user);

        const listedResponse = await usersAPI.getBooksListed(id);
        setBooksListed(listedResponse.data.books);

        const boughtResponse = await usersAPI.getBooksBought(id);
        setBooksBought(boughtResponse.data.books);

        const soldResponse = await usersAPI.getBooksSold(id);
        setBooksSold(soldResponse.data.books);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">User not found</div>;
  }

  const currentBooks = activeTab === 'listed' ? booksListed : activeTab === 'bought' ? booksBought : booksSold;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
        {/* Avatar */}
        <img
          src={user.profileImage || 'https://via.placeholder.com/150?text=User+Avatar'}
          alt={user.name}
          className="w-32 h-32 rounded-full object-cover mb-4 md:mb-0 border-4 border-blue-600"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/150?text=User+Avatar';
          }}
        />          {/* Info */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900">{user.name}</h1>

            {/* Rating */}
            <div className="flex items-center space-x-2 my-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < Math.round(user.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-gray-600">({user.reviewCount} reviews)</span>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 text-gray-600 mt-4">
              {user.email && (
                <div className="flex items-center space-x-2">
                  <Mail size={18} />
                  <span>{user.email}</span>
                </div>
              )}
              {user.phone && (
                <div className="flex items-center space-x-2">
                  <Phone size={18} />
                  <span>{user.phone}</span>
                </div>
              )}
              {user.address?.city && (
                <div className="flex items-center space-x-2">
                  <MapPin size={18} />
                  <span>{user.address.city}, {user.address.state}</span>
                </div>
              )}
            </div>

            {/* Bio */}
            {user.bio && (
              <p className="text-gray-600 mt-4">{user.bio}</p>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 md:mt-0">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{user.booksListed?.length || 0}</p>
              <p className="text-gray-600 text-sm">Books Listed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{user.booksSold?.length || 0}</p>
              <p className="text-gray-600 text-sm">Books Sold</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{user.booksBought?.length || 0}</p>
              <p className="text-gray-600 text-sm">Books Bought</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="flex space-x-4 border-b">
          <button
            onClick={() => setActiveTab('listed')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'listed'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Books Listed ({booksListed.length})
          </button>
          <button
            onClick={() => setActiveTab('bought')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'bought'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Books Bought ({booksBought.length})
          </button>
          <button
            onClick={() => setActiveTab('sold')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'sold'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Books Sold ({booksSold.length})
          </button>
        </div>
      </div>

      {/* Books Grid */}
      {currentBooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            {activeTab === 'listed' && 'No books listed yet'}
            {activeTab === 'bought' && 'No books bought yet'}
            {activeTab === 'sold' && 'No books sold yet'}
          </p>
        </div>
      )}
    </div>
  );
}
