// App.jsx
import React from "react";

function Layout() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm h-16 flex items-center px-6">
        <h1 className="text-xl font-bold text-gray-800">My Website</h1>
      </header>

      {/* Main Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <nav className="w-64 bg-gray-800 text-white p-4 flex-shrink-0">
          <ul className="space-y-2">
            <li>
              <a href="#" className="block p-2 hover:bg-gray-700 rounded">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="block p-2 hover:bg-gray-700 rounded">
                About
              </a>
            </li>
            <li>
              <a href="#" className="block p-2 hover:bg-gray-700 rounded">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="block p-2 hover:bg-gray-700 rounded">
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Welcome</h2>
            <p className="text-gray-600">
              This is your main content area. You can add your components and
              content here.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
