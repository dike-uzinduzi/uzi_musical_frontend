import React, { useState } from "react";
import {
  Music,
  Play,
  Calendar,
  Clock,
  X,
  CreditCard,
  Menu,
  ChevronDown,
} from "lucide-react";
import Sidebar from "../components/sidebar";

interface Album {
  id: number;
  title: string;
  artist: string;
  year: number;
  duration: string;
  tracks: number;
  price: number;
  cover: string;
  genre: string;
  artistImage: string;
}

const albums: Album[] = [
  {
    id: 1,
    title: "Midnight Dreams",
    artist: "Luna Eclipse",
    year: 2024,
    duration: "45:23",
    tracks: 12,
    price: 14.99,
    cover: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    genre: "Electronic",
    artistImage:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
  },
  {
    id: 2,
    title: "Golden Hour",
    artist: "Solar Waves",
    year: 2023,
    duration: "52:18",
    tracks: 15,
    price: 12.99,
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
    genre: "Indie Pop",
    artistImage:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
  },
  {
    id: 3,
    title: "Urban Stories",
    artist: "City Lights",
    year: 2024,
    duration: "38:45",
    tracks: 10,
    price: 13.99,
    cover: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2",
    genre: "Hip Hop",
    artistImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
  },
  {
    id: 4,
    title: "Neon Nights",
    artist: "Synth Masters",
    year: 2023,
    duration: "48:12",
    tracks: 13,
    price: 15.99,
    cover: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    genre: "Synthwave",
    artistImage: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
  },
  {
    id: 5,
    title: "Acoustic Soul",
    artist: "The Wanderers",
    year: 2024,
    duration: "41:30",
    tracks: 11,
    price: 11.99,
    cover: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
    genre: "Folk",
    artistImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
  },
  {
    id: 6,
    title: "Electric Dreams",
    artist: "Voltage",
    year: 2023,
    duration: "55:00",
    tracks: 16,
    price: 16.99,
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745",
    genre: "EDM",
    artistImage:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
  },
];

