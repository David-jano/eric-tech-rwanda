"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  FaPlay,
  FaArrowRight,
  FaCheckCircle,
  FaStar,
  FaTrophy,
  FaUsers,
  FaRocket,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";

const AboutHero = () => {
  const [playingVideo, setPlayingVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // Changed to false for sound by default
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && playingVideo) {
      videoRef.current.muted = isMuted;
      // Attempt to play with sound
      videoRef.current.play().catch((error) => {
        console.log("Autoplay prevented:", error);
        // If autoplay is prevented, show play button
        setPlayingVideo(false);
      });
    }
  }, [isMuted, playingVideo]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const stats = [
    { number: "15+", label: "Years of Excellence", icon: FaStar },
    { number: "5000+", label: "Happy Customers", icon: FaUsers },
    { number: "100%", label: "Client Satisfaction", icon: FaTrophy },
    { number: "24/7", label: "Support Available", icon: FaRocket },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-6 py-20 relative z-10">
        {/* Hero Content */}
        <div className="text-center mb-16">
          {/* Main Title with Gradient */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
              About Us
            </span>
          </h1>

          {/* Animated Underline */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"></div>
          </div>

          {/* Description */}
          <p className="text-xl md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Pioneering the future of technology solutions in Rwanda with
            <span className="bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent font-bold">
              {" "}
              ERIC Tech
            </span>
          </p>
        </div>

        {/* Main Content Card */}
        <div className="relative max-w-6xl mx-auto">
          {/* Floating Elements */}
          <div className="absolute -top-5 -left-5 w-20 h-full bg-blue-500 rounded-full opacity-10 blur-2xl animate-float"></div>

          <div
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-3xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden group">
                {/* ✅ MOVE GRADIENT HERE */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/50 to-purple-600/50 z-0"></div>

                {!playingVideo ? (
                  <div className="aspect-video flex items-center justify-center relative z-10">
                    {/* Play Button */}
                    <button
                      onClick={() => setPlayingVideo(true)}
                      className="flex flex-col items-center space-y-4"
                    >
                      <div className="relative mt-20">
                        <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-75"></div>
                        <div className="relative w-24 h-24 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all duration-300">
                          <FaPlay className="text-3xl text-white ml-1" />
                        </div>
                      </div>

                      <span className="text-white font-semibold text-lg tracking-wider">
                        Watch Our Story
                      </span>
                    </button>
                  </div>
                ) : (
                  <div className="relative aspect-video md:h-120">
                    <video
                      ref={videoRef}
                      src="/videos/erictech.mp4"
                      autoPlay
                      playsInline
                      className="absolute inset-0"
                    />
                  </div>
                )}
              </div>
              {/* Content Section */}
              <div className="p-8 lg:p-10 bg-white">
                <div className="space-y-6">
                  {/* Title with Icon */}
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-800 rounded-full"></div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      Our Story in 90 Seconds
                    </h3>
                  </div>

                  <p className="text-gray-600 leading-relaxed">
                    Discover how ERIC Tech Rwanda grew from a visionary startup
                    to Rwanda's leading technology provider, transforming the
                    digital landscape across the nation.
                  </p>

                  {/* Milestones */}
                  <div className="space-y-4">
                    {[
                      "Founded in 2008 with a vision for technology excellence",
                      "Served 5000+ satisfied customers across Rwanda",
                      "Technical education through ECT TVET School",
                      "Partnership with leading global tech companies",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 group cursor-pointer"
                      >
                        <div className="mt-1">
                          <FaCheckCircle className="text-green-500 text-sm group-hover:scale-110 transition-transform" />
                        </div>
                        <p className="text-gray-700 group-hover:text-gray-900 transition-colors">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button className="group w-full relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-xl">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Read Full Story
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 3s ease-in-out infinite 1.5s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes ping {
          75%,
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutHero;
