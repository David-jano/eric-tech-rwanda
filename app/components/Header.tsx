"use client";

import React, { useState } from "react";
import { ShoppingCart, Zap, Menu, X } from "lucide-react";
import Link from "next/link";
import SearchBar from "./SearchBar";

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
          <Link href="/" className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-blue-600">
              <img
                src="/images/Logo.png"
                alt="ERIC Tech Rwanda Logo"
                className="w-10 h-10 object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                ERIC Tech Rwanda
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Home
            </Link>
            <Link
              href="/About"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              About us
            </Link>
            <Link
              href="/Services"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Services
            </Link>
            <Link
              href="/EctTvetSchool"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              ECT TVET School
            </Link>
            <Link
              href="/Internship"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Internship
            </Link>
            <Link
              href="/Tubimenye"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Tubimenye
            </Link>
            <Link
              href="/ContactUs"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Contacts
            </Link>
          </nav>

          {/* Desktop ShoppingCart and Search Bar */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/cart">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-blue-600 cursor-pointer" />
            </Link>
            <SearchBar />
          </div>

          {/* Mobile Menu Button and Cart */}
          <div className="md:hidden flex items-center space-x-4">
            <Link href="/cart">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-blue-600 cursor-pointer" />
            </Link>
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
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-120 opacity-100 mt-4"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="pb-4 border-t border-gray-200 pt-4">
            {/* Mobile Navigation Links */}
            <nav className="flex flex-col space-y-3 mb-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/About"
                className="text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About us
              </Link>
              <Link
                href="/Services"
                className="text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/EctTvetSchool"
                className="text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ECT TVET School
              </Link>
              <Link
                href="/Internship"
                className="text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Internship
              </Link>

              <Link
                href="/Tubimenye"
                className="text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tubimenye
              </Link>

              <Link
                href="/ContactUs"
                className="text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contacts
              </Link>
            </nav>

            {/* Mobile Search Bar */}
            <div className="px-4">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
