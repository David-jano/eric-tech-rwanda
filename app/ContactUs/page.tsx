"use client";

import React, { useState } from 'react';
import { FaTwitter, FaFacebookF, FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaInstagram, FaPaperPlane } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Please fill in all fields');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  return (
    <section className="relative min-h-screen bg-white overflow-hidden flex items-center justify-center py-12">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            
          </div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center space-x-3 mb-6">
            <svg className="h-12 w-12 text-[#4B73FF] animate-spin-slow" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.996 11.231l-3.52-2.032c-.11-.065-.246-.065-.355 0l-3.52 2.032c-.11.065-.176.185-.176.315v4.065c0 .13.065.25.176.315l3.52 2.032c.11.065.246.065.355 0l3.52-2.032c.11-.065.176-.185.176-.315v-4.065c0-.13-.065-.25-.176-.315zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" />
            </svg>
            <h1 className="text-5xl md:text-5xl font-bold bg-gradient-to-r from-[#4B73FF] via-[#06B6D4] to-[#8B5CF6] bg-clip-text text-transparent">
              Contact Us
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-black max-w-3xl mx-auto leading-relaxed">
            Ready to transform your tech experience? Let connect and bring your vision to life with 
            <span className=" bg-gradient-to-r from-[#4B73FF] to-[#06B6D4] bg-clip-text text-transparent font-semibold"> ERIC Tech Twanda</span>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-10 lg:gap-16">

          {/* Contact Form */}
          <div className="w-full lg:w-2/5 flex ">
            <div className="bg-gradient-to-r from-[#4B73FF]/3 via-[#06B6D4]/4 to-[#8B5CF6]/2 text-black rounded-3xl p-8 border border-blue-300 shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:-translate-y-2 w-full">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#4B73FF] to-[#06B6D4] bg-clip-text text-transparent mb-8 flex items-center">
                <FaPaperPlane className="mr-3 text-[#4B73FF]" />
                Send us a Message
              </h2>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-white border border-blue-200 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4B73FF] focus:border-transparent transition-all duration-300 group-hover:bg-blue-50/30"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-white border border-blue-200 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4B73FF] focus:border-transparent transition-all duration-300 group-hover:bg-blue-50/30"
                      placeholder="Your Email"
                    />
                  </div>
                </div>

                <div className="group">
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 bg-white border border-blue-200 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4B73FF] focus:border-transparent transition-all duration-300 group-hover:bg-blue-50/30"
                    placeholder="Subject"
                  />
                </div>

                <div className="group">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-6 py-4 bg-white border border-blue-200 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4B73FF] focus:border-transparent transition-all duration-300 group-hover:bg-blue-50/30 resize-none"
                    placeholder="Your Message"
                  ></textarea>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full py-4 px-8 bg-gradient-to-r from-[#4B73FF] to-[#06B6D4] text-white font-semibold rounded-xl shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:transform-none flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <FaPaperPlane className="text-lg" />
                      <span className="text-lg">Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="w-full lg:w-2/5 flex flex-col gap-8">
            {/* Contact Cards */}
            <div className="flex flex-col gap-6 flex-grow">
              {/* Address Card */}
              <div className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#4B73FF]/50 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-xl flex-1">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#4B73FF] to-[#06B6D4] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <FaMapMarkerAlt className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-black mb-2">Visit Our Office</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Kimisagara, Kigali City<br />
                      KN 20 Ave Street<br />
                      Rwanda
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#4B73FF]/50 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-xl flex-1">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <FaPhoneAlt className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-black mb-2">Call Us</h3>
                    <p className="text-gray-700 text-lg">+ (250) 7888-33355</p>
                    <p className="text-sm text-gray-600 mt-1">Mon - Fri, 8AM - 6PM</p>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#4B73FF]/50 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-xl flex-1">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <FaEnvelope className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-black mb-2">Email Us</h3>
                    <p className="text-gray-700 text-lg">erictech007@gmail.com</p>
                    <p className="text-sm text-gray-600 mt-1">We will respond within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Section */}
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-black mb-6 text-center">Connect With Us</h3>
              <div className="flex justify-center space-x-4">
                <a href="#" className="group relative">
                  <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 hover:rotate-12 shadow-lg hover:shadow-blue-500/25">
                    <FaFacebookF className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs text-gray-600">Facebook</span>
                  </div>
                </a>

                <a href="#" className="group relative">
                  <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center hover:bg-gray-800 transition-all duration-300 transform hover:scale-110 hover:rotate-12 shadow-lg hover:shadow-blue-400/25">
                    <FaTwitter className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs text-gray-600">Twitter</span>
                  </div>
                </a>

                <a href="#" className="group relative">
                  <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-all duration-300 transform hover:scale-110 hover:rotate-12 shadow-lg hover:shadow-green-500/25">
                    <FaWhatsapp className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs text-gray-600">WhatsApp</span>
                  </div>
                </a>

                <a href="#" className="group relative">
                  <div className="w-14 h-14 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full flex items-center justify-center hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-110 hover:rotate-12 shadow-lg hover:shadow-pink-500/25">
                    <FaInstagram className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs text-gray-600">Instagram</span>
                  </div>
                </a>

                <a href="#" className="group relative">
                  <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-all duration-300 transform hover:scale-110 hover:rotate-12 shadow-lg hover:shadow-gray-500/25">
                    <SiTiktok className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs text-gray-600">TikTok</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="text-center mt-16 w-full max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[#4B73FF]/10 via-[#06B6D4]/10 to-[#8B5CF6]/10 rounded-3xl p-8 border border-gray-200">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-900 mb-6 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust ERIC Tech Twanda for their technology needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="px-8 py-4 bg-gradient-to-r from-[#4B73FF] to-[#06B6D4] text-white font-semibold rounded-xl shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300">
                Explore Our Services
              </button>
              <button className="px-8 py-4 bg-gradient-to-r from-[#4B73FF] to-[#06B6D4] text-white font-semibold rounded-xl shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300">
                View Our Products
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default ContactSection;