import React, { useEffect, useState } from "react";
import { Setting2, Trash } from "iconsax-react";
import { useNavigate, useParams } from "react-router-dom";

function AddEditPresentation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    startTime: "",
    endTime: "",
  });
  const [formerror, setFormError] = useState({
    date: "",
    timeslot: "",
    presentation: "",
    moduleName: "",
    scheduleDescription: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    if (id) {
      getScheduleDetails(parseInt(id));
    }
  }, [id]);

  const getScheduleDetails = async (id) => {
    console.log(id);
    const response = await fetch(`http://localhost:5008/api/Presentation/${id}`);
    const data = await response.json();
    console.log(data);
    setFormData(data);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setFormError((preverror) => ({ ...preverror, [id]: "" }));
  };

  const validateForm = () => {
    const error = {};
    
    // Presentation title validation
    if (!formData.title) {
      error.title = "Presentation name is required";
    }
    
    // Type validation
    if (!formData.type) {
      error.type = "Type is required";
    }
    
    // Description validation
    if (!formData.description) {
      error.description = "Description is required";
    }

    // Time validation
    if (formData.startTime && formData.endTime) {
      const start = new Date(`2000-01-01T${formData.startTime}`);
      const end = new Date(`2000-01-01T${formData.endTime}`);
      
      if (start >= end) {
        error.startTime = "Start time must be before end time";
        error.endTime = "End time must be after start time";
      }
    } else {
      if (!formData.startTime) {
        error.startTime = "Start time is required";
      }
      if (!formData.endTime) {
        error.endTime = "End time is required";
      }
    }

    setFormError(error);
    return Object.keys(error).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (id) {
      const response = await fetch(`http://localhost:5008/api/Presentation/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        console.error("error");
      }

      if (response.ok) {
        navigate('/presentations');
        console.log(formData);
      }
    } else {
      const response = await fetch('http://localhost:5008/api/Presentation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log(formData);
      if (!response.ok) {
        console.error("error");
      }

      if (response.ok) {
        navigate('/presentations');
        console.log(formData);
      }
    }
    setFormError({});
  };

  return (
    <main className="flex-1 p-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-white">Add Schedule</h2>
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
              Presentation Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* StartTime */}
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
                    formerror.startTime ? "border-red-500" : ""
                  }`}
                />
                {formerror.startTime && (
                  <p className="text-red-500 text-sm mt-1">{formerror.startTime}</p>
                )}
              </div>

              {/* EndTime */}
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
                    formerror.endTime ? "border-red-500" : ""
                  }`}
                />
                {formerror.endTime && (
                  <p className="text-red-500 text-sm mt-1">{formerror.endTime}</p>
                )}
              </div>

              {/* Presentation Name */}
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="title"
                >
                  Presentation Name
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formerror.title ? "border-red-500" : ""
                  }`}
                  placeholder="Presentations"
                />
                {formerror.title && (
                  <p className="text-red-500 text-sm mt-1">{formerror.title}</p>
                )}
              </div>

              {/* Type */}
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="type"
                >
                  Type
                </label>
                <input
                  type="text"
                  id="type"
                  value={formData.type}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formerror.type ? "border-red-500" : ""
                  }`}
                  placeholder="Module Name"
                />
                {formerror.type && (
                  <p className="text-red-500 text-sm mt-1">{formerror.type}</p>
                )}
              </div>
            </div>
          </div>

          {/* Schedule Description Section */}
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formerror.description ? "border-red-500" : ""
              }`}
              rows="4"
              placeholder="Description"
            ></textarea>
            {formerror.description && (
              <p className="text-red-500 text-sm mt-1">{formerror.description}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-600 transition duration-200">
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default AddEditPresentation;