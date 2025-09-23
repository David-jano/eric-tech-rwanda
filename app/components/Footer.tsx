"use client";
import React from "react";
import {
  FaTwitter,
  FaFacebookF,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
} from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-[#0B172E] text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="/images/Logo.png" // Update this path
                alt="ERIC Tech Rwanda Logo"
                className="w-10 h-10 object-contain"
              />
              <h3 className="text-2xl font-bold text-[#4B73FF]">
                ERIC Tech Twanda
              </h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Your trusted partner for premium electronics and technology
              solutions. Quality products, competitive prices, and exceptional
              service.
            </p>
            <div className="flex space-x-4">
              {/* Facebook Icon */}
              <a
                href="#"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                <FaFacebookF className="w-5 h-5" />
              </a>
              {/* X (formerly Twitter) Icon */}
              <a
                href="#"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white hover:bg-gray-800 transition-colors"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              {/* WhatsApp Icon */}
              <a
                href="#"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
              >
                <FaWhatsapp className="w-5 h-5" />
              </a>
              {/* Instagram Icon */}
              <a
                href="#"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white hover:bg-pink-600 transition-colors"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              {/* TikTok Icon */}
              <a
                href="#"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
              >
                <SiTiktok className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#3B82F6]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  ECT TVET School
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Internship
                </a>
              </li>
            </ul>
          </div>

          {/* Categories Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#3B82F6]">
              Categories
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Desktops
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Laptops
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Accessories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Servers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Screens
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#3B82F6]">
              Contact Info
            </h4>
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
            <a href="#" className="hover:text-white transition-colors mx-1">
              Privacy Policy
            </a>{" "}
            |
            <a href="#" className="hover:text-white transition-colors ml-1">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
