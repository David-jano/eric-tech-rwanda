'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

// Define the testimonial type
interface Testimonial {
  id: number;
  text: string;
  name: string;
  date: string;
  image: string;
  rating: number;
}

// Testimonial data with images
const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "ERIC TECH provided excellent service and the latest technology. My new laptop has transformed how I work!",
    name: "David ISHMWE",
    date: "January 15, 2023",
    image: "/profiles/me.jpg",
    rating: 3
  },
  {
    id: 2,
    text: "The team at ERIC TECH helped me find the perfect smartphone for my needs at a great price. Will definitely return!",
    name: "Fiacre NKUNZUMUREMYI",
    date: "February 28, 2023",
    image: "/profiles/owner.jpg",
    rating: 5
  },
  {
    id: 3,
    text: "Outstanding customer service! They took the time to explain all the features of my new tablet and even set it up for me.",
    name: "Louise NKURANGA",
    date: "March 5, 2023",
    image: "/profiles/seller.webp",
    rating: 4
  },
  {
    id: 4,
    text: "I have been shopping at ERIC TECH for years. They always have the latest gadgets and their staff is incredibly knowledgeable.",
    name: "Sarah UWIMPUWE",
    date: "April 12, 2023",
    image: "/profiles/acc.webp",
    rating: 5
  },
  {
    id: 5,
    text: "Fast shipping and the product was exactly as described. Will definitely shop here again!",
    name: "KUNDWA Elvis Kelly",
    date: "May 3, 2023",
    image: "/profiles/me.jpg",
    rating: 3
  },
  {
    id: 6,
    text: "The customer support team went above and beyond to help me with my technical issues. Highly recommended!",
    name: "Emily Davis",
    date: "June 18, 2023",
    image: "/profiles/owner.jpg",
    rating: 4
  }
];

const TestimonialsCarousel = () => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Duplicate testimonials for seamless infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  useEffect(() => {
    if (isPaused || !scrollContainerRef.current) return;

    const scrollContainer = scrollContainerRef.current;
    let animationFrameId: number;
    const scrollSpeed = 1; // Pixels per frame (use const)

    const animateScroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += scrollSpeed;
      }
      animationFrameId = requestAnimationFrame(animateScroll);
    };

    animationFrameId = requestAnimationFrame(animateScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused]);

  return (
    <section className="py-16 ">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Read reviews from satisfied customers who trust ERIC TECH for their technology needs.
          </p>
        </div>
        
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-hidden py-6 gap-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <div 
              key={`${testimonial.id}-${index}`} 
              className="flex-shrink-0 w-80 bg-white rounded-2xl  p-6 flex flex-col"
            >
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg mr-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <div className="flex mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="relative mb-4 flex-grow">
                <FaQuoteLeft className="text-blue-200 text-2xl mb-2" />
                <p className="text-gray-700 text-sm italic">&quot;{testimonial.text}&quot;</p>
              </div>
              
              <div className="text-xs text-gray-500 mt-auto">
                {testimonial.date} • Verified Buyer
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-250px * 6));
          }
        }
        
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsCarousel;
