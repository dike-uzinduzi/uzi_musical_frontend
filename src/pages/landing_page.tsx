import { Music, Zap, Award, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";

const Landingpage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const backgroundImages = [
    "https://img.freepik.com/free-photo/people-music_273609-25463.jpg",
    "https://t3.ftcdn.net/jpg/03/28/89/42/360_F_328894297_UEWkHrtVSHrqVXz87nuwRQXxovU1AOsU.jpg",
    "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1600&q=80",
    "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1600&q=80",
  ];

  useEffect(() => {
    const handleMouseMove = (e: { clientX: any; clientY: any }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated gradient overlay */}
      <div
        className="absolute inset-0 z-0 transition-all duration-300 pointer-events-none opacity-40"
        style={{
          background: `radial-gradient(circle 400px at ${mousePosition.x}px ${mousePosition.y}px, rgba(220, 38, 38, 0.15), transparent)`,
        }}
      />

      {/* Background images with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/70 to-black z-10" />
        {backgroundImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Background ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-2000 ${
              index === currentImageIndex ? "opacity-30" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-10">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-red-500/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-20">
        {/* Header - Spotify style */}
        <header className="px-6 py-4 backdrop-blur-md bg-black/20">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 bg-linear-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg shadow-red-500/30 group-hover:shadow-red-500/50 transition-all duration-300">
                <Music className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight">
                UZINDUZI
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                className="px-5 py-2 text-sm font-medium text-white hover:text-gray-200 transition-colors"
                onClick={() => (window.location.href = "/login")}
              >
                Log in
              </button>
              <button
                className="px-6 py-2.5 text-sm font-semibold bg-white text-black rounded-full hover:scale-105 transition-all duration-200 shadow-lg"
                onClick={() => (window.location.href = "/create")}
              >
                Sign up
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="max-w-7xl mx-auto px-6 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-sm text-red-400 font-medium mb-8">
              <Zap className="w-4 h-4" />
              Grammy-winning engineering
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tight">
              Master your track,
              <br />
              <span className="bg-linear-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                instantly.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              An online mastering engine that's easy to use, fast, and sounds
              incredible. Made by Grammy-winning engineers.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <button
                onClick={() => (window.location.href = "/create")}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-8 py-4 rounded-full transition-all duration-200 shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:scale-105 text-base font-semibold"
              >
                Get Started
              </button>
              <button
                className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 hover:bg-white/5 transition-all duration-200 text-base font-semibold"
                onClick={() => (window.location.href = "/home")}
              >
                Continue as Guest
              </button>
            </div>

            {/* Stats / Social Proof */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-red-500" />
                <span>Used by 50K+ artists</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-red-500" />
                <span>1M+ tracks mastered</span>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 backdrop-blur-md bg-black/20">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-linear-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                  <Music className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm text-gray-400">
                  © 2024 Uzinduzi. All rights reserved.
                </span>
              </div>

              <div className="flex gap-4">
                <button className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-all duration-200 border border-white/10 hover:border-red-500/30">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </button>
                <button className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-all duration-200 border border-white/10 hover:border-red-500/30">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landingpage;
