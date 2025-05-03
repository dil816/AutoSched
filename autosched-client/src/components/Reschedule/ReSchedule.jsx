import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

const ReSchedule = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [reschduleData, setReSchduleData] = useState([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      const response = await fetch("http://localhost:5008/api/Reschedule", {
        headers: { Authorization: `Bearer ${user.accesstoken}` },
      });
      const data = await response.json();

      if (response.ok) {
        setReSchduleData(data);
        //dispatch({ type: "SET_WORKOUTS", payload: data });
      }
    };
    if (user) {
      fetchSchedules();
    }
  }, [user]);

  const handleAddSchedule = () => {
    navigate("/reschedules/addreschedule");
  };

  const handledelete = async (id) => {
    const response = await fetch(`http://localhost:5008/api/Reschedule/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      const updatedavailabilities = reschduleData.filter(
        (item) => item.id !== id
      );
      setReSchduleData(updatedavailabilities);
    }
  };
  return (
    <main className="flex-1 p-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Reschedule management
        </h2>
        <p className="text-gray-500 mt-1">
          Manage your team members and their account permissions here.
        </p>
      </div>

      {/* Filters and Actions */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <span className="text-gray-600 font-medium">
            Schedules Count {reschduleData.length}
          </span>
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
        <button
          onClick={handleAddSchedule}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
        >
          + Add Reschedule
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
              <th className="py-3 px-4">PresentationDetail</th>
              <th className="py-3 px-4">NewDate</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Reason</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {reschduleData.map((schedule, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="py-3 px-4 flex items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full mr-3 flex items-center justify-center text-white">
                    p
                  </div>
                  <div>
                    <p className="text-gray-800">
                      {schedule.presentationDetails.title}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {schedule.presentationDetails.type}
                    </p>
                  </div>
                </td>
                {/*<td className="py-3 px-4">
                  <div className="flex space-x-2">
                    {schedule.examinars.map((exm, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded text-xs bg-green-100 text-green-800 "
                      >
                        {exm.userName}
                      </span>
                    ))}
                  </div>
                </td>*/}
                {/*<td className="py-3 px-4">
                  <div className="flex space-x-2">
                    {schedule.students.map((std, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded text-xs bg-purple-100 text-purple-800"
                      >
                        {std.userName}
                      </span>
                    ))}
                  </div>
                </td>*/}
                <td className="py-3 px-4 text-gray-600">{schedule.newDate}</td>
                <td className="py-3 px-4 text-gray-600">{schedule.status}</td>
                <td className="py-3 px-4 text-gray-600">{schedule.reason}</td>
                <td className="py-3 px-4 text-gray-600">
                  <Link to={`/reschedules/editreschedule/${schedule.id}`}>
                    Update
                  </Link>
                </td>
                <td className="py-3 px-4 text-gray-600">
                  {/*{user.active && (
                    <span className="text-green-500 font-medium">Active</span>
                  )}*/}
                  <button
                    className="ml-2"
                    onClick={() => handledelete(schedule.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default ReSchedule;
