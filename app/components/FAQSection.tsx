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
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location. International orders may be subject to customs fees and import taxes.",
    },
    {
      question: "Are your products covered by warranty?",
      answer:
        "Yes, all our products come with a manufacturer warranty. The duration varies by product but typically ranges from 1-3 years. Please register your product on our website to activate your warranty.",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-2 max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-md text-gray-600">
            Find answers to common questions about our products, services, and
            policies.
          </p>
        </div>

        <div className="space-y-5">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300"
            >
              <button
                className="flex justify-between items-center w-full p-6 text-left focus:outline-none"
                onClick={() => toggleAccordion(index)}
                aria-expanded={activeIndex === index}
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {item.question}
                </h3>
                <span className="flex-shrink-0 ml-4">
                  {activeIndex === index ? (
                    <FiMinus className="w-6 h-6 text-blue-600" />
                  ) : (
                    <FiPlus className="w-6 h-6 text-blue-600" />
                  )}
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  activeIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-6 pt-5 text-gray-600 border-t border-gray-100">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Still have questions? We are here to help!
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
