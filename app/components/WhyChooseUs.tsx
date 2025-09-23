import React from 'react';
import { Shield, Award, Truck, Zap, Headphones, RotateCcw } from 'lucide-react';

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-purple-50/30"></div>
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6 animate-fade-in">
            Why Choose ERIC Tech?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the difference with our commitment to quality, innovation, and customer satisfaction.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Authentic Products */}
          <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border border-gray-100 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                <Shield className="w-10 h-10 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-blue-900 transition-colors duration-300 text-center">
                Authentic Products
              </h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 text-center">
                100% genuine products from authorized dealers and manufacturers. Every item comes with original warranty and documentation.
              </p>
            </div>
          </div>

          {/* Card 2: Best Prices */}
          <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border border-gray-100 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-green-100 to-green-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                <Award className="w-10 h-10 text-green-600 group-hover:text-green-700 transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-green-900 transition-colors duration-300 text-center">
                Best Prices
              </h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 text-center">
                Competitive pricing with regular deals and discounts. Price match guarantee ensures you get the best value for your money.
              </p>
            </div>
          </div>

          {/* Card 3: Fast Delivery */}
          <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border border-gray-100 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                <Truck className="w-10 h-10 text-purple-600 group-hover:text-purple-700 transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-purple-900 transition-colors duration-300 text-center">
                Fast Delivery
              </h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 text-center">
                Express shipping options with real-time tracking. Most orders processed same day for lightning-fast delivery to your door.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;