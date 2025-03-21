// components/Sidebar.jsx
import React from "react";
import {
  Category, // Dashboard
  UserAdd, // Add Professor
  Star1, // Icons
  CalendarAdd, // Add Schedule
  Building, // Add Room
  Book, // Add Course
  DocumentText, // Course
  Teacher, // Professor
  Home, // Room
  Clock, // Schedule
  Key, // Login
  Setting2, // Settings
  Profile, // Profile
  Document, // Reports
  Chart, // Analytics
} from "iconsax-react";
import { Link } from "react-router-dom";

function Sidebar() {
  const menuItems = [
    {
      path: "/",
      name: "Dashboard",
      icon: <Category size="20" color="#697689" />,
    },
    {
      path: "/users",
      name: "Users",
      icon: <Profile size="20" color="#697689" />,
    },
    {
      path: "/availability",
      name: "Add Availability",
      icon: <CalendarAdd size="20" color="#697689" />,
    },
    {
      path: "/presentations",
      name: "Presentations",
      icon: <DocumentText size="20" color="#697689" />,
    },

    {
      path: "/schedules",
      name: "Schedule",
      icon: <Clock size="20" color="#697689" />,
    },
    {
      path: "/reports",
      name: "Reports",
      icon: <Document size="20" color="#697689" />,
    },
  ];

  return (
    <nav className="w-60 bg-white text-gray-50 p-4 flex-shrink-0 overflow-y-auto max-h-[calc(100vh-4rem)]">
      {/* Logo */}
      {/*<div className="mb-6 flex items-center">
        <span className="text-2xl text-cyan-400 font-bold">argon</span>
      </div>*/}

      {/* Menu Items */}
      <ul className="space-y-2">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className="flex items-center p-2 text-gray-500 hover:text-gray-950 rounded transition duration-200"
            >
              <span className="mr-3 text-2xl">{item.icon}</span>
              <span className="text-sm">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;
