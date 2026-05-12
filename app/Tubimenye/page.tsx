"use client";

import React, { useState, useEffect } from "react";
import {
  FaTv,
  FaSatelliteDish,
  FaYoutube,
  FaPlay,
  FaCalendarAlt,
  FaList,
  FaThLarge,
} from "react-icons/fa";

const TUBIMENYE_PLAYLIST_ID = "PLVA6X1Cp4EqKkf6AA5U-UCz60TKWfiVIU";

interface Video {
  id: string;
  title: string;
  publishedAt: string;
  description: string;
}

export default function TubimenyeShows() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [visibleCount, setVisibleCount] = useState(3); // Show only 3 cards initially

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        // Call our own API route instead of external proxy
        const response = await fetch("/api/youtube");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");

        // Check for parser errors
        const parserError = xmlDoc.querySelector("parsererror");
        if (parserError) {
          throw new Error("XML parsing error");
        }

        const entries = xmlDoc.querySelectorAll("entry");

        if (entries.length === 0) {
          throw new Error("No entries found");
        }

        const videoList: Video[] = Array.from(entries).map((entry, idx) => ({
          id:
            entry.querySelector("yt\\:videoId")?.textContent ||
            entry.querySelector("videoId")?.textContent ||
            `video-${idx}`,
          title:
            entry.querySelector("title")?.textContent || "Untitled Episode",
          publishedAt:
            entry.querySelector("published")?.textContent ||
            new Date().toISOString(),
          description: entry.querySelector("summary")?.textContent || "",
        }));

        setVideos(videoList);
      } catch (error) {
        console.error("Error fetching videos:", error);
        // Set empty array on error
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-RW", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Date unavailable";
    }
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 3); // Load 3 more each time
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

  const displayedVideos = videos.slice(0, visibleCount);
  const hasMore = visibleCount < videos.length;

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
            <p className="text-gray-400">
              {videos.length > 0
                ? `${videos.length} episodes available`
                : "Loading episodes..."}
            </p>
          </div>
          {videos.length > 0 && (
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
          )}
        </div>

        {videos.length > 0 ? (
          <>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedVideos.map((video, index) => (
                  <div
                    key={video.id}
                    className="group bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-105"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                        }}
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <a
                          href={`https://www.youtube.com/watch?v=${video.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-orange-500 text-white p-4 rounded-full hover:bg-orange-600 transition-colors"
                        >
                          <FaPlay className="w-6 h-6" />
                        </a>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">
                        {index + 1}. {video.title}
                      </h3>
                      <div className="flex items-center gap-4 text-gray-400 text-sm">
                        <span className="flex items-center gap-1">
                          <FaCalendarAlt className="w-3 h-3" />
                          {formatDate(video.publishedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {displayedVideos.map((video, index) => (
                  <a
                    key={video.id}
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-all duration-300 border border-white/10 hover:border-orange-500/50"
                  >
                    <div className="flex gap-4">
                      <div className="relative w-40 flex-shrink-0">
                        <img
                          src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                          alt={video.title}
                          className="w-full rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <FaPlay className="text-white text-2xl" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg mb-2">
                          {index + 1}. {video.title}
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-2 mb-2">
                          {video.description}
                        </p>
                        <div className="flex flex-wrap gap-4 text-gray-500 text-sm">
                          <span className="flex items-center gap-1">
                            <FaCalendarAlt className="w-3 h-3" />
                            {formatDate(video.publishedAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}

            {/* Show More Button */}
            {hasMore && (
              <div className="text-center mt-10">
                <button
                  onClick={loadMore}
                  className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
                >
                  Show More Episodes ({videos.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">
              Unable to load episode list. Please use the YouTube playlist above
              to watch episodes.
            </p>
            <a
              href={`https://www.youtube.com/playlist?list=${TUBIMENYE_PLAYLIST_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
            >
              <FaYoutube /> Watch Playlist on YouTube
            </a>
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
