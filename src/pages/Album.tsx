import { useState, useEffect } from "react";
import {
  Menu,
  ChevronDown,
  Music,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/sidebar";
import { useNavigate } from "react-router-dom";
import albumService from "../services/album_service";

// ✅ Types
interface Album {
  _id: string;
  artist: string | { name: string };
  title: string;
  release_date: string;
  genre?: string;
  cover_art?: string;
  description?: string;
  track_count: number;
  is_published: boolean;
  is_featured: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  data?: Album[];
  albums?: Album[];
}

const AlbumScreen = () => {
  const [isDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"collection" | "stats">("collection");

  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const userName = "John Doe";

  const themeClasses = {
    bg: isDarkMode
      ? "bg-gray-900"
      : "bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100",
    card: isDarkMode ? "bg-gray-800/70" : "bg-white/70",
    text: isDarkMode ? "text-white" : "text-slate-800",
    textSecondary: isDarkMode ? "text-gray-400" : "text-slate-600",
    border: isDarkMode ? "border-gray-700" : "border-white/50",
    header: isDarkMode ? "bg-gray-800/80" : "bg-white/80",
  };

  // ✅ Fetch albums from API
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setLoading(true);
        const response: ApiResponse | Album[] = await albumService.getAllAlbums();

        let albumsData: Album[] = [];

        if (Array.isArray(response)) {
          albumsData = response;
        } else if (Array.isArray(response.data)) {
          albumsData = response.data;
        } else if (Array.isArray(response.albums)) {
          albumsData = response.albums;
        } else {
          console.warn("Unexpected response:", response);
        }

        setAlbums(albumsData);
        setError(null);
      } catch (err) {
        console.error("Error fetching albums:", err);
        setError("Failed to fetch albums. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  const handleAlbumClick = (album: Album) => {
    navigate(`/details1`, { state: { album } });
  };

  return (
    <div className={`flex h-screen ${themeClasses.bg} relative transition-colors duration-300 overflow-hidden`}>
      
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
              <span className={`${themeClasses.text} font-medium`}>Albums</span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 pl-4 border-l">
                <div className="text-right hidden sm:block">
                  <div className={`text-sm font-semibold ${themeClasses.text}`}>{userName}</div>
                  <div className={`text-xs ${themeClasses.textSecondary}`}>Admin</div>
                </div>

                <div className="relative w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white font-bold">
                  {userName.split(" ").map((n) => n[0]).join("")}
                </div>

                <ChevronDown />
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto pt-[84px] pb-8 pr-4 sm:pr-6">
          <div className="flex space-x-4 pb-3 border-b sticky top-0 bg-opacity-80 backdrop-blur-md z-10">
            <button
              onClick={() => setActiveTab("collection")}
              className={`capitalize px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === "collection"
                  ? "bg-red-600 text-white shadow-md"
                  : `${themeClasses.textSecondary} hover:bg-slate-100`
              }`}
            >
              Collection
            </button>
          </div>

          {/* COLLECTION TAB */}
          <AnimatePresence mode="wait">
            {activeTab === "collection" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                <div className="flex justify-between items-center">
                  <h1 className={`text-2xl font-bold ${themeClasses.text}`}>
                    My Album Collection
                  </h1>

                  <div className={`px-6 py-3 rounded-2xl border ${themeClasses.border}`}>
                    <div className="flex items-center gap-2">
                      <Music className="w-5 h-5 text-blue-500" />
                      <p className={`text-xl font-bold ${themeClasses.text}`}>
                        {albums.length}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Album Grid */}
                {!loading && !error && albums.length > 0 && (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
                    {albums.map((album) => (
                      <motion.div
                        key={album._id}
                        whileHover={{ scale: 1.03 }}
                        className={`${themeClasses.card} cursor-pointer border rounded-2xl overflow-hidden`}
                        onClick={() => handleAlbumClick(album)}
                      >
                        <img
                          src={album.cover_art || "/placeholder.jpg"}
                          alt={album.title}
                          className="w-full h-56 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="font-bold">{album.title}</h3>
                          <p className="text-sm opacity-70">
                            {typeof album.artist === "string"
                              ? album.artist
                              : album.artist?.name ?? "Unknown Artist"}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Loading */}
                {loading && (
                  <p className="text-center py-10">Loading albums...</p>
                )}

                {/* Error */}
                {error && (
                  <p className="text-center text-red-600 py-10">{error}</p>
                )}

                {/* Empty State */}
                {!loading && !error && albums.length === 0 && (
                  <p className="text-center py-10 opacity-70">
                    No albums found
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AlbumScreen;
