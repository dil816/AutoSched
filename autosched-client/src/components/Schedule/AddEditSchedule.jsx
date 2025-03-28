import { Setting2 } from "iconsax-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

function AddEditSchedule() {
  const { id } = useParams();
  const [presentationList, setPresentationList] = useState([]);
  const [formData, setFormData] = useState({
    date: format(new Date(), "yyyy-MM-dd"),
    startTime: "",
    endTime: "",
    presentationId: null,
    description: "",
    UserId:[]
  });
  const [formError, setFormError] = useState({
    date: "",
    startTime: "",
    endTime: "",
    presentationId: "",
    description: "",
  });

  useEffect(() => {
    if (id) {
      getScheduleById(parseInt(id));
    }
    getPresentationList();
  }, [id]);

  const getScheduleById = async (id) => {
    const response = await fetch(
        `http://localhost:5008/api/Schedule/${id}`,
    );
    const data = await response.json();
    console.log(data)
  };

  const getPresentationList = async () => {
    const response = await fetch("http://localhost:5008/api/Presentation");
    const data = await response.json();
    setPresentationList(data);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setFormError((prevError) => ({ ...prevError, [id]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    //
  };

  const validateForm = () => {
    console.log("");
  };

  return (
    <main className="flex-1 p-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
      {/* Header Section with Gradient */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-white">Add ReSchedule</h2>
          <button className="flex items-center px-4 py-2 bg-white text-blue-500 rounded-lg hover:bg-gray-100 transition duration-200">
            <Setting2 size="20" color="#3b82f6" className="mr-2" />
            Settings
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/*Schedule Information Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase mb-4">
              ReSchedule Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Date */}
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
                  min={format(new Date(), "yyyy-MM-dd")}
                  value={
                    formData.date === ""
                      ? ""
                      : format(new Date(formData.date), "yyyy-MM-dd")
                  }
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formError.date ? "border-red-500" : ""
                  }`}
                />
                {formError.date && (
                  <p className="text-red-500 text-sm mt-1">{formError.date}</p>
                )}
              </div>

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
                    formError.startTime ? "border-red-500" : ""
                  }`}
                />
                {formError.startTime && (
                  <p className="text-red-500 text-sm mt-1">
                    {formError.startTime}
                  </p>
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
                    formError.endTime ? "border-red-500" : ""
                  }`}
                />
                {formError.endTime && (
                  <p className="text-red-500 text-sm mt-1">
                    {formError.endTime}
                  </p>
                )}
              </div>

              {/* Presentation */}
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="presentationId"
                >
                  Presentation
                </label>
                <select
                  id="presentationId"
                  value={formData.presentationId || ""}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg ${
                    formError.presentationId ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Select presentation</option>
                  {presentationList.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title}
                    </option>
                  ))}
                </select>
                {formError.presentationId && (
                  <p className="text-red-500 text-sm mt-1">
                    {formError.presentationId}
                  </p>
                )}
              </div>

              {/* Module Name */}
              {/*
                <div>
                  <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="moduleName"
                  >
                    Module Name
                  </label>
                  <input
                    type="text"
                    id="moduleName"
                    value={formData.moduleName}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      formError.moduleName ? "border-red-500" : ""
                    }`}
                    placeholder="Module Name"
                  />
                  {formError.moduleName && (
                    <p className="text-red-500 text-sm mt-1">
                      {formError.moduleName}
                    </p>
                  )}
                </div>
              */}
            </div>
          </div>

          {/* Description */}
          <div>
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="description"
              >
                Schedule Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formError.description ? "border-red-500" : ""
                }`}
                rows="4"
                placeholder="Schedule Description"
              ></textarea>
              {formError.description && (
                <p className="text-red-500 text-sm mt-1">
                  {formError.description}
                </p>
              )}
            </div>
          </div>

          {/* Submit*/}
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

export default AddEditSchedule;
