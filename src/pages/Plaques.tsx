import { useState } from "react";
import {
  Music,
  Menu,
  ChevronDown,
  Award,
  DollarSign,
  Calendar,
  Disc,
  Star,
} from "lucide-react";
import Sidebar from "../components/sidebar";

const PlaquesScreen = () => {
  const [isDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const firstName = "John Doe"; // Replace with actual user data

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
  };

  // Mock plaques data - updated to match PlaquePurchased model
  const plaques = [
    {
      id: 1,
      albumId: "album_1",
      plaqueType: "Gold Plaque",
      plaqueImage:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop",
      amount: 299.99,
      paymentMethod: "card",
      paymentStatus: "paid",
      shippingAddress: {
        line1: "123 Music Street",
        line2: "Apt 4B",
        city: "Los Angeles",
        state: "CA",
        postalCode: "90001",
        country: "USA",
      },
      // Additional fields for display (not in model)
      name: "Midnight Dreams",
      artist: "Luna Eclipse",
      genre: "Electronic",
      tracks: 12,
      certification: "500K+ Streams",
      color: "from-purple-500 to-pink-500",
      purchaseDate: "2024-10-15",
    },
    {
      id: 2,
      albumId: "album_2",
      plaqueType: "Platinum Plaque",
      plaqueImage:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
      amount: 499.99,
      paymentMethod: "paypal",
      paymentStatus: "paid",
      shippingAddress: {
        line1: "456 Hip Hop Ave",
        line2: "",
        city: "New York",
        state: "NY",
        postalCode: "10001",
        country: "USA",
      },
      // Additional fields for display (not in model)
      name: "Urban Rhythms",
      artist: "Street Poets",
      genre: "Hip Hop",
      tracks: 15,
      certification: "1M+ Streams",
      color: "from-orange-500 to-red-500",
      purchaseDate: "2024-09-20",
    },
    {
      id: 3,
      albumId: "album_3",
      plaqueType: "Silver Plaque",
      plaqueImage:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop",
      amount: 199.99,
      paymentMethod: "card",
      paymentStatus: "paid",
      shippingAddress: {
        line1: "789 Folk Road",
        line2: "Studio 2",
        city: "Nashville",
        state: "TN",
        postalCode: "37201",
        country: "USA",
      },
      // Additional fields for display (not in model)
      name: "Acoustic Sessions",
      artist: "Sarah Melody",
      genre: "Folk",
      tracks: 10,
      certification: "250K+ Streams",
      color: "from-emerald-500 to-teal-500",
      purchaseDate: "2024-10-01",
    },
    {
      id: 4,
      albumId: "album_4",
      plaqueType: "Gold Plaque",
      plaqueImage:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
      amount: 299.99,
      paymentMethod: "bank_transfer",
      paymentStatus: "paid",
      shippingAddress: {
        line1: "321 Synth Blvd",
        line2: "",
        city: "Miami",
        state: "FL",
        postalCode: "33101",
        country: "USA",
      },
      // Additional fields for display (not in model)
      name: "Neon Nights",
      artist: "Synthwave Collective",
      genre: "Synthwave",
      tracks: 14,
      certification: "500K+ Streams",
      color: "from-violet-500 to-purple-500",
      purchaseDate: "2024-08-12",
    },
    {
      id: 5,
      albumId: "album_5",
      plaqueType: "Platinum Plaque",
      plaqueImage:
        "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400&h=400&fit=crop",
      amount: 499.99,
      paymentMethod: "card",
      paymentStatus: "paid",
      shippingAddress: {
        line1: "654 Jazz Lane",
        line2: "Suite 500",
        city: "Chicago",
        state: "IL",
        postalCode: "60601",
        country: "USA",
      },
      // Additional fields for display (not in model)
      name: "Jazz After Dark",
      artist: "The Blue Notes",
      genre: "Jazz",
      tracks: 11,
      certification: "1M+ Streams",
      color: "from-blue-500 to-indigo-500",
      purchaseDate: "2024-07-28",
    },
    {
      id: 6,
      albumId: "album_6",
      plaqueType: "Diamond Plaque",
      plaqueImage:
        "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400&h=400&fit=crop",
      amount: 799.99,
      paymentMethod: "card",
      paymentStatus: "paid",
      shippingAddress: {
        line1: "987 Rock Avenue",
        line2: "Penthouse",
        city: "Seattle",
        state: "WA",
        postalCode: "98101",
        country: "USA",
      },
      // Additional fields for display (not in model)
      name: "Rock Anthems",
      artist: "Thunder Road",
      genre: "Rock",
      tracks: 13,
      certification: "5M+ Streams",
      color: "from-red-500 to-orange-500",
      purchaseDate: "2024-06-15",
    },
  ];

  const getPlaqueColor = (type: string) => {
    switch (type) {
      case "Silver Plaque":
        return "from-gray-300 to-gray-400";
      case "Gold Plaque":
        return "from-yellow-400 to-yellow-600";
      case "Platinum Plaque":
        return "from-gray-100 to-gray-300";
      case "Diamond Plaque":
        return "from-cyan-400 to-blue-500";
      default:
        return "from-gray-400 to-gray-500";
    }
  };

  const totalSpent = plaques.reduce((sum, plaque) => sum + plaque.amount, 0);

  return (
    <div
      className={`flex h-screen ${themeClasses.bg} relative transition-colors duration-300`}
    >
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
                    Plaques
                  </span>
                </div>
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
                  <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
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
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1
                className={`text-2xl sm:text-3xl font-bold ${themeClasses.text} mb-2`}
              >
                My Plaque Collection
              </h1>
              <p className={`text-sm ${themeClasses.textSecondary}`}>
                Your commemorative album plaques and achievements
              </p>
            </div>
            <div
              className={`${themeClasses.card} backdrop-blur-sm border ${themeClasses.border} rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4`}
            >
              <div className="flex items-center space-x-2">
                <DollarSign
                  className={`w-5 h-5 ${
                    isDarkMode ? "text-green-400" : "text-green-600"
                  }`}
                />
                <div>
                  <p className={`text-xs ${themeClasses.textSecondary}`}>
                    Total Invested
                  </p>
                  <p
                    className={`text-xl sm:text-2xl font-bold ${themeClasses.text}`}
                  >
                    ${totalSpent.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Plaques Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {plaques.map((plaque) => (
              <div
                key={plaque.id}
                className={`group relative overflow-hidden rounded-xl sm:rounded-2xl ${themeClasses.card} backdrop-blur-sm border ${themeClasses.border} hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]`}
              >
                {/* Plaque Badge */}
                <div
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white bg-linear-to-r ${getPlaqueColor(
                    plaque.plaqueType // Changed from plaque.type
                  )} shadow-lg`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>{plaque.plaqueType}</span> // Changed from plaque.type
                </div>
                {/* Album Image */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <img
                    src={plaque.plaqueImage} // Changed from plaque.image
                    alt={plaque.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>

                  {/* Certification Badge */}
                  <div className="absolute bottom-3 right-3 flex items-center space-x-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-semibold text-white">
                      {plaque.certification}
                    </span>
                  </div>
                </div>

                {/* Plaque Details */}
                <div className="p-4 sm:p-5 space-y-3">
                  <div>
                    <h3
                      className={`text-base sm:text-lg font-bold ${themeClasses.text} mb-1 line-clamp-1`}
                    >
                      {plaque.name}
                    </h3>
                    <p
                      className={`text-xs sm:text-sm ${themeClasses.textSecondary}`}
                    >
                      {plaque.artist}
                    </p>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                        isDarkMode ? "bg-white/5" : "bg-slate-100/50"
                      }`}
                    >
                      <Disc
                        className={`w-4 h-4 ${
                          isDarkMode ? "text-purple-400" : "text-purple-600"
                        }`}
                      />
                      <div>
                        <p
                          className={`text-[10px] ${themeClasses.textSecondary}`}
                        >
                          Genre
                        </p>
                        <p
                          className={`text-xs font-semibold ${themeClasses.text}`}
                        >
                          {plaque.genre}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                        isDarkMode ? "bg-white/5" : "bg-slate-100/50"
                      }`}
                    >
                      <Music
                        className={`w-4 h-4 ${
                          isDarkMode ? "text-pink-400" : "text-pink-600"
                        }`}
                      />
                      <div>
                        <p
                          className={`text-[10px] ${themeClasses.textSecondary}`}
                        >
                          Tracks
                        </p>
                        <p
                          className={`text-xs font-semibold ${themeClasses.text}`}
                        >
                          {plaque.tracks}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Purchase Info */}
                  <div
                    className={`flex items-center justify-between pt-3 border-t ${themeClasses.border}`}
                  >
                    <div className="flex items-center space-x-1.5">
                      <Calendar
                        className={`w-3.5 h-3.5 ${themeClasses.textSecondary}`}
                      />
                      <span className={`text-xs ${themeClasses.textSecondary}`}>
                        {new Date(plaque.purchaseDate).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" }
                        )}
                      </span>
                    </div>
                    <div
                      className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-linear-to-r ${plaque.color}`}
                    >
                      <DollarSign className="w-3.5 h-3.5 text-white" />
                      <span className="text-sm font-bold text-white">
                        {plaque.amount.toFixed(2)} 
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State (if no plaques) */}
          {plaques.length === 0 && (
            <div
              className={`${themeClasses.card} backdrop-blur-sm border ${themeClasses.border} rounded-2xl p-12 text-center`}
            >
              <Award
                className={`w-16 h-16 mx-auto mb-4 ${themeClasses.textSecondary}`}
              />
              <h3 className={`text-xl font-bold ${themeClasses.text} mb-2`}>
                No Plaques Yet
              </h3>
              <p className={`text-sm ${themeClasses.textSecondary}`}>
                Start building your collection by purchasing album plaques
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default PlaquesScreen;
