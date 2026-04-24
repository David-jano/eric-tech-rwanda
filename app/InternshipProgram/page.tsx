"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  FaGraduationCap,
  FaUsers,
  FaCertificate,
  FaTools,
  FaChartLine,
  FaClock,
  FaAward,
  FaStar,
  FaQuoteLeft,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaUser,
  FaSchool,
  FaCheck,
  FaArrowRight,
  FaHandshake,
  FaNetworkWired,
  FaRocket,
  FaBolt,
  FaPlay,
  FaCheckCircle,
  FaExclamationTriangle,
  FaHeadset,
  FaIdCard,
  FaBook,
  FaUserGraduate,
  FaFileUpload,
} from "react-icons/fa";

const InternshipProgram = () => {
  const [selectedProgram, setSelectedProgram] = useState(0);
  const [activeTab, setActiveTab] = useState("info");
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    nationalId: "",

    // Educational Information
    school: "",
    program: "",
    currentYear: "",
    studentId: "",
    expectedGraduation: "",

    // Internship Preferences
    duration: "",
    startDate: "",
    preferredDomain: "",
    skills: "",

    // Documents
    motivationLetter: "",
    cv: null as File | null,
    academicTranscript: null as File | null,
    recommendationLetter: null as File | null,

    // Experience
    previousExperience: "",
    projects: "",
    certifications: "",
  });
  const [formStatus, setFormStatus] = useState("idle");

  const internshipPrograms = [
    {
      title: "RTB Students Program",
      subtitle: "Rwanda Technical Board Certified",
      icon: FaCertificate,
      gradient: "from-blue-500 to-blue-600",
      duration: "1-3 Months",
      description:
        "Specialized hands-on training for RTB students focusing on advanced electronics and computer systems.",
      skills: [
        "Circuit Design",
        "Electronics Repair",
        "Computing Systems",
        "Quality Testing",
      ],
      requirements: ["Current RTB enrollment", "Basic electronics knowledge"],
      awards: "RTB-Recognized Certificate",
    },
    {
      title: "TVET Schools Program",
      subtitle: "Technical & Vocational Excellence",
      icon: FaTools,
      gradient: "from-green-500 to-green-600",
      duration: "1-3 Months",
      description:
        "Comprehensive practical training designed for TVET students to bridge theory and practice.",
      skills: [
        "Hardware Assembly",
        "Software Installation",
        "Network Configuration",
        "Customer Service",
      ],
      requirements: ["TVET school enrollment", "Completed basic courses"],
      awards: "TVET Skills Certificate",
    },
    {
      title: "REB Students Program",
      subtitle: "Rwanda Education Board Partnership",
      icon: FaSchool,
      gradient: "from-purple-500 to-purple-600",
      duration: "1-3 Months",
      description:
        "Strategic internship program for REB students to gain essential ICT skills.",
      skills: [
        "Computer Fundamentals",
        "Basic Programming",
        "Digital Literacy",
        "Project Management",
      ],
      requirements: ["REB school student", "Final year status"],
      awards: "REB-Endorsed Certificate",
    },
    {
      title: "University Program",
      subtitle: "Higher Education Partnership",
      icon: FaGraduationCap,
      gradient: "from-orange-500 to-orange-600",
      duration: "3-6 Months",
      description:
        "Advanced internship program for university students focusing on research and development.",
      skills: [
        "Research Methods",
        "Advanced Programming",
        "System Design",
        "Project Leadership",
      ],
      requirements: ["University enrollment", "Completed 2+ years"],
      awards: "University Credit + Certificate",
    },
  ];

  const testimonials = [
    {
      name: "Alice Uwimana",
      school: "IPRC Kigali (TVET)",
      program: "Electronics & Computer Systems",
      image: "/profiles/acc.webp",
      content:
        "The internship at ERIC Tech Twanda was transformative! I gained hands-on experience with real electronics that perfectly complemented my TVET coursework.",
      rating: 5,
      duration: "3 months",
    },
    {
      name: "Jean Baptiste Nzeyimana",
      school: "Integrated Polytechnic Regional Centre (RTB)",
      program: "Advanced Electronics",
      image: "/profiles/owner.jpg",
      content:
        "This internship bridged the gap between theory and practice. Working with professional equipment gave me confidence in my technical abilities.",
      rating: 5,
      duration: "2 months",
    },
    {
      name: "Grace Mukamana",
      school: "Lycée de Kigali (REB)",
      program: "ICT Fundamentals",
      image: "/profiles/seller.webp",
      content:
        "As a final-year student, this internship provided exactly what I needed. The mentorship was excellent, and I gained practical ICT skills.",
      rating: 5,
      duration: "1 month",
    },
    {
      name: "Emmanuel Habimana",
      school: "WDA Technical School (TVET)",
      program: "Network & Systems",
      image: "/profiles/me.jpg",
      content:
        "The hands-on training I received was incredible. Learning to configure networks with real clients gave me skills no classroom could provide.",
      rating: 5,
      duration: "3 months",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");

    setTimeout(() => {
      setFormStatus("success");
      setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          gender: "",
          dateOfBirth: "",
          nationalId: "",
          school: "",
          program: "",
          currentYear: "",
          studentId: "",
          expectedGraduation: "",
          duration: "",
          startDate: "",
          preferredDomain: "",
          skills: "",
          motivationLetter: "",
          cv: null,
          academicTranscript: null,
          recommendationLetter: null,
          previousExperience: "",
          projects: "",
          certifications: "",
        });
        setFormStatus("idle");
        setActiveTab("info");
      }, 3000);
    }, 2000);
  };

  return (
    <>
      <div className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden mx-4 md:mx-8 lg:mx-12 xl:mx-16 rounded-3xl">
          <div className="relative z-10 container mx-auto px-6 py-16 md:py-20">
            <div className="text-center">
              <div className="inline-flex items-center space-x-4 mb-4 md:mb-6">
                <h1 className="text-3xl md:text-4xl font-bold bg-blue-600 bg-clip-text text-transparent">
                  Internship Program
                </h1>
              </div>

              <p className="text-sm md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed mb-6 md:mb-8">
                Transform your academic knowledge into
                <span className="bg-blue-600 bg-clip-text text-transparent font-bold">
                  {" "}
                  real-world expertise
                </span>{" "}
                with our comprehensive hands-on internship program
              </p>

              {/* Tab Navigation */}
              <div className="flex justify-center">
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-2 border border-blue-200/50 shadow-lg">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setActiveTab("info")}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        activeTab === "info"
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                          : "text-gray-600 hover:text-[#4B73FF]"
                      }`}
                    >
                      Program Info
                    </button>
                    <button
                      onClick={() => setActiveTab("register")}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        activeTab === "register"
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                          : "text-gray-600 hover:text-[#4B73FF]"
                      }`}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Program Info Tab */}
        {activeTab === "info" && (
          <>
            {/* Programs Section */}
            <section className="container mx-auto px-4 mb-16">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 mb-4">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                    Programs
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  Students We Offer Internships to
                </h2>
                <p className="text-gray-500 max-w-2xl mx-auto">
                  Specialized programs designed for RTB, TVET, and REB students
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {internshipPrograms.map((program, index) => (
                  <div
                    key={index}
                    className="relative bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-200"
                  >
                    {/* Subtle top accent line */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${program.gradient}`}
                    ></div>

                    <div className="p-6">
                      {/* Icon */}
                      <div className="mb-5">
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${program.gradient} rounded-xl flex items-center justify-center`}
                        >
                          <program.icon className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      {/* Title & Subtitle */}
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {program.title}
                        </h3>
                        <p className="text-sm text-blue-600 font-medium">
                          {program.subtitle}
                        </p>
                      </div>

                      {/* Duration Badge */}
                      <div className="mb-4">
                        <div className="inline-flex items-center gap-1.5 text-gray-500">
                          <FaClock className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-sm">{program.duration}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 text-sm leading-relaxed mb-5">
                        {program.description}
                      </p>

                      {/* Divider */}
                      <div className="border-t border-gray-100 my-4"></div>

                      {/* Skills Section */}
                      <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                          Skills You'll Gain
                        </h4>
                        <div className="space-y-2">
                          {program.skills.slice(0, 3).map((skill, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <FaCheck className="w-3 h-3 text-green-500 flex-shrink-0" />
                              <span className="text-sm text-gray-600">
                                {skill}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <div className="py-5"></div>
          </>
        )}

        {/* Registration Form Tab */}
        {activeTab === "register" && (
          <section className="container mx-auto px-6 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-4xl font-bold text-gray-800 mb-2">
                Internship Application
              </h2>
              <p className="text-md text-gray-600 max-w-3xl mx-auto">
                Complete the form below to apply for our internship program
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="bg-white">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                      <FaUser className="w-4 h-4 text-black mr-3" />
                      Personal Information
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-black mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          placeholder="Your full name..."
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 text-black rounded-xl border border-blue-100 focus:border-[#4B73FF] focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-black mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="Provide your valid email..."
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3  text-black rounded-xl border border-blue-100 focus:border-[#4B73FF] focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="(+250)..."
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3  text-black rounded-xl border border-blue-100 focus:border-[#4B73FF] focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Gender
                        </label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border  text-black  border-gray-300 focus:border-[#4B73FF] focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3  text-black rounded-xl border border-gray-300 focus:border-[#4B73FF] focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          National ID
                        </label>
                        <input
                          type="text"
                          name="nationalId"
                          placeholder="16 Characters..."
                          value={formData.nationalId}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3  text-black rounded-xl border border-gray-300 focus:border-[#4B73FF] focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Educational Information */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-blue-100">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                      <FaSchool className="w-4 h-4 text-black mr-3" />
                      Educational Information
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          School/Institution *
                        </label>
                        <input
                          type="text"
                          name="school"
                          placeholder="Current School..."
                          value={formData.school}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 text-black rounded-xl border border-gray-300 focus:border-[#4B73FF] focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Option/Trade *
                        </label>
                        <input
                          type="text"
                          name="program"
                          placeholder="Option/Trade..."
                          value={formData.program}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 text-black rounded-xl border border-gray-300 focus:border-[#4B73FF] focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Current Year
                        </label>
                        <input
                          type="text"
                          name="currentYear"
                          placeholder="Which year are you in..."
                          value={formData.currentYear}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 text-black rounded-xl border border-gray-300 focus:border-[#4B73FF] focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Internship Preferences */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-blue-100">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                      <FaCalendarAlt className="w-4 h-4 text-black mr-3" />
                      Internship Preferences
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-black mb-2">
                          Preferred Duration *
                        </label>
                        <select
                          name="duration"
                          value={formData.duration}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 text-black rounded-xl border border-gray-300 focus:border-[#4B73FF] focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                        >
                          <option value="">Select Duration</option>
                          <option value="1month">1 Month</option>
                          <option value="2months">2 Months</option>
                          <option value="3months">3 Months</option>
                          <option value="6months">6 Months</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-black mb-2">
                          Preferred Start Date
                        </label>
                        <input
                          type="date"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleInputChange}
                          className="w-full text-black px-4 py-3 rounded-xl border border-gray-300 focus:border-[#4B73FF] focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-black mb-2">
                          Preferred Domain/Field
                        </label>
                        <input
                          type="text"
                          name="preferredDomain"
                          value={formData.preferredDomain}
                          onChange={handleInputChange}
                          className="w-full text-black px-4 py-3 rounded-xl border border-gray-300 focus:border-[#4B73FF] focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                          placeholder="e.g., Electronics, Programming, Networking"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex flex-col w-1/2 sm:flex-row gap-4 pt-6">
                    <button
                      type="submit"
                      disabled={formStatus === "loading"}
                      className={`flex-1 py-4 px-4 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-105 ${
                        formStatus === "loading"
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-2xl hover:shadow-blue-500/30"
                      }`}
                    >
                      {formStatus === "loading" ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                          <span>Submitting Application...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-2 w-full sm:w-auto ">
                          <span>Submit Your Application Now</span>
                          <FaArrowRight className="w-4 h-4" />
                        </div>
                      )}
                    </button>
                  </div>

                  {/* Form Status Messages */}
                  {formStatus === "success" && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <div className="flex items-center space-x-3">
                        <FaCheckCircle className="w-6 h-6 text-green-600" />
                        <div>
                          <h4 className="font-bold text-green-800">
                            Application Submitted Successfully!
                          </h4>
                          <p className="text-green-700 text-sm">
                            We will review your application and contact you
                            within 2-3 business days.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </section>
        )}
        <div className="py-1"></div>
      </div>
    </>
  );
};

export default InternshipProgram;
