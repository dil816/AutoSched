import React, { useEffect, useState } from "react";
import { CloseCircle } from "iconsax-react";
import Pagination from "../shared/Pagination.jsx";

function UserUnAssign({ isOpen, onClose, schedule }) {
  const usersPerPage = 6;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Examiners");
  const [responseData, setResponseData] = useState([]);
  const [users, setUsers] = useState([]);
  const [paginatedUsers, setPaginatedUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(new Set());

  useEffect(() => {
    console.log(schedule);
    if (schedule.id != null) {
      getUserListToUnAssignSchedule(schedule.id);
    }
  }, [schedule]);

  const handlePaginatedUsers = (paginatedUsers) => {
    setPaginatedUsers(paginatedUsers);
  };

  const getUserListToUnAssignSchedule = async (id) => {
    const request = {
      scheduleId: id,
    };
    const response = await fetch(
      `http://localhost:5008/api/Schedule/GetUserListToUnAssignSchedule`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      },
    );
    const data = await response.json();
    setResponseData(data);
    setUsers(data.examinerList);
    setSelectedUsers(new Set());
    setSelectedFilter("Examiners");
  };

  const handleFilterChange = (e) => {
    console.log(e.target.value);
    setSelectedFilter(e.target.value);
    if (e.target.value === "Examiners") {
      setUsers(responseData.examinerList);
    } else {
      setUsers(responseData.studentList);
    }
  };

  const filteredUsers = paginatedUsers.filter(
    (user) =>
      user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userEmail.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleOnChange = (userid) => {
    setSelectedUsers((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(userid)) {
        newSelected.delete(userid);
      } else {
        newSelected.add(userid);
      }
      console.log(newSelected);
      return newSelected;
    });
  };

  if (!isOpen) {
    return null;
  } else {
    return (
      <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50 overflow-auto">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
          {/*header*/}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <h2 className="text-lg font-semibold">
                UnAssign Users to {schedule.name.slice(0, 5)}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <CloseCircle size="23" color="#697689" />
            </button>
          </div>
          {/*search*/}
          <div className="flex flex-col gap-4 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">
                {`All ${selectedFilter} ${users.length}`}
              </span>
              <button
                onClick={() => console.log([...selectedUsers])}
                className="bg-black text-white px-3 py-1 rounded-md"
              >
                + Remove {selectedUsers.size}
              </button>
            </div>
            {/*dropdown*/}
            <div className="flex gap-4">
              <select
                value={selectedFilter}
                onChange={(e) => handleFilterChange(e)}
                className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Examiners">Examiners</option>
                <option value="Students">Students</option>
              </select>
            </div>
          </div>
          {/*search bar*/}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/*user list*/}
          <div className="space-y-3">
            {filteredUsers.map((user, index) => (
              <div
                key={index}
                className="flex items-center p-2 hover:bg-gray-100 rounded-md"
              >
                <input
                  type="checkbox"
                  className="rounded mr-3"
                  checked={selectedUsers.has(user.userId)}
                  onChange={() => handleOnChange(user.userId)}
                />
                <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium">{user.userName}</p>
                  <p className="text-sm text-gray-500">{user.userEmail}</p>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            filteredUsers={users}
            usersPerPage={usersPerPage}
            onUsersChange={handlePaginatedUsers}
          />
        </div>
      </div>
    );
  }
}

export default UserUnAssign;
