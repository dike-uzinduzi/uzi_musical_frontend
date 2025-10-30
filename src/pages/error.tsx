import { useState } from "react";
import { Home, Music, Radio, Disc3, ArrowLeft, Search } from "lucide-react";
import { motion } from "framer-motion";
import Sidebar from "../components/sidebar";

export default function Errorpage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode] = useState(false);


  const themeClasses = {
    bg: isDarkMode
      ? "bg-gray-900"
      : "bg-linear-to-br from-white via-red-50 to-red-200",
    card: isDarkMode ? "bg-gray-800/70" : "bg-white/70",
    text: isDarkMode ? "text-white" : "text-slate-800",
    textSecondary: isDarkMode ? "text-gray-400" : "text-slate-600",
    border: isDarkMode ? "border-gray-700" : "border-white/50",
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

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col h-full overflow-hidden lg:ml-[290px]">
        <main className="flex-1 flex items-center justify-center px-4 sm:px-6">
          <div className="max-w-2xl w-full text-center">
            {/* Animated Vinyl Records */}
            <div className="relative mb-12 h-64 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute"
              >
                <div className="w-48 h-48 rounded-full bg-linear-to-br from-gray-800 to-gray-900 shadow-2xl flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-linear-to-br from-red-500 to-red-600" />
                  <Disc3 className="absolute w-24 h-24 text-gray-700/30" />
                </div>
              </motion.div>

              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute -right-8 top-8"
              >
                <div className="w-32 h-32 rounded-full bg-linear-to-br from-purple-500 to-pink-500 shadow-xl flex items-center justify-center opacity-80">
                  <div className="w-10 h-10 rounded-full bg-white" />
                </div>
              </motion.div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -left-8 bottom-8"
              >
                <div className="w-28 h-28 rounded-full bg-linear-to-br from-blue-500 to-cyan-500 shadow-xl flex items-center justify-center opacity-70">
                  <div className="w-9 h-9 rounded-full bg-white" />
                </div>
              </motion.div>

              {/* Floating Music Notes */}
              <motion.div
                animate={{ y: [-20, 20, -20] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-0 right-20"
              >
                <Music className="w-8 h-8 text-red-400/60" />
              </motion.div>

              <motion.div
                animate={{ y: [20, -20, 20] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute bottom-0 left-20"
              >
                <Radio className="w-6 h-6 text-purple-400/60" />
              </motion.div>
            </div>

            {/* Error Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1
                className={`text-8xl sm:text-9xl font-bold ${themeClasses.text} mb-4`}
              >
                404
              </h1>
              <h2
                className={`text-2xl sm:text-3xl font-bold ${themeClasses.text} mb-4`}
              >
                Track Not Found
              </h2>
              <p className={`text-lg ${themeClasses.textSecondary} mb-8`}>
                Looks like this page hit a wrong note. The track you're looking
                for doesn't exist in our playlist.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold shadow-lg transition-colors"
                  onClick={() => window.history.back()}
                >
                  <ArrowLeft className="w-5 h-5" />
                  Go Back
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-6 py-3 ${themeClasses.card} backdrop-blur-xl border ${themeClasses.border} ${themeClasses.text} rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all`}
                >
                  <Home className="w-5 h-5" />
                  Home
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-6 py-3 ${themeClasses.card} backdrop-blur-xl border ${themeClasses.border} ${themeClasses.text} rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all`}
                >
                  <Search className="w-5 h-5" />
                  Search
                </motion.button>
              </div>

              {/* Suggestions */}
            
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
