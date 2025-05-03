import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";
import Swal from "sweetalert2";

function User() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch users when the component mounts or when the user changes
  useEffect(() => {
    const fetchUsers = async () => {
      if (!user || !user.accesstoken) return; // Guard clause for no user

      setLoading(true);
      setError(null);

      try {
        const response = await fetch("http://localhost:5008/api/User", {
          headers: { Authorization: `Bearer ${user.accesstoken}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user]);

  // Handle user deletion
  const handleDelete = async (id) => {
    if (!id) return;
  
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
  
    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:5008/api/User/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.accesstoken}`,
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to delete user");
        }
  
        setUserData((prevData) => prevData.filter((item) => item.rowId !== id));
  
        Swal.fire("Deleted!", "User has been deleted.", "success");
      } catch (err) {
        setError(err.message);
        Swal.fire("Error!", err.message, "error");
      }
    }
  };
  // Navigate to add user page
  const handleAddUser = () => {
    navigate("/users/adduser");
  };

  // Filter users based on search query
  const filteredUsers = userData.filter(
    (u) =>
      u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="flex-1 p-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          User Management
        </h2>
        <p className="text-gray-500 mt-1">
          Manage your team members and their account permissions here.
        </p>
      </div>

      {/* Filters and Actions */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <span className="text-gray-600 font-medium">
            ALL USERS {userData.length}
          </span>
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
          + Add User
        </button>
      </div>

      {/* Loading and Error States */}
      {loading && <p className="text-gray-600">Loading users...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* User Table */}
      {!loading && !error && (
        <div className="bg-white rounded-lg shadow">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="py-3 px-4">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Access</th>
                <th className="py-3 px-4">First Name</th>
                <th className="py-3 px-4">Last Name</th>
                <th className="py-3 px-4">Actions</th>
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
                      onClick={() => handleDelete(user.rowId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default User;
