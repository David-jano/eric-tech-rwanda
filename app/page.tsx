"use client";

import React from 'react';
import { Star } from 'lucide-react';  // Only import the necessary icons
import HeroSection from './components/HelloSection';
import WhyChooseUs from './components/WhyChooseUs';
import FeaturedProducts from './components/FeaturedProducts';
import FeaturesBar from './components/FeaturesBa';
import TeamSection from './components/TeamSection';
import TestimonialsCarousel from './components/TestimonialsCarousel'
import FAQSection from './components/FAQSection'
import SocialMediaSection from './components/SocialMediaSection'
import CommentSection from './components/CommentSection'

const EricTechWebsite = () => {
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
      <HeroSection />
      <WhyChooseUs />
      <FeaturedProducts />
      <br />
      <FeaturesBar />
      
      {/* Team Section */}
      

      <TestimonialsCarousel />
      <TeamSection/>
      <FAQSection/>
      <CommentSection/>
      <SocialMediaSection/>
      
    </div>
  );
};

export default EricTechWebsite;
