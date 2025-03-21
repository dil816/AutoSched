// components/MainContent.jsx
import React from "react";

function User() {
  // Sample data for the table
  const userData = [
    {
      name: "Florence Shaw",
      email: "florence@funtitled.com",
      access: ["Admin", "Data Export", "Data Import"],
      lastActive: "Mar 4, 2024",
      dateAdded: "July 4, 2022",
    },
    {
      name: "Amélie Laurent",
      email: "amelie@funtitled.com",
      access: ["Admin", "Data Export", "Data Import"],
      lastActive: "Mar 4, 2024",
      dateAdded: "July 4, 2022",
    },
    {
      name: "Anmar Foley",
      email: "anmar@funtitled.com",
      access: ["Data Export", "Data Import"],
      lastActive: "Mar 4, 2024",
      dateAdded: "July 4, 2022",
    },
    {
      name: "Cailyn King",
      email: "cailyn@funtitled.com",
      access: ["Data Export", "Data Import"],
      lastActive: "Mar 4, 2024",
      dateAdded: "July 4, 2022",
    },
    {
      name: "Sienna Hewitt",
      email: "sienna@funtitled.com",
      access: ["Data Export", "Data Import"],
      lastActive: "Mar 4, 2024",
      dateAdded: "July 4, 2022",
    },
    {
      name: "Olly Shroeder",
      email: "olly@funtitled.com",
      access: ["Data Export", "Data Import"],
      lastActive: "Mar 4, 2024",
      dateAdded: "July 4, 2022",
    },
    {
      name: "Mathilde Lewis",
      email: "mathilde@funtitled.com",
      access: ["Data Export", "Data Import"],
      lastActive: "Mar 4, 2024",
      dateAdded: "July 4, 2022",
      active: true,
    },
    {
      name: "Jaya Willis",
      email: "jaya@funtitled.com",
      access: ["Data Export", "Data Import"],
      lastActive: "Mar 4, 2024",
      dateAdded: "July 4, 2022",
    },
  ];

  return (
    <main className="flex-1 p-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          User management
        </h2>
        <p className="text-gray-500 mt-1">
          Manage your team members and their account permissions here.
        </p>
      </div>

      {/* Filters and Actions */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <span className="text-gray-600 font-medium">ALL USERS 44</span>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-8 pr-4 py-2 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute left-2 top-2.5 text-gray-400">🔍</span>
          </div>
          <button className="flex items-center px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100">
            <span className="mr-2">🛠️</span> Filters
          </button>
        </div>
        <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900">
          + Add user
        </button>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-lg shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-3 px-4">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="py-3 px-4">User name</th>
              <th className="py-3 px-4">Access</th>
              <th className="py-3 px-4">Last active</th>
              <th className="py-3 px-4">Date added</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="py-3 px-4 flex items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full mr-3 flex items-center justify-center text-white">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-gray-800">{user.name}</p>
                    <p className="text-gray-500 text-sm">{user.email}</p>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    {user.access.map((permission, i) => (
                      <span
                        key={i}
                        className={`px-2 py-1 rounded text-xs ${
                          permission === "Admin"
                            ? "bg-green-100 text-green-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-600">{user.lastActive}</td>
                <td className="py-3 px-4 text-gray-600">{user.dateAdded}</td>
                <td className="py-3 px-4 text-gray-600">
                  {user.active && (
                    <span className="text-green-500 font-medium">Active</span>
                  )}
                  <button className="ml-2">⋮</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default User;
