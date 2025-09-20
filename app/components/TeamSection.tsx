'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaLinkedinIn, FaTwitter, FaGithub, FaWhatsapp, FaGoogle, FaArrowRight } from 'react-icons/fa';

// Component to render a colored SVG icon
const SocialIcon = ({ platform, color }: { platform: string, color: string }) => {
  switch (platform) {
    case 'linkedin':
      return <FaLinkedinIn size={18} color={color} />;
    case 'twitter':
      return <FaTwitter size={18} color={color} />;
    case 'github':
      return <FaGithub size={18} color={color} />;
    case 'whatsapp':
      return <FaWhatsapp size={18} color={color} />;
    case 'gmail':
      return <FaGoogle size={18} color={color} />;
    default:
      return null;
  }
};

const teamMembers = [
  {
    id: 1,
    name: "Jean Claude Fiacre",
    role: "CEO & Founder",
    description: "15+ years in tech industry. Passionate about bringing cutting-edge technology to everyone. Former Apple and Samsung executive.",
    imagePath: "/profiles/owner.jpg",
    social: [
      { platform: "linkedin", url: "#", color: "#0077B5" },
      { platform: "twitter", url: "#", color: "#1DA1F2" },
    ]
  },
  {
    id: 2,
    name: "David ISHIMWE",
    role: "Head of Technology",
    description: "MIT graduate with expertise in AI and hardware integration. Leads our product evaluation and tech innovation initiatives.",
    imagePath: "/profiles/me.jpg",
    social: [
      { platform: "linkedin", url: "#", color: "#0077B5" },
      { platform: "github", url: "#", color: "#333" },
    ]
  },
  {
    id: 3,
    name: "Marie UMUTONI",
    role: "Sales Director",
    description: "10+ years in electronics retail. Expert in matching customers with perfect tech solutions. Builds lasting relationships with clients.",
    imagePath: "/profiles/seller.webp",
    social: [
      { platform: "linkedin", url: "#", color: "#0077B5" },
      { platform: "whatsapp", url: "#", color: "#25D366" },
    ]
  },
  {
    id: 4,
    name: "SANO Emelyne",
    role: "Accountant",
    description: "Dedicated to customer satisfaction with background in technical support. Ensures every customer has an amazing experience.",
    imagePath: "/profiles/acc.webp",
    social: [
      { platform: "linkedin", url: "#", color: "#0077B5" },
      { platform: "gmail", url: "#", color: "#DB4437" },
    ]
  }
];

const TeamSection = () => {
  return (
    <>
      <section className="bg-white py-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Meet Our <span className="text-blue-600">Team</span>
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 mb-16 max-w-3xl mx-auto leading-relaxed">
            Our passionate team of technology experts is dedicated to bringing you the best
            electronics and exceptional service.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col"
              >
                <div className="relative h-48 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <Image
                        src={member.imagePath}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-800 font-semibold mb-4 text-sm uppercase tracking-wide">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">{member.description}</p>

                  <div className="flex justify-center space-x-4 pt-4 border-t border-gray-100">
                    {member.social.map((s, index) => (
                      <Link
                        key={index}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 group"
                      >
                        <div className="relative w-5 h-5 flex items-center justify-center">
                          <SocialIcon platform={s.platform} color={s.color} />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team Section */}
      <section className=" py-16 px-4 w-full  rounded-md mx-auto bg-white">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Join Our Team</h2>
          <p className="text-lg text-black mb-10 max-w-2xl mx-auto leading-relaxed">
            We are always looking for passionate individuals who share our love for technology
            and excellent customer service.
          </p>
          <button className="group bg-blue-600 text-white font-semibold py-3 px-8 rounded-md hover:bg-blue-500 transition-all duration-300 flex items-center justify-center mx-auto shadow-lg hover:shadow-xl">
            View Open Positions
            <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </section>
    </>
  );
};

export default TeamSection;
