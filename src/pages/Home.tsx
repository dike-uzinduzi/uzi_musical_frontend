import { useState, useEffect, useCallback } from "react";
import {
  Music,
  Users,
  Menu,
  ChevronDown,
  TrendingUp,
  Activity,
  Disc,
  Play,
  Star,
  Clock,
  Search,
  X,
} from "lucide-react";
import Sidebar from "../components/sidebar";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const [isDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [animatedValues, setAnimatedValues] = useState([0, 0, 0, 0]);
  const [, setTimeRemaining] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAlbums, setFilteredAlbums] = useState<Album[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  type Album = {
    name: string;
    artist: string;
    genre: string;
    description: string;
    tracks: number;
    image: string;
    color: string;
    releaseDate: string;
    isFeatured?: boolean;
  };

  // Preload images for faster loading
  const preloadImages = useCallback((albums: Album[]) => {
    albums.forEach(album => {
      const img = new Image();
      img.src = album.image;
    });
  }, []);

  // FAST navigation - using useCallback and direct execution
  const openAlbumPage = useCallback((album: Album) => {
    // Remove any delays and use immediate navigation
    navigate(`/view`, { 
      state: { album },
      // Prevent any blocking behavior
      replace: false
    });
  }, [navigate]);

  // Even faster handler for button clicks
  const handleViewAlbum = useCallback((album: Album, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    // Direct immediate navigation without any wrappers
    navigate(`/view`, { 
      state: { album }
    });
  }, [navigate]);

  // Mock data - replace with actual API calls
  const totalAlbums = 124;
  const totalArtists = 45;
  const totalTracks = 1847;
  const totalStreams = 2456789;

  const firstName = "John Doe";

  // Theme classes
  const themeClasses = {
    bg: isDarkMode
      ? "bg-gray-900"
      : "bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100",
    card: isDarkMode ? "bg-gray-800/70" : "bg-white/70",
    text: isDarkMode ? "text-white" : "text-slate-800",
    textSecondary: isDarkMode ? "text-gray-400" : "text-slate-600",
    border: isDarkMode ? "border-gray-700" : "border-white/50",
    header: isDarkMode ? "bg-gray-800/80" : "bg-white/80",
    input: isDarkMode 
      ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400" 
      : "bg-white/50 border-gray-200 text-slate-800 placeholder-gray-500",
  };

  // Calculate time remaining until release
  const calculateTimeRemaining = (releaseDate: string) => {
    const release = new Date(releaseDate).getTime();
    const now = new Date().getTime();
    const difference = release - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isReleased: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
      isReleased: false
    };
  };

  // Mock albums data with release dates
  const albums: Album[] = [
    {
      name: "Midnight Dreams",
      artist: "Luna Eclipse",
      genre: "Electronic",
      description: "A mesmerizing journey through ambient soundscapes and dreamy synths",
      tracks: 12,
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop",
      color: "from-red-500 to-red-600",
      releaseDate: "2024-12-25",
      isFeatured: true // Featured album
    },
    {
      name: "Urban Rhythms",
      artist: "Street Poets",
      genre: "Hip Hop",
      description: "Raw beats and powerful lyrics reflecting city life",
      tracks: 15,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
      color: "from-red-600 to-red-700",
      releaseDate: "2024-11-15"
    },
    {
      name: "Acoustic Sessions",
      artist: "Sarah Melody",
      genre: "Folk",
      description: "Intimate and heartfelt acoustic performances",
      tracks: 10,
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop",
      color: "from-red-500 to-red-600",
      releaseDate: "2024-10-30"
    },
    {
      name: "Neon Nights",
      artist: "Synthwave Collective",
      genre: "Synthwave",
      description: "Retro-futuristic sounds with 80s vibes",
      tracks: 14,
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
      color: "from-red-600 to-red-700",
      releaseDate: "2024-09-20"
    },
    {
      name: "Jazz After Dark",
      artist: "The Blue Notes",
      genre: "Jazz",
      description: "Smooth jazz for late night listening",
      tracks: 11,
      image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400&h=400&fit=crop",
      color: "from-red-500 to-red-600",
      releaseDate: "2024-08-15"
    },
    {
      name: "Rock Anthems",
      artist: "Thunder Road",
      genre: "Rock",
      description: "High-energy rock classics and new hits",
      tracks: 13,
      image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400&h=400&fit=crop",
      color: "from-red-600 to-red-700",
      releaseDate: "2024-07-10"
    },
    {
      name: "Classical Moments",
      artist: "Orchestra Symphony",
      genre: "Classical",
      description: "Timeless orchestral masterpieces",
      tracks: 16,
      image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&h=400&fit=crop",
      color: "from-red-500 to-red-600",
      releaseDate: "2024-06-05"
    },
    {
      name: "Tropical Vibes",
      artist: "Island Groove",
      genre: "Reggae",
      description: "Feel-good reggae rhythms and island melodies",
      tracks: 12,
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop",
      color: "from-red-600 to-red-700",
      releaseDate: "2024-05-01"
    },
    // Older albums for searching
    {
      name: "Vintage Memories",
      artist: "The Retro Band",
      genre: "Classic Rock",
      description: "Golden oldies from the 70s and 80s",
      tracks: 14,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
      color: "from-amber-500 to-amber-600",
      releaseDate: "2023-12-01"
    },
    {
      name: "Soulful Journey",
      artist: "Ella Fitzgerald Tribute",
      genre: "Jazz",
      description: "Classic jazz standards reimagined",
      tracks: 11,
      image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400&h=400&fit=crop",
      color: "from-purple-500 to-purple-600",
      releaseDate: "2023-08-15"
    },
    {
      name: "Country Roads",
      artist: "Nashville Stars",
      genre: "Country",
      description: "Authentic country music storytelling",
      tracks: 13,
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop",
      color: "from-green-500 to-green-600",
      releaseDate: "2023-05-20"
    },
    {
      name: "Electronic Evolution",
      artist: "Digital Dreams",
      genre: "Electronic",
      description: "The evolution of electronic music through decades",
      tracks: 16,
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
      color: "from-blue-500 to-blue-600",
      releaseDate: "2023-03-10"
    },
  ];

  // Search functionality
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setIsSearching(query.length > 0);
    
    if (query.trim() === "") {
      setFilteredAlbums([]);
      return;
    }

    const lowercasedQuery = query.toLowerCase().trim();
    const filtered = albums.filter(album => 
      album.name.toLowerCase().includes(lowercasedQuery) ||
      album.artist.toLowerCase().includes(lowercasedQuery) ||
      album.genre.toLowerCase().includes(lowercasedQuery) ||
      album.description.toLowerCase().includes(lowercasedQuery)
    );
    
    setFilteredAlbums(filtered);
  }, []);

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredAlbums([]);
    setIsSearching(false);
  };

  const featuredAlbum = albums.find(album => album.isFeatured);

  const metrics = [
    {
      label: "Total Albums",
      value: totalAlbums,
      unit: "",
      trend: "+12%",
      color: "from-red-500 to-red-600",
      bgColor: isDarkMode
        ? "bg-red-900/20"
        : "bg-gradient-to-br from-red-500/10 to-red-600/5",
      borderColor: isDarkMode ? "border-red-700/50" : "border-red-200/50",
      icon: Disc,
    },
    {
      label: "Total Artists",
      value: totalArtists,
      unit: "",
      trend: "+8%",
      color: "from-red-500 to-red-600",
      bgColor: isDarkMode
        ? "bg-red-900/20"
        : "bg-gradient-to-br from-red-500/10 to-red-600/5",
      borderColor: isDarkMode ? "border-red-700/50" : "border-red-200/50",
      icon: Users,
    },
    {
      label: "Total Tracks",
      value: totalTracks,
      unit: "",
      trend: "+15%",
      color: "from-red-500 to-red-600",
      bgColor: isDarkMode
        ? "bg-red-900/20"
        : "bg-gradient-to-br from-red-500/10 to-red-600/5",
      borderColor: isDarkMode ? "border-red-700/50" : "border-red-200/50",
      icon: Music,
    },
    {
      label: "Total Streams",
      value: totalStreams,
      unit: "",
      trend: "+22%",
      color: "from-red-500 to-red-600",
      bgColor: isDarkMode
        ? "bg-red-900/20"
        : "bg-gradient-to-br from-red-500/10 to-red-600/5",
      borderColor: isDarkMode ? "border-red-700/50" : "border-red-200/50",
      icon: Play,
    },
  ];

  // Animation effect for counters
  useEffect(() => {
    const timer = setTimeout(() => {
      metrics.forEach((metric, index) => {
        const targetValue = metric.value;
        let currentValue = 0;
        const increment = targetValue / 50;

        const counter = setInterval(() => {
          currentValue += increment;
          if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(counter);
          }

          setAnimatedValues((prev) => {
            const newValues = [...prev];
            newValues[index] = Math.floor(currentValue);
            return newValues;
          });
        }, 30);
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [totalAlbums, totalArtists, totalTracks, totalStreams]);

  // Countdown timer effect
  useEffect(() => {
    const updateCountdowns = () => {
      const newTimeRemaining: { [key: string]: any } = {};
      albums.forEach(album => {
        newTimeRemaining[album.name] = calculateTimeRemaining(album.releaseDate);
      });
      setTimeRemaining(newTimeRemaining);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);

    return () => clearInterval(interval);
  }, []);

  // Preload images on component mount
  useEffect(() => {
    preloadImages(albums);
  }, [preloadImages]);

  // Display albums based on search state
  const displayAlbums = isSearching ? filteredAlbums : albums;

  return (
    <div className={`flex h-screen ${themeClasses.bg} relative transition-colors duration-300`}>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 lg:hidden transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header
          className={`${themeClasses.header} backdrop-blur-xl shadow-sm border-b ${themeClasses.border} px-4 sm:px-6 py-4 relative`}
        >
          <div className="relative flex items-center justify-between">
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
                <div className="flex items-center space-x-2 text-sm">
                  <span className={themeClasses.textSecondary}>Home</span>
                  <span
                    className={isDarkMode ? "text-gray-600" : "text-slate-300"}
                  >
                    ›
                  </span>
                  <span className={`${themeClasses.text} font-medium`}>
                    Albums
                  </span>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className={`w-4 h-4 ${themeClasses.textSecondary}`} />
                </div>
                <input
                  type="text"
                  placeholder="Search albums, artists, genres..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className={`w-full pl-10 pr-10 py-2.5 rounded-xl border ${themeClasses.input} backdrop-blur-sm focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-200 text-sm`}
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <X className={`w-4 h-4 ${themeClasses.textSecondary} hover:text-red-500 transition-colors`} />
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* User Profile */}
              <div
                className={`flex items-center space-x-3 pl-4 border-l ${themeClasses.border}`}
              >
                <div className="text-right hidden sm:block">
                  <div className={`text-sm font-semibold ${themeClasses.text}`}>
                    {firstName}
                  </div>
                  <div className={`text-xs ${themeClasses.textSecondary}`}>
                    Admin
                  </div>
                </div>
                <div className="relative">
                  <div className="w-10 h-10 bg-linear-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/25">
                    <span className="text-white font-semibold text-sm">
                      {firstName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full shadow-sm"></div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 ${themeClasses.textSecondary}`}
                />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
          {/* Featured Album Banner */}
          {featuredAlbum && !isSearching && (
            <div className="relative rounded-2xl overflow-hidden">
              <div className={`bg-linear-to-r ${featuredAlbum.color} p-6 sm:p-8 text-white`}>
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-xl flex items-center justify-center">
                      <Star className="w-8 h-8 sm:w-10 sm:h-10" fill="white" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-semibold">
                          FEATURED ALBUM
                        </span>
                        <span className="text-sm opacity-90">Support Now!</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold">{featuredAlbum.name}</h2>
                      <p className="text-white/80 text-sm">{featuredAlbum.artist}</p>
                    </div>
                  </div>
                  <div className="text-center md:text-right">
                    <div className="flex items-center justify-center md:justify-end space-x-2 mb-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-semibold">Launch Countdown</span>
                    </div>
                    <div className="text-lg sm:text-xl font-bold">
                      
                    </div>
                    <button
                      onClick={(e) => handleViewAlbum(featuredAlbum, e)}
                      className="mt-3 px-6 py-2 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 text-sm"
                    >
                      Support Album
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stats Cards */}
          {!isSearching && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {metrics.map((metric, index) => {
                const IconComponent = metric.icon;
                return (
                  <div
                    key={index}
                    className={`group relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-5 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl cursor-pointer ${metric.bgColor} ${metric.borderColor} border backdrop-blur-sm hover:-translate-y-1`}
                  >
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <div className="flex items-center space-x-2">
                          <div
                            className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl ${
                              isDarkMode ? "bg-white/10" : "bg-white/20"
                            } backdrop-blur-sm group-hover:scale-110 transition-transform duration-300`}
                          >
                            <IconComponent
                              className={`w-3 h-3 sm:w-4 sm:h-4 ${
                                isDarkMode ? "text-white" : "text-slate-700"
                              }`}
                            />
                          </div>
                          <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-600 animate-pulse" />
                        </div>
                        <div
                          className={`flex items-center space-x-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold text-white bg-linear-to-r ${metric.color} shadow-sm`}
                        >
                          <Activity className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          <span>{metric.trend}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-baseline space-x-1">
                          <span
                            className={`text-xl sm:text-2xl font-bold ${
                              isDarkMode ? "text-white" : "text-slate-800"
                            } tabular-nums`}
                          >
                            {animatedValues[index].toLocaleString()}
                          </span>
                        </div>
                        <h3
                          className={`text-[10px] sm:text-xs font-medium ${
                            isDarkMode ? "text-gray-300" : "text-slate-600"
                          } leading-tight`}
                        >
                          {metric.label}
                        </h3>
                      </div>

                      <div className="mt-2 sm:mt-3 relative">
                        <div
                          className={`w-full h-1 ${
                            isDarkMode ? "bg-white/20" : "bg-white/30"
                          } rounded-full overflow-hidden`}
                        >
                          <div
                            className={`h-full bg-linear-to-r ${metric.color} rounded-full animate-progress-bar origin-left transform scale-x-0`}
                            style={{
                              animation: `progress-bar 1.5s ease-out ${
                                index * 0.2
                              }s forwards`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Albums Section */}
          <div>
            <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2
                  className={`text-xl sm:text-2xl font-bold ${themeClasses.text}`}
                >
                  {isSearching ? "Search Results" : "Current Albums"}
                </h2>
                <p
                  className={`text-xs sm:text-sm ${themeClasses.textSecondary} mt-1`}
                >
                  {isSearching 
                    ? `Found ${filteredAlbums.length} album${filteredAlbums.length !== 1 ? 's' : ''} for "${searchQuery}"`
                    : "Browse our latest music collection"
                  }
                </p>
              </div>
              
              {isSearching && (
                <button
                  onClick={clearSearch}
                  className={`mt-2 sm:mt-0 px-4 py-2 rounded-lg border ${themeClasses.border} ${themeClasses.card} hover:shadow-md transition-all duration-200 text-sm flex items-center space-x-2`}
                >
                  <X className="w-4 h-4" />
                  <span>Clear Search</span>
                </button>
              )}
            </div>

            {isSearching && filteredAlbums.length === 0 ? (
              <div className="text-center py-12">
                <Search className={`w-16 h-16 mx-auto mb-4 ${themeClasses.textSecondary} opacity-50`} />
                <h3 className={`text-lg font-semibold ${themeClasses.text} mb-2`}>
                  No albums found
                </h3>
                <p className={`text-sm ${themeClasses.textSecondary}`}>
                  No results found for "{searchQuery}". Try searching with different terms.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {displayAlbums.map((album, index) => (
                  <div
                    key={index}
                    className={`group relative overflow-hidden rounded-xl sm:rounded-2xl ${themeClasses.card} backdrop-blur-sm border ${themeClasses.border} hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer`}
                    onClick={() => openAlbumPage(album)}
                  >
                    {/* Album Image */}
                    <div className="relative h-48 sm:h-56 overflow-hidden">
                      <img
                        src={album.image}
                        alt={album.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div
                          className={`p-3 sm:p-4 rounded-full bg-linear-to-r ${album.color} shadow-2xl transform group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white fill-white" />
                        </div>
                      </div>

                      {/* Genre Badge */}
                      <div className="absolute top-3 right-3">
                        <span
                          className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold text-white bg-linear-to-r ${album.color} shadow-lg`}
                        >
                          {album.genre}
                        </span>
                      </div>

                      {/* Featured Badge */}
                      {album.isFeatured && (
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold text-white bg-yellow-500 shadow-lg flex items-center space-x-1">
                            <Star className="w-3 h-3" fill="white" />
                            <span>Featured</span>
                          </span>
                        </div>
                      )}

                      {/* Track Count & Release Date */}
                      <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                        <div className="flex items-center space-x-1 px-2 sm:px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm">
                          <Music className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                          <span className="text-[10px] sm:text-xs font-semibold text-white">
                            {album.tracks} tracks
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 px-2 sm:px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm">
                          <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                          <span className="text-[10px] sm:text-xs font-semibold text-white">
                            
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Album Details */}
                    <div className="p-4 sm:p-5">
                      <h3
                        className={`text-base sm:text-lg font-bold ${themeClasses.text} mb-1 line-clamp-1`}
                      >
                        {album.name}
                      </h3>
                      <p
                        className={`text-xs sm:text-sm ${themeClasses.textSecondary} mb-2 sm:mb-3`}
                      >
                        {album.artist}
                      </p>

                      <p
                        className={`text-xs sm:text-sm ${themeClasses.textSecondary} leading-relaxed line-clamp-2 mb-3 sm:mb-4`}
                      >
                        {album.description}
                      </p>

                      {/* Action Button - Using the FAST handler */}
                      <button
                        onClick={(e) => handleViewAlbum(album, e)}
                        className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-linear-to-r ${album.color} hover:opacity-90 text-white font-semibold rounded-lg sm:rounded-xl transition-all duration-200 text-xs sm:text-sm shadow-lg transform hover:scale-[1.02] active:scale-95`}
                      >
                        {album.isFeatured ? "Support Album" : "View Album"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      <style>{`
        @keyframes progress-bar {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
        
        /* Optimize animations for performance */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default HomeScreen;