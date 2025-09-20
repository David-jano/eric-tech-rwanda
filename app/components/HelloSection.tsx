import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <section
      className="text-white py-60 bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/backg (4).jpg')", // Use the path to your image here
      }}
    >
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Premium Electronics & Technology Solutions
        </h1>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Explore a wide range of new and refurbished laptops, desktops, servers, and accessories. Offering top-quality products at competitive prices,
          with exceptional service for both buying and selling new and pre-owned electronics.
        </p>

        {/* Centering the buttons */}
        <div className="flex justify-center space-x-6 mt-8">
          {/* Shop Now Button */}
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-500 transition-colors text-lg">
            Shop Now
          </button>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/250788223733" // <-- Replace with your WhatsApp number (international format, no '+' or spaces)
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
      <a
        href="https://wa.me/250788223733" // <-- Same WhatsApp link as above
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 ease-in-out"
      >
        <FaWhatsapp size={30} />
      </a>
    </section>
  );
};

export default HeroSection;
