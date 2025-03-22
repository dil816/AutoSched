// components/MainContent.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

function User() {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      const response = await fetch("http://localhost:5008/api/User", {
        headers: { Authorization: `Bearer ${user.accesstoken}` },
      });
      const data = await response.json();

      if (response.ok) {
        setUserData(data);
        //dispatch({ type: "SET_WORKOUTS", payload: data });
      }
    };
    if (user) {
      fetchSchedules();
    }
  }, [user]);

  const handledelete = async (id) => {
    const response = await fetch(`http://localhost:5008/api/User/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      const updatedusers = userData.filter((item) => item.rowId !== id);
      setUserData(updatedusers);
    }
  };

  const handleAddUser = () => {
    navigate("/users/modifyuser");
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
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
          onClick={handleAddUser}
        >
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
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Access</th>
              <th className="py-3 px-4">FirstName</th>
              <th className="py-3 px-4">LastName</th>
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
                    {user.username.charAt(0)}
                  </div>
                  <div>
                    <p className="text-gray-800">{user.username}</p>
                    <p className="text-gray-500 text-sm">{user.email}</p>
                  </div>
                </td>
                {
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      {user.role == 1 && (
                        <span className="px-2 py-1 rounded text-xs  bg-green-100 text-green-800">
                          Admin
                        </span>
                      )}
                      {user.role == 2 && (
                        <span className="px-2 py-1 rounded text-xs  bg-purple-100 text-purple-800">
                          Examinar
                        </span>
                      )}
                      {user.role == 3 && (
                        <span className="px-2 py-1 rounded text-xs  bg-gray-100 text-black-800">
                          Student
                        </span>
                      )}
                      {user.role == "" && (
                        <span className="px-2 py-1 rounded text-xs  bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      )}
                    </div>
                  </td>
                }
                <td className="py-3 px-4 text-gray-600">{user.firstName}</td>
                <td className="py-3 px-4 text-gray-600">{user.lastName}</td>
                <td className="py-3 px-4 text-gray-600">
                  <Link to={`modifyuser/${user.rowId}`}>Update</Link>
                </td>
                <td className="py-3 px-4 text-gray-600">
                  <button
                    className="ml-2"
                    onClick={() => handledelete(user.rowId)}
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
}

export default User;
