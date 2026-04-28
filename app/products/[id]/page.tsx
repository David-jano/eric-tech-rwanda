"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import BookingModal from "@/app/components/BookingModal";
import CommentSection from "@/app/components/CommentSection";

export interface Product {
  id: number;
  name: string;
  description: string;
  detailed_description?: string;
  image_url?: string;
  image?: string;
  multiple_images?: string[];
  price?: number;
  original_price?: number;
  discount?: number;
  is_featured?: boolean;
  stock?: number;
  specifications?: any;
  features?: string[];
  created_at?: string;
}

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"details" | "specs" | "reviews">(
    "details",
  );
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Business contact info
  const phoneNumber = "+250788833355";
  const whatsappMessage = encodeURIComponent(
    `Hello, I'm interested in ${product?.name}. Please provide more information about this product.`,
  );

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setProduct(data as Product);
      setSelectedImage(data.image_url || "/images/placeholder.jpg");
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (delta: number) => {
    if (!product) return;
    const newQuantity = quantity + delta;
    const maxStock = product.stock ?? 99;
    if (newQuantity >= 1 && newQuantity <= maxStock) {
      setQuantity(newQuantity);
    }
  };

  const getDiscountedPrice = () => {
    if (!product) return null;
    if (product.discount && product.original_price) {
      return product.original_price * (1 - product.discount / 100);
    }
    return product.price;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-16">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gray-200 h-96 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-6 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h2>
          <button
            onClick={() => router.push("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-500">
          <button
            onClick={() => router.push("/")}
            className="hover:text-blue-600"
          >
            Home
          </button>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Product Main Section */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8">
              {/* Product Images Section */}
              <div>
                {/* Main Image */}
                <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <Image
                    src={selectedImage}
                    alt={product.name}
                    width={600}
                    height={500}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>

                {/* Thumbnail Gallery */}
                {product.multiple_images &&
                  product.multiple_images.length > 0 && (
                    <div className="grid grid-cols-4 gap-4">
                      {product.multiple_images.map((img, idx) => (
                        <div
                          key={idx}
                          className={`bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                            selectedImage === img
                              ? "border-blue-500"
                              : "border-transparent"
                          }`}
                          onClick={() => setSelectedImage(img)}
                        >
                          <Image
                            src={img}
                            alt={`${product.name} view ${idx + 1}`}
                            width={100}
                            height={100}
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
              </div>

              {/* Product Info */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>

                {/* Price */}
                <div className="mb-6">
                  {product.discount ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl font-bold text-blue-600">
                          {getDiscountedPrice()?.toLocaleString()} Rwf
                        </span>
                        <span className="text-xl text-gray-400 line-through">
                          {product.original_price?.toLocaleString()} Rwf
                        </span>
                        <span className="bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-bold">
                          Save {product.discount}%
                        </span>
                      </div>
                    </div>
                  ) : product.price ? (
                    <span className="text-3xl font-bold text-blue-600">
                      {product.price.toLocaleString()} Rwf
                    </span>
                  ) : (
                    <span className="text-xl text-gray-600">
                      Contact for pricing
                    </span>
                  )}
                </div>

                {/* Short Description */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Key Features */}
                {product.features && product.features.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Key Features:
                    </h3>
                    <ul className="grid grid-cols-1 gap-2">
                      {product.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-gray-700 text-sm"
                        >
                          <span className="text-green-500">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Stock Status */}
                {product.stock !== undefined && (
                  <div className="mb-6">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        product.stock > 0
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.stock > 0
                        ? `In Stock (${product.stock} available)`
                        : "Out of Stock"}
                    </span>
                  </div>
                )}

                {/* Quantity Selector - Fixed visibility */}
                {product.stock !== undefined && product.stock > 0 && (
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                      Select Quantity:
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
                        <button
                          onClick={() => handleQuantityChange(-1)}
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 font-bold text-lg"
                          disabled={quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-6 py-2 bg-white text-gray-900 font-semibold text-lg min-w-[60px] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(1)}
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 font-bold text-lg"
                          disabled={quantity >= (product.stock || 99)}
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm text-gray-500">
                        Maximum: {product.stock || 99}
                      </span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                  {product.stock !== undefined && product.stock > 0 && (
                    <button
                      onClick={() => setShowBookingModal(true)}
                      className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium text-lg"
                    >
                      Book Now - Pay In Store
                    </button>
                  )}

                  <div className="flex gap-3">
                    <a
                      href={`https://wa.me/${phoneNumber}?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-center flex items-center justify-center gap-2"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.588 2.014.896 3.149.896h.002c3.18 0 5.767-2.586 5.768-5.766.001-3.18-2.585-5.766-5.766-5.766zm-.001 9.332c-.953 0-1.883-.251-2.688-.717l-.192-.114-1.595.418.428-1.553-.125-.198c-.518-.82-.795-1.763-.795-2.744.001-2.512 2.043-4.555 4.554-4.555 1.214 0 2.354.473 3.213 1.332.858.858 1.332 1.999 1.332 3.214-.001 2.511-2.044 4.554-4.555 4.554z" />
                      </svg>
                      WhatsApp
                    </a>

                    <a
                      href={`tel:${phoneNumber}`}
                      className="flex-1 border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors text-center flex items-center justify-center gap-2"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      Call
                    </a>
                  </div>
                </div>

                {/* Store Pickup Info */}
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-blue-600 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Pick up from our store
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        KG 123 St, Kigali, Rwanda
                      </p>
                      <p className="text-xs text-gray-600">
                        Monday - Friday: 8:00 AM - 6:00 PM
                      </p>
                      <p className="text-xs text-green-600 mt-2">
                        Pay when you pick up
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs Section */}
            <div className="border-t border-gray-200">
              <div className="flex border-b border-gray-200 px-8">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`px-6 py-3 font-medium transition-colors ${
                    activeTab === "details"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Product Details
                </button>
                <button
                  onClick={() => setActiveTab("specs")}
                  className={`px-6 py-3 font-medium transition-colors ${
                    activeTab === "specs"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Specifications
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`px-6 py-3 font-medium transition-colors ${
                    activeTab === "reviews"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Reviews
                </button>
              </div>

              <div className="p-8">
                {/* Details Tab */}
                {activeTab === "details" && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Product Description
                    </h3>
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {product.detailed_description || product.description}
                      </p>
                    </div>
                  </div>
                )}

                {/* Specifications Tab */}
                {activeTab === "specs" && product.specifications && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Technical Specifications
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(product.specifications).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              className="flex justify-between py-2 border-b border-gray-200"
                            >
                              <dt className="font-medium text-gray-700 capitalize">
                                {key.replace(/_/g, " ")}:
                              </dt>
                              <dd className="text-gray-800 font-medium">
                                {String(value)}
                              </dd>
                            </div>
                          ),
                        )}
                      </dl>
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === "reviews" && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Customer Reviews
                    </h3>
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <p className="text-gray-500">
                        No reviews yet. Be the first to review this product!
                      </p>
                      <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                        Write a Review
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          product={product}
        />
      )}
    </div>
  );
}
