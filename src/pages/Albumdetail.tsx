import { useState } from "react";
import {
  Menu,
  ChevronDown,
  ArrowLeft,
  Play,
  Heart,
  Share2,
  MoreHorizontal,
} from "lucide-react";
import { motion } from "framer-motion";
import Sidebar from "../components/sidebar";
import { useNavigate, useLocation } from "react-router-dom";

interface Album {
  id: number;
  title: string;
  artist: string;
  genre: string;
  cost: number;
  releaseDate: string;
  tracks: number;
  description: string;
  image: string;
  color: string;
  rating: string;
}

const AlbumDetailScreen = () => {
  const [isDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const album = location.state?.album as Album;

  const userName = "John Doe";

  const themeClasses = {
    bg: isDarkMode
      ? "bg-gray-900"
      : "bg-gradient-to-br from-red-50 via-red-100 to-red-200",
    card: isDarkMode ? "bg-gray-800/70" : "bg-white/70",
    text: isDarkMode ? "text-white" : "text-red-900",
    textSecondary: isDarkMode ? "text-gray-400" : "text-red-700",
    border: isDarkMode ? "border-gray-700" : "border-white/50",
    header: isDarkMode ? "bg-gray-800/80" : "bg-white/80",
  };

  if (!album) {
    return (
      <div className={`flex h-screen items-center justify-center ${themeClasses.bg}`}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold ${themeClasses.text} mb-4`}>Album Not Found</h2>
          <button
            onClick={() => navigate('/albums')}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Back to Albums
          </button>
        </div>
      </div>
    );
  }

  const trackList = Array.from({ length: album.tracks }, (_, i) => ({
    id: i + 1,
    title: `Track ${i + 1}`,
    duration: `${Math.floor(Math.random() * 4) + 2}:${Math.floor(Math.random() * 60)
      .toString()
      .padStart(2, '0')}`,
  }));

  return (
    <div className={`flex h-screen ${themeClasses.bg} relative transition-colors duration-300 overflow-hidden`}>
      {/* Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 h-full z-40">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 lg:hidden transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col h-full overflow-hidden lg:ml-[290px]">
        {/* Header */}
        <header
          className={`${themeClasses.header} backdrop-blur-xl shadow-sm border-b ${themeClasses.border} px-4 sm:px-6 py-4 fixed top-0 left-0 lg:left-[270px] right-0 z-30`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className={`lg:hidden mr-4 p-2 rounded-xl ${
                  isDarkMode ? "bg-gray-700" : "bg-red-100/50"
                } hover:bg-opacity-80 transition-all duration-200`}
              >
                <Menu className={`w-5 h-5 ${themeClasses.textSecondary}`} />
              </button>

              <button
                onClick={() => navigate('/albums')}
                className={`mr-4 p-2 rounded-xl ${
                  isDarkMode ? "bg-gray-700" : "bg-red-100/50"
                } hover:bg-opacity-80 transition-all duration-200`}
              >
                <ArrowLeft className={`w-5 h-5 ${themeClasses.textSecondary}`} />
              </button>

              <div className="flex items-center space-x-3">
                <span className={themeClasses.textSecondary}>Home</span>
                <span className="text-red-300">›</span>
                <span className={themeClasses.textSecondary}>Albums</span>
                <span className="text-red-300">›</span>
                <span className={`${themeClasses.text} font-medium`}>{album.title}</span>
              </div>
            </div>

            {/* User */}
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-3 pl-4 border-l ${themeClasses.border}`}>
                <div className="text-right hidden sm:block">
                  <div className={`text-sm font-semibold ${themeClasses.text}`}>{userName}</div>
                  <div className={`text-xs ${themeClasses.textSecondary}`}>Admin</div>
                </div>

                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/25">
                    <span className="text-white font-semibold text-sm">
                      {userName.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                </div>

                <ChevronDown className={`w-4 h-4 ${themeClasses.textSecondary}`} />
              </div>
            </div>
          </div>
        </header>

        {/* Album Hero Section */}
        <div className="pt-[84px] flex-1 overflow-y-auto">
          <div className={`relative h-80 sm:h-96 bg-gradient-to-r from-red-400 via-red-500 to-red-600 flex items-end`}>
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 w-full p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
                <img
                  src={album.image}
                  alt={album.title}
                  className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl shadow-2xl"
                />
                <div className="flex-1 text-white">
                  <p className="text-sm font-medium mb-2">ALBUM</p>
                  <h1 className="text-4xl sm:text-6xl font-bold mb-4">{album.title}</h1>
                  <p className="text-lg sm:text-xl opacity-90 mb-4">{album.artist}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span>{album.releaseDate}</span>
                    <span>•</span>
                    <span>{album.tracks} tracks</span>
                    <span>•</span>
                    <span>{album.genre}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-6 sm:px-8 py-6">
            <div className="flex items-center gap-4">
              <button className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-105">
                <Play className="w-6 h-6" fill="currentColor" />
              </button>
              <button className={`p-3 rounded-full border ${themeClasses.border} hover:bg-opacity-80 transition-all duration-200`}>
                <Heart className={`w-6 h-6 ${themeClasses.text}`} />
              </button>
              <button className={`p-3 rounded-full border ${themeClasses.border} hover:bg-opacity-80 transition-all duration-200`}>
                <Share2 className={`w-6 h-6 ${themeClasses.text}`} />
              </button>
              <button className={`p-3 rounded-full border ${themeClasses.border} hover:bg-opacity-80 transition-all duration-200 ml-auto`}>
                <MoreHorizontal className={`w-6 h-6 ${themeClasses.text}`} />
              </button>
            </div>
          </div>

          {/* Track List */}
          <div className="px-6 sm:px-8 pb-8">
            <div className={`${themeClasses.card} backdrop-blur-sm border ${themeClasses.border} rounded-2xl overflow-hidden`}>
              <div className={`p-6 border-b ${themeClasses.border}`}>
                <h2 className={`text-2xl font-bold ${themeClasses.text}`}>Track List</h2>
              </div>
              <div className="divide-y divide-red-200 dark:divide-red-700">
                {trackList.map((track, index) => (
                  <div
                    key={track.id}
                    className="flex items-center justify-between p-4 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <span className={`w-8 text-center ${themeClasses.textSecondary}`}>
                        {index + 1}
                      </span>
                      <div>
                        <h3 className={`font-medium ${themeClasses.text}`}>{track.title}</h3>
                        <p className={`text-sm ${themeClasses.textSecondary}`}>{album.artist}</p>
                      </div>
                    </div>
                    <span className={themeClasses.textSecondary}>{track.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Album Information */}
          <div className="px-6 sm:px-8 pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Album Details */}
              <div className={`${themeClasses.card} backdrop-blur-sm border ${themeClasses.border} rounded-2xl p-6`}>
                <h3 className={`text-xl font-bold ${themeClasses.text} mb-4`}>Album Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={themeClasses.textSecondary}>Title:</span>
                    <span className={themeClasses.text}>{album.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={themeClasses.textSecondary}>Artist:</span>
                    <span className={themeClasses.text}>{album.artist}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={themeClasses.textSecondary}>Genre:</span>
                    <span className={themeClasses.text}>{album.genre}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={themeClasses.textSecondary}>Release Date:</span>
                    <span className={themeClasses.text}>{album.releaseDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={themeClasses.textSecondary}>Total Tracks:</span>
                    <span className={themeClasses.text}>{album.tracks}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={themeClasses.textSecondary}>Price:</span>
                    <span className={`font-bold ${themeClasses.text}`}>${album.cost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={themeClasses.textSecondary}>Rating:</span>
                    <span className={themeClasses.text}>{album.rating}/5</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Description */}
              <div className={`${themeClasses.card} backdrop-blur-sm border ${themeClasses.border} rounded-2xl p-6`}>
                <h3 className={`text-xl font-bold ${themeClasses.text} mb-4`}>About this Album</h3>
                <p className={`leading-relaxed ${themeClasses.text}`}>{album.description}</p>

                <div className="mt-6">
                  <h4 className={`font-bold ${themeClasses.text} mb-3`}>Album Credits</h4>
                  <div className="space-y-2 text-sm">
                    {[
                      ["Produced By:", "Producer Name"],
                      ["Mastered By:", "Master Engineer"],
                      ["Written By:", "Songwriter"],
                      ["Featuring:", "Featured Artist"],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between">
                        <span className={themeClasses.textSecondary}>{label}</span>
                        <span className={themeClasses.text}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumDetailScreen;
