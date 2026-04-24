"use client";

import React, { useState, useEffect } from "react";
import {
  FaLaptop,
  FaDesktop,
  FaServer,
  FaTools,
  FaGraduationCap,
  FaNetworkWired,
  FaShieldAlt,
  FaCog,
  FaRocket,
  FaBolt,
  FaCheck,
  FaStar,
  FaArrowRight,
  FaPlay,
  FaUsers,
  FaAward,
  FaHeadset,
  FaCloudDownloadAlt,
  FaMobile,
  FaPrint,
  FaWifi,
  FaDatabase,
  FaChevronRight,
} from "react-icons/fa";

const ServicesSection = () => {
  const [activeService, setActiveService] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<
    Array<{ left: string; top: string; delay: string; duration: string }>
  >([]);

  useEffect(() => {
    setMounted(true);
    // Generate particles only on client side
    const newParticles = Array.from({ length: 15 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      duration: `${2 + Math.random() * 2}s`,
    }));
    setParticles(newParticles);
  }, []);

  const mainServices = [
    {
      title: "Electronics Devices",
      subtitle: "High-Quality Computing Solutions",
      icon: FaLaptop,
      gradient: "from-blue-500 to-blue-600",
      description:
        "Discover our extensive range of premium laptops, desktops, and accessories from trusted global brands.",
      features: [
        "Latest Generation Processors",
        "Extended Warranty Options",
        "Professional Setup Service",
        "Competitive Pricing",
      ],
      products: [
        "Macbook Laptops",
        "Windows Desktops",
        "Gamming Laptops",
        "Accessories",
      ],
    },
    {
      title: "Networking Solutions",
      subtitle: "Enterprise Infrastructure",
      icon: FaServer,
      gradient: "from-purple-500 to-purple-600",
      description:
        "Robust server solutions and networking equipment designed for businesses of all sizes.",
      features: [
        "Enterprise-Grade Hardware",
        "24/7 Support",
        "Scalable Solutions",
        "Custom Configurations",
      ],
      products: [
        "Rack Servers",
        "Tower Servers",
        "Network Equipment",
        "Storage Solutions",
      ],
    },
    {
      title: "Technical Support",
      subtitle: "Expert Repair & Maintenance",
      icon: FaTools,
      gradient: "from-green-500 to-green-600",
      description:
        "Professional repair services and technical support for all your technology needs.",
      features: [
        "Certified Technicians",
        "Quick Turnaround",
        "Warranty Protection",
        "Remote Support Available",
      ],
      products: [
        "Hardware Repair",
        "Software Installation",
        "Data Recovery",
        "System Optimization",
      ],
    },
    {
      title: "ECT TVET School",
      subtitle: "Technical Education & Training",
      icon: FaGraduationCap,
      gradient: "from-orange-500 to-orange-600",
      description:
        "Comprehensive technical education programs designed to build tomorrow tech professionals.",
      features: [
        "Industry-Certified Instructors",
        "Hands-On Training",
        "Job Placement Assistance",
        "Modern Facilities",
      ],
      products: [
        "IT Fundamentals",
        "Network Administration",
        "Software Development",
        "Hardware Maintenance",
      ],
    },
  ];

  const additionalServices = [
    {
      icon: FaNetworkWired,
      title: "Camera Systems",
      description: "Professional network installation and configuration",
    },
    {
      icon: FaWifi,
      title: "Printing Solutions",
      description:
        "Efficient printing technology for home and business environments",
    },
    {
      icon: FaDatabase,
      title: "Networking Equipments",
      description:
        "Advanced connectivity solutions for seamless internet access",
    },
    {
      icon: FaPrint,
      title: "Projection Systems",
      description:
        "High-quality visual presentation equipment for business and education",
    },
    {
      icon: FaMobile,
      title: "Mobile Devices",
      description: "Smartphones, tablets, and accessories",
    },
    {
      icon: FaCloudDownloadAlt,
      title: "Server Solutions",
      description:
        "Enterprise-grade server technology for business infrastructure",
    },
  ];

  const testimonials = [
    {
      name: "James Mukama",
      company: "Tech Solutions Ltd",
      content:
        "ERIC Tech Twanda provided us with excellent server solutions that transformed our business operations.",
      rating: 5,
      service: "Networking Solutions",
    },
    {
      name: "Grace Uwimana",
      company: "Creative Agency",
      content:
        "Their technical training program gave our team the skills needed to excel in the digital world.",
      rating: 5,
      service: "ECT TVET School",
    },
    {
      name: "David Nsengimana",
      company: "Local Business",
      content:
        "Fast, reliable repair service. They had my laptop working like new in just two days!",
      rating: 5,
      service: "Technical Support",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden mx-4 md:mx-8 lg:mx-12 xl:mx-16 rounded-3xl mb-16">
        {/* Floating Elements - Only render on client to prevent hydration mismatch */}
        {mounted && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-ping"
                style={{
                  left: particle.left,
                  top: particle.top,
                  animationDelay: particle.delay,
                  animationDuration: particle.duration,
                }}
              />
            ))}
          </div>
        )}
      </section>

      {/* Main Services Section */}
      <section className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">
            Our Core Services
          </h2>
          <p className="text-md text-gray-600 max-w-xl mx-auto">
            From premium electronics to technical education, we provide
            comprehensive solutions for all your technology needs
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {mainServices.map((service, index) => (
            <div
              key={index}
              className={`group bg-white rounded-3xl p-8 border-2 shadow-xl transition-all duration-500 cursor-pointer ${
                activeService === index
                  ? "border-blue-300 shadow-2xl shadow-blue-500/20 transform -translate-y-2"
                  : "border-gray-200 hover:border-blue-200 hover:shadow-2xl hover:-translate-y-1"
              }`}
              onClick={() => setActiveService(index)}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex items-start space-x-6">
                <div
                  className={`flex-shrink-0 w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-[#4B73FF] font-semibold mb-3">
                    {service.subtitle}
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="grid md:grid-cols-2 gap-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <FaCheck className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <button className="flex items-center space-x-2 text-[#4B73FF] font-semibold hover:text-[#06B6D4] transition-colors duration-300">
                    <span>Learn More</span>
                    <FaArrowRight
                      className={`w-4 h-4 transition-transform duration-300 ${
                        hoveredCard === index ? "translate-x-2" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Expanded Content */}
              {activeService === index && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">
                    Popular Products & Services:
                  </h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {service.products.map((product, idx) => (
                      <div
                        key={idx}
                        className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl"
                      >
                        <div className="w-2 h-2 bg-[#4B73FF] rounded-full"></div>
                        <span className="text-gray-700 font-medium">
                          {product}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Additional Services */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 w-full py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Additional Services
            </h2>
            <p className="text-md text-gray-600">
              Expanding your technology capabilities with specialized services
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <div
                key={index}
                className="group bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-blue-200/50 hover:shadow-2xl hover:shadow-blue-600/10 transition-all duration-500 transform hover:-translate-y-2 text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-[#4B73FF] rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">
                  {service.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="container mx-auto px-1 py-1"></section>

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
    </div>
  );
};

export default ServicesSection;
