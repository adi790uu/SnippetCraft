import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, Info, LogIn, UserPlus, ChevronDown } from "lucide-react";

const Sidebar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientX < 20) {
        setMenuOpen(true);
      } else if (e.clientX > 300 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [menuOpen]);

  return (
    <div className="flex font-sans">
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-gray-900 
          border-r border-gray-700 shadow-lg text-white z-50 transition-transform duration-500 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Branding */}
        <div className="flex items-center justify-center h-20 bg-gray-800 border-b border-gray-700">
          <Link to="/" className="text-2xl font-semibold">
            <span className="text-gray-100">SnippetCraft</span>
          </Link>
        </div>

        {/* Menu Items */}
        <div className="space-y-4 px-6 mt-8">
          <Link
            to="/"
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition"
          >
            <Home className="w-5 h-5 mr-3" />
            Home
          </Link>
          <Link
            to="/about"
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition"
          >
            <Info className="w-5 h-5 mr-3" />
            About
          </Link>
        </div>

        <div className="absolute bottom-16 w-full px-6 space-y-4">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white text-lg font-semibold">
              P
            </div>
            <ChevronDown
              className={`w-5 h-5 ml-3 transform ${
                dropdownOpen ? "rotate-180" : ""
              } transition-transform`}
            />
          </div>
          {dropdownOpen && (
            <div className="mt-4 space-y-2">
              <button className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition">
                <LogIn className="w-5 h-5 mr-3" />
                Sign In
              </button>
              <button className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition">
                <UserPlus className="w-5 h-5 mr-3" />
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
