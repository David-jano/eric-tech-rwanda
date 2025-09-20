'use client';
import React, { useState } from 'react';
import { FaUser, FaStar, FaPaperPlane } from 'react-icons/fa';

const CommentSection = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      rating: 5,
      comment: "Absolutely love my new headphones from ERIC TECH! The sound quality is incredible and the customer service was exceptional.",
      date: "2 days ago"
    },
    {
      id: 2,
      name: "Maya Rodriguez",
      rating: 4,
      comment: "Fast shipping and the product was exactly as described. Will definitely shop here again!",
      date: "1 week ago"
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;
    
    const newComment = {
      id: comments.length + 1,
      name,
      rating,
      comment,
      date: "Just now"
    };
    
    setComments([newComment, ...comments]);
    setName('');
    setEmail('');
    setComment('');
    setRating(0);
  };

  return (
    <section className="py-16 ">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Share Your Experience</h2>
          <p className="text-xl text-gray-600">
            We value your feedback. Tell us about your experience with ERIC TECH.
          </p>
        </div>

        <div className="bg-white rounded-sm shadow-sm p-8 mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Leave a Comment</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-3 text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-300"
                    placeholder="Enter your name"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border text-black border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-300"
                  placeholder="Enter your email"
                />
              </div>
            </div>
      
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                Your Comment *
              </label>
              <textarea
                id="comment"
                required
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full rounded-lg border text-black border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-300"
                placeholder="Share your thoughts about our products or service..."
              />
            </div>
            
            <button
              type="submit"
              className="flex items-center justify-center w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              Post Comment
              <FaPaperPlane className="ml-2" />
            </button>
          </form>
        </div>

        
      </div>
    </section>
  );
};

export default CommentSection;