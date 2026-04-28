"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
  Phone,
  Mail,
  Calendar,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Download,
  Filter,
} from "lucide-react";

interface Booking {
  id: number;
  product_name: string;
  quantity: number;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  preferred_date: string;
  preferred_time: string;
  special_requests: string;
  status: string;
  created_at: string;
  updated_at?: string;
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    if (!confirm(`Are you sure you want to mark this booking as ${status}?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id);

      if (error) throw error;

      // Refresh bookings
      await fetchBookings();
      alert(`Booking ${status} successfully!`);
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update booking status");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesFilter = filter === "all" || booking.status === filter;
    const matchesSearch =
      searchTerm === "" ||
      booking.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customer_phone.includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  const exportToCSV = () => {
    const headers = [
      "Customer Name",
      "Product",
      "Quantity",
      "Phone",
      "Email",
      "Status",
      "Created At",
    ];
    const csvData = filteredBookings.map((booking) => [
      booking.customer_name,
      booking.product_name,
      booking.quantity,
      booking.customer_phone,
      booking.customer_email || "",
      booking.status,
      new Date(booking.created_at).toLocaleDateString(),
    ]);

    const csvContent = [headers, ...csvData]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bookings_${new Date().toISOString().split("T")[0]}.csv`;
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
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Bookings Management
        </h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-white">
            <p className="text-sm opacity-90">Total Bookings</p>
            <p className="text-3xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-4 rounded-lg text-white">
            <p className="text-sm opacity-90">Pending</p>
            <p className="text-3xl font-bold">{stats.pending}</p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg text-white">
            <p className="text-sm opacity-90">Confirmed</p>
            <p className="text-3xl font-bold">{stats.confirmed}</p>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-white">
            <p className="text-sm opacity-90">Completed</p>
            <p className="text-3xl font-bold">{stats.completed}</p>
          </div>
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-lg text-white">
            <p className="text-sm opacity-90">Cancelled</p>
            <p className="text-3xl font-bold">{stats.cancelled}</p>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by customer name, product, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {["all", "pending", "confirmed", "completed", "cancelled"].map(
              (status) => (
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
              ),
            )}
            <button
              onClick={exportToCSV}
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
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
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Preferred Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {booking.customer_name}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        ID: #{booking.id}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 font-medium">
                        {booking.product_name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {booking.quantity} unit(s)
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <a
                          href={`tel:${booking.customer_phone}`}
                          className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3" />
                          {booking.customer_phone}
                        </a>
                        {booking.customer_email && (
                          <a
                            href={`mailto:${booking.customer_email}`}
                            className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
                          >
                            <Mail className="w-3 h-3" />
                            {booking.customer_email}
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {booking.preferred_date || "Not specified"}
                      </div>
                      {booking.preferred_time && (
                        <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3" />
                          {booking.preferred_time}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full border ${getStatusColor(booking.status)}`}
                      >
                        {getStatusIcon(booking.status)}
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedBooking(booking);
                              setShowDetailsModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-800"
                            title="View Details"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          {booking.special_requests && (
                            <span
                              className="text-purple-600"
                              title="Has special requests"
                            >
                              <MessageSquare className="w-5 h-5" />
                            </span>
                          )}
                        </div>
                        {booking.status === "pending" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                updateStatus(booking.id, "confirmed")
                              }
                              className="text-green-600 hover:text-green-800 text-xs font-medium"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() =>
                                updateStatus(booking.id, "cancelled")
                              }
                              className="text-red-600 hover:text-red-800 text-xs font-medium"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                        {booking.status === "confirmed" && (
                          <button
                            onClick={() =>
                              updateStatus(booking.id, "completed")
                            }
                            className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                          >
                            Complete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Modal */}
      {showDetailsModal && selectedBooking && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 py-8">
            <div
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={() => setShowDetailsModal(false)}
            ></div>

            <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Booking Details
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
                      {selectedBooking.customer_name}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">
                      Phone Number
                    </label>
                    <a
                      href={`tel:${selectedBooking.customer_phone}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {selectedBooking.customer_phone}
                    </a>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">
                      Email
                    </label>
                    <p className="text-gray-900">
                      {selectedBooking.customer_email || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">
                      Product
                    </label>
                    <p className="text-gray-900 font-medium">
                      {selectedBooking.product_name}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">
                      Quantity
                    </label>
                    <p className="text-gray-900">
                      {selectedBooking.quantity} unit(s)
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">
                      Status
                    </label>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getStatusColor(selectedBooking.status)}`}
                    >
                      {getStatusIcon(selectedBooking.status)}
                      {selectedBooking.status}
                    </span>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">
                      Preferred Date
                    </label>
                    <p className="text-gray-900">
                      {selectedBooking.preferred_date || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">
                      Preferred Time
                    </label>
                    <p className="text-gray-900">
                      {selectedBooking.preferred_time || "Not specified"}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-medium text-gray-500 uppercase">
                      Special Requests
                    </label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg mt-1">
                      {selectedBooking.special_requests ||
                        "No special requests"}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">
                      Created At
                    </label>
                    <p className="text-gray-900">
                      {new Date(selectedBooking.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
                {selectedBooking.status === "pending" && (
                  <>
                    <button
                      onClick={() => {
                        updateStatus(selectedBooking.id, "confirmed");
                        setShowDetailsModal(false);
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Confirm Booking
                    </button>
                    <button
                      onClick={() => {
                        updateStatus(selectedBooking.id, "cancelled");
                        setShowDetailsModal(false);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Cancel Booking
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
