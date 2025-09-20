"use client";
import React, { useState } from 'react';
import { ShoppingCart, Zap, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Info */}
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ERIC Tech Rwanda</h1>
            </div>
          </div>
          
          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-700 hover:text-gray-500 font-medium">Home</a>
            <a href="#about" className="text-gray-700 hover:text-gray-500 font-medium">About us</a>
            <a href="#services" className="text-gray-700 hover:text-gray-500 font-medium">Services</a>
            <a href="#school" className="text-gray-700 hover:text-gray-500 font-medium">ECT TVET School</a>
            <a href="#internship" className="text-gray-700 hover:text-gray-500 font-medium">Internship</a>
            <a href="#contact" className="text-gray-700 hover:text-gray-500 font-medium">Contacts</a>
          </nav>
          
          {/* Desktop ShoppingCart and Search Bar */}
          <div className="hidden md:flex items-center space-x-4">
            {/* ShoppingCart */}
            <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-blue-600 cursor-pointer" />
            
            {/* Search Bar */}
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search service..."
                className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button and Cart */}
          <div className="md:hidden flex items-center space-x-4">
            <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-blue-600 cursor-pointer" />
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100 mt-4' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="pb-4 border-t border-gray-200 pt-4">
            {/* Mobile Navigation Links */}
            <nav className="flex flex-col space-y-3 mb-4">
              <a 
                href="#home" 
                className="text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>
              <a 
                href="#about" 
                className="text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About us
              </a>
              <a 
                href="#services" 
                className="text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </a>
              <a 
                href="#school" 
                className="text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ECT TVET School
              </a>
              <a 
                href="#internship" 
                className="text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Internship
              </a>
              <a 
                href="#contact" 
                className="text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contacts
              </a>
            </nav>
            
            {/* Mobile Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search service..."
                className="w-full px-4 py-3 pl-10 pr-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;