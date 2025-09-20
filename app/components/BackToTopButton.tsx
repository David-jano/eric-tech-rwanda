"use client"; // Ensure this is at the top of the file

import React from 'react';
import { FaArrowUp } from 'react-icons/fa'; // Import the "Back to Top" icon

const BackToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,          // Scroll to the top of the page
      behavior: 'smooth',  // Ensure smooth scrolling
    });
  };

  return (
    <a
      onClick={scrollToTop} // Trigger the scrollToTop function on click
      href="#"
      className="fixed bottom-6 right-6 z-50 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 ease-in-out cursor-pointer"
    >
      <FaArrowUp size={30} />
    </a>
  );
};

export default BackToTopButton;
