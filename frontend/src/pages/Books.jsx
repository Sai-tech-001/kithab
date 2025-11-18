import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import BookCard from '../components/BookCard';
import { booksAPI } from '../api/apiClient';
import { Filter } from 'lucide-react';

export default function Books() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    condition: searchParams.get('condition') || '',
    sort: searchParams.get('sort') || 'newest',
  });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const params = {
          search: filters.search,
          category: filters.category,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          condition: filters.condition,
          sort: filters.sort,
          limit: 12,
        };

        const response = await booksAPI.getAllBooks(params);
        setBooks(response.data.books);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    // Update URL
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach(key => {
      if (newFilters[key]) params.set(key, newFilters[key]);
    });
    setSearchParams(params);
  };

  const handleReset = () => {
    setFilters({
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      condition: '',
      sort: 'newest',
    });
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Browse Books</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="lg:w-64">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                <Filter size={20} />
                <span>Filters</span>
              </h2>
            </div>

            {/* Search */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search books..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="Biography">Biography</option>
                <option value="Self-Help">Self-Help</option>
                <option value="Technology">Technology</option>
                <option value="Education">Education</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">Price Range</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Condition */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">Condition</label>
              <select
                value={filters.condition}
                onChange={(e) => handleFilterChange('condition', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Conditions</option>
                <option value="Like New">Like New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
              </select>
            </div>

            {/* Sort */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">Sort By</label>
              <select
                value={filters.sort}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="views">Most Popular</option>
              </select>
            </div>

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="w-full px-4 py-2 bg-gray-200 text-gray-900 font-semibold rounded-lg hover:bg-gray-300 transition"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Books Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 h-96 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : books.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No books found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
