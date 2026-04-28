"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number;
    name: string;
    price?: number;
  };
}

export default function BookingModal({
  isOpen,
  onClose,
  product,
}: BookingModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_phone: "",
    customer_email: "",
    quantity: 1,
    preferred_date: "",
    preferred_time: "",
    special_requests: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("bookings").insert({
        product_id: product.id,
        product_name: product.name,
        quantity: formData.quantity,
        customer_name: formData.customer_name,
        customer_phone: formData.customer_phone,
        customer_email: formData.customer_email || null,
        preferred_date: formData.preferred_date || null,
        preferred_time: formData.preferred_time || null,
        special_requests: formData.special_requests || null,
        status: "pending",
      });

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({
          customer_name: "",
          customer_phone: "",
          customer_email: "",
          quantity: 1,
          preferred_date: "",
          preferred_time: "",
          special_requests: "",
        });
      }, 2000);
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Failed to create booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        {/* Backdrop - Lighter and blurred */}
        <div
          className="fixed inset-0 bg-white/80 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-100">
          {success ? (
            <div className="text-center py-8">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Booking Request Sent we will get you soon!
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Thank you for your interest! Our team will contact you within 24
                hours to confirm your booking.
              </p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-bold text-gray-900">
                  Book This Product
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="mb-5 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <p className="text-sm font-semibold text-blue-900 mb-1">
                   {product.name}
                </p>
                {product.price && (
                  <p className="text-sm text-blue-800">
                     Price: {product.price.toLocaleString()}  Rwf
                  </p>
                )}
                <p className="text-xs text-blue-600 mt-2">
                   Pay when you pick up at our store
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="customer_name"
                    required
                    value={formData.customer_name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400"
                    placeholder="e.g., MUGABE Albert"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="customer_phone"
                    required
                    value={formData.customer_phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400"
                    placeholder="e.g., 0788 888 888"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address{" "}
                    <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    name="customer_email"
                    value={formData.customer_email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    required
                    min="1"
                    max="99"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred Pickup Date{" "}
                    <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <input
                    type="date"
                    name="preferred_date"
                    value={formData.preferred_date}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred Time{" "}
                    <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <select
                    name="preferred_time"
                    value={formData.preferred_time}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900"
                  >
                    <option value="" className="text-gray-500">
                      Select a time slot
                    </option>
                    <option value="morning">Morning (9 AM - 12 PM)</option>
                    <option value="afternoon">
                       Afternoon (12 PM - 3 PM)
                    </option>
                    <option value="evening">Evening (3 PM - 6 PM)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Special Requests{" "}
                    <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <textarea
                    name="special_requests"
                    rows={3}
                    value={formData.special_requests}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400 resize-none"
                    placeholder="Any special requirements or questions?"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-xl hover:from-green-700 hover:to-green-800 transition-all font-semibold shadow-lg hover:shadow-xl disabled:from-green-400 disabled:to-green-400"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      "Submit Booking Request"
                    )}
                  </button>
                </div>

                <p className="text-xs text-gray-500 text-center mt-3">
                 By submitting, you agree to our terms. Our team will
                  contact you to confirm.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
