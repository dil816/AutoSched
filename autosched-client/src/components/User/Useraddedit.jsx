import React, { useEffect, useState } from "react";
import { Setting2, Trash } from "iconsax-react";
import { useNavigate, useParams } from "react-router-dom";

function UserAddEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    role: "1",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [formError, setFormError] = useState({
    username: "",
    role: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    if (id) {
      getScheduleDetails(id);
    }
  }, [id]);

  const getScheduleDetails = async (id) => {
    console.log(id);
    const response = await fetch(`http://localhost:5008/api/User/${id}`);

    const data = await response.json();

    setFormData(data);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setFormError((preverror) => ({ ...preverror, [id]: "" }));
  };

  /*const handleChange = (e) => {
    const { id, value, type } = e.target;
    const newValue = type === "select" ? e.target.checked : value;
    setFormData({ ...formData, [id]: newValue });
    setFormError((prev) => ({ ...prev, [id]: "" }));
  };*/

  const validateForm = () => {
    const error = {};
    if (!formData.startTime) {
      error.startTime = "Start time is required";
    }
    if (!formData.endTime) {
      error.endTime = "End time is required";
    }
    if (!formData.ExaminarName) {
      error.ExaminarName = "Examiner name is required";
    }

    if (
      formData.startTime &&
      formData.endTime &&
      formData.startTime >= formData.endTime
    ) {
      error.endTime = "End time must be after start time";
    }

    setFormError(error);
    console.log(Object.keys(error));
    return Object.keys(error) === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //if (validateForm()) {

    console.log(formData);

    if (id) {
      const response = await fetch(`http://localhost:5008/api/User/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          username: "",
          role: "",
          firstName: "",
          lastName: "",
          email: "",
        });
        setFormError({});

        navigate("/users");
      } else {
        console.error("not saved");
      }
    } else {
      const response = await fetch("http://localhost:5008/api/User", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          username: "",
          role: "",
          firstName: "",
          lastName: "",
          email: "",
        });
        setFormError({});

        navigate("/availability");
      } else {
        console.error("not saved");
      }
    }

    //}
  };

  // Remove a schedule from the list
  /*const handleRemoveSchedule = (index) => {
    setSchedules(schedules.filter((_, i) => i !== index));
  };*/

  // Handle final submission of all schedules
  /*const handleSubmit = (e) => {
    e.preventDefault();
    if (schedules.length === 0) {
      alert("Please add at least one schedule before submitting.");
      return;
    }
    console.log("Submitting all schedules:", schedules);
    // Here you can send the data to an API or perform other actions
    setSchedules([]); // Clear the list after submission
  };*/

  return (
    <main className="flex-1 p-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
      {/* Header Section with Gradient */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-white">
            Add Availability
          </h2>
          <button className="flex items-center px-4 py-2 bg-white text-blue-500 rounded-lg hover:bg-gray-100 transition duration-200">
            <Setting2 size="20" color="#3b82f6" className="mr-2" />
            Settings
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase mb-4">
              User Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg ${
                    formError.username ? "border-red-500" : ""
                  }`}
                />
                {formError.username && (
                  <p className="text-red-500 text-sm mt-1">
                    {formError.username}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="role"
                >
                  Role
                </label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg ${
                    formError.role ? "border-red-500" : ""
                  }`}
                >
                  <option value="" selected>
                    Pending
                  </option>
                  <option value="1">Admin</option>
                  <option value="2">Examiner</option>
                  <option value="3">Student</option>
                </select>
              </div>

              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg ${
                    formError.firstName ? "border-red-500" : ""
                  }`}
                />
                {formError.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {formError.firstName}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg ${
                    formError.lastName ? "border-red-500" : ""
                  }`}
                />
                {formError.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {formError.lastName}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg ${
                    formError.email ? "border-red-500" : ""
                  }`}
                />
                {formError.email && (
                  <p className="text-red-500 text-sm mt-1">{formError.email}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              {id ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>

      {/* List of Added Schedules */}
      {/*{schedules.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Added Schedules
          </h3>
          <ul className="space-y-4">
            {schedules.map((schedule, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-4 border rounded-lg"
              >
                <div>
                  <p className="text-gray-800 font-medium">
                    {schedule.day} at {schedule.timeslot}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {schedule.professorName} - {schedule.moduleName}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveSchedule(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash size="20" color="#ef4444" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}*/}
    </main>
  );
}

export default UserAddEdit;
