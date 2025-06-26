import React, { useState } from 'react';
import { Search, ShoppingCart, User, Leaf, Menu, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../contexts/UserContext';

interface HeaderProps {
  onCartClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const { itemCount } = useCart();
  const { ecoCoins } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <Leaf className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">EcoMart</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-green-600 font-medium transition-colors">Categories</a>
              <a href="#" className="text-gray-700 hover:text-green-600 font-medium transition-colors">Deals</a>
              <a href="#" className="text-gray-700 hover:text-green-600 font-medium transition-colors">Eco-Friendly</a>
              <a href="#" className="text-gray-700 hover:text-green-600 font-medium transition-colors">New Arrivals</a>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-8 hidden md:block">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for eco-friendly products..."
                className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            {/* EcoCoins */}
            <div className="hidden sm:flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
              <Leaf className="w-4 h-4 text-green-600" />
              <span className="text-green-700 font-medium">{ecoCoins.toLocaleString()}</span>
              <span className="text-green-600 text-sm">EcoCoins</span>
            </div>

            {/* Account */}
            <button className="p-2 text-gray-700 hover:text-green-600 transition-colors">
              <User className="w-6 h-6" />
            </button>

            {/* Cart */}
            <button 
              onClick={onCartClick}
              className="relative p-2 text-gray-700 hover:text-green-600 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 text-gray-700 hover:text-green-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-gray-700 hover:text-green-600 font-medium">Categories</a>
              <a href="#" className="text-gray-700 hover:text-green-600 font-medium">Deals</a>
              <a href="#" className="text-gray-700 hover:text-green-600 font-medium">Eco-Friendly</a>
              <a href="#" className="text-gray-700 hover:text-green-600 font-medium">New Arrivals</a>
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-full w-fit">
                <Leaf className="w-4 h-4 text-green-600" />
                <span className="text-green-700 font-medium">{ecoCoins.toLocaleString()}</span>
                <span className="text-green-600 text-sm">EcoCoins</span>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};