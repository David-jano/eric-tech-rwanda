"use client";
import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "Where are you located?",
      answer:
        "We are located in Kimisagara, Kigali City, KN 20 Ave Street, Rwanda. You can contact us via phone at +250 788 833 355 or email us at erictech007@gmail.com",
    },
   
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept various payment methods including Mobile Money (MTN, Airtel), Bank Transfer, Credit/Debit Cards, and Cash on pickup. All payments are secure and processed through trusted gateways.",
    },
    
    {
      question: "Can I return or exchange a product?",
      answer:
        "Yes, we have a 14-day return policy for unused products in original packaging. For defective products, we offer free replacement within the warranty period. Please contact our support team to initiate a return or exchange.",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Find answers to common questions about our products, services, and
            policies.
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <button
                className="flex justify-between items-center w-full p-6 text-left focus:outline-none group"
                onClick={() => toggleAccordion(index)}
                aria-expanded={activeIndex === index}
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4 group-hover:text-blue-600 transition-colors duration-200">
                  {item.question}
                </h3>
                <span className="flex-shrink-0 ml-4">
                  {activeIndex === index ? (
                    <FiMinus className="w-6 h-6 text-blue-600 transition-all duration-300 transform rotate-0" />
                  ) : (
                    <FiPlus className="w-6 h-6 text-blue-600 transition-all duration-300 group-hover:rotate-90 group-hover:scale-110" />
                  )}
                </span>
              </button>

              <div
                className={`grid transition-all duration-500 ease-in-out ${
                  activeIndex === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="p-6 pt-0 text-gray-600 leading-relaxed">
                    <div className="border-t border-gray-100 pt-5">
                      <p className="text-md">{item.answer}</p>
                      
                      {/* Contact info for location question */}
                      {index === 0 && (
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg animate-fadeIn">
                          <div className="flex items-center gap-3 text-sm">
                            <span className="font-semibold text-blue-800">Address:</span>
                            <span className="text-gray-700">Kimisagara, Kigali City, KN 20 Ave Street</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm mt-2">
                            <span className="font-semibold text-blue-800">Phone:</span>
                            <span className="text-gray-700">+250 788 833 355</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm mt-2">
                            <span className="font-semibold text-blue-800">Email:</span>
                            <span className="text-gray-700">erictech007@gmail.com</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Still have questions? We are here to help!
          </p>
          <a
            href="/contact"
            className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
          >
            Contact Support
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
        
        .grid-rows-[1fr] {
          grid-template-rows: 1fr;
        }
        
        .grid-rows-[0fr] {
          grid-template-rows: 0fr;
        }
      `}</style>
    </section>
  );
};

export default FAQSection;