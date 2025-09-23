"use client";
import React, { useState } from "react";
import Image from "next/image";

import {
  FaLaptop,
  FaMobileAlt,
  FaNetworkWired,
  FaCertificate,
  FaClock,
  FaMoneyBillWave,
  FaBook,
  FaTools,
  FaCalendarAlt,
  FaUserGraduate,
  FaCheck,
  FaCogs,
  FaMicrochip,
  FaDesktop,
  FaServer,
} from "react-icons/fa";

const programs = [
  {
    icon: FaTools,
    title: "Basic Electronics",
    description:
      "Fundamentals of electronic components, circuits, and troubleshooting",
    image: "/images/basic-electronics.jpg",
    color: "from-blue-500 to-blue-600",
    major: "electronics",
  },
  {
    icon: FaLaptop,
    title: "Computer Hardware",
    description: "PC assembly, maintenance, and repair techniques",
    image: "/images/computer-hardware.jpg",
    color: "from-purple-500 to-purple-600",
    major: "computer",
  },
  {
    icon: FaMobileAlt,
    title: "Mobile Device Repair",
    description: "Smartphone and tablet diagnostics and repair",
    image: "/images/mobile-repair.jpg",
    color: "from-green-500 to-green-600",
    major: "electronics",
  },
  {
    icon: FaNetworkWired,
    title: "Networking Fundamentals",
    description: "Basic network setup, configuration, and troubleshooting",
    image: "/images/networking.jpg",
    color: "from-orange-500 to-orange-600",
    major: "computer",
  },
];

