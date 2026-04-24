"use client";
import React, { useState } from "react";
import {
  FaLaptop,
  FaServer,
  FaTools,
  FaGraduationCap,
  FaUsers,
  FaAward,
  FaRocket,
  FaBolt,
  FaShieldAlt,
  FaHeart,
  FaEye,
  FaBullseye,
  FaStar,
  FaQuoteLeft,
  FaPlay,
  FaPeopleArrows,
} from "react-icons/fa";

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState("story");
  const [playingVideo, setPlayingVideo] = useState(false);

  const stats = [
    { number: "5000+", label: "Sucessfully Repaired Devices", icon: FaUsers },
    { number: "15+", label: "Years Experience", icon: FaAward },
    { number: "99%", label: "Customer Satisfaction", icon: FaPeopleArrows },
    { number: "24/7", label: "Support Available", icon: FaBolt },
  ];

  const services = [
    {
      icon: FaLaptop,
      title: "IT Solutions",
      description:
        "Expert repair services for all electronics with 6-month warranty",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: FaServer,
      title: "Device Repairing",
      description:
        "Enterprise-grade servers and networking equipment for businesses",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: FaTools,
      title: "Technical Support",
      description:
        "Expert repair services and technical support for all your devices",
      color: "from-green-500 to-green-600",
    },
    {
      icon: FaGraduationCap,
      title: "ECT Training",
      description: "Professional electronics and computer technology education",
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Header Section with Gradient Background */}
      <div className="bg-white py-10">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-4 mb-8">
              <h1 className="text-4xl md:text-5xl font-bold bg-[#4B73FF] bg-clip-text text-transparent">
                About Us
              </h1>
            </div>
            <p className="text-xl md:text-xl  text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8">
              Pioneering the future of technology solutions in Rwanda with
              <span className="bg-[#4B73FF] bg-clip-text text-transparent font-bold">
                {" "}
                ERIC Tech Twanda
              </span>
            </p>

            {/* Hero Video/Image Placeholder */}
            <div className="relative max-w-6xl mx-auto">
              <div className="bg-white rounded-3xl p-8 border border-blue-200 transform hover:shadow-md group-hover:scale-110 transition-all duration-300 ease-in-out">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Left side - Video */}
                  <div className="aspect-video bg-gray-100 rounded-2xl flex items-center justify-center border border-blue-200">
                    {!playingVideo ? (
                      <button
                        onClick={() => setPlayingVideo(true)}
                        className="group flex items-center space-x-4 px-8 py-4 bg-[#4B73FF] rounded-xl shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300"
                      >
                        <FaPlay className="text-2xl group-hover:scale-110 transition-transform" />
                        <span className="text-xl font-semibold">
                          Watch Our Story
                        </span>
                      </button>
                    ) : (
                      <video
                        src="/videos/erictech.mp4"
                        controls
                        autoPlay
                        className="rounded-2xl w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Right side - Content */}
                  <div className="space-y-6">
                    <h3 className="text-3xl font-bold text-gray-800">
                      Our Story in 1.5 Minutes
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Discover how ERIC Tech Rwanda grew from a small startup to
                      Rwanda leading technology provider.
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-bold">1</span>
                        </div>
                        <p className="text-gray-700">
                          Founded in 2008 with a vision for technology
                          excellence
                        </p>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-bold">2</span>
                        </div>
                        <p className="text-gray-700">
                          Served 5000+ satisfied customers across Rwanda
                        </p>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-bold">3</span>
                        </div>
                        <p className="text-gray-700">
                          Technical education through ECT TVET School
                        </p>
                      </div>
                    </div>

                    <button className="px-6 py-3 bg-white border items-center border-blue-300 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 flex space-x-2">
                      <span>Read Full Story</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section with White Background */}
      <div className="bg-white py-2 mb-3">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 border border-gray-200 text-center hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Navigation Section with Light Background */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-2xl p-2 border border-gray-200 shadow-lg">
              <div className="flex space-x-2">
                {[
                  { id: "story", label: "Our Story" },
                  {
                    id: "mission",
                    label: "Mission & Vision",
                    icon: FaBullseye,
                  },
                  { id: "values", label: "Our Values", icon: FaHeart },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg transform scale-105"
                        : "text-gray-600 hover:text-gray-800 hover:bg-blue-50"
                    }`}
                  >
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-6xl mx-auto">
            {activeTab === "story" && (
              <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-xl">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-4xl font-bold text-gray-800 mb-6">
                      Our Journey
                    </h2>
                    <p className="text-md text-gray-600 leading-relaxed mb-6 text-justify">
                      Founded in Kigali, EricTech Ltd has established itself as
                      a leading provider of electronic repair services and IT
                      solutions in Rwanda. Our commitment to quality service and
                      technical excellence has earned us a reputation for
                      reliability and expertise.
                    </p>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6 text-justify">
                      Through our Electronic and Computer Technology (ECT), we
                      are contributing to Rwandas growing technology sector by
                      training skilled technicians in electronics and computer
                      technology.
                    </p>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                        <FaShieldAlt className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          5000+ Devices Repaired
                        </h4>
                        <p className="text-gray-600">
                          Excellence in every interaction
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden border border-gray-200">
                    {/* Background image */}
                    <img
                      src="/images/backg%20(1).jpg"
                      alt="background"
                      className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Dark overlay (fades at bottom) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                    {/* Content */}
                    <div className="relative z-10 p-8 flex flex-col items-center justify-end h-full text-center min-h-[250px]">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        15+ Years
                      </h3>
                      <p className="text-gray-200">
                        Of technological excellence and innovation
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "mission" && (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mb-4">
                      <FaBullseye className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">
                      Our Mission
                    </h3>
                  </div>
                  <p className="text-md text-gray-600 leading-relaxed text-center">
                    To empower individuals and businesses across Rwanda with
                    cutting-edge technology solutions, exceptional service, and
                    comprehensive technical education that drives innovation and
                    growth.
                  </p>
                </div>

                <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500 rounded-xl mb-4">
                      <FaEye className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">
                      Our Vision
                    </h3>
                  </div>
                  <p className="text-md text-gray-600 leading-relaxed text-center">
                    To be Rwanda premier technology partner, recognized for
                    innovation, excellence, and our commitment to building a
                    digitally empowered society through quality products and
                    education.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "values" && (
              <div className="relative max-w-4xl mx-auto">
                {/* Vertical timeline line */}
                <div className="absolute left-8 transform -translate-x-1/2 w-1  h-full rounded-full hidden md:block"></div>

                <div className="space-y-8">
                  {[
                    {
                      icon: FaShieldAlt,
                      title: "Quality",
                      description:
                        "We never compromise on the quality of our products and services.",
                      step: "01",
                      color: "from-blue-500 to-blue-500",
                    },
                    {
                      icon: FaHeart,
                      title: "Customer First",
                      description:
                        "Your satisfaction and success are at the heart of everything we do.",
                      step: "02",
                      color: "from-red-500 to-red-500",
                    },
                    {
                      icon: FaBolt,
                      title: "Innovation",
                      description:
                        "We embrace new technologies and creative solutions.",
                      step: "03",
                      color: "from-yellow-500 to-yellow-500",
                    },
                    {
                      icon: FaUsers,
                      title: "Integrity",
                      description:
                        "We operate with honesty, transparency, and ethical practices.",
                      step: "04",
                      color: "from-purple-500 to-purple-500",
                    },
                    {
                      icon: FaRocket,
                      title: "Excellence",
                      description:
                        "We strive for excellence in every aspect of our business.",
                      step: "05",
                      color: "from-green-500 to-green-500",
                    },
                   
                  ].map((value, index) => (
                    <div key={index} className="relative flex gap-6">
                      {/* Timeline node */}
                      <div className="hidden md:flex flex-col items-center">
                        <div
                          className={`relative w-16 h-25 bg-gradient-to-r ${value.color} rounded-full flex items-center justify-center shadow-lg z-10`}
                        >
                          <value.icon className="w-8 h-8 text-white"/>
                        </div>
                        {index < 5 && (
                          <div className="w-1 h-full bg-gradient-to-b from-gray-300 to-gray-100 rounded-full my-2"></div>
                        )}
                      </div>

                      {/* Content card */}
                      <div className="flex-1 mb-6">
                        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden group">
                          <div
                            className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                          ></div>

                          <div className="flex items-center gap-4 mb-4 md:hidden">
                            <div
                              className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${value.color} rounded-xl`}
                            >
                              <value.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="text-sm font-semibold text-transparent bg-clip-text bg-[#4B73FF]">
                              Step {value.step}
                            </div>
                          </div>

                          <div className="hidden md:block text-sm font-semibold text-transparent bg-clip-text bg-[#4B73FF] mb-2">
                            Step {value.step}
                          </div>

                          <h4 className="text-xl font-bold text-gray-800 mb-3">
                            {value.title}
                          </h4>
                          <p className="text-gray-600 leading-relaxed">
                            {value.description}
                          </p>

                          <div className="mt-4 flex items-center gap-2 text-sm text-gray-400 group-hover:text-gray-600 transition-colors">
                            <span>Learn more</span>
                            <svg
                              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Services Section with White Background */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              What We Do
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive technology solutions designed to meet your every
              need
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 border border-gray-200 shadow-lg text-center hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:-translate-y-3"
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">
                  {service.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Call-to-Action Section with Gradient Background */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 min-h-[50vh] flex items-center p-10">
        <div className="container mx-auto px-6 md:w-2/3 w-full border-sm">
          <div className="text-center">
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-blue-200 shadow-xl">
              <h2 className="text-4xl md:text-3xl font-bold text-gray-800 mb-6">
                Ready to Transform Your Tech Experience?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers who have chosen ERIC Tech
                Twanda as their trusted technology partner.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2">
                  <FaRocket className="w-5 h-5" />
                  <span>Get Started Today</span>
                </button>
                <button className="px-8 py-4 bg-white text-gray-800 font-semibold rounded-xl border border-blue-200 hover:bg-gray-50 transition-all duration-300 flex items-center space-x-2">
                  <FaUsers className="w-5 h-5" />
                  <span>Contact Our Team</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
