import React from 'react';
import Image from 'next/image';

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      description: "Latest flagship with titanium design", // No need to escape here, since it's a text string
      price: "$1199",
      image: "/images/1 (3).jpg",
      alt: "iPhone 15 Pro Max"
    },
    {
      id: 2,
      name: "MacBook Pro M3",
      description: "Powerful performance for professionals",
      price: "$1999",
      image: "/images/1 (2).webp",
      alt: "MacBook Pro M3"
    },
    {
      id: 3,
      name: "Sony WH-1000XM4",
      description: "Industry-leading noise cancellation",
      price: "$349",
      image: "/images/1 (2).jpg",
      alt: "Sony WH-1000XM4"
    },
    {
      id: 4,
      name: "Samsung Galaxy S24 Ultra",
      description: "AI-powered photography and S Pen", // If you have apostrophes here, replace with &apos; or &#39;
      price: "$1299",
      image: "/images/1 (1).jpg",
      alt: "Samsung Galaxy S24 Ultra"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Featured Products</h2>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg hover:shadow-lg border border-gray-200 transition-shadow duration-300 overflow-hidden">
              {/* Product Image */}
              <div className="w-full h-48 bg-gray-100 overflow-hidden">
                <Image 
                  src={product.image} 
                  alt={product.alt} 
                  width={500}  // specify width
                  height={300}  // specify height
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Product Details */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {product.description}
                </p>
                
                {/* Price and Button Row */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">
                    {product.price}
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
