import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { booksAPI } from '../api/apiClient';
import { Upload } from 'lucide-react';

export default function SellBook() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    category: 'Fiction',
    condition: 'Good',
    price: '',
    yearPublished: '',
    yearPurchased: '',
    city: '',
    state: '',
    zipCode: '',
    pickupAvailable: false,
    shippingAvailable: true,
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please login to sell books</p>
          <a href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    // Create preview URLs for display
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = {
        title: formData.title,
        author: formData.author,
        description: formData.description,
        category: formData.category,
        condition: formData.condition,
        price: Number(formData.price),
        yearPublished: formData.yearPublished ? Number(formData.yearPublished) : undefined,
        yearPurchased: formData.yearPurchased ? Number(formData.yearPurchased) : undefined,
        location: {
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        },
        images: imagePreviews.length > 0 ? imagePreviews : ['https://via.placeholder.com/300x400?text=Book+Cover'],
        deliveryOptions: {
          pickup: formData.pickupAvailable,
          shipping: formData.shippingAvailable,
        },
      };

      await booksAPI.createBook(submitData);
      setSuccess(true);
      setTimeout(() => navigate('/my-books'), 2000);
    } catch (error) {
      console.error('Failed to create book:', error);
      alert('Failed to list book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Book Listed Successfully!</h2>
          <p className="text-gray-600">Redirecting to your books...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Sell Your Book</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Book Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="title"
              placeholder="Book Title *"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="author"
              placeholder="Author *"
              value={formData.author}
              onChange={handleInputChange}
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Science">Science</option>
              <option value="History">History</option>
              <option value="Biography">Biography</option>
              <option value="Self-Help">Self-Help</option>
              <option value="Technology">Technology</option>
              <option value="Education">Education</option>
            </select>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Like New">Like New</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>
            <input
              type="number"
              name="price"
              placeholder="Price (₹) *"
              value={formData.price}
              onChange={handleInputChange}
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="yearPublished"
              placeholder="Year Published"
              value={formData.yearPublished}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="yearPurchased"
              placeholder="Year Purchased"
              value={formData.yearPurchased}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <textarea
            name="description"
            placeholder="Book Description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-6"
          ></textarea>
        </div>

        {/* Location */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="zipCode"
              placeholder="Zip Code"
              value={formData.zipCode}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Images */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Images</h2>
          <label className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
            <Upload size={32} className="mx-auto text-gray-400 mb-2" />
            <p className="font-semibold text-gray-900">Click to upload or drag and drop</p>
            <p className="text-sm text-gray-600">PNG, JPG, GIF up to 10MB</p>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </label>

          {imagePreviews.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-semibold text-gray-900 mb-4">{imagePreviews.length} image(s) selected</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {imagePreviews.map((preview, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ${idx + 1}`}
                      className="h-32 w-full object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                    >
                      ×
                    </button>
                    <p className="text-xs text-gray-600 mt-1">Image {idx + 1}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Delivery Options */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Options</h2>
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="pickupAvailable"
                checked={formData.pickupAvailable}
                onChange={handleInputChange}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-gray-900">Pickup Available</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="shippingAvailable"
                checked={formData.shippingAvailable}
                onChange={handleInputChange}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-gray-900">Shipping Available</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {loading ? 'Listing...' : 'List Your Book'}
        </button>
      </form>
    </div>
  );
}
