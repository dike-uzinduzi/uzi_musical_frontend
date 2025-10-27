import { useState } from "react";
import {
  Calendar,
  Clock,
  Play,
  Heart,
  Share2,
  MessageCircle,
  Menu,
  ChevronDown,
  Flame,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/sidebar";

const MusicNewsScreen = () => {
  const [isDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [selectedNews, setSelectedNews] = useState<number | null>(null);
  const [expandedNews, setExpandedNews] = useState<Set<number>>(new Set());

  const userName = "John Doe";

  const themeClasses = {
    bg: isDarkMode
      ? "bg-gray-900"
      : "bg-linear-to-br from-white via-red-50 to-red-100",
    card: isDarkMode ? "bg-gray-800/70" : "bg-white/70",
    text: isDarkMode ? "text-white" : "text-slate-800",
    textSecondary: isDarkMode ? "text-gray-400" : "text-slate-600",
    border: isDarkMode ? "border-gray-700" : "border-white/50",
    header: isDarkMode ? "bg-gray-800/80" : "bg-white/80",
  };

  const updates = [
    {
      id: 1,
      type: "update",
      text: "Luna Rivers just announced tour dates for Europe!",
      time: "5 min ago",
      relatedNewsId: 1,
    },
    {
      id: 2,
      type: "update",
      text: "Breaking: New collaboration between The Resonance and DJ Stellar confirmed",
      time: "23 min ago",
      relatedNewsId: 2,
    },
    {
      id: 3,
      type: "update",
      text: '"Summer Nights" music video hits 100M views',
      time: "1 hour ago",
      relatedNewsId: 3,
    },
  ];

  const newsItems = [
    {
      id: 1,
      category: "Album Release",
      title: 'New Album "Midnight Echoes" Drops Next Week',
      artist: "Luna Rivers",
      description:
        "The highly anticipated fifth studio album features 12 tracks blending indie pop with electronic elements.",
      fullContent:
        'Luna Rivers has officially announced that her fifth studio album "Midnight Echoes" will be released next week across all major streaming platforms. The album features 12 carefully crafted tracks that showcase her evolution as an artist, blending indie pop sensibilities with cutting-edge electronic production. Collaborating with renowned producers and songwriters, Rivers has created what many are calling her most ambitious work yet. The lead single "Neon Dreams" has already garnered critical acclaim and millions of streams. Pre-orders are now available, and fans who purchase the deluxe edition will receive exclusive behind-the-scenes content and acoustic versions of select tracks.',
      time: "2 hours ago",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=600&fit=crop",
      likes: 1247,
      comments: 89,
    },
    {
      id: 2,
      category: "Tour Announcement",
      title: "World Tour 2025: Dates Revealed",
      artist: "The Resonance",
      description:
        "Spanning 40 cities across 5 continents, tickets go on sale this Friday at 10 AM local time.",
      fullContent:
        "The Resonance has just unveiled the complete schedule for their highly anticipated World Tour 2025. The extensive tour will span 40 cities across 5 continents, starting in March and concluding in November. This marks the band's biggest tour to date, with stops in North America, Europe, Asia, Australia, and South America. Tickets will go on sale this Friday at 10 AM local time through official venues and authorized ticket sellers. VIP packages include meet-and-greet opportunities, exclusive merchandise, and premium seating. The band promises to debut new material from their upcoming album alongside fan favorites from their decade-long career.",
      time: "5 hours ago",
      image:
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=600&fit=crop",
      likes: 3421,
      comments: 234,
    },
    {
      id: 3,
      category: "Trending Now",
      title: 'Viral Hit "Summer Nights" Breaks Records',
      artist: "Nova & The Stars",
      description:
        "The single has reached #1 in 23 countries and accumulated over 500M streams in just two weeks.",
      fullContent:
        'Nova & The Stars have achieved unprecedented success with their latest single "Summer Nights," which has shattered multiple streaming records. The track reached #1 in 23 countries simultaneously and has accumulated over 500 million streams in just two weeks since its release. The infectious summer anthem has dominated TikTok with over 2 million user-generated videos and has been featured in numerous playlists worldwide. Music critics praise the song\'s catchy melody and production quality, while fans celebrate its feel-good vibes. The band has announced plans for a special music video featuring fan submissions and celebrity cameos, set to premiere next month.',
      time: "1 day ago",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
      likes: 5892,
      comments: 412,
    },
    {
      id: 4,
      category: "Festival Update",
      title: "Harmony Fest Announces Surprise Headliner",
      artist: "Various Artists",
      description:
        "Mystery artist to close out the festival on Sunday night. Speculation is running wild among fans.",
      fullContent:
        "Harmony Fest organizers have sent the music community into a frenzy with the announcement of a surprise headliner for Sunday night's closing performance. While the identity remains under wraps, festival directors have dropped cryptic hints on social media, suggesting it's an artist who hasn't performed live in several years. Industry insiders speculate it could be one of several legendary acts, and ticket sales have surged following the announcement. The three-day festival already features an impressive lineup of over 50 artists across multiple stages. Early bird passes sold out within hours, and remaining tickets are expected to go quickly once the mystery headliner is revealed this week.",
      time: "1 day ago",
      image:
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop",
      likes: 2156,
      comments: 567,
    },
  ];

  const toggleLike = (id: number) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const scrollToNews = (newsId: number) => {
    setSelectedNews(newsId);
    const element = document.getElementById(`news-${newsId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => setSelectedNews(null), 2000);
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedNews((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div
      className={`flex h-screen ${themeClasses.bg} relative transition-colors duration-300 overflow-hidden`}
    >
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
          className={`${themeClasses.header} backdrop-blur-xl border-b ${themeClasses.border} px-4 sm:px-6 lg:px-8 py-3 sm:py-4 fixed top-0 left-0 lg:left-[270px] right-0 z-30`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className={`lg:hidden p-2 rounded-lg ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-100"
                } hover:bg-opacity-80`}
              >
                <Menu className={`w-5 h-5 ${themeClasses.textSecondary}`} />
              </button>
              <div className="flex items-center gap-2 text-sm">
                <span className={themeClasses.textSecondary}>Home</span>
                <span className="text-gray-400">›</span>
                <span className={`${themeClasses.text} font-medium`}>
                  Music News
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div
                className={`hidden sm:flex items-center gap-3 pl-3 border-l ${themeClasses.border}`}
              >
                <div className="text-right">
                  <div className={`text-sm font-medium ${themeClasses.text}`}>
                    {userName}
                  </div>
                  <div className={`text-xs ${themeClasses.textSecondary}`}>
                    Admin
                  </div>
                </div>
                <div className="relative">
                  <div className="w-9 h-9 bg-linear-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-xs">
                      {userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 ${themeClasses.textSecondary}`}
                />
              </div>
              <div className="sm:hidden relative">
                <div className="w-9 h-9 bg-linear-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-xs">
                    {userName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto pt-[68px] sm:pt-[76px] pb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key="music-news"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
            >
              {/* Hero Section */}
              <div className="pt-6 pb-8">
                <div className="relative bg-linear-to-r from-red-500 via-red-600 to-pink-600 rounded-3xl p-6 sm:p-8 overflow-hidden">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <Flame className="w-5 h-5 text-white" />
                      <span className="text-white/90 font-medium text-sm uppercase tracking-wider">
                        What's Hot
                      </span>
                    </div>
                    <h1 className="text-white text-3xl sm:text-4xl font-bold mb-2">
                      Music News
                    </h1>
                    <p className="text-white/90 text-base sm:text-lg max-w-2xl">
                      Stay updated with the latest releases, tours, and
                      happenings in the music world
                    </p>
                  </div>
                </div>
              </div>

              {/* Live Updates */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4 px-1">
                  <Clock className="w-4 h-4 text-red-500" />
                  <h2 className="text-lg font-bold text-gray-900">
                    Live Updates
                  </h2>
                </div>
                <div className="space-y-2">
                  {updates.map((update) => (
                    <button
                      key={update.id}
                      onClick={() => scrollToNews(update.relatedNewsId)}
                      className="w-full flex items-start gap-3 p-4 bg-white rounded-2xl hover:shadow-md transition-all text-left group"
                    >
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-800 text-sm sm:text-base font-medium group-hover:text-red-600 transition-colors">
                          {update.text}
                        </p>
                        <span className="text-xs text-gray-500 mt-0.5 block">
                          {update.time}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* News Feed */}
              <div className="space-y-6 pb-8">
                {newsItems.map((item) => (
                  <div
                    key={item.id}
                    id={`news-${item.id}`}
                    className={`bg-white rounded-3xl overflow-hidden hover:shadow-lg transition-all duration-300 ${
                      selectedNews === item.id ? "ring-2 ring-red-400" : ""
                    }`}
                  >
                    {/* Image */}
                    <div className="relative aspect-video sm:aspect-21/9 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {item.category}
                        </span>
                      </div>
                      <button className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform">
                        <Play className="w-4 h-4 text-red-500 fill-red-500" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6">
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-3">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.time}</span>
                        <span>•</span>
                        <span className="text-red-600 font-medium">
                          {item.artist}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                        {item.title}
                      </h3>

                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {expandedNews.has(item.id) && (
                        <div className="mb-4 p-4 bg-red-50 rounded-xl">
                          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                            {item.fullContent}
                          </p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-5">
                          <button
                            onClick={() => toggleLike(item.id)}
                            className="flex items-center gap-1.5 group"
                          >
                            <Heart
                              className={`w-5 h-5 transition-all ${
                                likedPosts.has(item.id)
                                  ? "fill-red-500 text-red-500"
                                  : "text-gray-400 group-hover:text-red-500"
                              }`}
                            />
                            <span className="text-sm text-gray-600 font-medium">
                              {likedPosts.has(item.id)
                                ? item.likes + 1
                                : item.likes}
                            </span>
                          </button>

                          <button className="flex items-center gap-1.5 group">
                            <MessageCircle className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                            <span className="text-sm text-gray-600 font-medium">
                              {item.comments}
                            </span>
                          </button>

                          <button className="flex items-center gap-1.5 group">
                            <Share2 className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                          </button>
                        </div>

                        <button
                          onClick={() => toggleExpand(item.id)}
                          className="text-red-500 hover:text-red-600 font-medium text-sm"
                        >
                          {expandedNews.has(item.id) ? "Less" : "More"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center pb-8">
                <button className="bg-white hover:bg-red-50 text-red-600 px-8 py-3 rounded-full font-medium transition-all border border-red-200">
                  Load More
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default MusicNewsScreen;
