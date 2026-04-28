"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
  Package,
  ShoppingBag,
  Star,
  TrendingUp,
} from "lucide-react";

// Define the types
interface Booking {
  id: number;
  customer_name: string;
  product_name: string;
  quantity: number;
  status: string;
  created_at: string;
}

interface Review {
  rating: number;
}

interface DashboardStats {
  totalProducts: number;
  totalBookings: number;
  pendingBookings: number;
  totalReviews: number;
  avgRating: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalBookings: 0,
    pendingBookings: 0,
    totalReviews: 0,
    avgRating: 0,
  });
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch products count
      const { count: productsCount } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true });

      // Fetch bookings
      const { data: bookings, count: bookingsCount } = await supabase
        .from("bookings")
        .select("*", { count: "exact" });

      const { count: pendingCount } = await supabase
        .from("bookings")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");

      // Fetch reviews
      const { data: reviews, count: reviewsCount } = await supabase
        .from("reviews")
        .select("rating", { count: "exact" });

      const avgRating =
        reviews && reviews.length > 0
          ? reviews.reduce((sum: number, r: Review) => sum + r.rating, 0) / reviews.length
          : 0;

      // Get recent bookings
      const { data: recent } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      setStats({
        totalProducts: productsCount || 0,
        totalBookings: bookingsCount || 0,
        pendingBookings: pendingCount || 0,
        totalReviews: reviewsCount || 0,
        avgRating: Number(avgRating.toFixed(1)),
      });
      setRecentBookings(recent as Booking[] || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      color: "bg-blue-500",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: ShoppingBag,
      color: "bg-green-500",
    },
    {
      title: "Pending Bookings",
      value: stats.pendingBookings,
      icon: TrendingUp,
      color: "bg-yellow-500",
    },
    {
      title: "Reviews",
      value: stats.totalReviews,
      icon: Star,
      color: "bg-purple-500",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Average Rating Card */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Average Rating</p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-2xl font-bold text-gray-900">{stats.avgRating}</p>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(stats.avgRating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="bg-purple-100 p-3 rounded-full">
            <Star className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Bookings
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentBookings.length > 0 ? (
                recentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.customer_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {booking.product_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {booking.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(booking.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}