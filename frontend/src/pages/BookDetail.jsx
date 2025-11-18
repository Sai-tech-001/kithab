import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Mail, Phone, Heart, Trash2 } from 'lucide-react';
import { booksAPI, usersAPI } from '../api/apiClient';
import { AuthContext } from '../context/AuthContext';

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [book, setBook] = useState(null);
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewForm, setReviewForm] = useState({ name: '', email: '', rating: 5, comment: '' });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await booksAPI.getBook(id);
        setBook(response.data.book);
        
        if (response.data.book.seller) {
          const sellerResponse = await usersAPI.getProfile(response.data.book.seller._id || response.data.book.seller);
          setSeller(sellerResponse.data.user);
        }
      } catch (error) {
        console.error('Failed to fetch book:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleAddReview = async (e) => {
    e.preventDefault();
    try {
      await booksAPI.addReview(id, reviewForm.name, reviewForm.email, reviewForm.rating, reviewForm.comment);
      setReviewForm({ name: '', email: '', rating: 5, comment: '' });
      // Refresh book
      const response = await booksAPI.getBook(id);
      setBook(response.data.book);
    } catch (error) {
      console.error('Failed to add review:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await booksAPI.deleteBook(id);
        navigate('/my-books');
      } catch (error) {
        console.error('Failed to delete book:', error);
      }
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!book) {
    return <div className="min-h-screen flex items-center justify-center">Book not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Images */}
        <div className="lg:col-span-2">
          <div className="relative bg-gradient-to-b from-gray-300 to-gray-200 rounded-lg overflow-hidden h-96 md:h-[600px] mb-4 flex items-center justify-center shadow-lg">
            <img
              src={book.images?.[currentImageIndex] || 'https://via.placeholder.com/600x900?text=Book+Cover&bgColor=%23d1d5db'}
              alt={book.title}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/600x900?text=Book+Cover&bgColor=%23d1d5db';
              }}
            />
            {book.images && book.images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? book.images.length - 1 : prev - 1))}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
                >
                  ←
                </button>
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev === book.images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
                >
                  →
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {book.images && book.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {book.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                    currentImageIndex === idx ? 'border-blue-600 ring-2 ring-blue-400' : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
                    }}
                  />
                </button>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
            <p className="text-gray-600 leading-relaxed">{book.description}</p>
          </div>

          {/* Reviews */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Reviews</h2>

            {book.reviews && book.reviews.length > 0 ? (
              <div className="space-y-4">
                {book.reviews.map((review, idx) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{review.name}</h4>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No reviews yet</p>
            )}

            {/* Add Review Form */}
            <form onSubmit={handleAddReview} className="mt-6 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-4">Add Your Review</h3>
              <input
                type="text"
                placeholder="Your name"
                value={reviewForm.name}
                onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Your email"
                value={reviewForm.email}
                onChange={(e) => setReviewForm({ ...reviewForm, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={reviewForm.rating}
                onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
              <textarea
                placeholder="Your comment"
                value={reviewForm.comment}
                onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              ></textarea>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Book Info */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
            <p className="text-lg text-gray-600 mb-4">{book.author}</p>

            {/* Rating */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < Math.round(book.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-gray-600">({book.reviews?.length || 0})</span>
            </div>

            {/* Price */}
            <div className="mb-4">
              <p className="text-sm text-gray-600">Price</p>
              <p className="text-4xl font-bold text-blue-600">₹{book.price}</p>
            </div>

            {/* Condition & Category */}
            <div className="space-y-2 mb-4">
              <div>
                <p className="text-sm text-gray-600">Condition</p>
                <span className="inline-block px-3 py-1 bg-gray-200 text-gray-900 rounded-full text-sm font-semibold">
                  {book.condition}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Category</p>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-sm font-semibold">
                  {book.category}
                </span>
              </div>
            </div>

            {/* Delivery Options */}
            {book.deliveryOptions && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Delivery Options</p>
                <div className="space-y-1">
                  {book.deliveryOptions.pickup && <p className="text-sm">✓ Pickup Available</p>}
                  {book.deliveryOptions.shipping && <p className="text-sm">✓ Shipping Available</p>}
                </div>
              </div>
            )}

            {user && user.id === book.seller?._id && (
              <button
                onClick={handleDelete}
                className="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition flex items-center justify-center space-x-2"
              >
                <Trash2 size={18} />
                <span>Delete Book</span>
              </button>
            )}
          </div>

          {/* Seller Info */}
          {seller && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Seller Information</h3>
              <div className="mb-4">
                <p className="font-semibold text-gray-900">{seller.name}</p>
                <div className="flex items-center space-x-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.round(seller.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                {seller.email && (
                  <div className="flex items-center space-x-2">
                    <Mail size={16} />
                    <span>{seller.email}</span>
                  </div>
                )}
                {seller.phone && (
                  <div className="flex items-center space-x-2">
                    <Phone size={16} />
                    <span>{seller.phone}</span>
                  </div>
                )}
                {seller.address?.city && (
                  <div className="flex items-start space-x-2">
                    <MapPin size={16} className="mt-1" />
                    <span>{seller.address.city}</span>
                  </div>
                )}
              </div>

              {seller.bio && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-gray-600">{seller.bio}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
