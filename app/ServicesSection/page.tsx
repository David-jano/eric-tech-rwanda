"use client";

import React, { useState } from 'react';
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
  FaChevronRight
} from 'react-icons/fa';

const ServicesSection = () => {
  const [activeService, setActiveService] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null); // Fixed type

  const mainServices = [
    {
      title: 'Premium Electronics',
      subtitle: 'High-Quality Computing Solutions',
      icon: FaLaptop,
      gradient: 'from-blue-500 to-blue-600',
      description: 'Discover our extensive range of premium laptops, desktops, and accessories from trusted global brands.',
      features: ['Latest Generation Processors', 'Extended Warranty Options', 'Professional Setup Service', 'Competitive Pricing'],
      products: ['Gaming Laptops', 'Business Desktops', 'Workstations', 'Accessories']
    },
    {
      title: 'Server Solutions',
      subtitle: 'Enterprise Infrastructure',
      icon: FaServer,
      gradient: 'from-purple-500 to-purple-600',
      description: 'Robust server solutions and networking equipment designed for businesses of all sizes.',
      features: ['Enterprise-Grade Hardware', '24/7 Support', 'Scalable Solutions', 'Custom Configurations'],
      products: ['Rack Servers', 'Tower Servers', 'Network Equipment', 'Storage Solutions']
    },
    {
      title: 'Technical Support',
      subtitle: 'Expert Repair & Maintenance',
      icon: FaTools,
      gradient: 'from-green-500 to-green-600',
      description: 'Professional repair services and technical support for all your technology needs.',
      features: ['Certified Technicians', 'Quick Turnaround', 'Warranty Protection', 'Remote Support Available'],
      products: ['Hardware Repair', 'Software Installation', 'Data Recovery', 'System Optimization']
    },
    {
      title: 'ECT TVET School',
      subtitle: 'Technical Education & Training',
      icon: FaGraduationCap,
      gradient: 'from-orange-500 to-orange-600',
      description: 'Comprehensive technical education programs designed to build tomorrow\'s tech professionals.',
      features: ['Industry-Certified Instructors', 'Hands-On Training', 'Job Placement Assistance', 'Modern Facilities'],
      products: ['IT Fundamentals', 'Network Administration', 'Software Development', 'Hardware Maintenance']
    }
  ];

  const additionalServices = [
    { icon: FaNetworkWired, title: 'Network Setup', description: 'Professional network installation and configuration' },
    { icon: FaWifi, title: 'WiFi Solutions', description: 'High-speed wireless network deployment' },
    { icon: FaDatabase, title: 'Data Management', description: 'Secure data backup and recovery solutions' },
    { icon: FaPrint, title: 'Printing Solutions', description: 'Commercial and office printing equipment' },
    { icon: FaMobile, title: 'Mobile Devices', description: 'Smartphones, tablets, and accessories' },
    { icon: FaCloudDownloadAlt, title: 'Cloud Services', description: 'Cloud migration and management services' }
  ];

  const testimonials = [
    {
      name: 'James Mukama',
      company: 'Tech Solutions Ltd',
      content: 'ERIC Tech Twanda provided us with excellent server solutions that transformed our business operations.',
      rating: 5,
      service: 'Server Solutions'
    },
    {
      name: 'Grace Uwimana',
      company: 'Creative Agency',
      content: 'Their technical training program gave our team the skills needed to excel in the digital world.',
      rating: 5,
      service: 'ECT TVET School'
    },
    {
      name: 'David Nsengimana',
      company: 'Local Business',
      content: 'Fast, reliable repair service. They had my laptop working like new in just two days!',
      rating: 5,
      service: 'Technical Support'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden mx-4 md:mx-8 lg:mx-12 xl:mx-16 rounded-3xl  mb-16">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="text-center mb-1">
            <div className="inline-flex items-center space-x-4 mb-1">
              <svg className="h-16 w-16 text-[#4B73FF] animate-spin-slow" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.996 11.231l-3.52-2.032c-.11-.065-.246-.065-.355 0l-3.52 2.032c-.11.065-.176.185-.176.315v4.065c0 .13.065.25.176.315l3.52 2.032c.11.065.246.065.355 0l3.52-2.032c.11-.065.176-.185.176-.315v-4.065c0-.13-.065-.25-.176-.315zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" />
              </svg>
              <h1 className="text-6xl md:text-5xl font-bold bg-gradient-to-r from-[#4B73FF] via-[#06B6D4] to-[#8B5CF6] bg-clip-text text-transparent">
                Our Services
              </h1>
            </div>
            <p className="text-2xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8">
              Comprehensive technology solutions tailored to your needs with 
              <span className="bg-gradient-to-r from-[#4B73FF] to-[#06B6D4] bg-clip-text text-transparent font-bold"> ERIC Tech Twanda</span>
            </p>
            
            {/* Service Stats */}
            <div className="grid md:grid-cols-4 gap-6 mt-12">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-blue-200/50 shadow-xl">
                <div className="text-3xl font-bold text-[#4B73FF] mb-2">5000+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-blue-200/50 shadow-xl">
                <div className="text-3xl font-bold text-[#4B73FF] mb-2">15+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-blue-200/50 shadow-xl">
                <div className="text-3xl font-bold text-[#4B73FF] mb-2">24/7</div>
                <div className="text-gray-600">Support Available</div>
              </div>
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-blue-200/50 shadow-xl">
                <div className="text-3xl font-bold text-[#4B73FF] mb-2">99%</div>
                <div className="text-gray-600">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Our Core Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From premium electronics to technical education, we provide comprehensive solutions for all your technology needs
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {mainServices.map((service, index) => (
            <div
              key={index}
              className={`group bg-white rounded-3xl p-8 border-2 shadow-xl transition-all duration-500 cursor-pointer ${
                activeService === index 
                  ? 'border-blue-300 shadow-2xl shadow-blue-500/20 transform -translate-y-2' 
                  : 'border-gray-200 hover:border-blue-200 hover:shadow-2xl hover:-translate-y-1'
              }`}
              onClick={() => setActiveService(index)}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex items-start space-x-6">
                <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{service.title}</h3>
                  <p className="text-[#4B73FF] font-semibold mb-3">{service.subtitle}</p>
                  <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
                  
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
                    <FaArrowRight className={`w-4 h-4 transition-transform duration-300 ${hoveredCard === index ? 'translate-x-2' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Expanded Content */}
              {activeService === index && (
                <div className="mt-6 pt-6 border-t border-gray-200 animate-fadeIn">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Popular Products & Services:</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {service.products.map((product, idx) => (
                      <div key={idx} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                        <div className="w-2 h-2 bg-[#4B73FF] rounded-full"></div>
                        <span className="text-gray-700 font-medium">{product}</span>
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
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 mx-4 md:mx-12 lg:mx-12 xl:mx-16 py-16 mb-1">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Additional Services</h2>
            <p className="text-lg text-gray-600">Expanding your technology capabilities with specialized services</p>
          </div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <div key={index} className="group bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-blue-200/50 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:-translate-y-2 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#4B73FF] to-[#06B6D4] rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">{service.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Process Section */}
      <section className="mx-4 md:mx-8 lg:mx-12 xl:mx-16 rounded-3xl py-16 mb-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Service Process</h2>
            <p className="text-lg text-gray-600">Simple steps to get started with our services</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation', description: 'We discuss your needs and requirements', icon: FaUsers },
              { step: '02', title: 'Planning', description: 'We create a customized solution plan', icon: FaCog },
              { step: '03', title: 'Implementation', description: 'We deliver and implement the solution', icon: FaRocket },
              { step: '04', title: 'Support', description: 'We provide ongoing support and maintenance', icon: FaHeadset }
            ].map((process, index) => (
              <div key={index} className="text-center relative">
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-blue-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <div className="text-4xl font-bold text-[#4B73FF] mb-2">{process.step}</div>
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#4B73FF] to-[#06B6D4] rounded-xl mb-4">
                    <process.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">{process.title}</h4>
                  <p className="text-gray-600 text-sm">{process.description}</p>
                </div>
                {index < 3 && (
                  <FaChevronRight className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-[#4B73FF] w-6 h-6" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="container mx-auto px-1 py-1">
       
      </section>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ServicesSection;