"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  FaUser,
  FaStar,
  FaPaperPlane,
  FaSpinner,
  FaChevronDown,
} from "react-icons/fa";
import { supabase } from "@/lib/supabase";

interface Comment {
  id: number;
  customer_name: string;
  customer_email?: string;
  rating: number;
  comment: string;
  created_at: string;
  product_id?: number;
  product_name?: string;
}

interface CommentSectionProps {
  productId?: number;
  productName?: string;
}

type SortOption = "newest" | "oldest" | "highest" | "lowest";

const COMMENTS_PER_PAGE = 10;

const CommentSection = ({ productId, productName }: CommentSectionProps) => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalComments, setTotalComments] = useState<number>(0);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [showForm, setShowForm] = useState<boolean>(false);

  const loadMoreRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Fetch comments with pagination
  const fetchComments = useCallback(
    async (page: number, append = false, currentSort: SortOption = sortBy) => {
      try {
        if (append) {
          setLoadingMore(true);
        } else {
          setLoading(true);
        }

        let query = supabase.from("reviews").select("*", { count: "exact" });

        // Filter by product
        if (productId) {
          query = query.eq("product_id", productId);
        }

        // Sorting
        switch (currentSort) {
          case "newest":
            query = query.order("created_at", { ascending: false });
            break;
          case "oldest":
            query = query.order("created_at", { ascending: true });
            break;
          case "highest":
            query = query
              .order("rating", { ascending: false })
              .order("created_at", { ascending: false });
            break;
          case "lowest":
            query = query
              .order("rating", { ascending: true })
              .order("created_at", { ascending: false });
            break;
        }

        // Pagination
        const from = (page - 1) * COMMENTS_PER_PAGE;
        const to = from + COMMENTS_PER_PAGE - 1;
        query = query.range(from, to);

        const { data, error, count } = await query;

        if (error) throw error;

        if (append) {
          setComments((prev) => [...prev, ...(data || [])]);
        } else {
          setComments(data || []);
        }

        setTotalComments(count || 0);
        setHasMore((count || 0) > page * COMMENTS_PER_PAGE);
      } catch (err) {
        console.error("Error fetching comments:", err);
        setError("Failed to load comments");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [productId, sortBy],
  );

  // Initial load
  useEffect(() => {
    fetchComments(1, false);
  }, [fetchComments]);

  // Setup infinite scroll observer
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
          const nextPage = currentPage + 1;
          setCurrentPage(nextPage);
          fetchComments(nextPage, true);
        }
      },
      { threshold: 0.1 },
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, loadingMore, loading, currentPage, fetchComments]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value as SortOption;
    setSortBy(newSort);
    setCurrentPage(1);
    setComments([]);
    fetchComments(1, false, newSort);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !comment) {
      setError("Please fill in all required fields");
      return;
    }

    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const { error: insertError } = await supabase.from("reviews").insert({
        customer_name: name,
        customer_email: email || null,
        rating: rating,
        comment: comment,
        product_id: productId || null,
        product_name: productName || null,
        created_at: new Date().toISOString(),
      });

      if (insertError) throw insertError;

      setSuccess(true);

      // Reset form
      setName("");
      setEmail("");
      setComment("");
      setRating(0);
      setShowForm(false);

      // Reset pagination and refresh comments
      setCurrentPage(1);
      await fetchComments(1, false);

      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Error submitting comment:", err);
      setError("Failed to submit comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const calculateAverageRating = (): string => {
    if (comments.length === 0) return "0";
    const sum = comments.reduce((acc, curr) => acc + curr.rating, 0);
    return (sum / comments.length).toFixed(1);
  };

  const ratingDistribution = (): Record<number, number> => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    comments.forEach((comment) => {
      distribution[comment.rating as keyof typeof distribution]++;
    });
    return distribution;
  };

  if (loading && comments.length === 0) {
    return (
      <section className="py-8">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center py-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const dist = ratingDistribution();
  const totalRatings = comments.length;
  const avgRating = calculateAverageRating();

  return (
    <section className="py-8">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Customer Reviews
          </h2>
          <p className="text-gray-600">
            {totalComments > 0
              ? `Join ${totalComments} other customers who shared their experience`
              : "Be the first to share your experience"}
          </p>
        </div>

        {/* Rating Summary */}
        {comments.length > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-blue-50 rounded-xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Average Rating */}
              <div className="text-center md:text-left">
                <div className="text-5xl font-bold text-gray-900">
                  {avgRating}
                </div>
                <div className="flex justify-center md:justify-start gap-1 my-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-xl ${
                        i < Math.floor(parseFloat(avgRating))
                          ? "text-blue-600"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  Based on {totalComments}{" "}
                  {totalComments === 1 ? "review" : "reviews"}
                </div>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = dist[star];
                  const percentage =
                    totalRatings > 0 ? (count / totalRatings) * 100 : 0;
                  return (
                    <div key={star} className="flex items-center gap-2">
                      <div className="w-12 text-sm text-gray-600">{star} ★</div>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="w-12 text-sm text-gray-600">{count}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
             Thank you for your review! It has been posted successfully.
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
             {error}
          </div>
        )}

        {/* Write Review Toggle Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all"
          >
            {showForm ? "Cancel" : "Write a Review"}
          </button>
        </div>

        {/* Comment Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Share Your Experience
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Rating *
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                      className="cursor-pointer"
                    >
                      <FaStar
                        className={`text-xl ${
                          star <= (hover || rating)
                            ? "text-blue-600"
                            : "text-gray-300"
                        } hover:scale-110 transition-transform`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Review *
                </label>
                <textarea
                  required
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                  placeholder="Share your thoughts..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 px-6 rounded-lg transition-all disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <FaSpinner className="inline animate-spin mr-2" />
                    Posting...
                  </>
                ) : (
                  "Post Review"
                )}
              </button>
            </form>
          </div>
        )}

        {/* Sort Controls */}
        {comments.length > 0 && (
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-gray-500">
              Showing {comments.length} of {totalComments} reviews
            </div>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="px-3 py-1 border border-gray-500 rounded-lg text-sm text-gray-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Rated</option>
              <option value="lowest">Lowest Rated</option>
            </select>
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-4">
          {comments.map((review, index) => (
            <div
              key={review.id}
              className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {review.customer_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">
                      {review.customer_name}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`text-xs ${
                              i < review.rating
                                ? "text-blue-600"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatDate(review.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed pl-12">
                {review.comment}
              </p>
            </div>
          ))}
        </div>

        {/* Load More Trigger (for infinite scroll) */}
        {hasMore && comments.length > 0 && (
          <div ref={loadMoreRef} className="text-center py-8">
            {loadingMore && (
              <div className="flex items-center justify-center gap-2 text-gray-500">
                <FaSpinner className="animate-spin" />
                Loading more reviews...
              </div>
            )}
          </div>
        )}

        {/* Load More Button (alternative to infinite scroll) */}
        {hasMore && !loadingMore && comments.length > 0 && (
          <div className="text-center mt-6">
            <button
              onClick={() => {
                const nextPage = currentPage + 1;
                setCurrentPage(nextPage);
                fetchComments(nextPage, true);
              }}
              className="flex items-center justify-center gap-2 mx-auto bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-6 rounded-lg transition-all"
            >
              Load More Reviews
              <FaChevronDown className="text-sm" />
            </button>
          </div>
        )}

        {/* No comments */}
        {comments.length === 0 && !loading && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">
              No reviews yet. Be the first to review!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CommentSection;
