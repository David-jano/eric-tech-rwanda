"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
  TrendingUp,
  Users,
  ShoppingBag,
  Star,
  Eye,
  Calendar,
  ArrowUp,
  ArrowDown,
  Package,
  DollarSign,
  Clock,
} from "lucide-react";

interface AnalyticsData {
  totalProducts: number;
  totalBookings: number;
  totalReviews: number;
  avgRating: number;
  totalStock: number;
  featuredProducts: number;
}

interface MonthlyData {
  month: string;
  bookings: number;
  revenue: number;
}

interface TopProduct {
  id: number;
  name: string;
  bookings: number;
  revenue: number;
}

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalProducts: 0,
    totalBookings: 0,
    totalReviews: 0,
    avgRating: 0,
    totalStock: 0,
    featuredProducts: 0,
  });
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">(
    "month",
  );

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      // Fetch products data
      const { data: products, error: productsError } = await supabase
        .from("products")
        .select("*");

      if (productsError) throw productsError;

      // Fetch bookings data
      const { data: bookings, error: bookingsError } = await supabase
        .from("bookings")
        .select("*");

      if (bookingsError) throw bookingsError;

      // Fetch reviews data
      const { data: reviews, error: reviewsError } = await supabase
        .from("reviews")
        .select("rating");

      if (reviewsError) throw reviewsError;

      // Calculate analytics
      const totalProducts = products?.length || 0;
      const featuredProducts =
        products?.filter((p) => p.is_featured).length || 0;
      const totalStock =
        products?.reduce((sum, p) => sum + (p.stock || 0), 0) || 0;
      const totalBookings = bookings?.length || 0;
      const totalReviews = reviews?.length || 0;
      const avgRating =
        reviews?.length > 0
          ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
          : 0;

      setAnalytics({
        totalProducts,
        totalBookings,
        totalReviews,
        avgRating: Number(avgRating.toFixed(1)),
        totalStock,
        featuredProducts,
      });

      // Calculate monthly data
      const monthlyStats = calculateMonthlyData(bookings || []);
      setMonthlyData(monthlyStats);

      // Calculate top products
      const topProductsData = calculateTopProducts(
        bookings || [],
        products || [],
      );
      setTopProducts(topProductsData);

      // Get recent activity
      const recent = getRecentActivity(bookings || [], reviews || []);
      setRecentActivity(recent);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateMonthlyData = (bookings: any[]): MonthlyData[] => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentYear = new Date().getFullYear();

    const monthlyStats = months.map((month) => ({
      month,
      bookings: 0,
      revenue: 0,
    }));

    bookings.forEach((booking) => {
      const date = new Date(booking.created_at);
      if (date.getFullYear() === currentYear) {
        const monthIndex = date.getMonth();
        monthlyStats[monthIndex].bookings++;
        // Assuming average price form product, you can calculate actual revenue
        monthlyStats[monthIndex].revenue += booking.quantity * 100; // Placeholder calculation
      }
    });

    return monthlyStats;
  };

  const calculateTopProducts = (
    bookings: any[],
    products: any[],
  ): TopProduct[] => {
    const productStats: Record<
      number,
      { name: string; bookings: number; revenue: number }
    > = {};

    bookings.forEach((booking) => {
      const productId = booking.product_id;
      if (!productStats[productId]) {
        const product = products.find((p) => p.id === productId);
        productStats[productId] = {
          name: product?.name || "Unknown",
          bookings: 0,
          revenue: 0,
        };
      }
      productStats[productId].bookings += booking.quantity;
      productStats[productId].revenue += booking.quantity * 100; // Placeholder
    });

    return Object.entries(productStats)
      .map(([id, stats]) => ({
        id: parseInt(id),
        name: stats.name,
        bookings: stats.bookings,
        revenue: stats.revenue,
      }))
      .sort((a, b) => b.bookings - a.bookings)
      .slice(0, 5);
  };

  const getRecentActivity = (bookings: any[], reviews: any[]) => {
    const activities = [
      ...bookings.slice(0, 5).map((b) => ({
        type: "booking",
        message: `New booking from ${b.customer_name} for ${b.product_name}`,
        time: b.created_at,
        icon: "📦",
      })),
      ...reviews.slice(0, 5).map((r) => ({
        type: "review",
        message: `New ${r.rating}-star review from ${r.customer_name}`,
        time: r.created_at,
        icon: "⭐",
      })),
    ];

    return activities
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0, 10);
  };

  const statCards = [
    {
      title: "Total Products",
      value: analytics.totalProducts,
      icon: Package,
      color: "bg-blue-500",
      change: "+12%",
      increasing: true,
    },
    {
      title: "Total Stock",
      value: analytics.totalStock,
      icon: Package,
      color: "bg-green-500",
      change: "+5%",
      increasing: true,
    },
    {
      title: "Total Bookings",
      value: analytics.totalBookings,
      icon: ShoppingBag,
      color: "bg-purple-500",
      change: "+23%",
      increasing: true,
    },
    {
      title: "Total Reviews",
      value: analytics.totalReviews,
      icon: Star,
      color: "bg-yellow-500",
      change: "+8%",
      increasing: true,
    },
    {
      title: "Average Rating",
      value: analytics.avgRating,
      icon: Star,
      color: "bg-orange-500",
      suffix: "/5",
      change: "+0.2",
      increasing: true,
    },
    {
      title: "Featured Products",
      value: analytics.featuredProducts,
      icon: TrendingUp,
      color: "bg-indigo-500",
      change: "+3",
      increasing: true,
    },
  ];

  const maxBookings = Math.max(...monthlyData.map((d) => d.bookings), 1);

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
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Analytics Dashboard
          </h1>
          <div className="flex gap-2">
            {["week", "month", "year"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range as any)}
                className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                  timeRange === range
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
        <p className="text-gray-600 mt-2">Overview of your store performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              {stat.change && (
                <div
                  className={`flex items-center gap-1 text-sm ${stat.increasing ? "text-green-600" : "text-red-600"}`}
                >
                  {stat.increasing ? (
                    <ArrowUp className="w-3 h-3" />
                  ) : (
                    <ArrowDown className="w-3 h-3" />
                  )}
                  {stat.change}
                </div>
              )}
            </div>
            <h3 className="text-sm text-gray-500 mb-1">{stat.title}</h3>
            <div className="flex items-baseline gap-1">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              {stat.suffix && (
                <span className="text-sm text-gray-500">{stat.suffix}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Bookings Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Monthly Bookings
          </h2>
          <div className="space-y-3">
            {monthlyData.map((data, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{data.month}</span>
                  <span className="text-gray-900 font-medium">
                    {data.bookings} bookings
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full flex items-center justify-end px-3 text-white text-sm font-medium transition-all duration-500"
                    style={{ width: `${(data.bookings / maxBookings) * 100}%` }}
                  >
                    {data.bookings > 0 &&
                      `${Math.round((data.bookings / maxBookings) * 100)}%`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Top Selling Products
          </h2>
          <div className="space-y-4">
            {topProducts.length > 0 ? (
              topProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {product.bookings} bookings
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">
                      {product.revenue.toLocaleString()} Rwf
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">
                No products with bookings yet
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Activity
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivity.length > 0 ? (
            recentActivity.map((activity, index) => (
              <div
                key={index}
                className="px-6 py-4 flex items-center gap-3 hover:bg-gray-50 transition-colors"
              >
                <div className="text-2xl">{activity.icon}</div>
                <div className="flex-1">
                  <p className="text-gray-900">{activity.message}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" />
                    {new Date(activity.time).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center text-gray-500">
              No recent activity
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-green-900">24.5%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600">Avg Order Value</p>
              <p className="text-2xl font-bold text-blue-900">75,000 Rwf</p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600">Customer Satisfaction</p>
              <p className="text-2xl font-bold text-purple-900">94%</p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600">Response Time</p>
              <p className="text-2xl font-bold text-orange-900">&lt; 2hrs</p>
            </div>
            <Clock className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
