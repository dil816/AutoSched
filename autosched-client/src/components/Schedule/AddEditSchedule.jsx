import React, { useEffect, useState } from "react";
import { Setting2, Trash } from "iconsax-react";
import { useNavigate, useParams } from "react-router-dom";

function AddEditSchedule() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [presentation, setPresentation] = useState([]);
  const [formData, setFormData] = useState({
    newDate: "",
    reason: "",
    status: "",
    presentationId: null,
  });
  const [formError, setFormError] = useState({
    newDate: "",
    reason: "",
    status: "",
    presentationId: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      getScheduleDetails(parseInt(id));
    }
    getPresentationslist();
  }, [id]);

  const getScheduleDetails = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5008/api/Reschedule/${id}`
      );
      const data = await response.json();
      setFormData({
        presentationId: data.presentationDetails.id,
        newDate: data.newDate.split("T")[0], // Format date for input
        status: data.status,
        reason: data.reason,
      });
    } catch (error) {
      console.error("Error fetching schedule details:", error);
    }
  };

  const getPresentationslist = async () => {
    try {
      const response = await fetch("http://localhost:5008/api/Presentation");
      const data = await response.json();
      setPresentation(data);
    } catch (error) {
      console.error("Error fetching presentations:", error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setFormError((prevError) => ({ ...prevError, [id]: "" }));
  };

  const validateForm = () => {
    const errors = {};

    // Date validation
    if (!formData.newDate) {
      errors.newDate = "Date is required";
    } else {
      const selectedDate = new Date(formData.newDate);
      const today = new Date();
      if (selectedDate < today.setHours(0, 0, 0, 0)) {
        errors.newDate = "Date cannot be in the past";
      }
    }

    // Reason validation
    if (!formData.reason.trim()) {
      errors.reason = "Reason is required";
    } else if (formData.reason.length < 5) {
      errors.reason = "Reason must be at least 5 characters";
    } else if (formData.reason.length > 500) {
      errors.reason = "Reason cannot exceed 500 characters";
    }

    // Status validation
    if (!formData.status) {
      errors.status = "Please select a status";
    } else if (!["approve", "reject"].includes(formData.status)) {
      errors.status = "Invalid status selection";
    }

    // Presentation validation
    if (!formData.presentationId) {
      errors.presentationId = "Please select a presentation";
    }

    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      if (id) {
        const response = await fetch(
          `http://localhost:5008/api/Reschedule/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update schedule");
        }
      } else {
        const response = await fetch("http://localhost:5008/api/Reschedule", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Failed to create schedule");
        }
      }

      // Reset form and navigate on success
      setFormData({
        newDate: "",
        reason: "",
        status: "",
        presentationId: null,
      });
      setFormError({});
      navigate("/schedules");
    } catch (error) {
      console.error("Submission error:", error);
      // You could add a user-facing error message here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-1 p-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
      {/* Header Section with Gradient */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-white">
            {id ? "Edit Reschedule" : "Add Reschedule"}
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
          {/* Schedule Information Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase mb-4">
              Reschedule Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* New Date */}
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="newDate"
                >
                  New Date
                </label>
                <input
                  type="date"
                  id="newDate"
                  value={formData.newDate}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formError.newDate ? "border-red-500" : ""
                  }`}
                  disabled={isSubmitting}
                />
                {formError.newDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {formError.newDate}
                  </p>
                )}
              </div>

              {/* Status */}
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="status"
                >
                  Status
                </label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg ${
                    formError.status ? "border-red-500" : ""
                  }`}
                  disabled={isSubmitting}
                >
                  <option value="">Select status</option>
                  <option value="approve">Approve</option>
                  <option value="reject">Reject</option>
                </select>
                {formError.status && (
                  <p className="text-red-500 text-sm mt-1">
                    {formError.status}
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
                  disabled={isSubmitting}
                >
                  <option value="">Select presentation</option>
                  {presentation.map((p) => (
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
            </div>
          </div>

          {/* Schedule Description Section */}
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="reason"
            >
              Reason
            </label>
            <textarea
              id="reason"
              value={formData.reason}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formError.reason ? "border-red-500" : ""
              }`}
              rows="4"
              placeholder="Enter reason for rescheduling"
              disabled={isSubmitting}
            ></textarea>
            {formError.reason && (
              <p className="text-red-500 text-sm mt-1">{formError.reason}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default AddEditSchedule;
