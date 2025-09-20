import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <section
      className="text-white py-60 bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/backg (2).jpg')", // Use the path to your image here
      }}
    >
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Buying and Selling new and used Electronic Devices
        </h1>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Explore a wide range of new devices and their accessories. Offering top-quality products at competitive prices,
          with exceptional service .
        </p>

        {/* Centering the buttons */}
        <div className="flex justify-center space-x-6 mt-8">
          {/* Shop Now Button */}
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-500 transition-colors text-lg">
            Shop Now
          </button>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/250788833355" // <-- Replace with your WhatsApp number (international format, no '+' or spaces)
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors text-lg flex items-center space-x-2"
          >
            <FaWhatsapp size={24} />
            <span>WhatsApp Us</span>
          </a>
        </div>
      </div>

      {/* Floating WhatsApp Icon at the bottom right */}
     
    </section>
  );
};

export default HeroSection;
