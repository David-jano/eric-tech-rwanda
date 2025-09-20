import React from 'react';
import { Shield, Award, Truck, Zap, Headphones, RotateCcw } from 'lucide-react';

/* eslint-disable react/no-unescaped-entities */

const FeatureCard = ({ icon: Icon, title, description, colorClass }: { icon: React.ElementType, title: string, description: string, colorClass: string }) => (
  <div className={`group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border border-gray-100 overflow-hidden`}>
    <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

    <div className="relative z-10">
      <div className={`bg-gradient-to-br ${colorClass} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500`}>
        <Icon className="w-10 h-10 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
      </div>
      <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-blue-900 transition-colors duration-300 text-center">{title}</h3>
      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 text-center">{description}</p>
    </div>
  </div>
);

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
          <FeatureCard
            icon={Shield}
            title="Authentic Products"
            description="100% genuine products from authorized dealers and manufacturers. Every item comes with original warranty and documentation."
            colorClass="from-blue-50/50 to-transparent"
          />

          <FeatureCard
            icon={Award}
            title="Best Prices"
            description="Competitive pricing with regular deals and discounts. Price match guarantee ensures you get the best value for your money."
            colorClass="from-green-50/50 to-transparent"
          />

          <FeatureCard
            icon={Truck}
            title="Fast Delivery"
            description="Express shipping options with real-time tracking. Most orders processed same day for lightning-fast delivery to your door."
            colorClass="from-purple-50/50 to-transparent"
          />

          <FeatureCard
            icon={Zap}
            title="Expert Setup"
            description="Free setup assistance and technical guidance. Our experts help you get the most out of your new electronics purchases."
            colorClass="from-orange-50/50 to-transparent"
          />

          <FeatureCard
            icon={Headphones}
            title="Lifetime Support"
            description="Ongoing support even after warranty expires. Our customer care team is always ready to help with any questions or issues."
            colorClass="from-red-50/50 to-transparent"
          />

          <FeatureCard
            icon={RotateCcw}
            title="Easy Returns"
            description="Hassle-free 30-day return policy with free return shipping. Not satisfied? We will make it right with full refunds or exchanges."
            colorClass="from-indigo-50/50 to-transparent"
          />
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
