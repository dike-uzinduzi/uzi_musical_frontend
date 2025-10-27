import { useState } from "react";
import {
  Play,
  Heart,
  Music,
  Clock,
  Menu,
  Pause,
  Grid,
  List,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/sidebar";

export default function MusicActivitiesScreen() {
  const [likedAlbums, setLikedAlbums] = useState<number[]>([1, 3, 5]);
  const [hoveredAlbum, setHoveredAlbum] = useState<number | null>(null);
  const [playingAlbum, setPlayingAlbum] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const userName = "John Doe";

  const themeClasses = {
    bg: isDarkMode
      ? "bg-gray-900"
      : "bg-gradient-to-br from-white via-red-50 to-red-200",
    card: isDarkMode ? "bg-gray-800/70" : "bg-white/70",
    text: isDarkMode ? "text-white" : "text-slate-800",
    textSecondary: isDarkMode ? "text-gray-400" : "text-slate-600",
    border: isDarkMode ? "border-gray-700" : "border-white/50",
    header: isDarkMode ? "bg-gray-800/80" : "bg-white/80",
  };

  const visitedAlbums = [
    {
      id: 1,
      title: "Midnight Echoes",
      artist: "Luna Wave",
      year: 2024,
      tracks: 12,
      duration: "45:23",
      color: "from-purple-500 to-pink-500",
      lastPlayed: "2 hours ago",
    },
    {
      id: 2,
      title: "Electric Dreams",
      artist: "Neon Rider",
      year: 2023,
      tracks: 10,
      duration: "38:15",
      color: "from-blue-500 to-cyan-500",
      lastPlayed: "5 hours ago",
    },
    {
      id: 3,
      title: "Summer Waves",
      artist: "The Coastals",
      year: 2024,
      tracks: 14,
      duration: "52:08",
      color: "from-orange-500 to-yellow-500",
      lastPlayed: "1 day ago",
    },
    {
      id: 4,
      title: "Urban Pulse",
      artist: "City Lights",
      year: 2023,
      tracks: 11,
      duration: "42:30",
      color: "from-green-500 to-teal-500",
      lastPlayed: "2 days ago",
    },
    {
      id: 5,
      title: "Acoustic Sessions",
      artist: "James River",
      year: 2024,
      tracks: 8,
      duration: "34:45",
      color: "from-red-500 to-rose-500",
      lastPlayed: "3 days ago",
    },
    {
      id: 6,
      title: "Night Drive",
      artist: "Retro Synth",
      year: 2023,
      tracks: 13,
      duration: "48:20",
      color: "from-indigo-500 to-purple-500",
      lastPlayed: "4 days ago",
    },
    {
      id: 7,
      title: "Jazz Fusion",
      artist: "The Quartet",
      year: 2024,
      tracks: 9,
      duration: "41:12",
      color: "from-amber-500 to-orange-500",
      lastPlayed: "5 days ago",
    },
    {
      id: 8,
      title: "Digital Horizons",
      artist: "Tech Beats",
      year: 2023,
      tracks: 15,
      duration: "56:33",
      color: "from-cyan-500 to-blue-500",
      lastPlayed: "1 week ago",
    },
  ];

  const toggleLike = (id: number) => {
    setLikedAlbums((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const togglePlay = (id: number) => {
    setPlayingAlbum(playingAlbum === id ? null : id);
  };

  return (
    <div
      className={`flex h-screen ${themeClasses.bg} relative transition-colors duration-300 overflow-hidden`}
    >
      {/* SIDEBAR */}
      <div className="hidden lg:block fixed left-0 top-0 h-full z-40">
        <Sidebar />
      </div>

      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 lg:hidden transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col h-full overflow-hidden lg:ml-[290px] pl-6 sm:pl-8">
        {/* HEADER */}
        <header
          className={`${themeClasses.header} backdrop-blur-xl shadow-sm border-b ${themeClasses.border} px-4 sm:px-6 py-4 fixed top-0 left-0 lg:left-[270px] right-0 z-30`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden mr-4 p-2 rounded-xl bg-slate-100/50 hover:bg-opacity-80"
              >
                <Menu className="w-5 h-5" />
              </button>

              <span className={themeClasses.textSecondary}>Home</span>
              <span className="text-slate-400">›</span>
              <span className={`${themeClasses.text} font-medium`}>
                Music Activities
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 pl-4 border-l">
                <div className="text-right hidden sm:block">
                  <div className={`text-sm font-semibold ${themeClasses.text}`}>
                    {userName}
                  </div>
                  <div className={`text-xs ${themeClasses.textSecondary}`}>
                    Admin
                  </div>
                </div>

                <div className="relative w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white font-bold">
                  {userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto pt-24 pb-8 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Title & Stats */}
            <div className="mb-8">
              <h1
                className={`text-3xl sm:text-4xl font-bold ${themeClasses.text} mb-4`}
              >
                Music Activities
              </h1>
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <p className={themeClasses.textSecondary}>
                  {visitedAlbums.length} albums • {likedAlbums.length} liked
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === "grid"
                        ? "bg-red-600 text-white"
                        : `${themeClasses.card} ${themeClasses.text}`
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === "list"
                        ? "bg-red-600 text-white"
                        : `${themeClasses.card} ${themeClasses.text}`
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Albums Grid/List */}
          {/* Albums Grid/List */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {visitedAlbums.map((album) => (
                  <motion.div
                    key={album.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`${themeClasses.card} backdrop-blur-xl rounded-lg overflow-hidden border ${themeClasses.border} shadow hover:shadow-lg transition-shadow group cursor-pointer`}
                    onMouseEnter={() => setHoveredAlbum(album.id)}
                    onMouseLeave={() => setHoveredAlbum(null)}
                  >
                    <div className="relative aspect-square">
                      <div
                        className={`absolute inset-0 bg-linear-to-br ${album.color}`}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Music className="w-12 h-12 text-white/20" />
                      </div>

                      <AnimatePresence>
                        {hoveredAlbum === album.id && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/30 flex items-center justify-center"
                          >
                            <button
                              onClick={() => togglePlay(album.id)}
                              className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                            >
                              {playingAlbum === album.id ? (
                                <Pause className="w-5 h-5 text-gray-900" />
                              ) : (
                                <Play className="w-5 h-5 text-gray-900 ml-0.5" />
                              )}
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <button
                        onClick={() => toggleLike(album.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            likedAlbums.includes(album.id)
                              ? "fill-red-500 text-red-500"
                              : "text-white"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="p-3">
                      <h3
                        className={`font-semibold text-sm ${themeClasses.text} mb-0.5 truncate`}
                      >
                        {album.title}
                      </h3>
                      <p
                        className={`text-xs ${themeClasses.textSecondary} mb-2 truncate`}
                      >
                        {album.artist}
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <span className={themeClasses.textSecondary}>
                          {album.tracks} tracks
                        </span>
                        <span className={themeClasses.textSecondary}>
                          {album.duration}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {visitedAlbums.map((album) => (
                  <motion.div
                    key={album.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`${themeClasses.card} backdrop-blur-xl rounded-2xl border ${themeClasses.border} shadow-lg hover:shadow-xl transition-all duration-300 group`}
                    onMouseEnter={() => setHoveredAlbum(album.id)}
                    onMouseLeave={() => setHoveredAlbum(null)}
                  >
                    <div className="flex items-center p-4 gap-4">
                      <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden">
                        <div
                          className={`absolute inset-0 bg-linear-to-br ${album.color} opacity-90`}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Music className="w-10 h-10 text-white/30" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3
                          className={`font-bold text-lg ${themeClasses.text}`}
                        >
                          {album.title}
                        </h3>
                        <p className={`text-sm ${themeClasses.textSecondary}`}>
                          {album.artist} • {album.year}
                        </p>
                      </div>

                      <div className="hidden sm:flex items-center gap-6 text-sm">
                        <div className={themeClasses.textSecondary}>
                          {album.tracks} tracks
                        </div>
                        <div
                          className={`flex items-center gap-1 ${themeClasses.textSecondary}`}
                        >
                          <Clock className="w-4 h-4" />
                          {album.duration}
                        </div>
                        <div className={themeClasses.textSecondary}>
                          {album.lastPlayed}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => togglePlay(album.id)}
                          className="p-3 rounded-full bg-red-600 hover:bg-red-700 transition-all"
                        >
                          {playingAlbum === album.id ? (
                            <Pause className="w-5 h-5 text-white" />
                          ) : (
                            <Play className="w-5 h-5 text-white ml-0.5" />
                          )}
                        </button>
                        <button
                          onClick={() => toggleLike(album.id)}
                          className={`p-3 rounded-full ${themeClasses.card} hover:bg-opacity-80 transition-all`}
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              likedAlbums.includes(album.id)
                                ? "fill-red-500 text-red-500"
                                : themeClasses.textSecondary
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
