"use client";
import { useState } from "react";
import {
  FaCheck,
  FaMicrochip,
  FaDesktop,
  FaCogs,
  FaCertificate,
  FaClock,
  FaUserGraduate,
  FaMoneyBillWave,
  FaBook,
  FaCalendarAlt,
  FaTools,
  FaChevronDown,
  FaChevronUp,
  FaUsers,
  FaChalkboardTeacher,
  FaLaptopCode,
  FaHandsHelping,
} from "react-icons/fa";
import Image from "next/image";

const TrainingPrograms = () => {
  const [openMajor, setOpenMajor] = useState<number | null>(null);
  const [openProgram, setOpenProgram] = useState<number | null>(null);
  const [activeSpecialization, setActiveSpecialization] =
    useState("electronics");

  const programs = [
    {
      title: "Basic Electronics",
      description: "Fundamentals of electronic circuits and components",
      color: "from-blue-500 to-blue-600",
      details:
        "Learn resistors, capacitors, transistors, and basic circuit design. Hands-on experience with real electronic components.",
      image: "/images/pic20_eh9u9c.jpg",
    },
    {
      title: "Advanced Electronics",
      description: "Complex circuit analysis and PCB design",
      color: "from-indigo-500 to-indigo-600",
      details:
        "Microcontrollers, sensors, and embedded systems. Design and build your own electronic projects.",
      image: "/images/vlcsnap-2026-05-08-23h42m58s587.png",
    },
    {
      title: "Computer Hardware",
      description: "Assembly, maintenance, and repair of computer systems",
      color: "from-purple-500 to-purple-600",
      details:
        "Motherboards, processors, memory, and storage devices. Learn professional computer repair techniques.",
      image: "/images/vlcsnap-2026-05-08-23h44m19s071.png",
    },
    {
      title: "Networking Basics",
      description: "Network setup, configuration, and troubleshooting",
      color: "from-green-500 to-green-600",
      details:
        "IP addressing, routers, switches, and network security. Build and configure real networks.",
      image: "/images/vlcsnap-2026-05-08-23h45m55s562.png",
    },
  ];

  // Student testimonials/photos data
  const studentShowcase = [
    {
      name: "UWAMAHORO Nadia.",
      role: "Electronics Graduate 2024",
      quote: "The hands-on training prepared me perfectly for my career.",
      image: "/images/pic18_nu9o1o.jpg",
    },
    {
      name: "NSENGIMANA Aboubakar",
      role: "Computer Systems Graduate",
      quote: "Now working as a certified computer technician.",
      image: "/images/vlcsnap-2026-05-08-23h45m13s074.png",
    },
    {
      name: "NKURIKIYE Vincent",
      role: "Electronic Specialist",
      quote: "The RTB certification opened many doors for me.",
      image: "/images/pic21_zyzqcu.jpg",
    },
    {
      name: "NSANZIMFURA Jean",
      role: "Current Student",
      quote: "Amazing instructors and practical learning environment.",
      image: "/images/pic20_eh9u9c.jpg",
    },
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header with decorative element */}
        <div className="text-center mb-12">
          <div className="inline-block mb-3">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-12 h-0.5 bg-blue-500"></div>
              <FaUserGraduate className="text-blue-500 text-2xl" />
              <div className="w-12 h-0.5 bg-blue-500"></div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-500 mb-5">
            Training Programs
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Hands-on training in electronic and computer technology with RTB
            certified certificates
          </p>
        </div>

        {/* Student Photos Gallery - Hero Section */}
        <div className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {studentShowcase.map((student, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-square bg-gray-200 relative">
                  {/* Use actual Image component instead of placeholder */}
                  <Image
                    src={student.image}
                    alt={student.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                  <div className="text-center text-white">
                    <p className="text-sm font-semibold">{student.name}</p>
                    <p className="text-xs text-gray-300">{student.role}</p>
                    <p className="text-xs mt-2">"{student.quote}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Program Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100 group hover:shadow-md transition-shadow">
            <div className="flex justify-center mb-3">
              <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaUsers className="text-white text-2xl" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-800">500+</div>
            <div className="text-sm text-gray-600">Students Trained</div>
          </div>

          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100 group hover:shadow-md transition-shadow">
            <div className="flex justify-center mb-3">
              <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaChalkboardTeacher className="text-white text-2xl" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-800">7+</div>
            <div className="text-sm text-gray-600">Expert Instructors</div>
          </div>

          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100 group hover:shadow-md transition-shadow">
            <div className="flex justify-center mb-3">
              <div className="w-14 h-14 rounded-full bg-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaLaptopCode className="text-white text-2xl" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-800">95%</div>
            <div className="text-sm text-gray-600">Employment Rate</div>
          </div>

          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100 group hover:shadow-md transition-shadow">
            <div className="flex justify-center mb-3">
              <div className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaHandsHelping className="text-white text-2xl" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-800">2+</div>
            <div className="text-sm text-gray-600">Partner Companies</div>
          </div>
        </div>

        {/* Simple Program List - Accordion Style with Images */}
        <div className="space-y-3 mb-12">
          {programs.map((program, idx) => {
            const [imgError, setImgError] = useState(false);

            return (
              <div
                key={idx}
                className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() =>
                    setOpenProgram(openProgram === idx ? null : idx)
                  }
                  className="w-full flex justify-between items-center p-5 bg-white hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 bg-gradient-to-r ${program.color} rounded-lg flex items-center justify-center`}
                    >
                      <FaCheck className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-gray-800">
                        {program.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {program.description}
                      </p>
                    </div>
                  </div>
                  {openProgram === idx ? (
                    <FaChevronUp className="text-gray-400" />
                  ) : (
                    <FaChevronDown className="text-gray-400" />
                  )}
                </button>

                {openProgram === idx && (
                  <div className="p-5 bg-gray-50 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="md:w-1/3">
                        <div className="relative rounded-lg h-32 overflow-hidden bg-gray-300">
                          {!imgError ? (
                            <Image
                              src={program.image}
                              alt={`Student working on ${program.title}`}
                              fill
                              className="object-cover"
                              onError={() => setImgError(true)}
                            />
                          ) : (
                            // Fallback when image fails to load
                            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white">
                              <div className="text-center">
                                <FaUserGraduate className="text-3xl mx-auto" />
                                <p className="text-xs mt-1">
                                  Student working on {program.title}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="md:w-2/3">
                        <p className="text-gray-700">{program.details}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Specialization Selection with Improved Toggle */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 mb-10 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Choose Your Specialization
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Select your preferred path and get certified in your area of
            expertise
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-8">
            <button
              onClick={() => setActiveSpecialization("electronics")}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                activeSpecialization === "electronics"
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FaMicrochip />
              <span>Electronics Technology</span>
            </button>
            <button
              onClick={() => setActiveSpecialization("computer")}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                activeSpecialization === "computer"
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg transform scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FaDesktop />
              <span>Computer Systems</span>
            </button>
          </div>

          {/* Detailed Info Cards based on selection */}
          {activeSpecialization === "electronics" && (
            <div className="grid md:grid-cols-2 gap-4 animate-fadeIn">
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center space-x-2 mb-3">
                  <FaMicrochip className="text-blue-500 text-xl" />
                  <h3 className="font-bold text-gray-800">Electronics</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Specialized tools:</strong> Oscilloscope, Multimeter,
                  Soldering Station
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Career paths:</strong> Electronics Technician, PCB
                  Designer, Repair Specialist
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Requirements:</strong> Basic math & physics knowledge
                </p>
              </div>
              <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                <h3 className="font-bold text-gray-800 mb-2">
                  What You'll Learn
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Circuit design and analysis</li>
                  <li>• Microcontroller programming</li>
                  <li>• PCB design and manufacturing</li>
                  <li>• Equipment troubleshooting</li>
                </ul>
              </div>
            </div>
          )}

          {activeSpecialization === "computer" && (
            <div className="grid md:grid-cols-2 gap-4 animate-fadeIn">
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center space-x-2 mb-3">
                  <FaDesktop className="text-purple-500 text-xl" />
                  <h3 className="font-bold text-gray-800">Computer Systems</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Specialized tools:</strong> Diagnostic Cards, Crimping
                  Tools, Network Testers
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Career paths:</strong> Computer Technician, Network
                  Admin, IT Support
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Requirements:</strong> Basic computer literacy
                </p>
              </div>
              <div className="bg-purple-50 p-5 rounded-xl border border-purple-100">
                <h3 className="font-bold text-gray-800 mb-2">
                  What You'll Learn
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Computer assembly & repair</li>
                  <li>• Network configuration</li>
                  <li>• Hardware troubleshooting</li>
                  <li>• System maintenance</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Key Info with Icons */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="bg-white border border-gray-200 rounded-xl p-5 text-center hover:shadow-md transition-shadow group">
            <div className="flex justify-center mb-3">
              <div className="w-14 h-14 rounded-full bg-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaCertificate className="text-white text-2xl" />
              </div>
            </div>
            <h3 className="font-bold text-gray-800">RTB Certified</h3>
            <p className="text-sm text-gray-600">
              Nationally recognized certificates
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 text-center hover:shadow-md transition-shadow group">
            <div className="flex justify-center mb-3">
              <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaClock className="text-white text-2xl" />
              </div>
            </div>
            <h3 className="font-bold text-gray-800">6 Months Course</h3>
            <p className="text-sm text-gray-600">Flexible schedule options</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 text-center hover:shadow-md transition-shadow group">
            <div className="flex justify-center mb-3">
              <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaMoneyBillWave className="text-white text-2xl" />
              </div>
            </div>
            <h3 className="font-bold text-gray-800">Affordable Fees</h3>
            <p className="text-sm text-gray-600">
              300,000 RWF (10k registration)
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 text-center hover:shadow-md transition-shadow group">
            <div className="flex justify-center mb-3">
              <div className="w-14 h-14 rounded-full bg-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaCalendarAlt className="text-white text-2xl" />
              </div>
            </div>
            <h3 className="font-bold text-gray-800">Flexible Schedule</h3>
            <p className="text-sm text-gray-600">
              Morning or afternoon classes
            </p>
          </div>
        </div>

        {/* Compact Requirements with better styling */}
        <details className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 border border-gray-200">
          <summary className="font-semibold text-gray-800 cursor-pointer hover:text-blue-600 transition-colors">
            Additional Requirements & Fees
          </summary>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <p className="font-semibold mb-2">Required Materials:</p>
                <p>• Uniform: 12,000 RWF</p>
                <p>• Screwdriver set & 2 notebooks</p>
                <p>• Portfolio for documents</p>
              </div>
              <div>
                <p className="font-semibold mb-2">Schedule:</p>
                <p>• Monday - Friday</p>
                <p>• Morning: 8:00 - 12:00</p>
                <p>• Afternoon: 13:00 - 17:00</p>
              </div>
            </div>
            <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-yellow-700 text-sm text-center">
                <strong>Note:</strong> Public holidays are respected. Classes
                will not be held on official public holidays.
              </p>
            </div>
          </div>
        </details>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <button className="bg-gradient-to-r from-blue-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            Apply Now - Limited Slots Available
          </button>
          <p className="text-sm text-gray-500 mt-3">
            Contact us for more information or to schedule a campus visit
          </p>
        </div>
      </div>

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};

export default TrainingPrograms;
