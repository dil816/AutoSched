import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

const Presentation = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [presentationData, setpresentationData] = useState([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      const response = await fetch("http://localhost:5008/api/Presentation", {
        headers: { Authorization: `Bearer ${user.accesstoken}` },
      });
      const data = await response.json();

      if (response.ok) {
        setpresentationData(data);
        //dispatch({ type: "SET_WORKOUTS", payload: data });
      }
    };
    if (user) {
      fetchSchedules();
    }
  }, [user]);

  const handleAddSchedule = () => {
    navigate("/presentations/addeditpresentation");
  };

    // DELETE function
    const handleDelete = async (id) => {
      if (!window.confirm("Are you sure you want to delete this presentation?")) {
        return;
      }
  
      try {
        const response = await fetch(`http://localhost:5008/api/Presentation/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.accesstoken}`,
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to delete presentation");
        }
  
        // Update the state after successful deletion
        setpresentationData((prevData) => prevData.filter((p) => p.id !== id));
  
        alert("Presentation deleted successfully!");
      } catch (error) {
        console.error("Error:", error);
        alert("Error deleting presentation");
      }
    };

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
          <span className="text-gray-600 font-medium">
            Schedules Count {presentationData.length}
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
          + Add Schedule
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
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Start Time</th>
              <th className="py-3 px-4">End Time</th>
            </tr>
          </thead>
          <tbody>
            {presentationData.map((presentation, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="py-3 px-4 flex items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full mr-3 flex items-center justify-center text-white">
                    {presentation.title.charAt(0).toUpperCase()}
                  </div>
                  {presentation.title}
                </td>
                <td className="py-3 px-4 text-gray-600">{presentation.description}</td>
                <td className="py-3 px-4 text-gray-600">{presentation.type}</td>
                <td className="py-3 px-4 text-gray-600">{presentation.startTime}</td>
                <td className="py-3 px-4 text-gray-600">{presentation.endTime}</td>
                <td className="py-3 px-4 text-gray-600">
                  <Link to={`/presentations/addeditpresentation/${presentation.id}`}>
                  edit
                  </Link>
                  <button
                    onClick={() => handleDelete(presentation.id)}
                    className="text-red-500 hover:underline"
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

export default Presentation;


