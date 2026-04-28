"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaSchool,
  FaCalendarAlt,
  FaArrowRight,
  FaCheckCircle,
  FaFileUpload,
  FaClock,
} from "react-icons/fa";

interface InternshipFormData {
  full_name: string;
  email: string;
  phone: string;
  school: string;
  program: string;
  current_year: string;
  duration: string;
  start_date: string;
  preferred_domain: string;
  cover_letter: string;
  cv_file: File | null;
}

export default function InternshipForm() {
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<InternshipFormData>({
    full_name: "",
    email: "",
    phone: "",
    school: "",
    program: "",
    current_year: "",
    duration: "",
    start_date: "",
    preferred_domain: "",
    cover_letter: "",
    cv_file: null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf" && !file.type.startsWith("image/")) {
        alert("Please upload a PDF or image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("File must be less than 5MB");
        return;
      }
      setFormData((prev) => ({ ...prev, cv_file: file }));
    }
  };

  const uploadCV = async (file: File): Promise<string | null> => {
    try {
      setUploading(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `cv_${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `internship_cvs/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("internship")
        .upload(filePath, file, { cacheControl: "3600" });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("internship").getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error("Error uploading CV:", error);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");
    setErrorMessage("");

    try {
      let cvUrl = null;
      if (formData.cv_file) {
        cvUrl = await uploadCV(formData.cv_file);
        if (!cvUrl) {
          throw new Error("Failed to upload CV");
        }
      }

      const { error } = await supabase.from("internship_applications").insert({
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        school: formData.school,
        program: formData.program,
        current_year: formData.current_year || null,
        duration: formData.duration,
        start_date: formData.start_date || null,
        preferred_domain: formData.preferred_domain || null,
        cover_letter: formData.cover_letter || null,
        cv_url: cvUrl,
        status: "pending",
      });

      if (error) throw error;

      setFormStatus("success");

      // Reset form
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        school: "",
        program: "",
        current_year: "",
        duration: "",
        start_date: "",
        preferred_domain: "",
        cover_letter: "",
        cv_file: null,
      });

      // Reset file input
      const fileInput = document.getElementById("cv_file") as HTMLInputElement;
      if (fileInput) fileInput.value = "";

      setTimeout(() => {
        setFormStatus("idle");
      }, 5000);
    } catch (error: any) {
      console.error("Error submitting application:", error);
      setFormStatus("error");
      setErrorMessage(
        error.message || "Failed to submit application. Please try again.",
      );
      setTimeout(() => {
        setFormStatus("idle");
      }, 5000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Internship Application
        </h2>
        <p className="text-xl text-gray-600">
          Join our team and gain valuable hands-on experience in the tech
          industry
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <FaUser className="w-5 h-5 text-blue-600 mr-3" />
            Personal Information
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="full_name"
                placeholder="Your Full Name"
                value={formData.full_name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="+250 788 888 888"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Educational Information */}
        <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-6 border border-green-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <FaSchool className="w-5 h-5 text-green-600 mr-3" />
            Educational Information
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                School/Institution *
              </label>
              <input
                type="text"
                name="school"
                placeholder="Current School/University"
                value={formData.school}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Program/Option *
              </label>
              <input
                type="text"
                name="program"
                placeholder="e.g., Computer Science, Electronics"
                value={formData.program}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Current Year
              </label>
              <input
                type="text"
                name="current_year"
                placeholder="e.g., Year 3, Final Year"
                value={formData.current_year}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Internship Preferences */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <FaCalendarAlt className="w-5 h-5 text-purple-600 mr-3" />
            Internship Preferences
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Preferred Duration *
              </label>
              <select
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              >
                <option value="">Select Duration</option>
                <option value="1month">1 Month</option>
                <option value="2months">2 Months</option>
                <option value="3months">3 Months</option>
                <option value="6months">6 Months</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Preferred Start Date
              </label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
            <div className="md:col-span-2 lg:col-span-1">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Preferred Domain
              </label>
              <input
                type="text"
                name="preferred_domain"
                placeholder="e.g., Web Development, Networking, Hardware"
                value={formData.preferred_domain}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <FaFileUpload className="w-5 h-5 text-orange-600 mr-3" />
            Additional Information
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Cover Letter / Motivation
              </label>
              <textarea
                name="cover_letter"
                rows={4}
                placeholder="Tell us why you want to join our internship program and what makes you a great candidate..."
                value={formData.cover_letter}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Upload CV/Resume (PDF or Image, max 5MB)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  id="cv_file"
                  name="cv_file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500"
                />
                {uploading && (
                  <FaClock className="w-5 h-5 text-blue-600 animate-spin" />
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Accepted formats: PDF, JPG, PNG (Max 5MB)
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <button
            type="submit"
            disabled={formStatus === "loading" || uploading}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {formStatus === "loading" || uploading ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                <span>Submitting Application...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>Submit Your Application Now</span>
                <FaArrowRight className="w-4 h-4" />
              </div>
            )}
          </button>
        </div>

        {/* Success Message */}
        {formStatus === "success" && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <FaCheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <h4 className="font-bold text-green-800">
                  Application Submitted Successfully!
                </h4>
                <p className="text-green-700 text-sm">
                  We will review your application and contact you within 2-3
                  business days.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {formStatus === "error" && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 text-red-600">❌</div>
              <div>
                <h4 className="font-bold text-red-800">Submission Failed</h4>
                <p className="text-red-700 text-sm">
                  {errorMessage || "Please try again later."}
                </p>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