const TrainingPrograms = () => {
  const [activeProgram, setActiveProgram] = useState(0);
  const [activeMajor, setActiveMajor] = useState("electronics");

  const majorOptions = {
    electronics: {
      title: "Electronics Technology",
      description:
        "Specialize in electronic devices, circuits, and repair techniques",
      icon: FaMicrochip,
      color: "from-blue-500 to-blue-600",
      image: "/images/electronics-major.jpg",
      requirements: [
        "Advanced multimeter and oscilloscope skills",
        "Component-level circuit analysis",
        "Soldering and desoldering techniques",
        "Power supply and amplifier circuits",
        "Digital electronics fundamentals",
        "Troubleshooting complex electronic systems",
      ],
      tools: [
        "Advanced multimeter",
        "Oscilloscope",
        "Soldering station",
        "Component tester",
        "Power supply unit",
        "Signal generator",
      ],
      careerPaths: [
        "Electronics Technician",
        "Repair Specialist",
        "Circuit Designer",
        "Quality Control Technician",
      ],
    },
    computer: {
      title: "Computer Systems Technology",
      description:
        "Master computer hardware, networking, and system administration",
      icon: FaDesktop,
      color: "from-purple-500 to-purple-600",
      image: "/images/computer-major.jpg",
      requirements: [
        "Advanced PC assembly and configuration",
        "Network infrastructure setup",
        "Operating system installation and optimization",
        "Data recovery techniques",
        "Server administration basics",
        "Cybersecurity fundamentals",
      ],
      tools: [
        "PC toolkit with specialized tools",
        "Network cable testers",
        "Hard drive duplicator",
        "BIOS programmer",
        "Data recovery software",
        "Network analyzer",
      ],
      careerPaths: [
        "Computer Technician",
        "Network Support Specialist",
        "IT Support Technician",
        "System Administrator",
      ],
    },
  };

  const programDetails = [
    {
      title: "Basic Electronics",
      description:
        "Master the fundamentals of electronic components, circuits, and troubleshooting techniques. This course provides hands-on experience with real electronic devices and equipment.",
      skills: [
        "Component identification",
        "Circuit analysis",
        "Soldering techniques",
        "Troubleshooting methods",
        "Safety procedures",
      ],
      image: "/images/pic21_zyzqcu.jpg",
      major: "electronics",
    },
    {
      title: "Computer Hardware",
      description:
        "Learn professional PC assembly, maintenance, and repair techniques. Gain practical skills in diagnosing hardware issues and optimizing computer performance.",
      skills: [
        "PC assembly",
        "Hardware diagnostics",
        "Component replacement",
        "BIOS configuration",
        "System optimization",
      ],
      image: "/images/computer-hardware-detail.jpg",
      major: "computer",
    },
    {
      title: "Mobile Device Repair",
      description:
        "Become proficient in smartphone and tablet diagnostics and repair. Learn to fix common issues like screen replacement, battery problems, and software troubleshooting.",
      skills: [
        "Screen replacement",
        "Battery diagnostics",
        "Software issues",
        "Water damage repair",
        "Component-level repair",
      ],
      image: "/images/mobile-repair-detail.jpg",
      major: "electronics",
    },
    {
      title: "Networking Fundamentals",
      description:
        "Understand basic network setup, configuration, and troubleshooting. Learn to create and maintain small to medium-sized networks for homes and businesses.",
      skills: [
        "Network setup",
        "Router configuration",
        "Troubleshooting",
        "Security basics",
        "Wireless networking",
      ],
      image: "/images/networking-detail.jpg",
      major: "computer",
    },
  ];

  return (
    <section className="relative min-h-screen bg-white overflow-hidden py-16">
      {/* Header Section */}
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-4">
            <svg
              className="h-16 w-16 text-[#4B73FF] animate-spin-slow"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M11.996 11.231l-3.52-2.032c-.11-.065-.246-.065-.355 0l-3.52 2.032c-.11.065-.176.185-.176.315v4.065c0 .13.065.25.176.315l3.52 2.032c.11.065.246.065.355 0l3.52-2.032c.11-.065.176-.185.176-.315v-4.065c0-.13-.065-.25-.176-.315zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8-8-3.582 8-8 8z" />
            </svg>
            <h1 className="text-4xl md:text-4xl font-bold bg-gradient-to-r from-[#4B73FF] via-[#06B6D4] to-[#8B5CF6] bg-clip-text text-transparent">
              Our Training Programs
            </h1>
          </div>
        </div>

        {/* Introductory Section */}
<div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-2xl mb-16">
  {/* Title */}
  <div className="text-center mb-10">
    <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
      ECT offers comprehensive training in electronic and computer
      technology, providing students with{" "}
      <span className="bg-gradient-to-r from-[#4B73FF] to-[#06B6D4] bg-clip-text text-transparent font-bold">
        hands-on experience
      </span>{" "}
      and industry-relevant skills.
    </p>
  </div>

  {/* Image + Program Grid */}
  <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
    
    {/* Left Side Image */}
    <div className="col-span-1">
      <img
        src="/images/pic18_nu9o1o.jpg" 
        alt="ECT Training"
        className="w-full h-full object-cover rounded-xl shadow-lg"
      />
    </div>

    {/* Right Side - Program List */}
    <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
      {programs.map((program, index) => (
        <div
          key={index}
          className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300"
        >
          <div
            className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${program.color} rounded-full flex items-center justify-center mt-1`}
          >
            {/* Replace checkmark with program.icon if needed */}
            <FaCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {program.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {program.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Enquire Button */}
  <div className="text-center mt-12">
    <button className="px-8 py-4 bg-gradient-to-r from-[#4B73FF] to-[#06B6D4] text-white font-semibold rounded-xl shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 mx-auto">
      <FaUserGraduate className="w-5 h-5" />
      <span>Enquire About Training</span>
    </button>
  </div>
</div>


        {/* Major Options Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-4xl font-bold bg-gradient-to-r from-[#4B73FF] via-[#06B6D4] to-[#8B5CF6] bg-clip-text text-transparent mb-4">
              Choose Your Specialization
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select between our two major technology pathways, each with
              specific requirements and career outcomes
            </p>
          </div>

          {/* Major Selection Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-2xl p-2 border border-gray-200 shadow-lg">
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveMajor("all")}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeMajor === "all"
                      ? "bg-gradient-to-r from-[#4B73FF] to-[#06B6D4] text-white shadow-lg transform scale-105"
                      : "text-gray-600 hover:text-gray-800 hover:bg-blue-50"
                  }`}
                >
                  <FaCogs className="w-4 h-4" />
                  <span>All Programs</span>
                </button>
                <button
                  onClick={() => setActiveMajor("electronics")}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeMajor === "electronics"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105"
                      : "text-gray-600 hover:text-gray-800 hover:bg-blue-50"
                  }`}
                >
                  <FaMicrochip className="w-4 h-4" />
                  <span>Electronics</span>
                </button>
                <button
                  onClick={() => setActiveMajor("computer")}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeMajor === "computer"
                      ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg transform scale-105"
                      : "text-gray-600 hover:text-gray-800 hover:bg-blue-50"
                  }`}
                >
                  <FaDesktop className="w-4 h-4" />
                  <span>Computer Systems</span>
                </button>
              </div>
            </div>
          </div>

          {/* Major Details */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Electronics Major */}
            <div
              className={`bg-white rounded-3xl p-8 border border-gray-200 shadow-sm transition-all duration-500 ${
                activeMajor === "electronics"
                  ? "ring-2 ring-blue-500 transform scale-105"
                  : ""
              }`}
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <FaMicrochip className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    Electronics Technology
                  </h3>
                  <p className="text-gray-600">
                    Specialize in electronic devices and circuits
                  </p>
                </div>
              </div>

              <div className="bg-gray-100 rounded-2xl h-48 flex items-center justify-center mb-6 border border-blue-200 overflow-hidden">
                <Image
                  src="/images/pic21_zyzqcu.jpg" 
                  alt="Electronics Lab"
                  width={400}
                  height={200}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">
                    Specific Requirements:
                  </h4>
                  <ul className="space-y-2">
                    {majorOptions.electronics.requirements.map((req, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">
                    Specialized Tools:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {majorOptions.electronics.tools.map((tool, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">
                    Career Paths:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {majorOptions.electronics.careerPaths.map(
                      (career, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                        >
                          {career}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Computer Systems Major */}
            <div
              className={`bg-white rounded-3xl p-8 border border-gray-200 shadow-sm transition-all duration-500 ${
                activeMajor === "computer"
                  ? "ring-2 ring-purple-500 transform scale-105"
                  : ""
              }`}
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <FaDesktop className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    Computer Systems and Architecture
                  </h3>
                  <p className="text-gray-600">
                    Master computer hardware and networking
                  </p>
                </div>
              </div>

              <div className="bg-gray-100 rounded-2xl h-48 flex items-center justify-center mb-6 border border-blue-200 overflow-hidden">
                <Image
                  src="/images/pic20_eh9u9c.jpg"
                  alt="Electronics Lab"
                  width={400}
                  height={200}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">
                    Specific Requirements:
                  </h4>
                  <ul className="space-y-2">
                    {majorOptions.computer.requirements.map((req, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">
                    Specialized Tools:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {majorOptions.computer.tools.map((tool, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">
                    Career Paths:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {majorOptions.computer.careerPaths.map((career, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                      >
                        {career}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certification & Details Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Certification Card */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#4B73FF] to-[#06B6D4] rounded-xl mb-4">
                <FaCertificate className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                RTB Certified Certificates
              </h3>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed text-center mb-6">
              Upon successful completion, students receive official RTB
              certified certificates recognized nationwide.
            </p>
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <p className="text-blue-700 font-semibold">
                Certificate recognized by Rwanda TVET Board
              </p>
            </div>
          </div>

          {/* Course Details Card */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mb-4">
                <FaClock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Course Details
              </h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FaUserGraduate className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-700">Course Duration:</span>
                </div>
                <span className="font-semibold text-gray-800">6 Months</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FaMoneyBillWave className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Course Fee:</span>
                </div>
                <span className="font-semibold text-gray-800">300,000 RWF</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FaBook className="w-5 h-5 text-purple-500" />
                  <span className="text-gray-700">Registration Fee:</span>
                </div>
                <span className="font-semibold text-gray-800">10,000 RWF</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FaCalendarAlt className="w-5 h-5 text-orange-500" />
                  <span className="text-gray-700">Schedule:</span>
                </div>
                <span className="font-semibold text-gray-800 text-right">
                  Mon-Fri: 8:00-12:00
                  <br />
                  or 13:00-17:00
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Requirements */}
        <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm mb-16">
          <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Additional Requirements
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-gray-800 flex items-center">
                <FaMoneyBillWave className="w-5 h-5 text-green-500 mr-2" />
                Additional Fees
              </h4>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-700">Uniform:</span>
                  <span className="font-semibold text-gray-800">
                    12,000 RWF
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-700">Portfolio:</span>
                  <span className="font-semibold text-gray-800">
                    Required for documents
                  </span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-gray-800 flex items-center">
                <FaTools className="w-5 h-5 text-blue-500 mr-2" />
                Required Materials
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-gray-700">
                    Screwdriver set (screw boxes)
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="text-gray-700">
                    At least 2 big notebooks
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="text-gray-700">
                    Portfolio for enclosing documents
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
            <p className="text-yellow-700 text-center">
              <strong>Note:</strong> Public holidays are respected. Classes will
              not be held on official public holidays.
            </p>
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 border border-blue-200 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Ready to Start Your Tech Journey?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Choose your specialization and gain the skills needed for a
              successful career in technology.
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-[#4B73FF] to-[#06B6D4] text-white font-semibold rounded-xl shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 mx-auto">
              <FaUserGraduate className="w-5 h-5" />
              <span>Enquire About Training</span>
            </button>
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

export default TrainingPrograms;
