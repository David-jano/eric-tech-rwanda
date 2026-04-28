"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaTv,
  FaSatelliteDish,
  FaYoutube,
  FaPlay,
  FaCalendarAlt,
  FaEye,
  FaClock,
  FaList,
  FaThLarge,
} from "react-icons/fa";

// YouTube API response types
interface YouTubeVideo {
  id: string;
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: {
      medium: { url: string; width: number; height: number };
      high: { url: string; width: number; height: number };
    };
    resourceId: { videoId: string };
  };
  contentDetails: { duration: string };
  statistics: { viewCount: string };
}

const TUBIMENYE_PLAYLIST_ID = "PLVA6X1Cp4EqKkf6AA5U-UCz60TKWfiVIU";
const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY; // You'll need to add this

export default function TubimenyeShows() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    fetchPlaylistVideos();
  }, []);

  const fetchPlaylistVideos = async () => {
    try {
      // If you have an API key, fetch real data
      if (YOUTUBE_API_KEY) {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=30&playlistId=${TUBIMENYE_PLAYLIST_ID}&key=${YOUTUBE_API_KEY}`,
        );
        const data = await response.json();

        // Fetch statistics for each video
        const videoIds = data.items
          .map((item: any) => item.snippet.resourceId.videoId)
          .join(",");
        const statsResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoIds}&key=${YOUTUBE_API_KEY}`,
        );
        const statsData = await statsResponse.json();

        const videosWithStats = data.items.map((item: any) => {
          const stats = statsData.items.find(
            (stat: any) => stat.id === item.snippet.resourceId.videoId,
          );
          return {
            ...item,
            statistics: stats?.statistics || { viewCount: "0" },
            contentDetails: stats?.contentDetails || { duration: "" },
          };
        });

        setVideos(videosWithStats);
      } else {
        // Fallback mock data based on your playlist
        setVideos(mockVideos);
      }
    } catch (error) {
      console.error("Error fetching playlist:", error);
      setVideos(mockVideos);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (duration: string) => {
    if (!duration) return "";
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = (match?.[1] || "").replace("H", "");
    const minutes = (match?.[2] || "").replace("M", "");
    const seconds = (match?.[3] || "").replace("S", "");
    if (hours)
      return `${hours}:${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
    return `${minutes}:${seconds.padStart(2, "0")}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-RW", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatViews = (views: string) => {
    const num = parseInt(views);
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading episodes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900">
      {/* Hero Section with TV Channel Info */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="relative z-20 container mx-auto px-6 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-fade-in">
              #Tubimenye
            </h1>
            <p className="text-xl md:text-2xl text-orange-400 font-semibold mb-6 animate-slide-up">
              "Let's Know" — Empowering Rwanda Through Technology
            </p>
            <p className="text-gray-300 max-w-2xl mx-auto mb-10 text-lg">
              Weekly tech show bringing you the latest in technology,
              innovation, and digital transformation across Rwanda and beyond.
            </p>

            {/* TV Channels Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:scale-105 transition-transform">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <FaTv className="text-orange-400 text-2xl" />
                  <span className="text-white font-bold">Startimes</span>
                </div>
                <p className="text-orange-300 font-mono">DTT: 106</p>
                <p className="text-orange-300 font-mono">DHT: 783</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:scale-105 transition-transform">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <FaSatelliteDish className="text-orange-400 text-2xl" />
                  <span className="text-white font-bold">FTA</span>
                </div>
                <p className="text-orange-300 font-mono">Channel: 004</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:scale-105 transition-transform">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <FaSatelliteDish className="text-orange-400 text-2xl" />
                  <span className="text-white font-bold">Canal+</span>
                </div>
                <p className="text-orange-300 font-mono">Channel: 388</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:scale-105 transition-transform">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <FaYoutube className="text-orange-400 text-2xl" />
                  <span className="text-white font-bold">YouTube</span>
                </div>
                <p className="text-orange-300">Subscribe for latest episodes</p>
              </div>
            </div>

            {/* YouTube Embed */}
            <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/20">
              <iframe
                className="w-full aspect-video"
                src={`https://www.youtube.com/embed/videoseries?list=${TUBIMENYE_PLAYLIST_ID}&autoplay=0&modestbranding=1&rel=0`}
                title="#TUBIMENYE Playlist"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Episodes Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">All Episodes</h2>
            <p className="text-gray-400">{videos.length} episodes available</p>
          </div>
          <div className="flex gap-2 bg-white/10 rounded-xl p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                viewMode === "grid"
                  ? "bg-orange-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <FaThLarge /> Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                viewMode === "list"
                  ? "bg-orange-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <FaList /> List
            </button>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <div
                key={video.id}
                className="group bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src="/images/tubimenye.jpg"
                    alt={video.snippet.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a
                      href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-orange-500 text-white p-4 rounded-full hover:bg-orange-600 transition-colors"
                    >
                      <FaPlay className="w-6 h-6" />
                    </a>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {formatDuration(video.contentDetails?.duration || "")}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">
                    {index + 1}. {video.snippet.title}
                  </h3>
                  <div className="flex items-center gap-4 text-gray-400 text-sm">
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt className="w-3 h-3" />
                      {formatDate(video.snippet.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaEye className="w-3 h-3" />
                      {formatViews(video.statistics?.viewCount || "0")} views
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {videos.map((video, index) => (
              <a
                key={video.id}
                href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-all duration-300 border border-white/10 hover:border-orange-500/50"
              >
                <div className="flex gap-4">
                  <div className="relative w-40 flex-shrink-0">
                    <img
                      src="/images/tubimenye.jpg"
                      alt={video.snippet.title}
                      className="w-full rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <FaPlay className="text-white text-2xl" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg mb-2">
                      {index + 1}. {video.snippet.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-2">
                      {video.snippet.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-gray-500 text-sm">
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt className="w-3 h-3" />
                        {formatDate(video.snippet.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaEye className="w-3 h-3" />
                        {formatViews(video.statistics?.viewCount || "0")} views
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock className="w-3 h-3" />
                        {formatDuration(video.contentDetails?.duration || "")}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

// Mock data for fallback (based on your playlist)
const mockVideos: YouTubeVideo[] = [
  {
    id: "vid1",
    snippet: {
      title: "#TUBIMENYE - Episode 1: Introduction to Tech in Rwanda",
      description:
        "Welcome to #TUBIMENYE, where we explore technology in Rwanda",
      publishedAt: "2025-03-28T00:00:00Z",
      thumbnails: {
        medium: {
          url: "https://img.youtube.com/vi/placeholder/tubimenye.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://img.youtube.com/vi/placeholder/0.jpg",
          width: 480,
          height: 360,
        },
      },
      resourceId: { videoId: "placeholder1" },
    },
    contentDetails: { duration: "PT15M30S" },
    statistics: { viewCount: "754" },
  },
  // ... more mock videos would be here
];