export default function AlbumGallery() {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [supportAmount, setSupportAmount] = useState<number>(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const firstName = "John Doe";

  const themeClasses = {
    bg: isDarkMode
      ? "bg-gray-900"
      : "bg-gradient-to-br from-white via-purple-50 to-purple-100",
    text: isDarkMode ? "text-white" : "text-gray-800",
    textSecondary: isDarkMode ? "text-gray-400" : "text-gray-600",
    border: isDarkMode ? "border-gray-700" : "border-purple-100",
    header: isDarkMode ? "bg-gray-800/80" : "bg-white/80",
  };

  const handleAlbumSelect = (album: Album) => {
    setSelectedAlbum(album);
    setSupportAmount(album.price);
    document.body.style.overflow = "hidden"; // prevent background scroll
  };

  const handleCloseModal = () => {
    setSelectedAlbum(null);
    document.body.style.overflow = "auto"; // restore scroll
  };

  const handleSupportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSupportAmount(parseFloat(e.target.value));
  };

  const handleSupportClick = () => {
    if (selectedAlbum) {
      alert(
        `Thank you for supporting ${selectedAlbum.artist} with $${supportAmount.toFixed(
          2
        )}!`
      );
    }
  };

  const calculateSliderBackground = (): string => {
    if (!selectedAlbum) return "";
    const min = selectedAlbum.price;
    const max = selectedAlbum.price * 5;
    const percentage = ((supportAmount - min) / (max - min)) * 100;
    return `linear-gradient(to right, #9333ea 0%, #9333ea ${percentage}%, #e9d5ff ${percentage}%, #e9d5ff 100%)`;
  };

  // Handle slider drag start
  const handleSliderMouseDown = () => {
    setIsDragging(true);
  };

  // Handle slider drag end
  const handleSliderMouseUp = () => {
    setIsDragging(false);
  };

  // Prevent scroll when dragging slider
  const handleSliderTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleSliderTouchEnd = () => {
    setIsDragging(false);
  };

  // Close sidebar immediately
  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div
      className={`flex flex-col lg:flex-row h-screen ${themeClasses.bg} relative transition-colors duration-300 ${
        isDragging ? 'overflow-hidden' : 'overflow-auto'
      }`}
    >
      {/* Sidebar (Desktop) */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={handleCloseSidebar}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 lg:hidden transform transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header
          className={`${themeClasses.header} backdrop-blur-xl shadow-sm border-b ${themeClasses.border} px-4 sm:px-6 py-4 sticky top-0 z-30`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden mr-4 p-2 rounded-xl bg-slate-100/70 hover:bg-slate-200 transition"
              >
                <Menu className={`w-5 h-5 ${themeClasses.textSecondary}`} />
              </button>
              <div className="flex items-center space-x-2 text-sm">
                <span className={themeClasses.textSecondary}>Home</span>
                <span className="text-slate-300">›</span>
                <span className={`${themeClasses.text} font-medium`}>
                  Albums
                </span>
              </div>
            </div>

            {/* User */}
            <div className="flex items-center space-x-4">
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
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-semibold">
                    {firstName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                </div>
                <ChevronDown className={`w-4 h-4 ${themeClasses.textSecondary}`} />
              </div>
            </div>
          </div>
        </header>

        {/* Albums */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
              Premium Albums
            </h1>
            <p className="text-gray-600 text-base sm:text-lg">
              Discover and support your favorite artists
            </p>
          </div>

          {/* Responsive Album Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {albums.map((album) => (
              <div
                key={album.id}
                onClick={() => handleAlbumSelect(album)}
                className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-purple-100"
              >
                {/* Album Cover */}
                <div className="h-52 sm:h-56 relative overflow-hidden">
                  <img
                    src={album.cover}
                    alt={album.title}
                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                    <Play size={36} className="text-white" />
                  </div>
                </div>

                {/* Album Info */}
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={album.artistImage}
                      alt={album.artist}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-purple-200"
                    />
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                        {album.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{album.artist}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-500 mb-4">
                    <Calendar size={14} />
                    <span>{album.year}</span>
                    <Clock size={14} />
                    <span>{album.duration}</span>
                    <Music size={14} />
                    <span>{album.tracks} tracks</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs sm:text-sm font-medium">
                      {album.genre}
                    </span>
                    <span className="text-xl sm:text-2xl font-bold text-purple-600">
                      ${album.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Modal */}
      {selectedAlbum && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm transition-opacity duration-300"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg sm:max-w-2xl overflow-hidden transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cover */}
            <div className="relative h-40 sm:h-56 md:h-64">
              <img
                src={selectedAlbum.cover}
                alt={selectedAlbum.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={handleCloseModal}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white bg-opacity-90 rounded-full p-2 hover:bg-opacity-100 transition"
              >
                <X size={20} className="text-gray-700" />
              </button>
              <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-6 text-white drop-shadow-md">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                  {selectedAlbum.title}
                </h2>
                <p className="text-sm sm:text-lg opacity-90">
                  {selectedAlbum.artist}
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 md:p-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6">
                <img
                  src={selectedAlbum.artistImage}
                  alt={selectedAlbum.artist}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-purple-200"
                />
                <div className="text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                    {selectedAlbum.artist}
                  </h3>
                  <p className="text-gray-600 text-sm">{selectedAlbum.genre}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <Music size={16} className="text-purple-600" />
                  <span>{selectedAlbum.tracks} Tracks</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-purple-600" />
                  <span>{selectedAlbum.duration}</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <Calendar size={16} className="text-purple-600" />
                  <span>Released {selectedAlbum.year}</span>
                </div>
              </div>

              {/* Support Section */}
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-5 sm:p-6 mb-6">
                <p className="font-semibold text-gray-700 mb-2">
                  Support Amount
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Slide to choose your support level
                </p>
                <input
                  type="range"
                  min={selectedAlbum.price}
                  max={selectedAlbum.price * 5}
                  step="0.50"
                  value={supportAmount}
                  onChange={handleSupportChange}
                  onMouseDown={handleSliderMouseDown}
                  onMouseUp={handleSliderMouseUp}
                  onMouseLeave={handleSliderMouseUp}
                  onTouchStart={handleSliderTouchStart}
                  onTouchEnd={handleSliderTouchEnd}
                  className="w-full h-3 bg-purple-200 rounded-lg cursor-pointer"
                  style={{
                    background: calculateSliderBackground(),
                  }}
                />
                <div className="flex justify-between text-xs text-gray-600 mt-2">
                  <span>Min: ${selectedAlbum.price}</span>
                  <span>Max: ${(selectedAlbum.price * 5).toFixed(2)}</span>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Your Support</p>
                    <p className="text-3xl sm:text-4xl font-bold text-purple-600">
                      ${supportAmount.toFixed(2)}
                    </p>
                  </div>
                  <CreditCard
                    size={36}
                    className="text-purple-600 opacity-50"
                  />
                </div>
              </div>

              <button
                onClick={handleSupportClick}
                className="w-full py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold text-base sm:text-lg hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg hover:shadow-xl"
              >
                Support Artist
              </button>
              <p className="text-center text-xs text-gray-500 mt-3 sm:mt-4">
                Your support helps artists create more amazing music
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}