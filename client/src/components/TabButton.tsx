import React from "react";
import { TabButtonProps } from "./types";

const TabButton: React.FC<TabButtonProps> = ({
  isActive,
  onClick,
  children,
}) => (
  <button
    className={`px-6 py-3 rounded-lg text-lg font-semibold w-full transition duration-200 ${
      isActive
        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
        : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50"
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default TabButton;
