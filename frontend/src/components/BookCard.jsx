import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';

export default function BookCard({ book }) {
  return (
    <Link to={`/book/${book._id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition h-full overflow-hidden">
        {/* Image */}
        <div className="relative h-64 bg-gradient-to-b from-gray-300 to-gray-200 overflow-hidden">
          <img
            src={book.images?.[0] || 'https://via.placeholder.com/400x600?text=Book+Cover&bgColor=%23e5e7eb'}
            alt={book.title}
            className="w-full h-full object-cover hover:scale-105 transition"
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x600?text=Book+Cover&bgColor=%23e5e7eb';
            }}
          />
          {book.isSold && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-bold text-lg">SOLD</span>
            </div>
          )}
          <span className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            ₹{book.price}
          </span>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 truncate">{book.title}</h3>
          <p className="text-sm text-gray-600">{book.author}</p>

          {/* Rating */}
          <div className="flex items-center space-x-1 my-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < Math.round(book.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600">({book.reviews?.length || 0})</span>
          </div>

          {/* Condition & Location */}
          <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
            <span className="bg-gray-200 px-2 py-1 rounded">{book.condition}</span>
            {book.location?.city && (
              <>
                <MapPin size={12} />
                <span>{book.location.city}</span>
              </>
            )}
          </div>

          {/* Seller */}
          <p className="text-xs text-gray-600 truncate">
            by <span className="font-semibold">{book.seller?.name}</span>
          </p>

          {/* CTA */}
          <button className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm font-semibold">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}
