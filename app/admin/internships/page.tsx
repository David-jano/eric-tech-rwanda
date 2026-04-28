"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
  Eye,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
} from "lucide-react";

interface InternshipApplication {
  id: number;
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
  cv_url: string;
  status: string;
  created_at: string;
}

export default function AdminInternships() {
  const [applications, setApplications] = useState<InternshipApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selectedApp, setSelectedApp] = useState<InternshipApplication | null>(
    null,
  );
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from("internship_applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    if (!confirm(`Change application status to ${status}?`)) return;

    try {
      const { error } = await supabase
        .from("internship_applications")
        .update({ status, updated_at: new Date() })
        .eq("id", id);

      if (error) throw error;
      await fetchApplications();
      alert(`Application ${status} successfully!`);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDurationLabel = (duration: string) => {
    switch (duration) {
      case "1month":
        return "1 Month";
      case "2months":
        return "2 Months";
      case "3months":
        return "3 Months";
      case "6months":
        return "6 Months";
      default:
        return duration;
    }
  };

  const filteredApps =
    filter === "all"
      ? applications
      : applications.filter((app) => app.status === filter);

  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === "pending").length,
    approved: applications.filter((a) => a.status === "approved").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
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
          Internship Applications
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600">Total Applications</p>
            <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-yellow-600">Pending</p>
            <p className="text-2xl font-bold text-yellow-900">
              {stats.pending}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600">Approved</p>
            <p className="text-2xl font-bold text-green-900">
              {stats.approved}
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-red-600">Rejected</p>
            <p className="text-2xl font-bold text-red-900">{stats.rejected}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {["all", "pending", "approved", "rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg capitalize ${
                filter === status
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  School
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApps.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {app.full_name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{app.phone}</div>
                    <div className="text-xs text-gray-500">{app.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{app.school}</div>
                    <div className="text-xs text-gray-500">{app.program}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {getDurationLabel(app.duration)}
                    </div>
                    {app.start_date && (
                      <div className="text-xs text-gray-500">
                        Start: {new Date(app.start_date).toLocaleDateString()}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getStatusColor(app.status)}`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedApp(app);
                          setShowModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      {app.cv_url && (
                        <a
                          href={app.cv_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-800"
                          title="Download CV"
                        >
                          <Download className="w-5 h-5" />
                        </a>
                      )}
                      {app.status === "pending" && (
                        <>
                          <button
                            onClick={() => updateStatus(app.id, "approved")}
                            className="text-green-600 hover:text-green-800"
                            title="Approve"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => updateStatus(app.id, "rejected")}
                            className="text-red-600 hover:text-red-800"
                            title="Reject"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Application Details Modal */}
      {showModal && selectedApp && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 py-8">
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setShowModal(false)}
            ></div>

            <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Application Details
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500">
                      Full Name
                    </label>
                    <p className="text-gray-900 font-medium">
                      {selectedApp.full_name}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">
                      Email
                    </label>
                    <p className="text-gray-900">{selectedApp.email}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">
                      Phone
                    </label>
                    <p className="text-gray-900">{selectedApp.phone}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">
                      Status
                    </label>
                    <p
                      className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(selectedApp.status)}`}
                    >
                      {selectedApp.status}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">
                      School
                    </label>
                    <p className="text-gray-900">{selectedApp.school}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">
                      Program
                    </label>
                    <p className="text-gray-900">{selectedApp.program}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">
                      Current Year
                    </label>
                    <p className="text-gray-900">
                      {selectedApp.current_year || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">
                      Preferred Domain
                    </label>
                    <p className="text-gray-900">
                      {selectedApp.preferred_domain || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">
                      Duration
                    </label>
                    <p className="text-gray-900">
                      {getDurationLabel(selectedApp.duration)}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">
                      Start Date
                    </label>
                    <p className="text-gray-900">
                      {selectedApp.start_date
                        ? new Date(selectedApp.start_date).toLocaleDateString()
                        : "Not specified"}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-medium text-gray-500">
                      Cover Letter
                    </label>
                    <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-700">
                        {selectedApp.cover_letter || "No cover letter provided"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">
                      Submitted On
                    </label>
                    <p className="text-gray-900">
                      {new Date(selectedApp.created_at).toLocaleString()}
                    </p>
                  </div>
                  {selectedApp.cv_url && (
                    <div>
                      <a
                        href={selectedApp.cv_url}
                        target="_blank"
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
                      >
                        <FileText className="w-4 h-4" />
                        Download CV/Resume
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
