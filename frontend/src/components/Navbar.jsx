import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowUserMenu(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">K</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Kithab</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`${
                location.pathname === '/' ? 'text-blue-600' : 'text-gray-700'
              } hover:text-blue-600 transition`}
            >
              Home
            </Link>
            <Link
              to="/books"
              className={`${
                location.pathname === '/books' ? 'text-blue-600' : 'text-gray-700'
              } hover:text-blue-600 transition`}
            >
              Books
            </Link>
            {user && (
              <Link
                to="/sell"
                className={`${
                  location.pathname === '/sell' ? 'text-blue-600' : 'text-gray-700'
                } hover:text-blue-600 transition`}
              >
                Sell
              </Link>
            )}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition"
                >
                  <User size={20} />
                  <span>{user.name}</span>
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                    <Link
                      to={`/profile/${user.id}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/my-books"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      My Books
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t">
            <Link to="/" className="block py-2 text-gray-700">
              Home
            </Link>
            <Link to="/books" className="block py-2 text-gray-700">
              Books
            </Link>
            {user && (
              <>
                <Link to="/sell" className="block py-2 text-gray-700">
                  Sell
                </Link>
                <Link to={`/profile/${user.id}`} className="block py-2 text-gray-700">
                  My Profile
                </Link>
                <Link to="/my-books" className="block py-2 text-gray-700">
                  My Books
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 text-red-600"
                >
                  Logout
                </button>
              </>
            )}
            {!user && (
              <>
                <Link to="/login" className="block py-2 text-blue-600">
                  Login
                </Link>
                <Link to="/register" className="block py-2 text-blue-600">
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
