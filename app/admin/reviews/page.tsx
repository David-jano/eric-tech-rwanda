"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
  Star,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  RefreshCw,
  AlertCircle,
  MessageSquare,
  User,
  Download,
  Filter,
} from "lucide-react";

interface Review {
  id: number;
  product_id: number;
  product_name?: string;
  customer_name: string;
  customer_email?: string;
  rating: number;
  comment: string;
  status: string;
  created_at: string;
  updated_at?: string;
}

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Fetching reviews from Supabase...");

      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase error details:", error);
        throw new Error(`Database error: ${error.message}`);
      }

      console.log("Successfully fetched reviews:", data);
      console.log("Number of reviews:", data?.length);

      setReviews(data || []);
    } catch (error: any) {
      console.error("Error fetching reviews:", error);
      setError(error.message || "Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  const updateReviewStatus = async (id: number, status: string) => {
    if (!confirm(`Are you sure you want to ${status} this review?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from("reviews")
        .update({
          status,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) throw error;

      await fetchReviews();
      alert(`Review ${status} successfully!`);
    } catch (error) {
      console.error("Error updating review status:", error);
      alert("Failed to update review status");
    }
  };

  const deleteReview = async (id: number) => {
    if (!confirm("Are you sure you want to permanently delete this review?")) {
      return;
    }

    try {
      const { error } = await supabase.from("reviews").delete().eq("id", id);

      if (error) throw error;

      await fetchReviews();
      alert("Review deleted successfully!");
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Failed to delete review");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const filteredReviews = reviews.filter((review) => {
    const matchesFilter = filter === "all" || review.status === filter;
    const matchesSearch =
      searchTerm === "" ||
      review.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.product_name?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: reviews.length,
    approved: reviews.filter((r) => r.status === "approved").length,
    pending: reviews.filter((r) => r.status === "pending" || !r.status).length,
    rejected: reviews.filter((r) => r.status === "rejected").length,
    averageRating:
      reviews.length > 0
        ? (
            reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
          ).toFixed(1)
        : 0,
  };

  const exportToCSV = () => {
    const headers = [
      "ID",
      "Customer Name",
      "Product",
      "Rating",
      "Comment",
      "Status",
      "Created At",
    ];
    const csvData = filteredReviews.map((review) => [
      review.id,
      review.customer_name,
      review.product_name || "N/A",
      review.rating,
      `"${review.comment.replace(/"/g, '""')}"`, // Escape quotes for CSV
      review.status || "pending",
      new Date(review.created_at).toLocaleDateString(),
    ]);

    const csvContent = [headers, ...csvData]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reviews_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Reviews Management
          </h1>
          <button
            onClick={fetchReviews}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <p className="text-red-800 font-medium">
                  Error fetching reviews
                </p>
                <p className="text-red-600 text-sm mt-1">{error}</p>
                <button
                  onClick={fetchReviews}
                  className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Try again →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        {reviews.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-white">
              <p className="text-sm opacity-90">Total Reviews</p>
              <p className="text-3xl font-bold">{stats.total}</p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg text-white">
              <p className="text-sm opacity-90">Approved</p>
              <p className="text-3xl font-bold">{stats.approved}</p>
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-4 rounded-lg text-white">
              <p className="text-sm opacity-90">Pending</p>
              <p className="text-3xl font-bold">{stats.pending}</p>
            </div>
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-lg text-white">
              <p className="text-sm opacity-90">Rejected</p>
              <p className="text-3xl font-bold">{stats.rejected}</p>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-lg text-white">
              <p className="text-sm opacity-90">Avg Rating</p>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-bold">{stats.averageRating}</p>
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
              </div>
            </div>
          </div>
        )}

        {/* Search and Filter Bar */}
        {reviews.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by customer name, product, or review content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              {["all", "pending", "approved", "rejected"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg capitalize whitespace-nowrap transition-colors ${
                    filter === status
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {status === "all" ? "All" : status}
                </button>
              ))}
              <button
                onClick={exportToCSV}
                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Reviews Table */}
      {reviews.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Review
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReviews.map((review) => (
                  <tr
                    key={review.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {review.customer_name}
                          </div>
                          {review.customer_email && (
                            <div className="text-xs text-gray-500">
                              {review.customer_email}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {review.product_name || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4">{renderStars(review.rating)}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 max-w-md truncate">
                        {review.comment}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getStatusColor(review.status || "pending")}`}
                      >
                        {review.status === "approved" && (
                          <CheckCircle className="w-3 h-3" />
                        )}
                        {review.status === "rejected" && (
                          <XCircle className="w-3 h-3" />
                        )}
                        {(!review.status || review.status === "pending") && (
                          <AlertCircle className="w-3 h-3" />
                        )}
                        {review.status || "pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        {new Date(review.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedReview(review);
                            setShowDetailsModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-800"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        {(!review.status || review.status === "pending") && (
                          <>
                            <button
                              onClick={() =>
                                updateReviewStatus(review.id, "approved")
                              }
                              className="text-green-600 hover:text-green-800"
                              title="Approve Review"
                            >
                              <CheckCircle className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() =>
                                updateReviewStatus(review.id, "rejected")
                              }
                              className="text-red-600 hover:text-red-800"
                              title="Reject Review"
                            >
                              <XCircle className="w-5 h-5" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => deleteReview(review.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete Review"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="text-gray-400 mb-4">
            <MessageSquare className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Reviews Yet
          </h3>
          <p className="text-gray-500">
            When customers leave reviews, they will appear here.
          </p>
          <button
            onClick={fetchReviews}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>
      )}

      {/* Review Details Modal */}
      {showDetailsModal && selectedReview && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 py-8">
            <div
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={() => setShowDetailsModal(false)}
            ></div>

            <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Review Details
                </h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">
                      Customer Name
                    </label>
                    <p className="text-gray-900 font-medium">
                      {selectedReview.customer_name}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">
                      Email
                    </label>
                    <p className="text-gray-900">
                      {selectedReview.customer_email || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">
                      Product
                    </label>
                    <p className="text-gray-900">
                      {selectedReview.product_name || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">
                      Rating
                    </label>
                    <div className="flex items-center gap-2 mt-1">
                      {renderStars(selectedReview.rating)}
                      <span className="text-sm text-gray-600">
                        ({selectedReview.rating}/5)
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">
                      Status
                    </label>
                    <div className="mt-1">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getStatusColor(selectedReview.status || "pending")}`}
                      >
                        {selectedReview.status || "pending"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">
                      Submitted On
                    </label>
                    <p className="text-gray-900">
                      {new Date(selectedReview.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-medium text-gray-500 uppercase">
                      Review Comment
                    </label>
                    <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-700 leading-relaxed">
                        {selectedReview.comment}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
                {(!selectedReview.status ||
                  selectedReview.status === "pending") && (
                  <>
                    <button
                      onClick={() => {
                        updateReviewStatus(selectedReview.id, "approved");
                        setShowDetailsModal(false);
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve Review
                    </button>
                    <button
                      onClick={() => {
                        updateReviewStatus(selectedReview.id, "rejected");
                        setShowDetailsModal(false);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject Review
                    </button>
                  </>
                )}
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
