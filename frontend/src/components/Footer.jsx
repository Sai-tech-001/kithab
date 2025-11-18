import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold mb-4">About Kithab</h3>
            <p className="text-sm">
              Your trusted marketplace for buying and selling second-hand books. Connect with readers and sellers worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/books" className="hover:text-white transition">Browse Books</Link></li>
              <li><Link to="/sell" className="hover:text-white transition">Sell Books</Link></li>
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Fiction</a></li>
              <li><a href="#" className="hover:text-white transition">Non-Fiction</a></li>
              <li><a href="#" className="hover:text-white transition">Education</a></li>
              <li><a href="#" className="hover:text-white transition">Technology</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <span>info@kithab.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>123 Book Street, City</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="border-t border-gray-800 pt-8 flex items-center justify-between">
          <p className="text-sm">&copy; 2024 Kithab. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-white transition">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-white transition">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
