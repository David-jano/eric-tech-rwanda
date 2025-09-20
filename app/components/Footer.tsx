'use client';
import React from 'react';
import { FaTwitter, FaFacebookF, FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaInstagram } from 'react-icons/fa'; // Importing necessary icons
import { SiTiktok } from 'react-icons/si'; // TikTok icon import


const Footer = () => {
  return (
    <footer className="bg-[#0B172E] text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <svg className="h-8 w-8 text-[#3B82F6]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.996 11.231l-3.52-2.032c-.11-.065-.246-.065-.355 0l-3.52 2.032c-.11.065-.176.185-.176.315v4.065c0 .13.065.25.176.315l3.52 2.032c.11.065.246.065.355 0l3.52-2.032c.11-.065.176-.185.176-.315v-4.065c0-.13-.065-.25-.176-.315zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zM14.47 7.74l-2.47-1.425V4.237c0-.11-.065-.2-.176-.25L9.36 5.378c-.11.065-.176.185-.176.315v3.454l1.455-1.455c.08-.08.176-.12.266-.12h.001c.09 0 .186.04.266.12l2.47 1.425c.11.065.176.185.176.315v3.454l-1.455-1.455c-.08-.08-.176-.12-.266-.12h-.001c-.09 0-.186.04-.266.12L9.196 15.65v1.425c0 .11.065.2.176.25l2.47 1.425c.11.065.246.065.355 0l2.47-1.425c.11-.065.176-.185.176-.315V7.89c0-.13-.065-.25-.176-.315z" />
              </svg>
              <h3 className="text-2xl font-bold text-[#4B73FF]">ERIC Tech Twanda</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Your trusted partner for premium electronics and technology solutions. Quality products, competitive prices, and exceptional service.
            </p>
            <div className="flex space-x-4">
              {/* Facebook Icon */}
              <a href="#" className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                <FaFacebookF className="w-5 h-5" />
              </a>
              {/* X (formerly Twitter) Icon */}
              <a href="#" className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white hover:bg-gray-800 transition-colors">
                <FaTwitter className="w-5 h-5" />
              </a>
              {/* WhatsApp Icon */}
              <a href="#" className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors">
                <FaWhatsapp className="w-5 h-5" />
              </a>
              {/* Instagram Icon */}
              <a href="#" className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white hover:bg-pink-600 transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
              {/* TikTok Icon */}
              <a href="#" className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white hover:bg-gray-800 transition-colors">
                <SiTiktok className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#3B82F6]">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#" className="hover:text-white transition-colors">ECT TVET School</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Internship</a></li>
            </ul>
          </div>

          {/* Categories Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#3B82F6]">Categories</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Desktops</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Laptops</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Servers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Screens</a></li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#3B82F6]">Contact Info</h4>
            <div className="space-y-2 text-gray-400 text-sm">
              <p className="flex items-center space-x-2">
                <FaMapMarkerAlt className="w-4 h-4 text-gray-400" />
                <span>Kimisagara, Kigali City, KN 20 Ave Street</span>
              </p>
              <p className="flex items-center space-x-2">
                <FaPhoneAlt className="w-4 h-4 text-gray-400" />
                <span>+ (250) 7888-33355</span>
              </p>
              <p className="flex items-center space-x-2">
                <FaEnvelope className="w-4 h-4 text-gray-400" />
                <span>erictech007@gmail.com</span>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p className="text-gray-400">
            &copy; 2025 ERIC Tech co.Ltd. All rights reserved. |
            <a href="#" className="hover:text-white transition-colors mx-1">Privacy Policy</a> |
            <a href="#" className="hover:text-white transition-colors ml-1">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
