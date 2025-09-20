"use client";

import React, { useState } from 'react';
import { Star, ShoppingCart, Truck, Shield, Headphones, RotateCcw, Zap, Award, Clock } from 'lucide-react';
import HeroSection from './components/HelloSection';
import WhyChooseUs from './components/WhyChooseUs';
import FeaturedProducts from './components/FeaturedProducts';
import FeaturesBar from './components/FeaturesBa';
import TeamSection from './components/TeamSection';

const EricTechWebsite = () => {
  const [activeTab, setActiveTab] = useState('home');

  const products = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      description: "Latest flagship with titanium design",
      price: "$1,199",
      image: "📱",
      rating: 5
    },
    {
      id: 2,
      name: "MacBook Pro M3",
      description: "Powerful performance for professionals",
      price: "$1,999",
      image: "💻",
      rating: 5
    },
    {
      id: 3,
      name: "Sony WH-1000XM4",
      description: "Industry-leading noise cancellation",
      price: "$349",
      image: "🎧",
      rating: 5
    },
    {
      id: 4,
      name: "Samsung Galaxy S24 Ultra",
      description: "AI-powered photography and S Pen",
      price: "$1,299",
      image: "📱",
      rating: 5
    }
  ];

  const testimonials = [
    {
      name: "Alex Johnson",
      text: "Excellent service! My iPhone 15 arrived quickly and in perfect condition. The customer support team helped me set everything up perfectly. Highly recommend ERIC TECH!",
      date: "2024-09-15"
    },
    {
      name: "Maria Garcia",
      text: "Best prices I could find for the MacBook Pro M3! Fast shipping, secure packaging, and the laptop works perfectly. Will definitely shop here again for future tech needs.",
      date: "2024-09-10"
    },
    {
      name: "David Chen",
      text: "Outstanding customer service! Had an issue with my Sony headphones and they resolved it immediately. The technical support team is incredibly knowledgeable and helpful.",
      date: "2024-09-08"
    },
    {
      name: "Sarah Miller",
      text: "Love shopping at ERIC TECH! Their gaming section has everything I need. Got my new gaming setup with great discounts and lightning-fast delivery. Fantastic experience!",
      date: "2024-09-05"
    }
  ];

  const teamMembers = [
    {
      name: "Eric Rodriguez",
      role: "CEO & Founder",
      description: "15+ years in tech industry. Passionate about bringing cutting-edge technology to everyone. Former Apple and Samsung executive.",
      image: "👨‍💼"
    },
    {
      name: "Sarah Kim",
      role: "Head of Technology",
      description: "MIT graduate with expertise in AI and hardware integration. Leads our product evaluation and tech innovation initiatives.",
      image: "👩‍💻"
    },
    {
      name: "David Thompson",
      role: "Sales Director",
      description: "10+ years in electronics retail. Expert in matching customers with perfect tech solutions. Builds lasting relationships with clients.",
      image: "👨‍💻"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
     
      {/* Hero Section */}
      <HeroSection/>
      <WhyChooseUs/>
      <FeaturedProducts/>
      <br/>
      <FeaturesBar/>
      
       {/* Team Section */}
      <TeamSection/>


      {/* Customer Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Read reviews from satisfied customers who trust ERIC TECH for their technology needs.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">Verified Buyer</p>
                  </div>
                  <span className="text-sm text-gray-500">{testimonial.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     
    

      {/* Footer */}
      
    </div>
  );
};

export default EricTechWebsite;