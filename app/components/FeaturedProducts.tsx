import React from 'react';
import Image from 'next/image';

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Business Laptops",
      description: "Powerful computing solutions for work and creativity with premium performance", 
      image: "/images/pro (2).jpg",
      alt: "iPhone 15 Pro Max"
    },
    {
      id: 2,
      name: "Desktop Systems",
      description: "Reliable workstations for office and professional computing needs",
      image: "/images/500.jpg",
      alt: "Business Laptops"
    },
    {
      id: 3,
      name: "Printing Solutions",
      description: "Efficient printing technology for home and business environments",
      image:  "/images/pro (1).jpg",
      alt: "Printing Solutions"
    },
    {
      id: 4,
      name: "Camera Systems",
      description: "High-resolution imaging with advanced features for photography enthusiasts and professionals",
      image: "/images/pro (3).jpg",
      alt: "Camera Systems"
    },
     {
      id: 5,
      name: "Networking Equipments",
      description: "Advanced connectivity solutions for seamless internet access",
      image: "/images/600.jpg",
      alt: "Networking Equipments"
    },
     {
      id: 6,
      name: "Projection Systems",
      description: "High-quality visual presentation equipment for business and education",
      image: "/images/800.jpg",
      alt: "Projection Systems"
    },
     {
      id:7,
      name: "Audio Equipment",
      description: "Premium sound systems for immersive audio experiences",
      image: "/images/200.jpg",
      alt: "Audio Equipment"
    },
     {
      id: 8,
      name: "Television Systems",
      description: "State-of-the-art display technology for home entertainment",
      image: "/images/700.jpg",
      alt: "Television Systems"
    }

  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Featured Products</h2>
         <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          High-quality electronics and IT equipment available at EricTech Ltd in Kigali, Rwanda
          </p>
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
                  <span className="text- text-gray-500 bg-gray-100 rounded-full p-2">
                    
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
