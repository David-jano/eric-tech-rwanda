"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  FaGraduationCap,
  FaCertificate,
  FaTools,
  FaClock,
  FaCheck,
  FaArrowRight,
  FaArrowLeft,
  FaCheckCircle,
  FaExclamationTriangle,
  FaUser,
  FaSchool,
  FaCalendarAlt,
  FaRocket,
  FaFileUpload,
  FaRegSmile,
  FaRegHeart,
  FaRegStar,
  FaInfoCircle,
} from "react-icons/fa";

const InternshipProgram = () => {
  const [activeTab, setActiveTab] = useState("info");
  const [currentStep, setCurrentStep] = useState(1);
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    nationalId: "",
    school: "",
    program: "",
    currentYear: "",
    studentId: "",
    expectedGraduation: "",
    duration: "",
    startDate: "",
    preferredDomain: "",
    skills: "",
    motivationLetter: "",
    cv: null as File | null,
    academicTranscript: null as File | null,
    recommendationLetter: null as File | null,
    previousExperience: "",
    projects: "",
    certifications: "",
  });

  const totalSteps = 5;
  const steps = [
    {
      number: 1,
      title: "Personal Info",
      icon: FaUser,
      description: "About yourself",
    },
    {
      number: 2,
      title: "Education",
      icon: FaSchool,
      description: "Academic background",
    },
    {
      number: 3,
      title: "Preferences",
      icon: FaCalendarAlt,
      description: "Internship details",
    },
    {
      number: 4,
      title: "Experience",
      icon: FaRocket,
      description: "Skills & achievements",
    },
    {
      number: 5,
      title: "Documents",
      icon: FaFileUpload,
      description: "Upload your files",
    },
  ];

  const internshipPrograms = [
    {
      title: "RTB Students Program",
      subtitle: "Rwanda Technical Board Certified",
      icon: FaCertificate,
      gradient: "from-blue-500 to-blue-600",
      duration: "1-3 Months",
      description:
        "Specialized hands-on training for RTB students focusing on advanced electronics and computer systems.",
      skills: [
        "Circuit Design",
        "Electronics Repair",
        "Computing Systems",
        "Quality Testing",
      ],
    },
    {
      title: "TVET Schools Program",
      subtitle: "Technical & Vocational Excellence",
      icon: FaTools,
      gradient: "from-green-500 to-green-600",
      duration: "1-3 Months",
      description:
        "Comprehensive practical training designed for TVET students to bridge theory and practice.",
      skills: [
        "Hardware Assembly",
        "Software Installation",
        "Network Configuration",
        "Customer Service",
      ],
    },
    {
      title: "REB Students Program",
      subtitle: "Rwanda Education Board Partnership",
      icon: FaSchool,
      gradient: "from-purple-500 to-purple-600",
      duration: "1-3 Months",
      description:
        "Strategic internship program for REB students to gain essential ICT skills.",
      skills: [
        "Computer Fundamentals",
        "Basic Programming",
        "Digital Literacy",
        "Project Management",
      ],
    },
    {
      title: "University Program",
      subtitle: "Higher Education Partnership",
      icon: FaGraduationCap,
      gradient: "from-orange-500 to-orange-600",
      duration: "3-6 Months",
      description:
        "Advanced internship program for university students focusing on research and development.",
      skills: [
        "Research Methods",
        "Advanced Programming",
        "System Design",
        "Project Leadership",
      ],
    },
  ];

  const uploadFile = async (
    file: File,
    folder: string,
  ): Promise<string | null> => {
    try {
      setUploading(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `${folder}_${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `internship/${folder}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("internship")
        .upload(filePath, file, { cacheControl: "3600" });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("internship").getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error(`Error uploading ${folder}:`, error);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("File must be less than 5MB");
        return;
      }
      setFormData({ ...formData, [e.target.name]: file });
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");
    setErrorMessage("");

    try {
      let cvUrl = null,
        transcriptUrl = null,
        recommendationUrl = null;

      if (formData.cv) cvUrl = await uploadFile(formData.cv, "cv");
      if (formData.academicTranscript)
        transcriptUrl = await uploadFile(
          formData.academicTranscript,
          "transcripts",
        );
      if (formData.recommendationLetter)
        recommendationUrl = await uploadFile(
          formData.recommendationLetter,
          "recommendations",
        );

      const applicationData = {
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender || null,
        date_of_birth: formData.dateOfBirth || null,
        national_id: formData.nationalId || null,
        school: formData.school,
        program: formData.program,
        current_year: formData.currentYear || null,
        student_id: formData.studentId || null,
        expected_graduation: formData.expectedGraduation || null,
        duration: formData.duration,
        start_date: formData.startDate || null,
        preferred_domain: formData.preferredDomain || null,
        skills: formData.skills || null,
        motivation_letter: formData.motivationLetter || null,
        cv_url: cvUrl,
        academic_transcript_url: transcriptUrl,
        recommendation_letter_url: recommendationUrl,
        previous_experience: formData.previousExperience || null,
        projects: formData.projects || null,
        certifications: formData.certifications || null,
        status: "pending",
      };

      const { error } = await supabase
        .from("internship_applications")
        .insert([applicationData]);
      if (error) throw error;

      setFormStatus("success");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        gender: "",
        dateOfBirth: "",
        nationalId: "",
        school: "",
        program: "",
        currentYear: "",
        studentId: "",
        expectedGraduation: "",
        duration: "",
        startDate: "",
        preferredDomain: "",
        skills: "",
        motivationLetter: "",
        cv: null,
        academicTranscript: null,
        recommendationLetter: null,
        previousExperience: "",
        projects: "",
        certifications: "",
      });

      setTimeout(() => {
        setFormStatus("idle");
        setActiveTab("info");
        setCurrentStep(1);
      }, 5000);
    } catch (error: any) {
      setFormStatus("error");
      setErrorMessage(error.message || "Failed to submit application.");
      setTimeout(() => setFormStatus("idle"), 5000);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-800"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-800"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-800"
                  placeholder="+250 XXX XXX XXX"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-800"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 text-gray-800">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  National ID
                </label>
                <input
                  type="text"
                  name="nationalId"
                  value={formData.nationalId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-800"
                  placeholder="National ID Number"
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  School/Institution *
                </label>
                <input
                  type="text"
                  name="school"
                  required
                  value={formData.school}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-800"
                  placeholder="Current School/University"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Program/Option *
                </label>
                <input
                  type="text"
                  name="program"
                  required
                  value={formData.program}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-800"
                  placeholder="e.g., Computer Science"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Current Year
                </label>
                <input
                  type="text"
                  name="currentYear"
                  value={formData.currentYear}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-800"
                  placeholder="e.g., Year 3, Final Year"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Student ID
                </label>
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-800"
                  placeholder="Your Student ID"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Expected Graduation
                </label>
                <input
                  type="date"
                  name="expectedGraduation"
                  value={formData.expectedGraduation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-800"
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Duration *
                </label>
                <select
                  name="duration"
                  required
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-800"
                >
                  <option value="">Select Duration</option>
                  <option value="1month">1 Month</option>
                  <option value="2months">2 Months</option>
                  <option value="3months">3 Months</option>
                  <option value="6months">6 Months</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-800"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Domain
                </label>
                <input
                  type="text"
                  name="preferredDomain"
                  value={formData.preferredDomain}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-800"
                  placeholder="e.g., Web Development, Networking, Hardware"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Skills
                </label>
                <textarea
                  name="skills"
                  rows={3}
                  value={formData.skills}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-800"
                  placeholder="List your relevant skills..."
                />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Previous Experience
              </label>
              <textarea
                name="previousExperience"
                rows={3}
                value={formData.previousExperience}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-800"
                placeholder="Any previous internships or work experience..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Projects Completed
              </label>
              <textarea
                name="projects"
                rows={3}
                value={formData.projects}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-800"
                placeholder="List any projects you have worked on..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Certifications
              </label>
              <textarea
                name="certifications"
                rows={2}
                value={formData.certifications}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-800"
                placeholder="List any certifications you have..."
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Motivation Letter
              </label>
              <textarea
                name="motivationLetter"
                rows={4}
                value={formData.motivationLetter}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-800"
                placeholder="Tell us why you want to join our internship program..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                CV/Resume (PDF, max 5MB)
              </label>
              <input
                type="file"
                name="cv"
                id="cv"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Academic Transcript (PDF, max 5MB)
              </label>
              <input
                type="file"
                name="academicTranscript"
                id="academicTranscript"
                accept=".pdf"
                onChange={handleFileChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Recommendation Letter (Optional)
              </label>
              <input
                type="file"
                name="recommendationLetter"
                id="recommendationLetter"
                accept=".pdf"
                onChange={handleFileChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden mx-4 md:mx-8 lg:mx-12 xl:mx-16 rounded-3xl">
        <div className="relative z-10 container mx-auto px-6 py-16 md:py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Internship Program
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Transform your academic knowledge into real-world expertise with
              our comprehensive hands-on internship program
            </p>
            <div className="flex justify-center mt-8">
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-2 border border-blue-200/50 shadow-lg">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setActiveTab("info")}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === "info"
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    Program Info
                  </button>
                  <button
                    onClick={() => setActiveTab("register")}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === "register"
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Info Tab */}
      {activeTab === "info" && (
        <section className="container mx-auto px-4 ">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Programs We Offer
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Specialized programs designed for RTB, TVET, REB, and University
              students
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {internshipPrograms.map((program, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${program.gradient}`}
                ></div>
                <div className="p-6">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${program.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <program.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {program.title}
                  </h3>
                  <p className="text-sm text-blue-600 font-medium mb-3">
                    {program.subtitle}
                  </p>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                    <FaClock className="w-3.5 h-3.5" />
                    <span>{program.duration}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {program.description}
                  </p>
                  <div className="border-t border-gray-100 pt-3">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                      Skills You'll Gain
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {program.skills.slice(0, 2).map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                        >
                          ✓ {skill}
                        </span>
                      ))}
                      <span className="text-xs text-gray-400">
                        +{program.skills.length - 2} more
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Registration Form Tab - Multi-Step */}
      {activeTab === "register" && (
        <section className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold text-gray-900 mb-3">
                Begin Your Journey
              </h2>
              <p className="text-gray-600">
                Fill out the application form below to start your internship
                journey with us
              </p>
            </div>

            {/* Progress Steps */}
            <div className="mb-10">
              <div className="flex justify-between items-center relative">
                <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
                {steps.map((step, idx) => {
                  const isCompleted = currentStep > step.number;
                  const isCurrent = currentStep === step.number;
                  const Icon = step.icon;
                  return (
                    <div
                      key={step.number}
                      className="relative z-10 flex flex-col items-center"
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isCompleted
                            ? "bg-green-500 text-white shadow-lg shadow-green-200"
                            : isCurrent
                              ? "bg-blue-600 text-white ring-4 ring-blue-200 shadow-lg"
                              : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {isCompleted ? (
                          <FaCheck className="w-5 h-5" />
                        ) : (
                          <Icon className="w-5 h-5" />
                        )}
                      </div>
                      <div className="absolute top-14 text-center">
                        <p
                          className={`text-xs font-semibold ${isCurrent ? "text-blue-600" : "text-gray-500"}`}
                        >
                          {step.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-1 hidden md:block">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mt-20">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                <h3 className="text-xl font-bold text-white">
                  Step {currentStep}: {steps[currentStep - 1].title}
                </h3>
                <p className="text-blue-100 text-sm mt-1">
                  {steps[currentStep - 1].description}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                {renderStep()}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={prevStep}
                    className={`px-6 py-2 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                      currentStep === 1
                        ? "invisible"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <FaArrowLeft className="w-4 h-4" />
                    Previous
                  </button>

                  {currentStep < totalSteps ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all flex items-center gap-2 shadow-md"
                    >
                      Next Step
                      <FaArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={formStatus === "loading" || uploading}
                      className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-bold hover:from-green-700 hover:to-green-800 transition-all flex items-center gap-2 shadow-md disabled:opacity-50"
                    >
                      {formStatus === "loading" || uploading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Application
                          <FaCheckCircle className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Status Messages */}
                {formStatus === "success" && (
                  <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4 animate-slideUp">
                    <div className="flex items-center gap-3">
                      <FaCheckCircle className="w-6 h-6 text-green-600" />
                      <div>
                        <h4 className="font-bold text-green-800">
                          Application Submitted Successfully!
                        </h4>
                        <p className="text-green-700 text-sm">
                          We will review your application and contact you within
                          2-3 business days.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {formStatus === "error" && (
                  <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 animate-slideUp">
                    <div className="flex items-center gap-3">
                      <FaExclamationTriangle className="w-6 h-6 text-red-600" />
                      <div>
                        <h4 className="font-bold text-red-800">
                          Submission Failed
                        </h4>
                        <p className="text-red-700 text-sm">
                          {errorMessage || "Please try again later."}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default InternshipProgram;
