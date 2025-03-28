import React from "react";

const AddProfessor = () => {
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      {/*<div className="w-64 bg-indigo-900 text-white p-4 hidden md:block">
        <div className="mb-8">
          <img
            src="https://via.placeholder.com/100"
            alt="Argon Logo"
            className="h-10"
          />
        </div>
        <nav>
          <ul>
            <li className="mb-4">
              <a
                href="#"
                className="flex items-center p-2 text-indigo-200 hover:bg-indigo-700 rounded"
              >
                <span className="mr-2">📊</span> Dashboard
              </a>
            </li>
            <li className="mb-4">
              <a
                href="#"
                className="flex items-center p-2 bg-indigo-700 text-white rounded"
              >
                <span className="mr-2">👤</span> Add Professor
              </a>
            </li>
            <li className="mb-4">
              <a
                href="#"
                className="flex items-center p-2 text-indigo-200 hover:bg-indigo-700 rounded"
              >
                <span className="mr-2">🔍</span> Icons
              </a>
            </li>
            <li className="mb-4">
              <a
                href="#"
                className="flex items-center p-2 text-indigo-200 hover:bg-indigo-700 rounded"
              >
                <span className="mr-2">📅</span> Add ReSchedule
              </a>
            </li>
            <li className="mb-4">
              <a
                href="#"
                className="flex items-center p-2 text-indigo-200 hover:bg-indigo-700 rounded"
              >
                <span className="mr-2">🏫</span> Add Room
              </a>
            </li>
            <li className="mb-4">
              <a
                href="#"
                className="flex items-center p-2 text-indigo-200 hover:bg-indigo-700 rounded"
              >
                <span className="mr-2">📚</span> Add Course
              </a>
            </li>
            <li className="mb-4">
              <a
                href="#"
                className="flex items-center p-2 text-indigo-200 hover:bg-indigo-700 rounded"
              >
                <span className="mr-2">👨‍🏫</span> Professor
              </a>
            </li>
            <li className="mb-4">
              <a
                href="#"
                className="flex items-center p-2 text-indigo-200 hover:bg-indigo-700 rounded"
              >
                <span className="mr-2">🏠</span> Room
              </a>
            </li>
            <li className="mb-4">
              <a
                href="#"
                className="flex items-center p-2 text-indigo-200 hover:bg-indigo-700 rounded"
              >
                <span className="mr-2">📅</span> ReSchedule
              </a>
            </li>
            <li className="mb-4">
              <a
                href="#"
                className="flex items-center p-2 text-indigo-200 hover:bg-indigo-700 rounded"
              >
                <span className="mr-2">🔑</span> Login
              </a>
            </li>
          </ul>
        </nav>
      </div>*/}

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Add Professor</h2>
          <button className="bg-indigo-500 text-white px-4 py-2 rounded mb-4">
            Settings
          </button>

          {/* Professor Information */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">PROFESSOR INFORMATION</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  defaultValue="kk"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Module
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">CONTACT INFORMATION</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Postal code
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-medium mb-2">DESCRIPTION</h3>
            <textarea
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              rows="4"
            ></textarea>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 bg-white shadow-md p-4 hidden md:block">
        <div className="flex justify-end mb-4">
          <button className="bg-indigo-500 text-white px-2 py-1 rounded mr-2">
            Connect
          </button>
          <button className="bg-indigo-500 text-white px-2 py-1 rounded">
            Message
          </button>
        </div>
        <div className="text-center">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="rounded-full mx-auto mb-2"
          />
          <div className="flex justify-around text-gray-600 mb-2">
            <span>
              22 <br /> Friends
            </span>
            <span>
              10 <br /> Photos
            </span>
            <span>
              89 <br /> Comments
            </span>
          </div>
          <h3 className="font-semibold">Jessica Jones, 27</h3>
          <p className="text-gray-600 text-sm">Bucharest, Romania</p>
          <p className="text-gray-600 text-sm">
            Solution Manager - Creative Tim Officer
          </p>
          <p className="text-gray-600 text-sm">
            University of Computer Science
          </p>
          <p className="text-gray-600 text-sm">
            Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick
            Murphy — writes, performs and records all of his own music.
          </p>
          <a href="#" className="text-indigo-500 text-sm">
            Show more
          </a>
        </div>
        <p className="text-gray-500 text-xs mt-4">
          Activate Windows. Go to Settings to activate Windows.
        </p>
      </div>
    </div>
  );
};

export default AddProfessor;
