"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface Product {
  id: number;
  name: string;
  description: string;
  image_url?: string;
  image?: string;
  price?: number;
  original_price?: number;
  discount?: number;
  is_featured?: boolean;
  stock?: number;
  specifications?: any;
  features?: string[];
  created_at?: string;
}

const FeaturedProducts = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 8;

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      // Get total count
      const { count, error: countError } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true })
        .eq("is_featured", true);

      if (countError) throw countError;
      setTotalProducts(count || 0);

      // Fetch paginated products
      const from = (currentPage - 1) * productsPerPage;
      const to = from + productsPerPage - 1;

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_featured", true)
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) throw error;
      setProducts((data as Product[]) || []);
    } catch (err: any) {
      console.error("Error fetching products:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (id: number) => {
    router.push(`/products/${id}`);
  };

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600">Loading products...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-gray-100 animate-pulse h-64 rounded-lg"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600">
            High-quality electronics and IT equipment available at EricTech Ltd
            in Kigali, Rwanda
          </p>
          {totalProducts > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              Showing {products.length} of {totalProducts} products
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="bg-white rounded-lg hover:shadow-lg border border-gray-200 transition-shadow overflow-hidden group"
            >
              <div className="w-full h-48 bg-gray-100 overflow-hidden relative">
                <Image
                  src={
                    product.image_url ||
                    product.image ||
                    "/images/placeholder.jpg"
                  }
                  alt={product.name}
                  width={500}
                  height={300}
                  priority={index < 4}
                  loading={index < 4 ? "eager" : "lazy"}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
                  onClick={() => handleViewDetails(product.id)}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/placeholder.jpg";
                  }}
                />
              </div>
              <div className="p-6">
                <h3
                  className="text-lg font-semibold text-gray-900 mb-2 cursor-pointer hover:text-blue-600 transition-colors line-clamp-1"
                  onClick={() => handleViewDetails(product.id)}
                >
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  {product.price && (
                    <span className="text-lg font-bold text-blue-600">
                      {product.price.toLocaleString()} Rwf
                    </span>
                  )}
                  <button
                    onClick={() => handleViewDetails(product.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-10 h-10 rounded-lg transition-colors ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
            </div>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {/* View All Button */}
        {totalProducts > productsPerPage && (
          <div className="text-center mt-8">
            <button
              onClick={() => router.push("/products")}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              View All Products →
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
