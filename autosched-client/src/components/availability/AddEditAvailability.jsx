import React, { useEffect, useState } from "react";
import { Setting2 } from "iconsax-react";
import { useNavigate, useParams } from "react-router-dom";

function AddEditAvailability() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    isAvailable: true,
    examinarName: "", // Changed to consistent naming
  });
  const [formError, setFormError] = useState({
    date: "",
    startTime: "",
    endTime: "",
    examinarName: "",
  });

  useEffect(() => {
    if (id) {
      getScheduleDetails(parseInt(id));
    }
  }, [id]);

  const getScheduleDetails = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5008/api/Availability/${id}`
      );
      const data = await response.json();
      // Ensure boolean value for isAvailable
      setFormData({
        ...data,
        isAvailable: Boolean(data.isAvailable),
      });
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  const handleChange = (e) => {
    const { id, value, type } = e.target;
    const newValue = type === "checkbox" ? e.target.checked : value;

    setFormData((prev) => ({
      ...prev,
      [id]: id === "isAvailable" ? value === "true" : newValue,
    }));

    setFormError((prev) => ({
      ...prev,
      [id]: "",
    }));
  };

  const validateForm = () => {
    const errors = {};
    const today = new Date().toISOString().split("T")[0];

    // Date validation
    if (!formData.date) {
      errors.date = "Date is required";
    } else if (formData.date < today) {
      errors.date = "Date cannot be in the past";
    }

    // Start time validation
    if (!formData.startTime) {
      errors.startTime = "Start time is required";
    }

    // End time validation
    if (!formData.endTime) {
      errors.endTime = "End time is required";
    }

    // Time range validation
    if (formData.startTime && formData.endTime) {
      if (formData.startTime >= formData.endTime) {
        errors.endTime = "End time must be after start time";
      }
    }

    // Examiner name validation
    if (!formData.examinarName.trim()) {
      errors.examinarName = "Examiner name is required";
    } else if (formData.examinarName.length < 2) {
      errors.examinarName = "Examiner name must be at least 2 characters";
    }

    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const url = id
        ? `http://localhost:5008/api/Availability/${id}`
        : "http://localhost:5008/api/Availability";
      const method = id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          date: "",
          startTime: "",
          endTime: "",
          isAvailable: true,
          examinarName: "",
        });
        setFormError({});
        navigate("/availability");
      } else {
        console.error("Failed to save availability");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <main className="flex-1 p-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-white">
            {id ? "Edit" : "Add"} Availability
          </h2>
          <button className="flex items-center px-4 py-2 bg-white text-blue-500 rounded-lg hover:bg-gray-100 transition duration-200">
            <Setting2 size="20" color="#3b82f6" className="mr-2" />
            Settings
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase mb-4">
              Availability Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="date"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formError.date ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {formError.date && (
                  <p className="text-red-500 text-sm mt-1">{formError.date}</p>
                )}
              </div>

              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="startTime"
                >
                  Start Time
                </label>
                <input
                  type="time"
                  id="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formError.startTime ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {formError.startTime && (
                  <p className="text-red-500 text-sm mt-1">
                    {formError.startTime}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="endTime"
                >
                  End Time
                </label>
                <input
                  type="time"
                  id="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formError.endTime ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {formError.endTime && (
                  <p className="text-red-500 text-sm mt-1">
                    {formError.endTime}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="isAvailable"
                >
                  Availability
                </label>
                <select
                  id="isAvailable"
                  value={formData.isAvailable.toString()}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="true">Available</option>
                  <option value="false">Not Available</option>
                </select>
              </div>

              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="examinarName"
                >
                  Examiner Name
                </label>
                <input
                  type="text"
                  id="examinarName"
                  value={formData.examinarName}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formError.examinarName
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter examiner name"
                />
                {formError.examinarName && (
                  <p className="text-red-500 text-sm mt-1">
                    {formError.examinarName}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            >
              {id ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default AddEditAvailability;
