import React from "react";

// components/MainContent.jsx

// components/MainContent.jsx

function Dashboard() {
  // Sample data for the table
  const scheduleData = [
    {
      day: "2/27/2025",
      time: "11:21 AM",
      professor: "Mr. Kumara",
      students: 1,
      module: "OSSA",
    },
    {
      day: "2/27/2025",
      time: "11:21 AM",
      professor: "Mr. Kumara",
      students: 2,
      module: "OSSA",
    },
    {
      day: "2/27/2025",
      time: "11:21 AM",
      professor: "Mr. Kumara",
      students: 3,
      module: "OSSA",
    },
    {
      day: "2/27/2025",
      time: "11:21 AM",
      professor: "Mr. Kumara",
      students: 2,
      module: "OSSA",
    },
  ];

  return (
    <main className="flex-1 p-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
      {/* Gradient Header with Stats */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg mb-6 text-white">
        <h2 className="text-2xl font-semibold mb-4">Schedule table</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white bg-opacity-20 p-4 rounded-lg flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-600">PROFESSOR</h3>
              <p className="text-2xl font-bold text-gray-600">350</p>
            </div>
            <div className="bg-red-500 rounded-full p-2">
              <span role="img" aria-label="professor">
                👤
              </span>
            </div>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-lg flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-600">STUDENT</h3>
              <p className="text-2xl font-bold text-gray-600">2,356</p>
            </div>
            <div className="bg-orange-500 rounded-full p-2">
              <span role="img" aria-label="student">
                👥
              </span>
            </div>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-lg flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-600">COURSE</h3>
              <p className="text-2xl font-bold text-gray-600">924</p>
            </div>
            <div className="bg-yellow-500 rounded-full p-2">
              <span role="img" aria-label="course">
                📚
              </span>
            </div>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-lg flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-600">ROOM</h3>
              <p className="text-2xl font-bold text-gray-600">49</p>
            </div>
            <div className="bg-cyan-500 rounded-full p-2">
              <span role="img" aria-label="room">
                🏠
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Table */}
      <div className="bg-white rounded-lg shadow p-6">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-2 px-4">DAY</th>
              <th className="py-2 px-4">TIMESLOT</th>
              <th className="py-2 px-4">PROFESSOR</th>
              <th className="py-2 px-4">STUDENTS</th>
              <th className="py-2 px-4">MODULE NAME</th>
            </tr>
          </thead>
          <tbody>
            {scheduleData.map((row, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4 text-gray-700">{row.day}</td>
                <td className="py-2 px-4 text-gray-700">{row.time}</td>
                <td className="py-2 px-4 text-blue-600">{row.professor}</td>
                <td className="py-2 px-4 flex space-x-2">
                  {Array.from({ length: row.students }).map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white"
                    >
                      👤
                    </div>
                  ))}
                </td>
                <td className="py-2 px-4 text-gray-700">{row.module}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Dashboard;
