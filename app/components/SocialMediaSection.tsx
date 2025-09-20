'use client';
import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaShare } from 'react-icons/fa';

const SocialMediaSection = () => {
  const socialPlatforms = [
    {
      name: "Facebook",
      icon: <FaFacebook className="w-6 h-6" />,
      url: "#",
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
      shareText: "Share on Facebook"
    },
    {
      name: "X",
      icon: <FaTwitter className="w-6 h-6" />,
      url: "#",
      color: "bg-black",
      hoverColor: "hover:bg-gray-800",
      shareText: "Share on X"
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin className="w-6 h-6" />,
      url: "#",
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      shareText: "Share on LinkedIn"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <h2 className="text-4xl font-bold text-black mb-4">Stay Connected</h2>
        <p className="text-xl text-black mb-12 max-w-2xl mx-auto">
          Follow us on social media for the latest product updates, deals, and tech news.
        </p>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex items-center justify-center mb-4">
            <FaShare className="text-blue-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-900">Share Our Page</h3>
          </div>
          <p className="text-gray-600 mb-6">
            Help spread the word about ERIC TECH by sharing our website with your friends.
          </p>
          <div className="flex justify-center space-x-4">
            {socialPlatforms.map((platform, index) => (
              <a
                key={index}
                href={platform.url}
                className={`flex items-center justify-center w-12 h-12 rounded-full ${platform.color} ${platform.hoverColor} text-white transition-all duration-300 transform hover:scale-110 shadow-md`}
                aria-label={`Share on ${platform.name}`}
              >
                {platform.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaSection;