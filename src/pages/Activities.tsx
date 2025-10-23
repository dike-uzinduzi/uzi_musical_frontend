import { useState } from 'react';
import { Play, Heart, Music, Clock, MoreVertical, Shuffle, Menu, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/sidebar';

export default function MusicActivitiesScreen() {
  const [likedAlbums, setLikedAlbums] = useState<number[]>([1, 3, 5]);
  const [hoveredAlbum, setHoveredAlbum] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode] = useState(false);

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
    { id: 1, title: 'Midnight Echoes', artist: 'Luna Wave', year: 2024, tracks: 12, duration: '45:23', color: 'from-purple-500 to-pink-500', lastPlayed: '2 hours ago' },
    { id: 2, title: 'Electric Dreams', artist: 'Neon Rider', year: 2023, tracks: 10, duration: '38:15', color: 'from-blue-500 to-cyan-500', lastPlayed: '5 hours ago' },
    { id: 3, title: 'Summer Waves', artist: 'The Coastals', year: 2024, tracks: 14, duration: '52:08', color: 'from-orange-500 to-yellow-500', lastPlayed: '1 day ago' },
    { id: 4, title: 'Urban Pulse', artist: 'City Lights', year: 2023, tracks: 11, duration: '42:30', color: 'from-green-500 to-teal-500', lastPlayed: '2 days ago' },
    { id: 5, title: 'Acoustic Sessions', artist: 'James River', year: 2024, tracks: 8, duration: '34:45', color: 'from-red-500 to-rose-500', lastPlayed: '3 days ago' },
    { id: 6, title: 'Night Drive', artist: 'Retro Synth', year: 2023, tracks: 13, duration: '48:20', color: 'from-indigo-500 to-purple-500', lastPlayed: '4 days ago' },
    { id: 7, title: 'Jazz Fusion', artist: 'The Quartet', year: 2024, tracks: 9, duration: '41:12', color: 'from-amber-500 to-orange-500', lastPlayed: '5 days ago' },
    { id: 8, title: 'Digital Horizons', artist: 'Tech Beats', year: 2023, tracks: 15, duration: '56:33', color: 'from-cyan-500 to-blue-500', lastPlayed: '1 week ago' },
  ];

  const toggleLike = (id: number) => {
    setLikedAlbums(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

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
      <div className="flex-1 flex flex-col h-full overflow-hidden lg:ml-[290px] pl-6 sm:pl-8">
        {/* Header */}
        <header
          className={`${themeClasses.header} backdrop-blur-xl shadow-sm border-b ${themeClasses.border} px-4 sm:px-6 py-4 fixed top-0 left-0 lg:left-[270px] right-0 z-30`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className={`lg:hidden mr-4 p-2 rounded-xl ${
                  isDarkMode ? "bg-gray-700" : "bg-slate-100/50"
                } hover:bg-opacity-80 transition-all duration-200`}
              >
                <Menu className={`w-5 h-5 ${themeClasses.textSecondary}`} />
              </button>
              <div className="flex items-center space-x-3">
                <span className={themeClasses.textSecondary}>Home</span>
                <span className="text-slate-400">›</span>
                <span className={`${themeClasses.text} font-medium`}>Music Activities</span>
              </div>
            </div>

            {/* User Info */}
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-3 pl-4 border-l ${themeClasses.border}`}>
                <div className="text-right hidden sm:block">
                  <div className={`text-sm font-semibold ${themeClasses.text}`}>{userName}</div>
                  <div className={`text-xs ${themeClasses.textSecondary}`}>Admin</div>
                </div>
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
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

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto scroll-smooth pt-[84px] pb-8 pr-4 sm:pr-6">
          <AnimatePresence mode="wait">
            <motion.div
              key="music-activities"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="max-w-7xl mx-auto"
            >
              {/* Header */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-2">Recently Visited</h1>
                    <p className="text-base sm:text-lg text-gray-600">Your album listening history</p>
                  </div>
                  <button className="flex items-center gap-2 px-4 sm:px-6 py-3 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 transition-all shadow-lg hover:shadow-xl">
                    <Shuffle className="w-5 h-5" />
                    <span className="hidden sm:inline">Shuffle All</span>
                  </button>
                </div>
                
                {/* Quick Stats Bar */}
                <div className="flex items-center gap-4 sm:gap-8 text-sm text-gray-600 bg-white/60 backdrop-blur rounded-2xl px-4 sm:px-6 py-4 border border-red-100">
                  <div className="flex items-center gap-2">
                    <Music className="w-5 h-5 text-red-500" />
                    <span><strong className="text-gray-800">{visitedAlbums.length}</strong> Albums</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-red-500" />
                    <span><strong className="text-gray-800">6.5</strong> Hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span><strong className="text-gray-800">{likedAlbums.length}</strong> Favorites</span>
                  </div>
                </div>
              </div>

              {/* Albums Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {visitedAlbums.map((album) => (
                  <div
                    key={album.id}
                    onMouseEnter={() => setHoveredAlbum(album.id)}
                    onMouseLeave={() => setHoveredAlbum(null)}
                    className="group bg-white/70 backdrop-blur rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-red-100 hover:border-red-300 hover:-translate-y-2"
                  >
                    {/* Album Cover */}
                    <div className="relative aspect-square overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${album.color} flex items-center justify-center`}>
                        <Music className="w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 text-white opacity-40" />
                      </div>
                      
                      {/* Overlay on Hover */}
                      <div className={`absolute inset-0 bg-black/60 flex items-center justify-center gap-2 sm:gap-3 transition-opacity duration-300 ${
                        hoveredAlbum === album.id ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <button className="p-3 sm:p-4 bg-red-500 rounded-full hover:bg-red-600 transition-all hover:scale-110 shadow-xl">
                          <Play className="w-6 sm:w-8 h-6 sm:h-8 text-white fill-white" />
                        </button>
                        <button
                          onClick={() => toggleLike(album.id)}
                          className={`p-3 sm:p-4 rounded-full transition-all hover:scale-110 shadow-xl ${
                            likedAlbums.includes(album.id)
                              ? 'bg-red-500 text-white'
                              : 'bg-white/90 text-gray-700'
                          }`}
                        >
                          <Heart
                            className="w-5 sm:w-6 h-5 sm:h-6"
                            fill={likedAlbums.includes(album.id) ? 'currentColor' : 'none'}
                          />
                        </button>
                      </div>

                      {/* Last Played Badge */}
                      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-black/70 backdrop-blur text-white text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                        {album.lastPlayed}
                      </div>
                    </div>

                    {/* Album Info */}
                    <div className="p-4 sm:p-5">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 truncate group-hover:text-red-600 transition-colors">
                        {album.title}
                      </h3>
                      <p className="text-gray-600 mb-3 truncate text-sm sm:text-base">{album.artist}</p>
                      
                      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 flex-wrap gap-1">
                        <span>{album.year}</span>
                        <span>•</span>
                        <span>{album.tracks} tracks</span>
                        <span>•</span>
                        <span>{album.duration}</span>
                      </div>
                    </div>

                    {/* More Options */}
                    <button className="absolute top-3 sm:top-4 left-3 sm:left-4 p-2 bg-white/90 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
                      <MoreVertical className="w-4 sm:w-5 h-4 sm:h-5 text-gray-700" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Load More */}
              <div className="mt-8 sm:mt-12 text-center">
                <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white/70 backdrop-blur text-gray-700 rounded-full font-medium hover:bg-white transition-all shadow-lg hover:shadow-xl border border-red-100">
                  Load More Albums
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}