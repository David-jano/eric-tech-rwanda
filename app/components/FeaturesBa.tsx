import React from 'react';
import { Truck, Shield, Clock } from 'lucide-react';

const FeaturesBar = () => {
  return (
    <section className="relative py-16 bg-blue-100 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-blue-300 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-blue-100 rounded-full animate-pulse delay-500"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 text-center">
          {/* Free Shipping */}
          <div className="group cursor-pointer">
            <div className="flex flex-col items-center space-y-4 p-6 rounded-xl hover:bg-blue-100  transition-all duration-500 transform hover:-translate-y-4">
              {/* Icon Container */}
              <div className="relative">
                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                  <Truck className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                {/* Animated ring */}
                <div className="absolute inset-0 border-2 border-blue-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500"></div>
                <div className="absolute inset-0 border border-blue-200 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-[1.8] transition-all duration-700 delay-100"></div>
              </div>
              
              {/* Content */}
              <div className="group-hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  Free Shipping
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  Free delivery on orders over $50
                </p>
              </div>
            </div>
          </div>

          {/* Warranty */}
          <div className="group cursor-pointer">
            <div className="flex flex-col items-center space-y-4 p-6 rounded-xl hover:hover:bg-blue-100 transition-all duration-500 transform hover:-translate-y-4">
              {/* Icon Container */}
              <div className="relative">
                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                  <Shield className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                {/* Animated ring */}
                <div className="absolute inset-0 border-2 border-blue-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500"></div>
                <div className="absolute inset-0 border border-blue-200 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-[1.8] transition-all duration-700 delay-100"></div>
              </div>
              
              {/* Content */}
              <div className="group-hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  Warranty
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  1-year warranty on all products
                </p>
              </div>
            </div>
          </div>

          {/* 24/7 Support */}
          <div className="group cursor-pointer">
            <div className="flex flex-col items-center space-y-4 p-6 rounded-xl hover:bg-blue-100 transition-all duration-500 transform hover:-translate-y-4">
              {/* Icon Container */}
              <div className="relative">
                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                  <Clock className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                {/* Animated ring */}
                <div className="absolute inset-0 border-2 border-blue-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500"></div>
                <div className="absolute inset-0 border border-blue-200 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-[1.8] transition-all duration-700 delay-100"></div>
              </div>
              
              {/* Content */}
              <div className="group-hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  24/7 Support
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  Expert customer support anytime
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesBar;