import React, { useEffect, useState } from "react";
import {
  CalendarTick,
  PresentionChart,
  Teacher,
  Briefcase,
} from "iconsax-react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function Dashboard() {
  const [scheduleData, setScheduleData] = useState([]);
  const [widgetData, setWidgetData] = useState([]);

  useEffect(() => {
    fetchWidgetData();
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(
      "http://localhost:5008/api/Dashboard/ScheduleSummary",
    );
    const data = await response.json();
    setScheduleData(data);
  };

  const fetchWidgetData = async () => {
    const response = await fetch(
      "http://localhost:5008/api/Dashboard/DashboarCountdwidget",
    );
    const data = await response.json();
    setWidgetData(data);
  };

  return (
    <main className="flex-1 p-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
      {/* Gradient Header with Stats */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg mb-6 text-white">
        <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white bg-opacity-20 p-4 rounded-lg flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-600">Users</h3>
              <p className="text-2xl font-bold text-gray-600">
                {widgetData.usersCount}
              </p>
            </div>
            <div className=" rounded-full p-2">
              <span role="img" aria-label="professor">
                <Teacher size="30" color="#697689" />
              </span>
            </div>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-lg flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-600">Examiner Availability</h3>
              <p className="text-2xl font-bold text-gray-600">
                {widgetData.availabilityCount}
              </p>
            </div>
            <div className=" rounded-full p-2">
              <span role="img" aria-label="student">
                <Briefcase size="30" color="#697689" />
              </span>
            </div>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-lg flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-600">Presentations</h3>
              <p className="text-2xl font-bold text-gray-600">
                {widgetData.presentationCount}
              </p>
            </div>
            <div className=" rounded-full p-2">
              <span role="img" aria-label="course">
                <PresentionChart size="30" color="#697689" />
              </span>
            </div>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-lg flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-600">Schedules</h3>
              <p className="text-2xl font-bold text-gray-600">
                {widgetData.scheduleCount}
              </p>
            </div>
            <div className=" rounded-full p-2">
              <span role="img" aria-label="room">
                <CalendarTick size="30" color="#697689" />
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Chart Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chart 1 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Schedule Distribution
          </h3>
          <div className="w-full h-[300px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={scheduleData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid stroke="#e3e3e3" />
                <XAxis dataKey="date" axisLine={false} />
                <YAxis axisLine={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  strokeWidth={3}
                  dot={{ strokeWidth: 4, fill: "#8884d8" }}
                  dataKey="count"
                  stroke="#8884d8"
                  name="schedule count"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Schedule Distribution
          </h3>
          <div className="w-full h-[300px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={scheduleData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid stroke="#e3e3e3" />
                <XAxis dataKey="date" axisLine={false} />
                <YAxis axisLine={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  strokeWidth={3}
                  dot={{ strokeWidth: 4, fill: "#f54ebb" }}
                  dataKey="count"
                  stroke="#f54ebb"
                  name="schedule count"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
