import React from "react";
import { FaHome, FaFolderOpen, FaToolbox, FaUserCircle } from "react-icons/fa";

function Sidebar() {
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white w-64">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b border-gray-700">
        <h1 className="text-2xl font-bold">A2 Visualization</h1>
      </div>

      {/* Navigation Links */}
      <div className="flex-grow">
        <ul className="mt-4 space-y-4">
          {/* Home */}
          <li className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer">
            <FaHome className="mr-4" />
            <span>Home</span>
          </li>
          {/* Library */}
          <li className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer">
            <FaFolderOpen className="mr-4" />
            <span>Library</span>
          </li>
          {/* Tools */}
          <li className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer">
            <FaToolbox className="mr-4" />
            <span>Tools</span>
          </li>
          {/* Profile */}
          <li className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer">
            <FaUserCircle className="mr-4" />
            <span>Profile</span>
          </li>
        </ul>
      </div>

      {/* Footer */}
      <div className="h-16 flex items-center justify-center border-t border-gray-700">
        <span className="text-sm text-gray-500">© 2024 A2 Viz</span>
      </div>
    </div>
  );
}

export default Sidebar;
