import {
  Home,
  Disc3,
  Award,
  Newspaper,
  Activity,
  Settings,
  LogOut,
  Music2,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo text.png";
import React from "react";

const Sidebar = ({ isOpen = true, onClose = () => {} }) => {
  const [expandedItems, setExpandedItems] = React.useState<number[]>([]);

  const toggleSubmenu = (index: number) => {
    setExpandedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };
  const sidebarItems = [
    { icon: Home, label: "Home", path: "/home" },
    {
      icon: Disc3,
      label: "Albums",
      path: "/albums",
      submenu: [
        { label: "All Albums", path: "/all_albums" },
        { label: "My Albums", path: "/albums" },
      ],
    },
    { icon: Award, label: "Plaques", path: "/plaques" },
    { icon: Newspaper, label: "News and Updates", path: "/news" },
    { icon: Activity, label: "Activities", path: "/activities" },
    { icon: Settings, label: "Profile", path: "/profile" },
    { icon: LogOut, label: "Logout", path: "/logout" },
  ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden animate-fadeIn"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-all duration-300 ease-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col h-screen`}
      >
        {/* Header */}
        <div className="flex items-center h-20 px-6 shrink-0">
          <div className="flex items-center">
            <img
              src={logo}
              alt="Uzinduzi Logo"
              className="h-14 w-auto object-contain hover:scale-105 transition-transform duration-200"
            />
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-6 py-4 shrink-0">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search music..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border-0 rounded-full text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-gray-300 transition-all duration-200 hover:bg-gray-200"
            />
          </div>
        </div>

        {/* Navigation */}
        {/* Navigation */}
        <nav className="px-3 space-y-1 flex-1 overflow-y-auto pb-6">
          {sidebarItems.map((item, index) => {
            const IconComponent = item.icon;
            const hasSubmenu = item.submenu && item.submenu.length > 0;
            const isExpanded = expandedItems.includes(index);

            return (
              <div key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `group flex items-center px-4 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                      isActive
                        ? "text-white bg-linear-to-r from-red-600 to-red-500"
                        : "text-gray-600 hover:text-gray-900"
                    }`
                  }
                  onClick={(e) => {
                    if (hasSubmenu) {
                      e.preventDefault();
                      toggleSubmenu(index);
                    } else if (window.innerWidth < 1024) {
                      onClose();
                    }
                  }}
                >
                  {({ isActive }) => (
                    <>
                      {/* Icon */}
                      <IconComponent
                        className={`w-6 h-6 mr-4 transition-all duration-200 ${
                          isActive
                            ? "text-white"
                            : "text-gray-600 group-hover:text-gray-900"
                        }`}
                      />

                      {/* Label */}
                      <span className="relative flex-1">{item.label}</span>

                      {/* Chevron for submenu */}
                      {hasSubmenu && (
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      )}

                      {/* Background hover effect */}
                      {!isActive && (
                        <div className="absolute inset-0 rounded-lg bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
                      )}
                    </>
                  )}
                </NavLink>

                {/* Submenu */}
                {hasSubmenu && isExpanded && (
                  <div className="ml-10 mt-1 space-y-1">
                    {item.submenu.map((subitem, subIndex) => (
                      <NavLink
                        key={subIndex}
                        to={subitem.path}
                        className={({ isActive }) =>
                          `block px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
                            isActive
                              ? "text-red-600 bg-red-50 font-semibold"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                          }`
                        }
                        onClick={() => {
                          if (window.innerWidth < 1024) {
                            onClose();
                          }
                        }}
                      >
                        {subitem.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Now Playing Mini Card */}
        <div className="px-3 py-4 shrink-0">
          <div className="bg-linear-to-br from-red-500 to-red-600 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-md bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Music2 className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-white/90 uppercase tracking-wide mb-0.5">
                  Now Playing
                </div>
                <div className="text-sm font-semibold text-white truncate">
                  Ready to groove
                </div>
              </div>
            </div>
            {/* Mini progress bar */}
            <div className="mt-3 h-1 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-white rounded-full animate-pulse-subtle"></div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 shrink-0">
          <div className="text-xs text-gray-500 text-center font-medium">
            © 2024 Uzinduzi Music
          </div>
        </div>

        {/* Custom Animations */}
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes pulse-subtle {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.2s ease-out;
          }
          
          .animate-pulse-subtle {
            animation: pulse-subtle 2s ease-in-out infinite;
          }
        `}</style>
      </div>
    </>
  );
};

export default Sidebar;
