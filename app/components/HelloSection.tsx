import { Link } from "lucide-react";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

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
          Explore a wide range of new devices and their accessories. Offering
          top-quality products at competitive prices, with exceptional service .
        </p>

        {/* Centering the buttons */}
        <div className="flex flex-col sm:flex-row justify-center sm:space-x-6 space-y-4 sm:space-y-0 mt-8 w-full">
          {/* Our Services Button */}
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-500 transition-colors text-lg w-full sm:w-auto">
            Our Services
          </button>
          {/* WhatsApp Button */}
          <a
            href="https://wa.me/250788833355"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors text-lg flex items-center justify-center space-x-2 w-full sm:w-auto"
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
