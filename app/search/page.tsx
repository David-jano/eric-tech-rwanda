"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Search, X } from "lucide-react";

interface SearchResult {
  id: number;
  name: string;
  description: string;
  type: "product" | "service";
  image_url?: string;
  price?: number;
  slug?: string;
}

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Close results when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.length >= 2) {
        performSearch();
      } else {
        setResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const performSearch = async () => {
    setIsLoading(true);
    try {
      // Search in products
      const { data: products, error: productsError } = await supabase
        .from("products")
        .select("id, name, description, image_url, price")
        .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
        .limit(5);

      if (productsError) throw productsError;

      // Format results with proper type
      const formattedResults: SearchResult[] = (products || []).map(
        (product) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          image_url: product.image_url,
          price: product.price,
          type: "product" as const,
          slug: `/products/${product.id}`,
        }),
      );

      setResults(formattedResults);
      setShowResults(true);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    router.push(result.slug || `/products/${result.id}`);
    setShowResults(false);
    setSearchTerm("");
  };

  const clearSearch = () => {
    setSearchTerm("");
    setResults([]);
    setShowResults(false);
  };

  return (
    <div ref={searchRef} className="relative">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => searchTerm.length >= 2 && setShowResults(true)}
          placeholder="Search products..."
          className="w-64 px-4 py-2 pl-10 pr-10 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="w-4 h-4 text-gray-400" />
        </div>
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-pulse">Searching...</div>
            </div>
          ) : results.length > 0 ? (
            <>
              <div className="p-2 border-b border-gray-100">
                <span className="text-xs text-gray-500 font-medium">
                  Products ({results.length})
                </span>
              </div>
              {results.map((result) => (
                <button
                  key={`${result.type}-${result.id}`}
                  onClick={() => handleResultClick(result)}
                  className="w-full text-left p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-start gap-3">
                    {result.image_url && (
                      <img
                        src={result.image_url}
                        alt={result.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900 text-sm">
                          {result.name}
                        </h4>
                        {result.price && (
                          <span className="text-blue-600 font-semibold text-sm">
                            ${result.price}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-1">
                        {result.description}
                      </p>
                      <span className="text-xs text-blue-600 mt-1 inline-block">
                        {result.type === "product"
                          ? "📦 Product"
                          : "🔧 Service"}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </>
          ) : searchTerm.length >= 2 ? (
            <div className="p-4 text-center text-gray-500">
              <p>No results found for "{searchTerm}"</p>
              <p className="text-xs mt-1">
                Try searching with different keywords
              </p>
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              <p>Type at least 2 characters to search</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
