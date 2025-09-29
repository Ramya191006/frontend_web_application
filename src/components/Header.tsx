import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Heart, Menu, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Header: React.FC = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      dispatch({ type: 'SET_SEARCH_QUERY', payload: searchInput.trim() });
      navigate('/search');
    }
  };

  const handleCategoryClick = (category: string) => {
    dispatch({ type: 'SET_FILTERS', payload: { category, subcategory: '', brand: '' } });
    navigate('/products');
    setIsMenuOpen(false);
  };

  const cartItemCount = state.cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">ShopEase</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search for products, brands and more..."
                  className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 p-1 text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-6">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {state.isAuthenticated ? (
                <Link
                  to="/profile"
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm">{state.user?.name}</span>
                </Link>
              ) : (
                <Link
                  to="/auth"
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm">Login</span>
                </Link>
              )}

              <Link
                to="/wishlist"
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Heart className="w-5 h-5" />
                <span className="text-sm">Wishlist</span>
                {state.wishlist.length > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {state.wishlist.length}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <div className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                      {cartItemCount}
                    </span>
                  )}
                </div>
                <span className="text-sm">Cart</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Categories Bar - Desktop */}
        <div className="hidden md:flex items-center space-x-8 py-3 border-t border-gray-200">
          {['Fashion', 'Electronics', 'Toys', 'Home & Lifestyle'].map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className="text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            {/* Mobile Search */}
            <div className="p-4 border-b border-gray-200">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 p-1 text-gray-500"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>

            {/* Mobile Navigation */}
            <div className="py-4">
              <div className="flex flex-col space-y-4 px-4">
                {state.isAuthenticated ? (
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    <span>{state.user?.name}</span>
                  </Link>
                ) : (
                  <Link
                    to="/auth"
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    <span>Login</span>
                  </Link>
                )}

                <Link
                  to="/wishlist"
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart className="w-5 h-5" />
                  <span>Wishlist</span>
                  {state.wishlist.length > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                      {state.wishlist.length}
                    </span>
                  )}
                </Link>

                <Link
                  to="/cart"
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="relative">
                    <ShoppingCart className="w-5 h-5" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                        {cartItemCount}
                      </span>
                    )}
                  </div>
                  <span>Cart</span>
                </Link>
              </div>

              {/* Mobile Categories */}
              <div className="border-t border-gray-200 mt-4 pt-4">
                <h3 className="px-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Categories
                </h3>
                <div className="mt-2">
                  {['Fashion', 'Electronics', 'Toys', 'Home & Lifestyle'].map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;